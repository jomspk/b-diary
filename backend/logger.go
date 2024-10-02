package app

import (
	"context"
	"io"
	"os"

	"github.com/gofrs/uuid"
	"github.com/rs/zerolog"

	"kohaku/backend/env"
	"kohaku/backend/pkg/pointer"
)

var Logger = pointer.Any(zerolog.Nop())

func setLogger(logger *zerolog.Logger) {
	Logger = logger
}

func LogDebug(ctx context.Context) *zerolog.Event {
	return contextualLog(ctx, Logger.With()).Debug()
}

func LogInfo(ctx context.Context) *zerolog.Event {
	return contextualLog(ctx, Logger.With()).Info()
}

func LogWarn(ctx context.Context) *zerolog.Event {
	return contextualLog(ctx, Logger.With()).Warn()
}

func LogContext(ctx context.Context) *zerolog.Logger {
	return contextualLog(ctx, Logger.With())
}

func LogError(ctx context.Context, err error) *zerolog.Event {
	return contextualLog(ctx, Logger.With()).Error().Str("msg", err.Error()).Err(err)
}

func contextualLog(ctx context.Context, logCtx zerolog.Context) *zerolog.Logger {
	return pointer.Any(logCtx.Logger())
}

func NewLogger(isDebug bool) {
	// level
	logLevel := zerolog.InfoLevel
	if isDebug {
		logLevel = zerolog.DebugLevel
	}
	zerolog.SetGlobalLevel(logLevel)

	var writer io.Writer
	if env.IsLocal() {
		writer = zerolog.NewConsoleWriter()
	} else {
		writer = os.Stdout
	}

	l := zerolog.New(writer).
		Hook(logIDHook{}).With().
		Timestamp().Stack().Caller()
	setLogger(pointer.Any(l.Logger()))
}

// unique Log ID
type logIDHook struct{}

func (h logIDHook) Run(e *zerolog.Event, _ zerolog.Level, _ string) {
	e.Str("id", uuid.Must(uuid.NewV4()).String())
}
