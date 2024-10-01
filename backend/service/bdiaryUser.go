package service

import (
	"context"

	"kohaku/backend/db_model"
	"kohaku/backend/graph/model"
	"kohaku/backend/pkg/errors"
	"kohaku/backend/pkg/null"
	"kohaku/backend/pkg/ulid"
	"kohaku/backend/repository"

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
