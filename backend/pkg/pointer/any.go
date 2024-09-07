package pointer

func Any[T any](v T) *T {
	return &v
}

// AnyDeref dereferences the any ptr and returns it if not nil, or else
// returns def.
func AnyDeref[T any](ptr *T, def T) T {
	if ptr != nil {
		return *ptr
	}
	return def
}
