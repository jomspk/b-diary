package service

import (
	"context"
	"time"

	"kohaku/backend/db_model"
	"kohaku/backend/graph/model"
	"kohaku/backend/pkg/errors"
	"kohaku/backend/pkg/ulid"
	"kohaku/backend/repository"

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

func (s *Diary) Create(ctx context.Context, input model.CreateDiaryParams) (*db_model.CreateDiary, error) {
	layout := "2006-01-02"
	formattedDate, err := time.Parse(layout, input.DiaryDate)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	diary := &db_model.CreateDiary{
		ID:        ulid.Make(),
		Content:   input.Content,
		Title:     input.Title,
		UserID:    input.UserID,
		DiaryDate: formattedDate,
	}
	row, err := s.diaryRepo.Create(ctx, s.db, diary)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}

func (s *Diary) List(ctx context.Context, input model.DiariesInput) ([]*db_model.CreateDiary, error) {
	rows, err := s.diaryRepo.List(ctx, s.db, input.Date, input.FirebaseUID)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return rows, nil
}

func (s *Diary) Update(ctx context.Context, input model.UpdateDiaryInput) (*db_model.CreateDiary, error) {
	row, err := s.diaryRepo.Update(ctx, s.db, input)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}

func (s *Diary) Get(ctx context.Context, firebaseUid string) ([]*db_model.CreateDiary, error) {
	row, err := s.diaryRepo.Get(ctx, s.db, firebaseUid)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}
