package service

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/graph/model"
	"lxcard/backend/pkg/errors"
	"lxcard/backend/pkg/ulid"
	"lxcard/backend/repository"

	"gorm.io/gorm"
)

type Diary struct {
	db        *gorm.DB
	diaryRepo repository.Diary
}

func NewDiary(db *gorm.DB, diaryRepo repository.Diary) Diary {
	return Diary{
		db:        db,
		diaryRepo: diaryRepo,
	}
}

func (s *Diary) Create(ctx context.Context, input model.CreateDiaryInput) (*db_model.CreateDiary, error) {
	diary := &db_model.CreateDiary{
		ID:      ulid.Make(),
		Content: input.Content,
		Title:   input.Title,
		UserID:  input.UserID,
	}
	row, err := s.diaryRepo.Create(ctx, s.db, diary)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}
