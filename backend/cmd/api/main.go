package main

import (
	"context"
	pkgerrors "errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/justinas/alice"
	"github.com/robfig/cron/v3"
	"gorm.io/gorm"

	app "lxcard/backend"
	"lxcard/backend/env"
	"lxcard/backend/graph"
	mid "lxcard/backend/middleware"
	"lxcard/backend/pkg/errors"
	gormpkg "lxcard/backend/pkg/gorm"
	"lxcard/backend/repository"
	"lxcard/backend/service"
	"lxcard/backend/vwbl/api"
)

func main() {
	if err := realMain(); err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "an error occurred: %v\n", err)
		os.Exit(1)
	}
	os.Exit(0)
}

func realMain() error {
	if err := env.Initialize(); err != nil {
		log.Fatalf("failed to load config: %v\n", err)
	}

	app.NewLogger(env.Get().Server.Debug)

	// Load timezone
	location := time.FixedZone(env.Get().Server.TimeZone, 9*60*60)
	app.Logger.Info().Str("label", "server").Str("timezone", location.String()).Send()

	db, err := connectToMySQLWithRetry()
	if err != nil {
		return errors.Wrap(err)
	}

	// 定期処理
	startCronJob(db)

	diaryRepo := repository.NewDiary()
	bdiaryUserRepo := repository.NewBDiaryUser()
	diarySvc := service.NewDiary(db, diaryRepo)
	bdiaryUserRepoSvc := service.NewBDiaryUser(db, bdiaryUserRepo)
	config := graph.Config{Resolvers: graph.NewResolver(diarySvc, bdiaryUserRepoSvc)}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(config))
	srv.AroundResponses(mid.ResponseErrorRequestIDMiddleware)

	if env.IsLocal() {
		http.Handle("/", playground.Handler("GraphQL playground", "/v1/graphql"))
	}
	// GraphQL Endpoint
	http.Handle("/v1/graphql", setupGlobalMiddleware(srv))

	addr := fmt.Sprintf("%s:%s", env.Get().Server.APIHost, env.Get().Server.APIPort)
	app.Logger.Info().Msgf("Serving lxcard on http://%s", addr)

	server := &http.Server{
		Addr: "127.0.0.1:" + env.Get().Server.APIPort,
	}

	shutdownChan := make(chan struct{}, 1)

	go func() {
		if err := server.ListenAndServe(); !pkgerrors.Is(err, http.ErrServerClosed) {
			log.Fatalf("HTTP server failed unexpectedly: %v", err)
		}
		app.Logger.Info().Msg("server is no longer accepting new connections")
		shutdownChan <- struct{}{}
	}()

	// Set up channel to listen for interrupt signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	<-sigChan

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		return errors.Wrapf(err, "failed to gracefully shut down the server: %v", err)
	}

	<-shutdownChan

	app.Logger.Info().Msg("server has successfully completed graceful shutdown")

	return nil
}

func startCronJob(db *gorm.DB) {
	c := cron.New()
	vwblAPI := api.NewVWBLApi(env.Get().VWBL.EndpointURL)
	cronJobRepo := repository.NewCronJob()
	cronJobSvc := service.NewCronJob(db, cronJobRepo)
	_, err := c.AddFunc("@every 1m", func() {
		_, err := cronJobSvc.Test(vwblAPI)
		if err != nil {
			app.Logger.Error().Err(err).Msg("Failed to run cron job")
		}
		app.Logger.Info().Msg("CronJob is running")
	})
	if err != nil {
		app.Logger.Error().Err(err).Msg("Failed to add cron job")
	}
	c.Start()

	app.Logger.Info().Msg("CronJob started")
}

func setupGlobalMiddleware(handler http.Handler) http.Handler {
	a := alice.New()
	a = a.Append(mid.Recover)
	a = a.Append(mid.WithContext)
	a = a.Append(mid.CORS().Handler)
	a = a.Append(mid.RequestLog)
	return a.Then(handler)
}

func connectToMySQLWithRetry() (*gorm.DB, error) {
	maxRetries := 150
	retryInterval := 2 * time.Second

	for i := 0; i < maxRetries; i++ {
		db, err := gormpkg.Open(gormpkg.NewDefaultMySQLConfig(), app.Logger)
		if err == nil {
			app.Logger.Info().Str("label", "database").Msg("Successfully connected to MySQL")
			return db, nil
		}

		app.Logger.Warn().Err(err).Str("label", "database").
			Int("attempt", i+1).Msg("Failed to connect to MySQL, retrying...")

		time.Sleep(retryInterval)
	}

	return nil, errors.Wrap(fmt.Errorf("failed to connect to MySQL after %d attempts", maxRetries))
}
