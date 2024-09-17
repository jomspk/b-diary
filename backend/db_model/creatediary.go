package db_model

import "time"

type Diaries struct {
	DiaryId   string    `json:"diary_id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
