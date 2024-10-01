package graph

import "kohaku/backend/service"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DiarySvc      service.Diary
	BdiaryUserSvc service.BdiaryUser
}

func NewResolver(
	diaryService service.Diary,
	bdiaryUserService service.BdiaryUser,
) *Resolver {
	return &Resolver{
		DiarySvc:      diaryService,
		BdiaryUserSvc: bdiaryUserService,
	}
}
