package repository

import (
	// "context"
	// "time"

	"gorm.io/gorm"
	// "lxcard/backend/db_model"
	// "lxcard/backend/graph/model"
)

type CronJob interface {
	Test(db *gorm.DB) (bool, error)
}
