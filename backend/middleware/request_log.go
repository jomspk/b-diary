package middleware

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"strings"
	"time"

	app "kohaku/backend"
	"kohaku/backend/pkg/errors"

	"github.com/99designs/gqlgen/graphql"
)

type ResponseWriterWithStatusCode struct {
	http.ResponseWriter
	statusCode int
	response   []byte
}

func NewResponseWriterWithStatusCode(w http.ResponseWriter) *ResponseWriterWithStatusCode {
	return &ResponseWriterWithStatusCode{w, http.StatusOK, nil}
}

// Overwrite original WriteHeader method
func (lrw *ResponseWriterWithStatusCode) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
}

// Overwrite original Write method
func (lrw *ResponseWriterWithStatusCode) Write(b []byte) (int, error) {
	lrw.response = b
	i, err := lrw.ResponseWriter.Write(b)
	if err != nil {
		return 0, errors.Wrap(err)
	}
	return i, nil
}

func RequestLog(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		ctx := r.Context()

		var payload []byte
		var err error
		if len(r.Header["Content-Type"]) > 0 && !strings.HasPrefix(r.Header["Content-Type"][0], "multipart/form-data") {
			payload, err = captureRequestPayload(r)
			if err != nil {
				app.LogError(ctx, err).Str("label", "request_log").Send()
			}
		}
		app.LogInfo(ctx).Str("label", "request_log").
			Str("method", r.Method).Str("path", r.URL.String()).
			Str("query", r.URL.RawQuery).Bytes("payload", payload).
			Msgf("Start")

		rWriter := NewResponseWriterWithStatusCode(w)
		next.ServeHTTP(rWriter, r)

		// HTTP StatusCode
		code := rWriter.statusCode
		switch {
		// 5xx
		case code >= http.StatusInternalServerError:
			app.LogError(ctx, errors.New("internal server error")).
				Str("label", "request_log").
				Str("method", r.Method).Str("path", r.URL.String()).
				Int("status_code", code).
				Bytes("msg", rWriter.response).Send()
		// 4xx
		case code >= http.StatusBadRequest:
			app.LogWarn(ctx).Str("label", "request_log").
				Str("method", r.Method).Str("path", r.URL.String()).
				Int("status_code", code).
				Bytes("msg", rWriter.response).Send()
		// others
		default:
		}
		elapsed := time.Since(start).Milliseconds() // datadog の facet が millisecond なのでそれに合わせる
		app.LogInfo(ctx).Str("label", "request_log").
			Str("method", r.Method).Str("path", r.URL.String()).
			Int64("elapsed", elapsed).
			Msgf("Completed")
	})
}

// ResponseErrorRequestIDMiddleware は ctx中に `req_id` が入っている場合はエラーメッセージに `req_id` を調査用IDとしてメッセージに付け加える。
func ResponseErrorRequestIDMiddleware(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {
	res := next(ctx)
	if len(res.Errors) == 0 {
		return res
	}
	requestID := app.ContextRequestID(ctx)
	if requestID == "" {
		return res
	}
	if res.Errors[0].Extensions == nil {
		res.Errors[0].Extensions = make(map[string]interface{})
	}
	res.Errors[0].Extensions["req_id"] = requestID
	return res
}

func captureRequestPayload(r *http.Request) ([]byte, error) {
	// To allocate slice for http.Request.Body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	// 一度読むとBodyは空になってしまうため.
	// https://stackoverflow.com/questions/43021058/golang-read-request-body
	r.Body = io.NopCloser(bytes.NewBuffer(body))
	return body, nil
}
