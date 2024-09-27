package repository

import (
	// "context"

	"time"

	"lxcard/backend/db_model"
	// "lxcard/backend/graph/model"
	"lxcard/backend/pkg/errors"

	app "lxcard/backend"

	"gorm.io/gorm"
)

type cronJob struct{}

func NewCronJob() CronJob { return cronJob{} }

func (r cronJob) Test(db *gorm.DB) (bool, error) {
	app.Logger.Info().Msg("CronJob is in repository")
	var diaries []*db_model.CreateDiary
	firebaseUid := "google-oauth2|108619946193169468748"

	date := time.Now()
	
	// 年と月に基づいてデータを取得(時間を考慮に入れていない)
	loc, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		return false, errors.Wrap(err)
	}
	firstOfMonth := time.Date(date.Year(), date.Month(), 1, 0, 0, 0, 0, loc)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	if err := db.Table("create_diaries").Select("create_diaries.*").Joins("INNER JOIN bdiary_users ON create_diaries.user_id = bdiary_users.id").Where("diary_date >= ? AND diary_date <= ?", firstOfMonth, lastOfMonth).Where("bdiary_users.firebase_uid = ?", firebaseUid).Find(&diaries).Error; err != nil {
		return false, errors.Wrap(err)
	}
	// app.Logger.Info().Any("diaries", diaries).Msg("Diaries")
	return true, nil
}


