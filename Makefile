MD := $(subst $(BSLASH),$(FSLASH),$(shell dirname "$(realpath $(lastword $(MAKEFILE_LIST)))"))
export GOBIN := $(MD)/bin
export PATH := $(GOBIN):$(PATH)

.PHONY: help
help: ## ヘルプを出力
	@grep -E '^[/a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: gen-help-md
gen-help-md: ## ヘルプをMarkdown形式で出力
	@printf "| コマンド | 説明 |\n"
	@printf "|---------|-------------|\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "| make %-20s | %s |\n", $$1, $$2}'

.PHONY: start
start: ## サービス起動
	@devbox services up

.PHONY: stop
stop: ## サービス停止
	@devbox services stop

go-install-tools: ## Goツールをインストール
	@echo Install go tools
	@mkdir -p $(GOBIN)
	@cat tools.go | grep _ | awk -F'"' '{print $$2}' | xargs -t -n 1 go install

RDB_HOST ?= 127.0.0.1
RDB_PORT ?= 3307
RDB_USER ?= root
RDB_PASS ?=
RDB_NAME ?= lxcard
DBMATE_DB_SCHEMA ?= "backend"
DATABASE_HOST ?= "mysql://$(RDB_USER):$(RDB_PASS)@$(RDB_HOST):$(RDB_PORT)"

.PHONY: start-mysql
start-mysql: ## MySQLを起動
	process-compose up mysql

.PHONY: mycli
mycli: ## MySQLに接続
	mycli -h $(RDB_HOST) -P $(RDB_PORT) -u$(RDB_USER) -p "$(RDB_PASS)" $(RDB_NAME)

MIGRATION_COMMENT ?= $(shell bash -c 'read -p "Comments: " pwd; echo $$pwd')
migrate-new: ## マイグレーションファイル作成
	DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql new $(MIGRATION_COMMENT)

migrate-status: ## マイグレーションステータス確認
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql status

migrate-up: ## マイグレーション実行
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql up

migrate-down: ## マイグレーションロールバック
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql down

migrate-drop: ## データベース削除
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/migrations -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql drop

migrate-seed: ## データベース初期データ投入
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(DBMATE_DB_SCHEMA)/db_schema/seed -s $(DBMATE_DB_SCHEMA)/db_schema/schema.sql up

## マイグレーションリセット
migrate-reset: migrate-drop migrate-up migrate-seed

.PHONY: backend/format
backend/format: ## コードのフォーマット
	@goimports -local lxcard -w ./backend

.PHONY: gen
gen: gen-dbmodel gen-api backend/format ## 生成系のコマンドを実行

.PHONY: gen-dbmodel
gen-dbmodel: clean-dbmodel ## DBモデルを生成
	@xo schema mysql://$(RDB_USER):$(RDB_PASS)@$(RDB_HOST):$(RDB_PORT)/$(RDB_NAME) --out backend/db_model -e *.created_at -e *.updated_at --src backend/db_model/templates/go --go-import="lxcard/backend/pkg/tenant"

.PHONY: clean-dbmodel
clean-dbmodel: ## DBモデルを削除
	@rm -rf backend/db_model/*.xo.go

.PHONY: gen-api ## APIのコード生成
gen-api:
	gqlgen

.PHONY: webapp/gen ## webappのコード生成
webapp/gen:
	pnpm graphql-codegen

.PHONY: serve
serve: serve-api

.PHONY: serve-api
serve-api: ## APIサーバーを起動(ホットリロードあり)
	@air

.PHONY: backend/run
backend/run: ## APIサーバーを起動（ホットリロードなし）
	@go run -mod=mod ./backend/cmd/api

.PHONY: backend/test
backend/test: ## テストを実行
	@go test -count=1 -race -v ./backend/...

.PHONY: backend/lint
backend/lint: ## backendのlintを実行
	@golangci-lint run ./...

.PHONY: webapp/lint
webapp/lint: ## webappのlintを実行
	@pnpm lint

.PHONY: webapp/format
webapp/format: ## webappのformatを実行
	@pnpm format

.PHONY: format
format: backend/format webapp/format ## formatをまとめて実行


.PHONY: lint
lint: backend/lint webapp/lint ## lintをまとめて実行