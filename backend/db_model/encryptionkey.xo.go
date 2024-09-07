package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"
	"time"
)

// EncryptionKey represents a row from 'lxcard.encryption_key'.
type EncryptionKey struct {
	ID            string       `json:"id"`             // id
	EncryptionKey string       `json:"encryption_key"` // encryption_key
	KeyTokenID    int64        `json:"key_token_id"`   // key_token_id
	UserID        string       `json:"user_id"`        // user_id
	AppliedAt     time.Time    `json:"applied_at"`     // applied_at
	UnappliedAt   sql.NullTime `json:"unapplied_at"`   // unapplied_at
}
