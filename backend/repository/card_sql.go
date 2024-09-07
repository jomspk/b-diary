package repository

import (
	"context"
	pkgerrors "errors"
	"time"

	app "lxcard/backend"
	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"
	gormdb "lxcard/backend/pkg/gorm"
	"lxcard/backend/pkg/null"
	"lxcard/backend/pkg/slices"
	"lxcard/backend/pkg/tenant"

	"gorm.io/gorm"
)

type card struct{}

func NewCard() Card { return card{} }

func (r card) Get(ctx context.Context, db *gorm.DB, tenantID tenant.ID, id string) (*db_model.Card, error) {
	var card db_model.Card
	if err := gormdb.New(ctx, db, tenantID).Where("id = ?", id).First(&card).Error; err != nil {
		if pkgerrors.Is(err, gorm.ErrRecordNotFound) {
			return nil, app.ErrCardNotFound
		}
		return nil, errors.Wrap(err)
	}
	return &card, nil
}

func (r card) List(ctx context.Context, db *gorm.DB, tenantID tenant.ID) ([]*db_model.Card, error) {
	var cards []*db_model.Card
	if err := gormdb.New(ctx, db, tenantID).Find(&cards).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return cards, nil
}

func (r card) Create(ctx context.Context, db *gorm.DB, tenantID tenant.ID, card *db_model.Card) (*db_model.Card, error) {
	if err := gormdb.New(ctx, db, tenantID).Create(card).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return card, nil
}

func (r card) UpsertCardViewers(ctx context.Context, db *gorm.DB, tenantID tenant.ID, cardID string, viewers []*db_model.CardViewer) error {
	existViewers, err := r.BatchGetCardViewersByCardIDs(ctx, db, tenantID, []string{cardID})
	if err != nil {
		return errors.Wrap(err)
	}
	existViewersMap := slices.ToMap(existViewers, func(v *db_model.CardViewer) (string, *db_model.CardViewer) {
		return v.UserID, v
	})
	viewersMap := slices.ToMap(viewers, func(v *db_model.CardViewer) (string, *db_model.CardViewer) {
		return v.UserID, v
	})
	viewersForCreate := slices.Filter(viewers, func(v *db_model.CardViewer) bool {
		_, ok := existViewersMap[v.UserID]
		return !ok
	})
	viewersForDelete := slices.Filter(existViewers, func(v *db_model.CardViewer) bool {
		_, ok := viewersMap[v.UserID]
		return !ok
	})
	if len(viewersForCreate) > 0 {
		if err := gormdb.New(ctx, db, tenantID).Create(&viewersForCreate).Error; err != nil {
			return errors.Wrap(err)
		}
	}
	if len(viewersForDelete) > 0 {
		viewerIDs := slices.Map(viewersForDelete, func(v *db_model.CardViewer) string {
			return v.ID
		})
		if err := gormdb.New(ctx, db, tenantID).Where("id IN ?", viewerIDs).Delete(&db_model.CardViewer{}).Error; err != nil {
			return errors.Wrap(err)
		}
	}
	return nil
}

func (r card) BatchCreateCardViewers(ctx context.Context, db *gorm.DB, tenantID tenant.ID, viewers []*db_model.CardViewer) ([]*db_model.CardViewer, error) {
	if len(viewers) == 0 {
		return nil, nil
	}
	if err := gormdb.New(ctx, db, tenantID).Create(&viewers).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return viewers, nil
}

func (r card) BatchGetCardViewersByCardIDs(ctx context.Context, db *gorm.DB, tenantID tenant.ID, cardIDs []string) ([]*db_model.CardViewer, error) {
	if len(cardIDs) == 0 {
		return nil, nil
	}
	var cardViewers []*db_model.CardViewer
	if err := gormdb.New(ctx, db, tenantID).Where("card_id IN ?", cardIDs).Find(&cardViewers).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return cardViewers, nil
}

func (r card) Update(ctx context.Context, db *gorm.DB, tenantID tenant.ID, id string, input UpdateCardInput) (*db_model.Card, error) {
	startDate, err := null.ToSQLNullTimeFromDateString(input.StartDate)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	endDate, err := null.ToSQLNullTimeFromDateString(input.EndDate)
	if err != nil {
		return nil, errors.Wrap(err)
	}

	var row db_model.Card
	if err := gormdb.New(ctx, db, tenantID).
		Where(&db_model.Card{
			ID: id,
		}).
		First(&row).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	row.TenantID = tenantID
	row.Name = input.Name
	row.Description = input.Description
	row.OwnerID = input.OwnerID
	row.OnceMaxAmount = null.ToSQLNullInt64FromUint32(input.OnceMaxAmount)
	row.MonthlyMaxAmount = null.ToSQLNullInt64FromUint32(input.MonthlyMaxAmount)
	row.TotalMaxAmount = null.ToSQLNullInt64FromUint(input.TotalMaxAmount)
	row.StartDate = startDate
	row.EndDate = endDate
	row.ModifiedAt = time.Now()

	if err := gormdb.New(ctx, db, tenantID).Save(&row).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return &row, nil
}

func (r card) UpdateCardState(ctx context.Context, db *gorm.DB, tenantID tenant.ID, id string, state db_model.State) error {
	if err := gormdb.New(ctx, db, tenantID).
		Model(&db_model.Card{}).
		Where(&db_model.Card{ID: id}).
		Updates(&db_model.Card{
			State:      state,
			ModifiedAt: time.Now(),
		}).Error; err != nil {
		return errors.Wrap(err)
	}
	return nil
}
