package loader

import (
	"context"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/errors"
	"lxcard/backend/service"
)

func newCardViewersLoader(svc service.Card) func(context.Context, []string) ([][]*db_model.CardViewer, []error) {
	return func(ctx context.Context, cardIDs []string) ([][]*db_model.CardViewer, []error) {
		rowMap, err := svc.GetViewersMapByCardIDs(ctx, defaultTenantID, cardIDs)
		if err != nil {
			return nil, []error{err}
		}
		res := make([][]*db_model.CardViewer, len(cardIDs))
		for i, cardID := range cardIDs {
			if cardViewers, ok := rowMap[cardID]; ok {
				res[i] = cardViewers
			} else {
				res[i] = []*db_model.CardViewer{}
			}
		}

		return res, nil
	}
}

func LoadCardViewers(ctx context.Context, cardID string) ([]*db_model.CardViewer, error) {
	rows, err := getLoaders(ctx).CardViewersLoader.Load(ctx, cardID)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return rows, nil
}
