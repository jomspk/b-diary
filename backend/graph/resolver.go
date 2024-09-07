package graph

import "lxcard/backend/service"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	CardSvc service.Card
	UserSvc service.User
}

func NewResolver(
	cardService service.Card,
	userService service.User,
) *Resolver {
	return &Resolver{
		CardSvc: cardService,
		UserSvc: userService,
	}
}
