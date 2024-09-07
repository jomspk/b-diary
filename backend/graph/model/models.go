package model

import "time"

type Card struct {
	ID               string    `json:"id"`
	Name             string    `json:"name"`
	OwnerID          string    `json:"ownerId"`
	State            CardState `json:"state"`
	LastFour         *string   `json:"lastFour,omitempty"`
	ExpirationMonth  *uint     `json:"expirationMonth,omitempty"`
	ExpirationYear   *uint     `json:"expirationYear,omitempty"`
	Description      string    `json:"description"`
	OnceMaxAmount    *uint32   `json:"onceMaxAmount,omitempty"`
	MonthlyMaxAmount *uint32   `json:"monthlyMaxAmount,omitempty"`
	TotalMaxAmount   *uint     `json:"totalMaxAmount,omitempty"`
	StartDate        *string   `json:"startDate,omitempty"`
	EndDate          *string   `json:"endDate,omitempty"`
	ModifiedAt       time.Time `json:"modifiedAt"`
}
