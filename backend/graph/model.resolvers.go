package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.49

import (
	"context"
	app "lxcard/backend"
	"lxcard/backend/db_model"
	"lxcard/backend/graph/model"
	"lxcard/backend/loader"
	"lxcard/backend/pkg/slices"
)

// Owner is the resolver for the owner field.
func (r *cardResolver) Owner(ctx context.Context, obj *model.Card) (*model.User, error) {
	users, err := loader.LoadUsers(ctx, []string{obj.OwnerID})
	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, app.ErrUserNotFound
	}
	return model.FormatUserResponse(users[0]), nil
}

// Viewers is the resolver for the viewers field.
func (r *cardResolver) Viewers(ctx context.Context, obj *model.Card) ([]*model.User, error) {
	rows, err := loader.LoadCardViewers(ctx, obj.ID)
	if err != nil {
		return nil, err
	}
	userIDs := slices.Map(rows, func(row *db_model.CardViewer) string {
		return row.UserID
	})
	users, err := loader.LoadUsers(ctx, userIDs)
	if err != nil {
		return nil, err
	}
	return slices.Map(users, func(user *db_model.User) *model.User {
		return model.FormatUserResponse(user)
	}), nil
}

// Card returns CardResolver implementation.
func (r *Resolver) Card() CardResolver { return &cardResolver{r} }

type cardResolver struct{ *Resolver }
