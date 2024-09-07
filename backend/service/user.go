package service

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"
	"lxcard/backend/pkg/slices"
	"lxcard/backend/pkg/tenant"
	"lxcard/backend/pkg/ulid"
	"lxcard/backend/repository"

	"gorm.io/gorm"
)

type User struct {
	db       *gorm.DB
	userRepo repository.User
}

func NewUser(db *gorm.DB, userRepo repository.User) User {
	return User{
		db:       db,
		userRepo: userRepo,
	}
}

func (s *User) Create(ctx context.Context, tenantID tenant.ID, name string) (*db_model.User, error) {
	user := &db_model.User{
		ID:       ulid.Make(),
		TenantID: tenantID,
		Name:     name,
	}
	row, err := s.userRepo.Create(ctx, s.db, tenantID, user)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return row, nil
}

func (s *User) List(ctx context.Context, tenantID tenant.ID) ([]*db_model.User, error) {
	rows, err := s.userRepo.List(ctx, s.db, tenantID)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return rows, nil
}

func (s *User) GetMapByIDs(ctx context.Context, tenantID tenant.ID, ids []string) (map[string]*db_model.User, error) {
	users, err := s.userRepo.BatchGet(ctx, s.db, tenantID, ids)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return slices.ToMap(users, func(user *db_model.User) (string, *db_model.User) {
		return user.ID, user
	}), nil
}
