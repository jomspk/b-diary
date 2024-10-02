package app

import (
	"context"

	pkgcontext "kohaku/backend/pkg/context"
)

type ctxKeyServerDebug bool

func ContextWithServerDebug(ctx context.Context, isDebug bool) context.Context {
	return pkgcontext.With(ctx, ctxKeyServerDebug(isDebug))
}

func ContextServerDebug(ctx context.Context) bool {
	v, ok := pkgcontext.Value[ctxKeyServerDebug](ctx)
	if !ok {
		return false
	}
	return bool(v)
}

func ContextWithRequestID(ctx context.Context, reqID string) context.Context {
	return pkgcontext.With(ctx, pkgcontext.RequestID(reqID))
}

func ContextRequestID(ctx context.Context) string {
	return pkgcontext.RequestIDFrom(ctx)
}
