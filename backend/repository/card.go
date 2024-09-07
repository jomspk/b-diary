package repository

import (
	"context"

	"gorm.io/gorm"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/tenant"
)

type Card interface {
	Get(ctx context.Context, db *gorm.DB, tenantID tenant.ID, id string) (*db_model.Card, error)
	List(ctx context.Context, db *gorm.DB, tenantID tenant.ID) ([]*db_model.Card, error)
	Create(ctx context.Context, db *gorm.DB, tenantID tenant.ID, card *db_model.Card) (*db_model.Card, error)
	Update(ctx context.Context, db *gorm.DB, tenantID tenant.ID, id string, input UpdateCardInput) (*db_model.Card, error)
	UpsertCardViewers(ctx context.Context, db *gorm.DB, tenantID tenant.ID, cardID string, viewers []*db_model.CardViewer) error
	BatchGetCardViewersByCardIDs(ctx context.Context, db *gorm.DB, tenantID tenant.ID, cardIDs []string) ([]*db_model.CardViewer, error)
	UpdateCardState(ctx context.Context, db *gorm.DB, tenantID tenant.ID, id string, state db_model.State) error
}

type UpdateCardInput struct {
	Name             string
	TenantID         tenant.ID
	Description      string
	OwnerID          string
	OnceMaxAmount    *uint32
	MonthlyMaxAmount *uint32
	TotalMaxAmount   *uint
	StartDate        *string
	EndDate          *string
}
