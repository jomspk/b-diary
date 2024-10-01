package types

import (
	"encoding/json"
	"fmt"
	"io"
	"strconv"

	"github.com/99designs/gqlgen/graphql"

	"kohaku/backend/pkg/errors"
)

// MarshalUint implements a Uint value
func MarshalUint(t uint) graphql.Marshaler {
	return MarshalUint64(uint64(t))
}

// UnmarshalUint implements a Uint value
func UnmarshalUint(v interface{}) (uint, error) {
	i, err := UnmarshalUint64(v)
	if err != nil {
		return 0, errors.Wrap(err)
	}
	return uint(i), nil
}

// MarshalUint64 implements a Uint64 value
func MarshalUint64(t uint64) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		_, err := io.WriteString(w, strconv.FormatUint(t, 10))
		if err != nil {
			return
		}
	})
}

// UnmarshalUint64 implements a Uint64 value
func UnmarshalUint64(v interface{}) (uint64, error) {
	switch t := v.(type) {
	case string:
		i, err := strconv.ParseUint(t, 10, 64)
		if err != nil {
			return 0, errors.Wrap(err)
		}
		return i, nil
	case int:
		return uint64(t), nil
	case int64:
		return uint64(t), nil
	case json.Number:
		i, err := t.Int64()
		if err != nil {
			return 0, errors.Wrap(err)
		}
		return uint64(i), nil
	case float64:
		return uint64(t), nil
	}

	return 0, fmt.Errorf("unable to unmarshal uint64: %#v %T", v, v)
}

// MarshalUint32 implements a Uint32 value
func MarshalUint32(t uint32) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		_, err := io.WriteString(w, strconv.FormatUint(uint64(t), 10))
		if err != nil {
			return
		}
	})
}

// UnmarshalUint32 implements a Uint32 value
func UnmarshalUint32(v interface{}) (uint32, error) {
	switch t := v.(type) {
	case string:
		u, err := strconv.ParseUint(t, 10, 32)
		if err != nil {
			return 0, errors.Wrap(err)
		}
		return uint32(u), nil
	case int:
		return uint32(t), nil
	case int64:
		return uint32(t), nil
	case json.Number:
		i, err := t.Int64()
		if err != nil {
			return 0, errors.Wrap(err)
		}
		return uint32(i), nil
	case float64:
		return uint32(t), nil
	}

	return 0, fmt.Errorf("unable to unmarshal uint32: %#v %T", v, v)
}
