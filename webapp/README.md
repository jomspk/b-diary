# Frontend Application

---

## 技術スタック

- ライブラリ・フレームワーク

  - [Next.js](https://nextjs.org/) ([with AppRouter](https://nextjs.org/docs/app))
  - 学習コンテンツ
    - [LEARN REACT](https://ja.react.dev/learn): Reactの基礎を学習できます
    - [Learn Next.js](https://nextjs.org/learn): Next.jsの基礎を学習できます

- フォームと入力バリデーション
  - フォーム: [react-hook-form](https://react-hook-form.com/)
  - 入力バリデーション: [zod](https://github.com/colinhacks/zod)
- UIライブラリ
  - [shadcn/ui](https://ui.shadcn.com/)
    - [Tailwind CSS](https://tailwindcss.com/)や[radix-ui](https://www.radix-ui.com/)を利用している。
    - [`components.json`](https://ui.shadcn.com/docs/components-json)にはこのプロジェクトの[shadcn/ui](https://ui.shadcn.com/)の設定が保存されています。
    - `src/componsnts/ui`や`src/lib/utils`には、[shadcn/ui](https://ui.shadcn.com/)のツールで生成したコンポーネントやユーティリティ関数が保存されています。
    - コンポーネントの追加や更新は [CLI](https://ui.shadcn.com/docs/cli)で行う事ができます。
- GraphQL
  - クライアント: [Apollo Client](https://www.apollographql.com/docs/react/)
  - コード生成: [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/guides/react-query)
    - `graphql.config.ts`に設定ファイルがあります。
    - GraphQL Code Generatorで生成されたquery, mutationは`src/gql/__generated__`ディレクトリに保存されています。

## srcディレクトリの構成

```
tree -d -L 1 ./src

./src
├── app         Next.jsのAppディレクトリ(基本はルーティングのみを定義)
├── components  汎用的なReactコンポーネントを置くディレクトリ
├── features    ドメインごとのReactコンポーネントを置くディレクトリ
├── gql         GraphQL Code Generatorで生成されたコードを置くディレクトリ
└── lib         Typescriptのユーティリティ関数を置くディレクトリ
```
