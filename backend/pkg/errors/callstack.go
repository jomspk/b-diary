package errors

import (
	stderrors "errors"
	"fmt"
	"os"

	"github.com/rs/zerolog"
	"github.com/vektah/gqlparser/v2/gqlerror"

	"kohaku/backend/env"
)

func init() {
	zerolog.ErrorStackMarshaler = ZerologErrorMarshalStack
}

func ZerologErrorMarshalStack(err error) interface{} {
	// NOTE: gqlerror.List は `Unwrap() error` を実装していなくてうまくstacktraceがでないので、ここで無理やりunwrapしてあげる
	var list gqlerror.List
	if stderrors.As(err, &list) {
		if len(list) != 0 {
			// NOTE: 最初のエラーを採用
			err = list[0]
		}
	}

	out := fmt.Sprintf("%+v", err)
	if env.IsLocal() {
		fmt.Fprintln(os.Stderr, "Error:", err)
		fmt.Fprintln(os.Stderr, out)
	}
	return out
}
