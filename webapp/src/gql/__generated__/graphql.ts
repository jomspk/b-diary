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
  /** 暗号化キー */
  encryptionKey: Maybe<Scalars["String"]["output"]>;
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
  /** 日記作成 */
  createDiary: Scalars["ID"]["output"];
  /** 日記更新 */
  updateDiary: Scalars["ID"]["output"];
};

export type MutationCreateDiaryArgs = {
  input: CreateUserDiaryInput;
};

export type MutationUpdateDiaryArgs = {
  input: UpdateDiaryInput;
};

export type Query = {
  /** 日記取得 */
  diaries: Array<Diary>;
  /** 過去三件の日記取得 */
  diaryHistory: Array<Diary>;
};

export type QueryDiariesArgs = {
  input: DiariesInput;
};

export type QueryDiaryHistoryArgs = {
  firebaseUid: Scalars["String"]["input"];
};

export type UpdateDiaryInput = {
  /** 日記内容 */
  content: Scalars["String"]["input"];
  /** 日記ID */
  id: Scalars["ID"]["input"];
  /** 日記のタイトル */
  title: Scalars["String"]["input"];
};

export type CreateDiaryMutationVariables = Exact<{
  input: CreateUserDiaryInput;
}>;

export type CreateDiaryMutation = { createDiary: string };

export type GetDiaryHistoryQueryVariables = Exact<{
  firebaseUid: Scalars["String"]["input"];
}>;

export type GetDiaryHistoryQuery = {
  diaryHistory: Array<{
    id: string;
    title: string;
    content: string;
    tokenId: number | null;
    diaryDate: DateString;
    encryptionKey: string | null;
    saveToBcAt: TimeString | null;
  }>;
};

export type GetDiariesQueryVariables = Exact<{
  input: DiariesInput;
}>;

export type GetDiariesQuery = {
  diaries: Array<{
    id: string;
    title: string;
    content: string;
    tokenId: number | null;
    diaryDate: DateString;
    encryptionKey: string | null;
    saveToBcAt: TimeString | null;
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
export const GetDiaryHistoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDiaryHistory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firebaseUid" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "diaryHistory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "firebaseUid" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firebaseUid" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                { kind: "Field", name: { kind: "Name", value: "diaryDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "encryptionKey" },
                },
                { kind: "Field", name: { kind: "Name", value: "saveToBcAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDiaryHistoryQuery,
  GetDiaryHistoryQueryVariables
>;
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
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                { kind: "Field", name: { kind: "Name", value: "diaryDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "encryptionKey" },
                },
                { kind: "Field", name: { kind: "Name", value: "saveToBcAt" } },
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
