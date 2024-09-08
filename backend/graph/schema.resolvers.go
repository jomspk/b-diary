package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.49

import (
	"context"
	"fmt"
	"lxcard/backend/db_model"
	"lxcard/backend/graph/model"
	"lxcard/backend/pkg/slices"
	"time"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.CreateUserInput) (*model.User, error) {
	user, err := r.UserSvc.Create(ctx, defaultTenantID, input.Name)
	if err != nil {
		return nil, err
	}
	return model.FormatUserResponse(user), nil
}

// CreateCard is the resolver for the createCard field.
func (r *mutationResolver) CreateCard(ctx context.Context, input model.CreateCardInput) (*model.Card, error) {
	card, err := r.CardSvc.Create(ctx, defaultTenantID, input)
	if err != nil {
		return nil, err
	}
	return model.FormatCardResponse(card)
}

// UpdateCard is the resolver for the updateCard field.
func (r *mutationResolver) UpdateCard(ctx context.Context, id string, input model.UpdateCardInput) (*model.Card, error) {
	card, err := r.CardSvc.Update(ctx, defaultTenantID, id, input)
	if err != nil {
		return nil, err
	}
	return model.FormatCardResponse(card)
}

// LockCard is the resolver for the lockCard field.
func (r *mutationResolver) LockCard(ctx context.Context, id string) (bool, error) {
	if err := r.CardSvc.LockCard(ctx, defaultTenantID, id); err != nil {
		return false, err
	}
	return true, nil
}

// UnlockCard is the resolver for the unlockCard field.
func (r *mutationResolver) UnlockCard(ctx context.Context, id string) (bool, error) {
	if err := r.CardSvc.UnlockCard(ctx, defaultTenantID, id); err != nil {
		return false, err
	}
	return true, nil
}

// CreateDiary is the resolver for the createDiary field.
func (r *mutationResolver) CreateDiary(ctx context.Context, input model.CreateDiaryInput) (*model.Diary, error) {
	panic(fmt.Errorf("not implemented: CreateDiary - createDiary"))
}

// Card is the resolver for the card field.
func (r *queryResolver) Card(ctx context.Context, id string) (*model.Card, error) {
	card, err := r.CardSvc.Get(ctx, defaultTenantID, id)
	if err != nil {
		return nil, err
	}
	return model.FormatCardResponse(card)
}

// Cards is the resolver for the cards field.
func (r *queryResolver) Cards(ctx context.Context) ([]*model.Card, error) {
	cards, err := r.CardSvc.List(ctx, defaultTenantID)
	if err != nil {
		return nil, err
	}
	res := make([]*model.Card, 0, len(cards))
	for _, card := range cards {
		formatted, err := model.FormatCardResponse(card)
		if err != nil {
			return nil, err
		}
		res = append(res, formatted)
	}
	return res, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	users, err := r.UserSvc.List(ctx, defaultTenantID)
	if err != nil {
		return nil, err
	}
	return slices.Map(users, func(user *db_model.User) *model.User {
		return model.FormatUserResponse(user)
	}), nil
}

// Diaries is the resolver for the diaries field.
func (r *queryResolver) Diaries(ctx context.Context, month time.Time) ([]*model.Diary, error) {
	panic(fmt.Errorf("not implemented: Diaries - diaries"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
