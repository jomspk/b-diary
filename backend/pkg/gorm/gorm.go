package gorm

import (
	"time"

	"github.com/go-sql-driver/mysql"
	gormmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"

	"kohaku/backend/env"
	"kohaku/backend/pkg/errors"
)

func NewDefaultMySQLConfig() *mysql.Config {
	myconf := mysql.NewConfig()
	myconf.User = env.Get().RDB.User
	myconf.Passwd = env.Get().RDB.Password
	myconf.Addr = env.Get().RDB.Address
	myconf.DBName = env.Get().RDB.Name
	myconf.Net = "tcp"
	myconf.ParseTime = true
	myconf.Loc = time.Local
	return myconf
}

func Open(mysqlCfg *mysql.Config, logger gormlogger.Writer) (*gorm.DB, error) {
	db, err := openDB(mysqlCfg, logger)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return db, nil
}

func openDB(mysqlCfg *mysql.Config, logger gormlogger.Writer) (*gorm.DB, error) {
	gormLogger := gormlogger.New(
		logger,
		gormlogger.Config{
			LogLevel:                  gormlogger.Info, // Log level
			IgnoreRecordNotFoundError: true,            // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,
		},
	)
	db, err := gorm.Open(
		gormmysql.Open(mysqlCfg.FormatDSN()),
		&gorm.Config{
			Logger: gormLogger,
		},
	)
	if err != nil {
		return nil, errors.Wrap(err)
	}
	return db, nil
}
