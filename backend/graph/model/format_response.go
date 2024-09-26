package model

import (
	"database/sql"
	"time"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/null"
)

func FormatUserResponse(row *db_model.User) *User {
	return &User{
		ID:   row.ID,
		Name: row.Name,
	}
}

func FormatDiaryResponse(row *db_model.CreateDiary) *Diary {

	return &Diary{
		ID:         row.ID,
		Title:      row.Title,
		Content:    row.Content,
		DiaryDate:  row.DiaryDate.Format(time.RFC3339),
		SaveToBcAt: convertNullTimeToTimePtr(row.SaveToBcAt),
		TokenID:    null.FromSQLNullInt64ToUint(row.TokenID),
	}
}
func convertNullTimeToTimePtr(nullTime sql.NullTime) *time.Time {
	if nullTime.Valid {
		return &nullTime.Time
	}
	return nil
}
