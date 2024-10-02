package middleware

import (
	"net/http"

	"github.com/rs/cors"

	"lxcard/backend/env"
)

func CORS() *cors.Cors {
	options := cors.Options{
		AllowCredentials: true,
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodOptions,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
		AllowedHeaders: []string{
			"Origin",
			"Accept",
			"Content-Type",
			HeaderRequestID,
		},
		AllowedOrigins: env.Get().Server.CORSOrigin,
		Debug:          false,
	}

	return cors.New(options)
}
