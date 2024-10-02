package model

import (
	"database/sql"
	"time"

	"lxcard/backend/db_model"
	"lxcard/backend/pkg/null"
)

func FormatDiaryResponse(row *db_model.CreateDiary) *Diary {

	return &Diary{
		ID:            row.ID,
		Title:         row.Title,
		Content:       row.Content,
		DiaryDate:     row.DiaryDate.Format(time.RFC3339),
		TokenID:       null.FromSQLNullInt64ToUint(row.TokenID),
		EncryptionKey: null.FromSQLNullString(row.EncryptionKey),
		SaveToBcAt:    convertNullTimeToTimePtr(row.SaveToBcAt),
	}
}

func convertNullTimeToTimePtr(nullTime sql.NullTime) *time.Time {
	if nullTime.Valid {
		return &nullTime.Time
	}
	return nil
}
