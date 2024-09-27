package repository

import (
	// "context"
	// "time"

	// "lxcard/backend/db_model"
	// "lxcard/backend/graph/model"
	// "lxcard/backend/pkg/errors"

	app "lxcard/backend"

	"gorm.io/gorm"
)

type cronJob struct{}

func NewCronJob() CronJob { return cronJob{} }

func (r cronJob) Test(db *gorm.DB) (bool, error) {
	app.Logger.Info().Msg("CronJob is in repository")
	return true, nil
}


