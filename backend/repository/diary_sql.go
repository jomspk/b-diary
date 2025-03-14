package repository

import (
	"context"
	"time"

	"kohaku/backend/db_model"
	"kohaku/backend/graph/model"
	"kohaku/backend/pkg/errors"

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

func (r diary) List(ctx context.Context, db *gorm.DB, date time.Time, firebaseUid string) ([]*db_model.CreateDiary, error) {
	var diaries []*db_model.CreateDiary

	firstOfMonth := time.Date(date.Year(), date.Month(), 1, 0, 0, 0, 0, time.Local)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	if err := db.Table("create_diaries").Select("create_diaries.*").Joins("INNER JOIN bdiary_users ON create_diaries.user_id = bdiary_users.id").Where("diary_date >= ? AND diary_date <= ?", firstOfMonth, lastOfMonth).Where("bdiary_users.firebase_uid = ?", firebaseUid).Find(&diaries).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return diaries, nil
}

func (r diary) Update(ctx context.Context, db *gorm.DB, diary model.UpdateDiaryInput) (*db_model.CreateDiary, error) {
	var row db_model.CreateDiary
	if err := db.Where("id = ?", diary.ID).First(&row).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	row.Content = diary.Content
	row.Title = diary.Title
	if err := db.Save(&row).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return &row, nil
}

func (r diary) Get(ctx context.Context, db *gorm.DB, firebaseUid string) ([]*db_model.CreateDiary, error) {
	var diaries []*db_model.CreateDiary
	if err := db.Table("create_diaries").Select("create_diaries.*").Joins("INNER JOIN bdiary_users ON create_diaries.user_id = bdiary_users.id").Where("bdiary_users.firebase_uid = ?", firebaseUid).Order("create_diaries.diary_date DESC").Limit(3).Find(&diaries).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return diaries, nil
}
