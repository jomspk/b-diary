package repository

import (
	"context"

	"gorm.io/gorm"

	"lxcard/backend/db_model"
)

type Diary interface {
	Create(ctx context.Context, db *gorm.DB, diary *db_model.CreateDiary) (*db_model.CreateDiary, error)
}
