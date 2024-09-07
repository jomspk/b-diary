package middleware

import (
	"net/http"

	"lxcard/backend/loader"
	"lxcard/backend/service"
)

func LoaderMiddleware(userSvc service.User, cardSvc service.Card) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			loaders := loader.New(userSvc, cardSvc)
			next.ServeHTTP(w, r.WithContext(loaders.Attach(r.Context())))
		})
	}
}
