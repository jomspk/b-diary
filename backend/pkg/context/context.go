package context

import "context"

type key[T any] struct{}

// With returns a new context with the given value associated with the given type.
func With[T any](ctx context.Context, val T) context.Context {
	return context.WithValue(ctx, key[T]{}, val)
}

// Value returns the value associated with the given type in the given context.
func Value[T any](ctx context.Context) (T, bool) {
	val, ok := ctx.Value(key[T]{}).(T)
	return val, ok
}

type (
	RequestID string
)

func (s RequestID) String() string { return string(s) }

func RequestIDFrom(ctx context.Context) string {
	reqID, _ := Value[RequestID](ctx)
	return reqID.String()
}
