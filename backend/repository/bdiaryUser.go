package repository

import (
	"context"

	"gorm.io/gorm"

	"lxcard/backend/db_model"
)

type BdiaryUser interface {
	Create(ctx context.Context, db *gorm.DB, diary *db_model.BdiaryUser) (*db_model.BdiaryUser, error)
}
