# Kohaku

Kohaku Diaryのプロジェクト

## セットアップ

環境構築には[devbox](https://www.jetify.com/devbox/docs/)を利用します｡
以下をインストールしますが､自分でインストールできている場合はdevboxを利用しなくてもかまいません｡

- Go 1.22.3
- Node.js 20.x
- MySQL 8.0

### devboxのインストール

[Installing Devbox](https://www.jetify.com/devbox/docs/installing_devbox/)を参考にして､devboxをインストールします｡

### devboxの起動

以下のコマンドでdevboxを起動します｡初回は[Nix](https://nixos.org/)もインストールするので､しばらく起動には時間がかかります｡

```bash
$ devbox shell
```

今後､このコマンドで起動したシェル上で開発を進めていきます｡

### 各サービスの起動

以下のコマンドを実行してプロセスマネージャーを起動する。

以下のサービスが立ち上がるので、うまく起動すれば http://localhost:3000 にアクセスするとページが表示されます。

- backend
- webapp
- MySQL

```bash
$ make start
```

Intel Macでツールをインストールしようとした時、Cのクロスコンパイルができない事象が発生しました。
CGOを無効にしてツールをインストールする下記コマンドを実行してください。

```bash
$ CGO_ENABLED=0 make go-install-tools
```

devbox使っていて、process managerを終了したのに、portがうまく開放されない事象が一定発生しました。
今回のベースアプリケーションの開発ポートは以下のとおりです。

- backend: 8080
- webapp: 3000
- mysql: 3307
- mysql_logs: mysqlのログを表示しているだけなので、portは使用していません。

`lsof -i:8080` というコマンドで、portを使用しているprocessを調べられます。processを終了しても `lsof -i:8080`でprocessが表示される場合には `kill -9 [pid]` で processを矯正終了させることが出来ます。

## Makefileの使い方

- `Makefile`は、開発に便利なコマンドを定義したファイルです。rootディレクトリに配置されています。
- `make` とコマンドを打つと、以下のような説明が表示されます。

| コマンド              | 説明                           |
| --------------------- | ------------------------------ |
| make help             | ヘルプを出力                   |
| make gen-help-md      | ヘルプをMarkdown形式で出力     |
| make start            | サービス起動                   |
| make stop             | サービス停止                   |
| make go-install-tools | Goツールをインストール         |
| make start-mysql      | MySQLを起動                    |
| make mycli            | MySQLに接続                    |
| make migrate-new      | マイグレーションファイル作成   |
| make migrate-status   | マイグレーションステータス確認 |
| make migrate-up       | マイグレーション実行           |
| make migrate-down     | マイグレーションロールバック   |
| make migrate-drop     | データベース削除               |
| make migrate-seed     | データベース初期データ投入     |
| make gen              | 生成系のコマンドを実行         |
| make gen-dbmodel      | DBモデルを生成                 |
| make clean-dbmodel    | DBモデルを削除                 |
| make serve-api        | APIサーバーを起動              |

### そもそもMakefileって？

- make は元々は C言語などのソースコードをビルドするために生まれたツールです。 ですが、最近では半ばタスクランナー的な用途に make を用いることがあり、このリポジトリでもそのように利用しています。
- command部分は基本shですが、固有のフォーマットがあるので注意が必要です。
- 以下、わかりやすかった記事です。（公式ドキュメントは一応載せておきますが、重厚なので今回の用途では読む必要はないです。）
  - 歴史的背景の説明: [2020年の Makefile](https://voyagegroup.github.io/make-advent-calendar-2020/001-makefile-in-2020)
  - 書式の説明: [Makefileの基本](https://zenn.dev/keitean/articles/aaef913b433677)
  - 公式ドキュメント: [GNU Make](https://www.gnu.org/software/make/manual/make.html)

## ルートディレクトの解説

rootにあるファイル・ディレクトリは以下のようになっています｡

```
$ tree -L 1
.
├── LICENSE
├── Makefile
├── README.md
├── backend ⭐goを使ったAPIサーバーのディレクトリ
├── devbox
├── devbox.json
├── devbox.lock
├── go.mod
├── go.sum
├── gqlgen.yml
├── graphql.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── process-compose.yml
├── tools.go
└── webapp ⭐React/Next.jsを使ったフロントエンドのディレクトリ
```

今回の実装で重要なディレクトリは`backend`と`webapp`です。
`backend`と`webapp`の詳しい説明は、それぞれのディレクトリの`README.md`に記載しています。

その他、様々な設定ファイルがrootディレクトリに配置されています｡

- backendの設定ファイル
  - `go.mod`は、backend配下のgoアプリケーションの依存関係を管理するためのファイルです。依存関係をインストールした結果、`go.sum`が生成され、依存関係の正確なバージョンが固定されます。
  - `gqlgen.yml` は、backend配下のgoのGraphQLサーバーを生成するためのツール`gqlgen`の設定ファイルです。
  - `tools.go` は、コマンドで利用するgoのツールをインストールするためのファイルです。 `make go-install-tools`でインストールされます。
- webappの設定ファイル
  - `graphql.config.ts` は、webapp配下のGraphQLクライアントを生成するためのツール`graphql-codegen`の設定ファイルです。
  - `package.json`は、webapp配下のReact/Next.jsアプリケーションの依存関係を管理するためのファイルです。
    - パッケージ管理ツール`pnpm`で`package.json`の依存関係をインストールした結果、`pnpm-lock.yaml`が生成され、依存関係の正確なバージョンが固定されます。
    - `pnpm-workspace.yaml`では`pnpm`で管理するディレクトリを指定しています。
- devboxの設定ファイル
  - `devbox.json` は、devboxの設定ファイルです。依存関係の正確なバージョン固定のために、`devbox.lock`が生成され、依存関係の正確なバージョンが固定されます。
  - `process-compose.yml` は、devboxで利用するプロセスマネージャーの設定ファイルです。
  - `devbox`ディレクトには、devboxで実行するスクリプトが配置されています。

これらの設定ファイルがrootに置かれている事によって、`go`コマンドや`pnpm`コマンドを実行する際に、それぞれのディレクトリに移動する必要がなくなっています。
