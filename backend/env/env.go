package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Env struct {
	Env string `envconfig:"ENV" default:"local"`
	RDB struct {
		User     string `envconfig:"RDB_USER" default:"root"`
		Password string `envconfig:"RDB_PASSWORD" default:""`
		Address  string `envconfig:"RDB_ADDRESS" default:"localhost:3307"`
		Name     string `envconfig:"RDB_NAME" default:"kohaku"`
	}
	Server struct {
		TimeZone   string   `envconfig:"SERVER_TIMEZONE" default:"Asia/Tokyo"`
		Debug      bool     `envconfig:"SERVER_DEBUG" default:"false"`
		CORSOrigin []string `envconfig:"SERVER_CORS_ORIGIN" default:"*"`
		APIHost    string   `envconfig:"SERVER_API_HOST" default:"127.0.0.1"`
		APIPort    string   `envconfig:"SERVER_API_PORT" default:"8080"`
	}
}

const (
	DotenvFile      = ".env"
	DotenvFileLocal = ".env.local"
)

var _env Env

func Get() Env {
	return _env
}

func Initialize(opts ...Option) error {
	// Read .env file if exists
	if len(opts) > 0 {
		if err := load(opts...); err != nil {
			return fmt.Errorf("dotenv file, %w", err)
		}
	} else {
		var f []string
		for _, envFile := range []string{DotenvFileLocal, DotenvFile} {
			if _, err := os.Stat(envFile); err == nil {
				f = append(f, envFile)
			}
		}
		if len(f) > 0 {
			opts := []Option{fileNames(f...)}
			if err := load(opts...); err != nil {
				return fmt.Errorf("dotenv file, %w", err)
			}
		}
	}

	if err := envconfig.Process("", &_env); err != nil {
		return err
	}
	return nil
}

func IsLocal() bool {
	return _env.Env == "local"
}

type Option func(s *config)

type config struct {
	filenames []string
}

// Read env file(s)
func fileNames(filenames ...string) Option {
	return func(c *config) {
		c.filenames = filenames
	}
}

func load(opts ...Option) error {
	conf := &config{}
	for _, f := range opts {
		f(conf)
	}
	if err := godotenv.Load(conf.filenames...); err != nil {
		return err
	}
	return nil
}
