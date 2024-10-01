package repository

import (
	"context"

	"gorm.io/gorm"

	"kohaku/backend/db_model"
)

type BdiaryUser interface {
	Create(ctx context.Context, db *gorm.DB, diary *db_model.BdiaryUser) (*db_model.BdiaryUser, error)
	Get(ctx context.Context, db *gorm.DB, FirebaseUid string) (*db_model.BdiaryUser, error)
}
