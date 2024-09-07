# Backend Application

---

## 技術スタック

### APIスキーマ
  - GraphQLを使用、Goの生成ツール[gqlgen](https://github.com/99designs/gqlgen)を使用している
  - GraphQLの定義ファイルは `graph/schame.graphqls`, `graph/model.graphqls` ディレクトリに配置されている
  - rootでの`make gen-api` の実行で、定義ファイルからGoコードへの自動生成が実行される

### DB関連
  - DBマイグレーションツール: [dbmate](https://github.com/amacneil/dbmate)
    - rootの`Makefile`に定義された`make migrate-*` の中で使われている
      - `make migrate-new` : マイグレーションファイルを追加
        - `db_schema/migrations`ディレクトリにマイグレーションファイルが作成される
      - `make migrate-status` : マイグレーションステータス確認
      - `make migrate-up` : マイグレーションを最新まで実行
      - `make migrate-down` : マイグレーション1つロールバック
  - ORマッパー: [GORM](https://gorm.io/ja_JP/docs/index.html)
  - DBスキーマ => Goのモデルの変換: [xo](https://github.com/xo/xo)
    - `make gen-dbmodel` の実行で、DBスキーマからGoのモデルを自動生成。
      - `db_model`ディレクトリに `*.xo.go` のファイル形式で生成される 

### Live Loading Tool
- [air](https://arc.net/l/quote/urtmuqmb)を利用することで、ファイルの変更を検知して自動でサーバーを再起動することができる
  - rootの`make serve-api`コマンドで利用されている
  - `[root]/.air.toml` に設定ファイルがある

## ディレクトリ構成

```
 tree -d -L 1
.
├── cmd         goアプリケーションのエントリーポイントがある go-package
├── db_model    DBモデルの go-package
├── db_schema   DBのシードデータとマイグレーションファイルを置いたディレクトリ
├── env         環境変数定義の go-package
├── graph       GraphQLのスキーマ定義、及び自動生成されたファイルのある go-package
├── loader      GraphQLのDataLoaderの go-package
├── middleware  ミドルウェアの go-package
├── pkg         ユーティリティ関数の go-package
├── repository  Repository(データアクセスを実装する層)の go-package
└── service     Service(アプリケーションロジックを実装する層)の go-package

```
