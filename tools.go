//go:build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/amacneil/dbmate/v2"
	_ "github.com/golangci/golangci-lint/cmd/golangci-lint"
	_ "github.com/uber-go/gopatch"
	_ "github.com/xo/xo"
	_ "golang.org/x/tools/cmd/goimports"
)
