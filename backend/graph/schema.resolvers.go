package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.49

import (
	"context"

	"kohaku/backend/graph/model"
)

// CreateDiary is the resolver for the createDiary field.
func (r *mutationResolver) CreateDiary(ctx context.Context, input model.CreateUserDiaryInput) (string, error) {
	/*
		1. Find User
		2. Create Non-exist user
		3. Create Diary
	*/
	userId := ""
	existUser, err := r.BdiaryUserSvc.Get(ctx, input.FirebaseUID)
	if err != nil {
		return "", err
	}
	if existUser == nil {
		newUser, err := r.BdiaryUserSvc.Create(ctx, model.CreateBdiaryUserParams{
			FirebaseUID:   input.FirebaseUID,
			WalletAddress: input.WalletAddress,
		})
		if err != nil {
			return "", err
		}
		userId = newUser.ID
	} else {
		userId = existUser.ID
	}
	diary, err := r.DiarySvc.Create(ctx, model.CreateDiaryParams{
		Title:     input.Title,
		Content:   input.Content,
		UserID:    userId,
		DiaryDate: input.DiaryDate,
	})
	if err != nil {
		return "", err
	}
	return diary.ID, nil
}

// UpdateDiary is the resolver for the updateDiary field.
func (r *mutationResolver) UpdateDiary(ctx context.Context, input model.UpdateDiaryInput) (string, error) {
	diary, err := r.DiarySvc.Update(ctx, input)
	if err != nil {
		return "", err
	}
	return diary.ID, nil
}

// Diaries is the resolver for the diaries field.
func (r *queryResolver) Diaries(ctx context.Context, input model.DiariesInput) ([]*model.Diary, error) {
	diaries, err := r.DiarySvc.List(ctx, input)
	if err != nil {
		return nil, err
	}
	res := make([]*model.Diary, 0, len(diaries))
	for _, diary := range diaries {
		res = append(res, model.FormatDiaryResponse(diary))
	}
	return res, nil
}

// DiaryHistory is the resolver for the diaryHistory field.
func (r *queryResolver) DiaryHistory(ctx context.Context, firebaseUID string) ([]*model.Diary, error) {
	diaries, err := r.DiarySvc.Get(ctx, firebaseUID)
	if err != nil {
		return nil, err
	}
	res := make([]*model.Diary, 0, len(diaries))
	for _, diary := range diaries {
		res = append(res, model.FormatDiaryResponse(diary))
	}
	return res, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
