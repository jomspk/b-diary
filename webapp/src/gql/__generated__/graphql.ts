/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type DateString = string & { readonly brand: unique symbol };
export type TimeString = string & { readonly brand: unique symbol };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: DateString; output: DateString };
  Time: { input: TimeString; output: TimeString };
  Uint: { input: number; output: number };
  Uint32: { input: number; output: number };
};

export type Card = {
  /** カード説明 */
  description: Scalars["String"]["output"];
  /** カード利用終了日 */
  endDate: Maybe<Scalars["Date"]["output"]>;
  /** カード有効期限(月) */
  expirationMonth: Maybe<Scalars["Uint"]["output"]>;
  /** カード有効期限(年) */
  expirationYear: Maybe<Scalars["Uint"]["output"]>;
  id: Scalars["ID"]["output"];
  /** カード番号下4桁 */
  lastFour: Maybe<Scalars["String"]["output"]>;
  /** 更新日時 */
  modifiedAt: Scalars["Time"]["output"];
  /** 月ごとの利用上限金額 */
  monthlyMaxAmount: Maybe<Scalars["Uint32"]["output"]>;
  /** カード名 */
  name: Scalars["String"]["output"];
  /** 1回あたりの利用上限金額 */
  onceMaxAmount: Maybe<Scalars["Uint32"]["output"]>;
  /** カード所有者 */
  owner: User;
  /** カード利用開始日 */
  startDate: Maybe<Scalars["Date"]["output"]>;
  /** カードステート */
  state: CardState;
  /** 累計の利用上限金額 */
  totalMaxAmount: Maybe<Scalars["Uint"]["output"]>;
  /** カード閲覧者IDの配列 */
  viewers: Maybe<Array<User>>;
};

export type CardState =
  /** 有効 */
  | "ACTIVE"
  /** 一時停止 */
  | "LOCKED";

