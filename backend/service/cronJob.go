package service

import (
	// "context"
	// "time"

	// "lxcard/backend/db_model"
	// "lxcard/backend/graph/model"
	app "lxcard/backend"
	"lxcard/backend/pkg/errors"

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

func (s *CronJob) Test() (bool, error) {
	app.Logger.Info().Msg("CronJob is in service")
	row, err := s.cronJobRepo.Test(s.db)
	if err != nil {
		return false, errors.Wrap(err)
	}
	return row, nil
}
