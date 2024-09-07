package loader

import (
	"context"

	"github.com/vikstrous/dataloadgen"

	"lxcard/backend/db_model"
	"lxcard/backend/service"
)

// NOTE: 本来ならマルチテナントにおいては、認証してユーザーが所属しているテナントIDを取得する
const defaultTenantID = "00000000-0000-0000-0000-000000000000"

type Loaders struct {
	UserLoader        *dataloadgen.Loader[string, *db_model.User]
	CardViewersLoader *dataloadgen.Loader[string, []*db_model.CardViewer]
}

func New(userSvc service.User, cardSvc service.Card) *Loaders {
	return &Loaders{
		UserLoader:        dataloadgen.NewLoader(newUserLoader(userSvc)),
		CardViewersLoader: dataloadgen.NewLoader(newCardViewersLoader(cardSvc)),
	}
}

type loadersKey struct{}

func (l *Loaders) Attach(ctx context.Context) context.Context {
	ctx = context.WithValue(ctx, loadersKey{}, l)
	return ctx
}

func getLoaders(ctx context.Context) *Loaders {
	return ctx.Value(loadersKey{}).(*Loaders)
}
