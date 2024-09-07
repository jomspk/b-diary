package tenant

import (
	"context"
	"fmt"
	"strings"

	"gorm.io/gorm"

	"lxcard/backend/pkg/errors"
	"lxcard/backend/pkg/tenant"
)

const (
	DBTenantID = "TENANT_ID"
)

var _ gorm.Plugin = &tenantID{}

var (
	ErrMissingDBTenantID = errors.New("DB_TENANT_ID is missing in instance")
	ErrTenantIDIsZero    = errors.New("tenant.ID is zero value")
)

type tenantID struct{}

func Tenant(ctx context.Context, db *gorm.DB, tenantID tenant.ID) *gorm.DB {
	db = db.WithContext(ctx)
	db = db.Set(DBTenantID, tenantID)
	return db
}

func New() gorm.Plugin {
	return &tenantID{}
}

func (t *tenantID) Name() string {
	return "lxcard:tenant_id"
}

func (t *tenantID) Initialize(db *gorm.DB) error {
	// Register callback functions
	if err := db.Callback().Query().Before("gorm:query").
		Register("tenant:before_query", filterTenantID); err != nil {
		return errors.Wrap(err)
	}
	if err := db.Callback().Update().Before("gorm:update").
		Register("tenant:before_update", filterTenantID); err != nil {
		return errors.Wrap(err)
	}
	if err := db.Callback().Delete().Before("gorm:delete").
		Register("tenant:before_delete", filterTenantID); err != nil {
		return errors.Wrap(err)
	}
	if err := db.Callback().Row().Before("gorm:row").
		Register("tenant:before_row_query", filterTenantID); err != nil {
		return errors.Wrap(err)
	}
	return nil
}

func filterTenantID(db *gorm.DB) {
	// Where句に, `tableName`.`tenant_id` を付ける
	v, ok := db.Get(DBTenantID)
	if !ok {
		panic(ErrMissingDBTenantID)
	}
	tenantID := fmt.Sprint(v)
	if len(tenantID) == 0 {
		panic(ErrTenantIDIsZero)
	}
	tableName := strings.Split(db.Statement.Table, " ") // alias や FORCE INDEX が付いているものを外す
	const tenantIDColumn = "tenant_id"
	db.Where(fmt.Sprintf("%s.%s = ?",
		db.Statement.Quote(tableName[0]),
		db.Statement.Quote(tenantIDColumn)),
		tenantID)
}
