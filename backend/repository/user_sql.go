package repository

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"
	gormdb "lxcard/backend/pkg/gorm"
	"lxcard/backend/pkg/tenant"

	"gorm.io/gorm"
)

type user struct{}

func NewUser() User { return user{} }

func (r user) Create(ctx context.Context, db *gorm.DB, tenantID tenant.ID, user *db_model.User) (*db_model.User, error) {
	if err := gormdb.New(ctx, db, tenantID).Create(user).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return user, nil
}

func (r user) List(ctx context.Context, db *gorm.DB, tenantID tenant.ID) ([]*db_model.User, error) {
	var users []*db_model.User
	if err := gormdb.New(ctx, db, tenantID).Find(&users).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return users, nil
}

func (r user) BatchGet(ctx context.Context, db *gorm.DB, tenantID tenant.ID, ids []string) ([]*db_model.User, error) {
	var users []*db_model.User
	if err := gormdb.New(ctx, db, tenantID).Where("id IN ?", ids).Find(&users).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return users, nil
}
