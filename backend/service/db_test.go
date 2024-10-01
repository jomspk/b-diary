package service

import (
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/stretchr/testify/require"

	"kohaku/backend/pkg/test"
)

func TestDB(t *testing.T) {
	db := test.DB(t)
	require.NotNil(t, db)
	_ = cmp.Diff
}
