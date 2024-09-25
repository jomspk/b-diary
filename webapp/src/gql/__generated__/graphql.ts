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
  /** 日記のタイトル */
  title: Scalars["String"]["output"];
  /** ユーザーID */
  userId: Scalars["ID"]["output"];
};

export type CreateUserDiaryInput = {
  /** 日記内容 */
  content: Scalars["String"]["input"];
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
  /** 日記作成日時 */
  createdAt: Scalars["Time"]["output"];
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

export type CardCreationFormUserFragment = { id: string; name: string };

export type CreateCardMutationVariables = Exact<{
  input: CreateCardInput;
}>;

export type CreateCardMutation = { createCard: { id: string } };

export type GetCardCreationPageQueryVariables = Exact<{ [key: string]: never }>;

export type GetCardCreationPageQuery = {
  users: Array<{ id: string; name: string }>;
};

export type GetCardDetailPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetCardDetailPageQuery = {
  card: {
    id: string;
    name: string;
    lastFour: string | null;
    expirationYear: number | null;
    expirationMonth: number | null;
    state: CardState;
    description: string;
    startDate: DateString | null;
    endDate: DateString | null;
    onceMaxAmount: number | null;
    monthlyMaxAmount: number | null;
    totalMaxAmount: number | null;
    owner: { id: string; name: string };
    viewers: Array<{ id: string; name: string }> | null;
  };
};

export type CardDetailTableCardFragment = {
  id: string;
  name: string;
  lastFour: string | null;
  expirationYear: number | null;
  expirationMonth: number | null;
  state: CardState;
  description: string;
  startDate: DateString | null;
  endDate: DateString | null;
  onceMaxAmount: number | null;
  monthlyMaxAmount: number | null;
  totalMaxAmount: number | null;
  owner: { id: string; name: string };
  viewers: Array<{ id: string; name: string }> | null;
};

export type CardEditFormUserFragment = { id: string; name: string };

export type CardEditFormCardFragment = {
  id: string;
  name: string;
  lastFour: string | null;
  expirationYear: number | null;
  expirationMonth: number | null;
  state: CardState;
  description: string;
  startDate: DateString | null;
  endDate: DateString | null;
  onceMaxAmount: number | null;
  monthlyMaxAmount: number | null;
  totalMaxAmount: number | null;
  owner: { id: string; name: string };
  viewers: Array<{ id: string; name: string }> | null;
};

export type UpdateCardMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  input: UpdateCardInput;
}>;

export type UpdateCardMutation = { updateCard: { id: string } };

export type GetCardEditPageQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetCardEditPageQuery = {
  card: {
    id: string;
    name: string;
    lastFour: string | null;
    expirationYear: number | null;
    expirationMonth: number | null;
    state: CardState;
    description: string;
    startDate: DateString | null;
    endDate: DateString | null;
    onceMaxAmount: number | null;
    monthlyMaxAmount: number | null;
    totalMaxAmount: number | null;
    owner: { id: string; name: string };
    viewers: Array<{ id: string; name: string }> | null;
  };
  users: Array<{ id: string; name: string }>;
};

export type GetCardListPageQueryVariables = Exact<{ [key: string]: never }>;

export type GetCardListPageQuery = {
  cards: Array<{
    id: string;
    name: string;
    state: CardState;
    owner: { id: string; name: string };
    viewers: Array<{ id: string; name: string }> | null;
  }>;
};

export type CardListTableCardFragment = {
  id: string;
  name: string;
  state: CardState;
  owner: { id: string; name: string };
  viewers: Array<{ id: string; name: string }> | null;
};

export type LockCardMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type LockCardMutation = { lockCard: boolean };

export type UnlockCardMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type UnlockCardMutation = { unlockCard: boolean };

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
    createdAt: TimeString;
    saveToBcAt: TimeString | null;
    tokenId: number | null;
  }>;
};

export type UpdateDiaryMutationVariables = Exact<{
  input: UpdateDiaryInput;
}>;

