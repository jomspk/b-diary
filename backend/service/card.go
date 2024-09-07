package service

import (
	"context"
	"database/sql"
	"fmt"
	"math/rand/v2"
	"time"

	"lxcard/backend/db_model"
	"lxcard/backend/graph/model"
	"lxcard/backend/pkg/errors"
	"lxcard/backend/pkg/null"
	"lxcard/backend/pkg/slices"
	"lxcard/backend/pkg/tenant"
	"lxcard/backend/pkg/ulid"
	"lxcard/backend/repository"

	"gorm.io/gorm"
)

type Card struct {
	db       *gorm.DB
	cardRepo repository.Card
}

func NewCard(db *gorm.DB, cardRepo repository.Card) Card {
	return Card{
		db:       db,
		cardRepo: cardRepo,
	}
}

func (s *Card) Get(ctx context.Context, tenantID tenant.ID, id string) (*db_model.Card, error) {
	row, err := s.cardRepo.Get(ctx, s.db, tenantID, id)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}

func (s *Card) List(ctx context.Context, tenantID tenant.ID) ([]*db_model.Card, error) {
	rows, err := s.cardRepo.List(ctx, s.db, tenantID)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return rows, nil
}

func (s *Card) Create(ctx context.Context, tenantID tenant.ID, input model.CreateCardInput) (*db_model.Card, error) {
	// NOTE: 本来はカードの下4桁を保存するが、今回は擬似的に生成する
	lastFour := fmt.Sprintf("%04d", rand.N(9999))
	startDate, err := null.ToSQLNullTimeFromDateString(input.StartDate)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	endDate, err := null.ToSQLNullTimeFromDateString(input.EndDate)
	if err != nil {
		return nil, errors.Wrap(err)
	}

	var res *db_model.Card
	err = s.db.Transaction(func(tx *gorm.DB) error {
		res, err = s.cardRepo.Create(ctx, tx, tenantID, &db_model.Card{
			ID:               ulid.Make(),
			TenantID:         tenantID,
			Name:             input.Name,
			OwnerID:          input.OwnerID,
			State:            db_model.StateActive,
			LastFour:         sql.NullString{String: lastFour, Valid: true},
			ExpirationMonth:  null.ToSQLNullInt64FromNonPtrInt(10),
			ExpirationYear:   null.ToSQLNullInt64FromNonPtrInt(30),
			Description:      input.Description,
			OnceMaxAmount:    null.ToSQLNullInt64FromUint32(input.OnceMaxAmount),
			MonthlyMaxAmount: null.ToSQLNullInt64FromUint32(input.MonthlyMaxAmount),
			TotalMaxAmount:   null.ToSQLNullInt64FromUint(input.TotalMaxAmount),
			StartDate:        startDate,
			EndDate:          endDate,
			ModifiedAt:       time.Now(),
		})
		if err != nil {
			return errors.Wrap(err)
		}
		viewers := slices.Map(input.ViewerIds, func(viewerID string) *db_model.CardViewer {
			return &db_model.CardViewer{
				ID:       ulid.Make(),
				TenantID: tenantID,
				CardID:   res.ID,
				UserID:   viewerID,
			}
		})
		if err := s.cardRepo.UpsertCardViewers(ctx, tx, tenantID, res.ID, viewers); err != nil {
			return errors.Wrap(err)
		}
		return nil
	})
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return res, nil
}

func (s *Card) Update(ctx context.Context, tenantID tenant.ID, id string, input model.UpdateCardInput) (*db_model.Card, error) {
	var (
		res *db_model.Card
		err error
	)
	err = s.db.Transaction(func(tx *gorm.DB) error {
		res, err = s.cardRepo.Update(ctx, tx, tenantID, id, repository.UpdateCardInput{
			Name:             input.Name,
			TenantID:         tenantID,
			Description:      input.Description,
			OwnerID:          input.OwnerID,
			OnceMaxAmount:    input.OnceMaxAmount,
			MonthlyMaxAmount: input.MonthlyMaxAmount,
			TotalMaxAmount:   input.TotalMaxAmount,
			StartDate:        input.StartDate,
			EndDate:          input.EndDate,
		})
		if err != nil {
			return errors.Wrap(err)
		}
		viewers := slices.Map(input.ViewerIds, func(viewerID string) *db_model.CardViewer {
			return &db_model.CardViewer{
				ID:       ulid.Make(),
				TenantID: tenantID,
				CardID:   id,
				UserID:   viewerID,
			}
		})
		if err := s.cardRepo.UpsertCardViewers(ctx, tx, tenantID, id, viewers); err != nil {
			return errors.Wrap(err)
		}
		return nil
	})
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return res, nil
}

func (s *Card) GetViewersMapByCardIDs(ctx context.Context, tenantID tenant.ID, cardIDs []string) (map[string][]*db_model.CardViewer, error) {
	viewers, err := s.cardRepo.BatchGetCardViewersByCardIDs(ctx, s.db, tenantID, cardIDs)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return slices.ToMapOfSlice(viewers, func(viewer *db_model.CardViewer) (string, *db_model.CardViewer) {
		return viewer.CardID, viewer
	}), nil
}

func (s *Card) LockCard(ctx context.Context, tenantID tenant.ID, id string) error {
	if err := s.cardRepo.UpdateCardState(ctx, s.db, tenantID, id, db_model.StateLocked); err != nil {
		return errors.Wrap(err)
	}
	return nil
}

func (s *Card) UnlockCard(ctx context.Context, tenantID tenant.ID, id string) error {
	if err := s.cardRepo.UpdateCardState(ctx, s.db, tenantID, id, db_model.StateActive); err != nil {
		return errors.Wrap(err)
	}
	return nil
}
