package middleware

import (
	"errors"
	"net/http"
	"runtime/debug"

	app "kohaku/backend"
)

func Recover(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			err := recover()
			if err == nil {
				return
			}

			e := errors.New("panic occured")
			if v, ok := err.(error); ok {
				e = v
			}
			app.LogError(r.Context(), e).
				Str("label", "panic").
				Bytes("stack", debug.Stack()).
				Send()
			resp := errorResponse(
				r.Context(), app.ErrorServerPanic, e)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			_, _ = w.Write(resp)
		}()
		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}
