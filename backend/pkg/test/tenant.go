package test

import (
	"github.com/google/uuid"

	"lxcard/backend/pkg/tenant"
)

func RandomTenantID() tenant.ID {
	return tenant.ID(uuid.NewString())
}
