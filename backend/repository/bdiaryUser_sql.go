package repository

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"

	"gorm.io/gorm"
)

type bdiaryUser struct{}

func NewBDiaryUser() BdiaryUser { return bdiaryUser{} }

func (r bdiaryUser) Create(ctx context.Context, db *gorm.DB, bdiaryUser *db_model.BdiaryUser) (*db_model.BdiaryUser, error) {
	if err := db.Create(bdiaryUser).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return bdiaryUser, nil
}

func (r bdiaryUser) Get(ctx context.Context, db *gorm.DB, FirebaseUID string) (*db_model.BdiaryUser, error) {
	var bdiaryUser db_model.BdiaryUser
	if err := db.Where("firebase_uid = ?", FirebaseUID).First(&bdiaryUser).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, errors.Wrap(err)
	}
	return &bdiaryUser, nil
}
