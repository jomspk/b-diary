package service

import (
	// "context"
	// "time"

	// "lxcard/backend/db_model"
	// "lxcard/backend/graph/model"
	app "lxcard/backend"
	"lxcard/backend/pkg/errors"
	"lxcard/backend/vwbl/api"

	// "lxcard/backend/pkg/ulid"
	"lxcard/backend/repository"

	"gorm.io/gorm"
)

type CronJob struct {
	db        *gorm.DB
	cronJobRepo repository.CronJob
}

func NewCronJob(db *gorm.DB, cronJobRepo repository.CronJob) CronJob {
	return CronJob{
		db:        db,
		cronJobRepo: cronJobRepo,
	}
}

func (s *CronJob) Test(vwblAPI *api.VWBLApi) (bool, error) {
	app.Logger.Info().Msg("CronJob is in service")
	signMessage, err := vwblAPI.GetSignMessage("0x7996fb726E3BAA4823B7508b6C93F73B7Bc051cf","80002", "0x113c4064Fdf3710Ec38CC9B709852c56be1d1803")
	if err != nil {
		return false, errors.Wrap(err)
	}
	app.Logger.Info().Str("signMessage", signMessage).Msg("SignMessage")
	row, err := s.cronJobRepo.Test(s.db)
	if err != nil {
		return false, errors.Wrap(err)
	}
	return row, nil
}
