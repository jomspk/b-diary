package middleware

import (
	"fmt"
	"net/http"

	app "lxcard/backend"
	"lxcard/backend/env"

	"github.com/gofrs/uuid"
)

const (
	HeaderRequestID = "X-Request-ID"
)

// request scoped context
func WithContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := r.Header.Get(HeaderRequestID)
		if id == "" {
			// X-Request-ID ヘッダーがついていない場合, Server側で発行
			id = uuid.Must(uuid.NewV4()).String()
			if len(id) > 4 {
				// 0000 を先頭に付与
				id = fmt.Sprintf(`0000%s`, id[4:])
			}
		}
		ctx := r.Context()
		ctx = app.ContextWithRequestID(ctx, id)
		ctx = app.ContextWithServerDebug(ctx, env.Get().Server.Debug)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
