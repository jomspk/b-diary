package service

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/graph/model"
	"lxcard/backend/pkg/errors"
	"lxcard/backend/pkg/null"
	"lxcard/backend/pkg/ulid"
	"lxcard/backend/repository"

	"gorm.io/gorm"
)

type BdiaryUser struct {
	db             *gorm.DB
	bdiaryUserRepo repository.BdiaryUser
}

func NewBDiaryUser(db *gorm.DB, bdiaryUserRepo repository.BdiaryUser) BdiaryUser {
	return BdiaryUser{
		db:             db,
		bdiaryUserRepo: bdiaryUserRepo,
	}
}

func (s *BdiaryUser) Create(ctx context.Context, input model.CreateBdiaryUserParams) (*db_model.BdiaryUser, error) {
	bdiaryUser := &db_model.BdiaryUser{
		ID:            ulid.Make(),
		FirebaseUID:   input.FirebaseUID,
		WalletAddress: null.ToSQLNullString(input.WalletAddress),
	}

	row, err := s.bdiaryUserRepo.Create(ctx, s.db, bdiaryUser)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}

func (s *BdiaryUser) Get(ctx context.Context, FirebaseUID string) (*db_model.BdiaryUser, error) {
	row, err := s.bdiaryUserRepo.Get(ctx, s.db, FirebaseUID)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}
