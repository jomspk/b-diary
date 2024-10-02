package test

import (
	"fmt"
	"net/url"
	"sync"
	"testing"

	"github.com/amacneil/dbmate/v2/pkg/dbmate"
	_ "github.com/amacneil/dbmate/v2/pkg/driver/mysql"
	"gorm.io/gorm"

	app "lxcard/backend"
	"lxcard/backend/db_schema"
	"lxcard/backend/env"
	gormdb "lxcard/backend/pkg/gorm"
)

var (
	testDB     *gorm.DB
	initDBOnce = &sync.Once{}
)

func DB(t *testing.T) *gorm.DB {
	t.Helper()
	// NOTE: 最初に呼ばれた時だけテスト用のMySQLへ接続するGORMのクライアントを作成する
	initDBOnce.Do(func() {
		if err := env.Initialize(); err != nil {
			t.Fatalf("failed to initialize envvar: %v", err)
		}

		cfg := gormdb.NewDefaultMySQLConfig()
		cfg.DBName = "test_lxcard"
		mysqlURL, err := url.Parse(
			fmt.Sprintf("mysql://%s:%s@%s/%s",
				cfg.User,
				cfg.Passwd,
				cfg.Addr,
				cfg.DBName,
			),
		)
		if err != nil {
			t.Fatalf("failed to parse mysql url: %v", err)
		}

		// FIXME: プロセスを跨いだ排他制御がないと同時に走ってしまう可能性があるので、MySQLの名前付きロックやファイルロックを使って排他制御を行う
		dbmateDB := dbmate.New(mysqlURL)
		dbmateDB.AutoDumpSchema = false
		dbmateDB.FS = db_schema.FS
		dbmateDB.MigrationsDir = []string{"./migrations"}
		dbmateDB.WaitBefore = true
		if err := dbmateDB.CreateAndMigrate(); err != nil {
			t.Fatalf("failed to create and migrate db: %v", err)
		}

		testDB, err = gormdb.Open(cfg, app.Logger)
		if err != nil {
			t.Fatalf("failed to open gorm db: %v", err)
		}
	})
	return testDB
}
