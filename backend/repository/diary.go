package repository

import (
	"context"
	"time"

	"gorm.io/gorm"

	"kohaku/backend/db_model"
	"kohaku/backend/graph/model"
)

type Diary interface {
	Create(ctx context.Context, db *gorm.DB, diary *db_model.CreateDiary) (*db_model.CreateDiary, error)
	List(ctx context.Context, db *gorm.DB, date time.Time, firebaseUid string) ([]*db_model.CreateDiary, error)
	Update(ctx context.Context, db *gorm.DB, diary model.UpdateDiaryInput) (*db_model.CreateDiary, error)
	Get(ctx context.Context, db *gorm.DB, firebaseUid string) ([]*db_model.CreateDiary, error)
}
