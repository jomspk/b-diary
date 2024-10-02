package middleware

import (
	"context"
	"encoding/json"

	app "kohaku/backend"
)

type errorStruct struct {
	// エラーコード
	ECode uint64 `json:"e_code,omitempty"`

	// エラー (デバッグ用 goエラー)
	Error string `json:"error,omitempty"`

	// リクエストID
	ID string `json:"id,omitempty"`

	// エラーメッセージ
	Message string `json:"message,omitempty"`
}

func errorResponse(ctx context.Context, eCode app.Error, err error) []byte {
	e := &errorStruct{
		ID:      app.ContextRequestID(ctx),
		ECode:   uint64(eCode.Code()),
		Message: eCode.Message(),
	}
	if app.ContextServerDebug(ctx) {
		e.Error = err.Error()
	}
	b, _ := json.Marshal(e)
	return b
}
