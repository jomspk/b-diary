// Package db_model contains generated code for schema 'lxcard'.
package db_model

// Code generated by xo. DO NOT EDIT.

import (
	"database/sql"
)

// BdiaryUser represents a row from 'lxcard.bdiary_users'.
type BdiaryUser struct {
	ID            string         `json:"id"`             // id
	WalletAddress sql.NullString `json:"wallet_address"` // wallet_address
	FirebaseUID   string         `json:"firebase_uid"`   // firebase_uid
	HasDiary      bool           `json:"has_diary"`      // has_diary
}