export type CreateBdiaryUserInput = {
  /** ユーザのFirebase UID */
  firebaseUid: Scalars["String"]["input"];
  /** ユーザのウォレットアドレス */
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateBdiaryUserParams = {
  /** ユーザのFirebase UID */
  firebaseUid: Scalars["String"]["output"];
  /** ユーザのウォレットアドレス */
  walletAddress: Maybe<Scalars["String"]["output"]>;
};

export type CreateCardInput = {
  /** カード説明 */
  description: Scalars["String"]["input"];
  /** カード利用終了日 */
  endDate?: InputMaybe<Scalars["Date"]["input"]>;
  /** 月ごとの利用上限金額 */
  monthlyMaxAmount?: InputMaybe<Scalars["Uint32"]["input"]>;
  /** カード名 */
  name: Scalars["String"]["input"];
  /** 1回あたりの利用上限金額 */
  onceMaxAmount?: InputMaybe<Scalars["Uint32"]["input"]>;
  /** カード所有者 */
  ownerId: Scalars["ID"]["input"];
  /** カード利用開始日 */
  startDate?: InputMaybe<Scalars["Date"]["input"]>;
  /** 累計の利用上限金額 */
  totalMaxAmount?: InputMaybe<Scalars["Uint"]["input"]>;
  /** カード閲覧者IDの配列 */
  viewerIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type CreateDiaryParams = {
  /** 日記内容 */
  content: Scalars["String"]["output"];
  /** 日記の日付 */
  diaryDate: Scalars["Date"]["output"];
  /** 日記のタイトル */
  title: Scalars["String"]["output"];
  /** ユーザーID */
  userId: Scalars["ID"]["output"];
};

export type CreateUserDiaryInput = {
  /** 日記内容 */
  content: Scalars["String"]["input"];
  /** 日記の日付 */
  diaryDate: Scalars["Date"]["input"];
  /** 日記作成者のFirebase UID */
  firebaseUid: Scalars["String"]["input"];
  /** 日記のタイトル */
  title: Scalars["String"]["input"];
  /** 日記作成者のウォレットアドレス */
  walletAddress?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserInput = {
  /** ユーザ名 */
  name: Scalars["String"]["input"];
};

export type DiariesInput = {
  /** 日記データ取得日時 */
  date: Scalars["Time"]["input"];
  /** Firebase UID */
  firebaseUid: Scalars["String"]["input"];
};

export type Diary = {
  /** 日記内容 */
  content: Scalars["String"]["output"];
  /** 日記の日時 */
  diaryDate: Scalars["Date"]["output"];
  /** 日記ID */
  id: Scalars["ID"]["output"];
  /** ブロックチェーンに保存された日付 */
  saveToBcAt: Maybe<Scalars["Time"]["output"]>;
  /** 日記タイトル */
  title: Scalars["String"]["output"];
  /** トークンID */
  tokenId: Maybe<Scalars["Uint"]["output"]>;
};

export type Mutation = {
  /** カード作成 */
  createCard: Card;
  /** 日記作成 */
  createDiary: Scalars["ID"]["output"];
  /** ユーザ作成 */
  createUser: User;
  /** カードロック */
  lockCard: Scalars["Boolean"]["output"];
  /** カードロック解除 */
  unlockCard: Scalars["Boolean"]["output"];
  /** カード更新 */
  updateCard: Card;
  /** 日記更新 */
  updateDiary: Scalars["ID"]["output"];
};

export type MutationCreateCardArgs = {
  input: CreateCardInput;
};

export type MutationCreateDiaryArgs = {
  input: CreateUserDiaryInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationLockCardArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUnlockCardArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCardArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateCardInput;
};

export type MutationUpdateDiaryArgs = {
  input: UpdateDiaryInput;
};

export type Query = {
  /** カード取得 */
  card: Card;
  /** カード一覧取得 */
  cards: Array<Card>;
  /** 日記取得 */
  diaries: Array<Diary>;
  /** ユーザ一覧取得 */
  users: Array<User>;
};

export type QueryCardArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryDiariesArgs = {
  input: DiariesInput;
};

export type UpdateCardInput = {
  /** カード説明 */
  description: Scalars["String"]["input"];
  /** カード利用終了日 */
  endDate?: InputMaybe<Scalars["Date"]["input"]>;
  /** 月ごとの利用上限金額 */
  monthlyMaxAmount?: InputMaybe<Scalars["Uint32"]["input"]>;
  /** カード名 */
  name: Scalars["String"]["input"];
  /** 1回あたりの利用上限金額 */
  onceMaxAmount?: InputMaybe<Scalars["Uint32"]["input"]>;
  /** カード所有者 */
  ownerId: Scalars["ID"]["input"];
  /** カード利用開始日 */
  startDate?: InputMaybe<Scalars["Date"]["input"]>;
  /** 累計の利用上限金額 */
  totalMaxAmount?: InputMaybe<Scalars["Uint"]["input"]>;
  /** カード閲覧者IDの配列 */
  viewerIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type UpdateDiaryInput = {
  /** 日記内容 */
  content: Scalars["String"]["input"];
  /** 日記ID */
  id: Scalars["ID"]["input"];
  /** 日記のタイトル */
  title: Scalars["String"]["input"];
};

export type User = {
  /** ユーザID */
  id: Scalars["ID"]["output"];
  /** ユーザ名 */
  name: Scalars["String"]["output"];
};

export type CreateDiaryMutationVariables = Exact<{
  input: CreateUserDiaryInput;
}>;

export type CreateDiaryMutation = { createDiary: string };

export type GetDiariesQueryVariables = Exact<{
  input: DiariesInput;
}>;

export type GetDiariesQuery = {
  diaries: Array<{
    id: string;
    title: string;
    content: string;
    saveToBcAt: TimeString | null;
    tokenId: number | null;
    diaryDate: DateString;
  }>;
};

export type UpdateDiaryMutationVariables = Exact<{
  input: UpdateDiaryInput;
}>;

export type UpdateDiaryMutation = { updateDiary: string };

export const CreateDiaryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDiary" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserDiaryInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDiary" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateDiaryMutation, CreateDiaryMutationVariables>;
export const GetDiariesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetDiaries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DiariesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "diaries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "saveToBcAt" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                { kind: "Field", name: { kind: "Name", value: "diaryDate" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDiariesQuery, GetDiariesQueryVariables>;
export const UpdateDiaryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDiary" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateDiaryInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateDiary" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateDiaryMutation, UpdateDiaryMutationVariables>;
