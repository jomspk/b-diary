package errors

import (
	"net/http"

	"github.com/vikstrous/dataloadgen"

	"github.com/cockroachdb/errors"
	"github.com/cockroachdb/errors/exthttp"
)

func New(msg string) error {
	return errors.New(msg)
}

func Wrap(err error) error {
	return errors.Wrap(err, "")
}

func Wrapf(err error, format string, args ...interface{}) error {
	return errors.Wrapf(err, format, args...)
}

func Is(err error, reference error) bool {
	//fmt.Printf("is check type: %T and %T\n", err, reference)
	// dataloadgen.ErrorSliceにWrap実装がなかったので、再帰的にIsを呼び出す
	var errs dataloadgen.ErrorSlice
	if errors.As(err, &errs) {
		for _, err := range errs {
			if errors.Is(err, reference) {
				return true
			}
		}
	}
	return errors.Is(err, reference)
}

func InvalidArgument(err error, e ErrorDetail) error {
	return errors.Wrap(exthttp.WrapWithHTTPCode(err, http.StatusBadRequest), e.Code)
}

func NotFound(err error, e ErrorDetail) error {
	return errors.Wrap(exthttp.WrapWithHTTPCode(err, http.StatusNotFound), e.Code)
}

func AlreadyExists(err error, e ErrorDetail) error {
	return errors.Wrap(exthttp.WrapWithHTTPCode(err, http.StatusNotFound), e.Code)
}

func Unimplemented(err error, e ErrorDetail) error {
	return errors.Wrap(exthttp.WrapWithHTTPCode(err, http.StatusServiceUnavailable), e.Code)
}

func Internal(err error, e ErrorDetail) error {
	return errors.Wrap(exthttp.WrapWithHTTPCode(err, http.StatusInternalServerError), e.Code)
}

func Unavailable(err error, e ErrorDetail) error {
	return errors.Wrap(exthttp.WrapWithHTTPCode(err, http.StatusServiceUnavailable), e.Code)
}
