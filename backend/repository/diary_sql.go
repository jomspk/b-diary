package repository

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"

	// gormdb "lxcard/backend/pkg/gorm"

	"gorm.io/gorm"
)

type diary struct{}

func NewDiary() Diary { return diary{} }

func (r diary) Create(ctx context.Context, db *gorm.DB, diary *db_model.CreateDiary) (*db_model.CreateDiary, error) {
	if err := db.Create(diary).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return diary, nil
}