export type UpdateDiaryMutation = { updateDiary: string };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = { createUser: { id: string } };

export type GetUserListPageQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserListPageQuery = {
  users: Array<{ id: string; name: string }>;
};

export type UserListTableUserFragment = { id: string; name: string };

export const CardCreationFormUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardCreationFormUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CardCreationFormUserFragment, unknown>;
export const CardDetailTableCardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardDetailTableCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Card" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "lastFour" } },
          { kind: "Field", name: { kind: "Name", value: "expirationYear" } },
          { kind: "Field", name: { kind: "Name", value: "expirationMonth" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "viewers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "startDate" } },
          { kind: "Field", name: { kind: "Name", value: "endDate" } },
          { kind: "Field", name: { kind: "Name", value: "onceMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "monthlyMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "totalMaxAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CardDetailTableCardFragment, unknown>;
export const CardEditFormUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardEditFormUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CardEditFormUserFragment, unknown>;
export const CardEditFormCardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardEditFormCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Card" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "lastFour" } },
          { kind: "Field", name: { kind: "Name", value: "expirationYear" } },
          { kind: "Field", name: { kind: "Name", value: "expirationMonth" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "viewers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "startDate" } },
          { kind: "Field", name: { kind: "Name", value: "endDate" } },
          { kind: "Field", name: { kind: "Name", value: "onceMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "monthlyMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "totalMaxAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CardEditFormCardFragment, unknown>;
export const CardListTableCardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardListTableCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Card" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "viewers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CardListTableCardFragment, unknown>;
export const UserListTableUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserListTableUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserListTableUserFragment, unknown>;
export const CreateCardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCard" },
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
              name: { kind: "Name", value: "CreateCardInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCard" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const GetCardCreationPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCardCreationPage" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CardCreationFormUser" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardCreationFormUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCardCreationPageQuery,
  GetCardCreationPageQueryVariables
>;
export const GetCardDetailPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCardDetailPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "card" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CardDetailTableCard" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardDetailTableCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Card" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "lastFour" } },
          { kind: "Field", name: { kind: "Name", value: "expirationYear" } },
          { kind: "Field", name: { kind: "Name", value: "expirationMonth" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "viewers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "startDate" } },
          { kind: "Field", name: { kind: "Name", value: "endDate" } },
          { kind: "Field", name: { kind: "Name", value: "onceMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "monthlyMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "totalMaxAmount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCardDetailPageQuery,
  GetCardDetailPageQueryVariables
>;
export const UpdateCardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
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
              name: { kind: "Name", value: "UpdateCardInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCardMutation, UpdateCardMutationVariables>;
export const GetCardEditPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCardEditPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "card" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CardEditFormCard" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CardEditFormUser" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardEditFormCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Card" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "lastFour" } },
          { kind: "Field", name: { kind: "Name", value: "expirationYear" } },
          { kind: "Field", name: { kind: "Name", value: "expirationMonth" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "viewers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "startDate" } },
          { kind: "Field", name: { kind: "Name", value: "endDate" } },
          { kind: "Field", name: { kind: "Name", value: "onceMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "monthlyMaxAmount" } },
          { kind: "Field", name: { kind: "Name", value: "totalMaxAmount" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardEditFormUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCardEditPageQuery,
  GetCardEditPageQueryVariables
>;
export const GetCardListPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCardListPage" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cards" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CardListTableCard" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CardListTableCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Card" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "viewers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCardListPageQuery,
  GetCardListPageQueryVariables
>;
export const LockCardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LockCard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "lockCard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LockCardMutation, LockCardMutationVariables>;
export const UnlockCardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UnlockCard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "unlockCard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnlockCardMutation, UnlockCardMutationVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "saveToBcAt" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
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
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
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
              name: { kind: "Name", value: "CreateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetUserListPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserListPage" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "UserListTableUser" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserListTableUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUserListPageQuery,
  GetUserListPageQueryVariables
>;
