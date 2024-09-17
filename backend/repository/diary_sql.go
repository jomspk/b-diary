package repository

import (
	"context"
	"time"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"

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

func (r diary) List(ctx context.Context, db *gorm.DB, date time.Time, firebaseUid string) ([]*db_model.Diaries, error) {
	var diaries []*db_model.Diaries

	// 年と月に基づいてデータを取得(時間を考慮に入れていない)
	loc, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		return nil, errors.Wrap(err)
	}
	firstOfMonth := time.Date(date.Year(), date.Month(), 1, 0, 0, 0, 0, loc)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	if err := db.Table("create_diaries").Select("create_diaries.id as diary_id, create_diaries.title, create_diaries.content, create_diaries.created_at").Joins("INNER JOIN bdiary_users ON create_diaries.user_id = bdiary_users.id").Where("created_at >= ? AND created_at <= ?", firstOfMonth, lastOfMonth).Where("bdiary_users.firebase_uid = ?", firebaseUid).Scan(&diaries).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return diaries, nil
}
