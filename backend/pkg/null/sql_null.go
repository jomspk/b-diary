package null

import (
	"database/sql"
	"time"

	"lxcard/backend/pkg/errors"
)

func ToSQLNullString(val *string) sql.NullString {
	if val == nil {
		return sql.NullString{}
	} else {
		return sql.NullString{Valid: true, String: *val}
	}
}

func FromSQLNullString(val sql.NullString) *string {
	if val.Valid {
		return &val.String
	} else {
		return nil
	}
}

func ToSQLNullInt64FromNonPtrInt(val int) sql.NullInt64 {
	return sql.NullInt64{Valid: true, Int64: int64(val)}
}

func ToSQLNullInt64FromUint(val *uint) sql.NullInt64 {
	if val == nil {
		return sql.NullInt64{}
	} else {
		return sql.NullInt64{Valid: true, Int64: int64(*val)}
	}
}

func ToSQLNullInt64FromUint32(val *uint32) sql.NullInt64 {
	if val == nil {
		return sql.NullInt64{}
	} else {
		return sql.NullInt64{Valid: true, Int64: int64(*val)}
	}
}

func FromSQLNullInt64ToUint(val sql.NullInt64) *uint {
	if val.Valid {
		res := uint(val.Int64)
		return &res
	} else {
		return nil
	}
}

func FromSQLNullInt64ToUint32(val sql.NullInt64) *uint32 {
	if val.Valid {
		res := uint32(val.Int64)
		return &res
	} else {
		return nil
	}
}

func ToSQLNullTimeFromDateString(t *string) (sql.NullTime, error) {
	if t == nil {
		return sql.NullTime{}, nil
	}
	d, err := time.ParseInLocation(time.DateOnly, *t, time.Local)
	if err != nil {
		return sql.NullTime{}, errors.Wrap(err)
	}
	return sql.NullTime{Valid: true, Time: d}, nil
}

func FromSQLNullTimeToDate(val sql.NullTime) *string {
	if val.Valid {
		t := val.Time.Format(time.DateOnly)
		return &t
	} else {
		return nil
	}
}
