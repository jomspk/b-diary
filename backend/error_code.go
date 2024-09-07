package app

import (
	"fmt"
	"net/http"

	"github.com/cockroachdb/errors"
)

type Error interface {
	Code() int
	Message() string
	HttpCode() int
	Error() string
	WithError(e error) Error
	WithMessage(message string) Error
}

type err struct {
	code     int
	httpCode int
	message  string
	e        error
}

type ErrorOption func(*err)

func NewError(code int, httpCode int, message string, options ...ErrorOption) Error {
	e := err{code: code, httpCode: httpCode, message: message, e: fmt.Errorf("")}
	for _, o := range options {
		o(&e)
	}
	return e
}

func (s err) Code() int {
	return s.code
}

func (s err) HttpCode() int {
	return s.httpCode
}

func (s err) Error() string {
	return fmt.Errorf("%d: %s %w", s.code, s.message, s.e).Error()
}

func (s err) Message() string {
	return s.message
}

func (s err) WithError(e error) Error {
	s.e = e
	return s
}

func (s err) WithMessage(message string) Error {
	s.message = message
	return s
}
func (s err) Is(e error) bool {
	var err Error
	if errors.As(e, &err) {
		return s.Code() == err.Code()
	}
	return false
}

var (
	ErrorServerPanic = NewError(0, http.StatusInternalServerError, "")

	/*
		NotFound
	*/
	ErrUserNotFound = NewError(1001, http.StatusNotFound, "ユーザーが見つかりません")
	ErrCardNotFound = NewError(1002, http.StatusNotFound, "カードが見つかりません")
)
