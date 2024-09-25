package db_model

import (
	"database/sql"
	"time"
)

type Diaries struct {
	ID         string        `json:"id"`
	Title      string        `json:"title"`
	Content    string        `json:"content"`
	CreatedAt  time.Time     `json:"created_at"`
	SaveToBcAt sql.NullTime  `json:"save_to_bc_at"`
	TokenID    sql.NullInt64 `json:"token_id"`
}
