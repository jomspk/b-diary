/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment CardCreationFormUser on User {\n    id\n    name\n  }\n":
    types.CardCreationFormUserFragmentDoc,
  "\n  mutation CreateCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      id\n    }\n  }\n":
    types.CreateCardDocument,
  "\n  query GetCardCreationPage {\n    users {\n      ...CardCreationFormUser\n    }\n  }\n":
    types.GetCardCreationPageDocument,
  "\n  query GetCardDetailPage($id: ID!) {\n    card(id: $id) {\n      ...CardDetailTableCard\n    }\n  }\n":
    types.GetCardDetailPageDocument,
  "\n  fragment CardDetailTableCard on Card {\n    id\n    name\n    lastFour\n    expirationYear\n    expirationMonth\n    state\n    description\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n    startDate\n    endDate\n    onceMaxAmount\n    monthlyMaxAmount\n    totalMaxAmount\n  }\n":
    types.CardDetailTableCardFragmentDoc,
  "\n  fragment CardEditFormUser on User {\n    id\n    name\n  }\n":
    types.CardEditFormUserFragmentDoc,
  "\n  fragment CardEditFormCard on Card {\n    id\n    name\n    lastFour\n    expirationYear\n    expirationMonth\n    state\n    description\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n    startDate\n    endDate\n    onceMaxAmount\n    monthlyMaxAmount\n    totalMaxAmount\n  }\n":
    types.CardEditFormCardFragmentDoc,
  "\n  mutation UpdateCard($id: ID!, $input: UpdateCardInput!) {\n    updateCard(id: $id, input: $input) {\n      id\n    }\n  }\n":
    types.UpdateCardDocument,
  "\n  query GetCardEditPage($id: ID!) {\n    card(id: $id) {\n      ...CardEditFormCard\n    }\n    users {\n      ...CardEditFormUser\n    }\n  }\n":
    types.GetCardEditPageDocument,
  "\n  query GetCardListPage {\n    cards {\n      ...CardListTableCard\n    }\n  }\n":
    types.GetCardListPageDocument,
  "\n  fragment CardListTableCard on Card {\n    id\n    name\n    state\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n  }\n":
    types.CardListTableCardFragmentDoc,
  "\n  mutation LockCard($id: ID!) {\n    lockCard(id: $id)\n  }\n":
    types.LockCardDocument,
  "\n  mutation UnlockCard($id: ID!) {\n    unlockCard(id: $id)\n  }\n":
    types.UnlockCardDocument,
  "\n  mutation CreateDiary($input: CreateUserDiaryInput!) {\n    createDiary(input: $input)\n  }\n":
    types.CreateDiaryDocument,
  "\n  query GetDiaries($input: DiariesInput!) {\n    diaries(input: $input) {\n      id\n      title\n      content\n      createdAt\n      saveToBcAt\n      tokenId\n    }\n  }\n":
    types.GetDiariesDocument,
  "\n  mutation UpdateDiary($input: UpdateDiaryInput!) {\n    updateDiary(input: $input)\n  }\n":
    types.UpdateDiaryDocument,
  "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n    }\n  }\n":
    types.CreateUserDocument,
  "\n  query GetUserListPage {\n    users {\n      ...UserListTableUser\n    }\n  }\n":
    types.GetUserListPageDocument,
  "\n  fragment UserListTableUser on User {\n    id\n    name\n  }\n":
    types.UserListTableUserFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CardCreationFormUser on User {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment CardCreationFormUser on User {\n    id\n    name\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCard($input: CreateCardInput!) {\n    createCard(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetCardCreationPage {\n    users {\n      ...CardCreationFormUser\n    }\n  }\n"
): (typeof documents)["\n  query GetCardCreationPage {\n    users {\n      ...CardCreationFormUser\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetCardDetailPage($id: ID!) {\n    card(id: $id) {\n      ...CardDetailTableCard\n    }\n  }\n"
): (typeof documents)["\n  query GetCardDetailPage($id: ID!) {\n    card(id: $id) {\n      ...CardDetailTableCard\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CardDetailTableCard on Card {\n    id\n    name\n    lastFour\n    expirationYear\n    expirationMonth\n    state\n    description\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n    startDate\n    endDate\n    onceMaxAmount\n    monthlyMaxAmount\n    totalMaxAmount\n  }\n"
): (typeof documents)["\n  fragment CardDetailTableCard on Card {\n    id\n    name\n    lastFour\n    expirationYear\n    expirationMonth\n    state\n    description\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n    startDate\n    endDate\n    onceMaxAmount\n    monthlyMaxAmount\n    totalMaxAmount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CardEditFormUser on User {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment CardEditFormUser on User {\n    id\n    name\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CardEditFormCard on Card {\n    id\n    name\n    lastFour\n    expirationYear\n    expirationMonth\n    state\n    description\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n    startDate\n    endDate\n    onceMaxAmount\n    monthlyMaxAmount\n    totalMaxAmount\n  }\n"
): (typeof documents)["\n  fragment CardEditFormCard on Card {\n    id\n    name\n    lastFour\n    expirationYear\n    expirationMonth\n    state\n    description\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n    startDate\n    endDate\n    onceMaxAmount\n    monthlyMaxAmount\n    totalMaxAmount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateCard($id: ID!, $input: UpdateCardInput!) {\n    updateCard(id: $id, input: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateCard($id: ID!, $input: UpdateCardInput!) {\n    updateCard(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetCardEditPage($id: ID!) {\n    card(id: $id) {\n      ...CardEditFormCard\n    }\n    users {\n      ...CardEditFormUser\n    }\n  }\n"
): (typeof documents)["\n  query GetCardEditPage($id: ID!) {\n    card(id: $id) {\n      ...CardEditFormCard\n    }\n    users {\n      ...CardEditFormUser\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetCardListPage {\n    cards {\n      ...CardListTableCard\n    }\n  }\n"
): (typeof documents)["\n  query GetCardListPage {\n    cards {\n      ...CardListTableCard\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CardListTableCard on Card {\n    id\n    name\n    state\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment CardListTableCard on Card {\n    id\n    name\n    state\n    owner {\n      id\n      name\n    }\n    viewers {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation LockCard($id: ID!) {\n    lockCard(id: $id)\n  }\n"
): (typeof documents)["\n  mutation LockCard($id: ID!) {\n    lockCard(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UnlockCard($id: ID!) {\n    unlockCard(id: $id)\n  }\n"
): (typeof documents)["\n  mutation UnlockCard($id: ID!) {\n    unlockCard(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateDiary($input: CreateUserDiaryInput!) {\n    createDiary(input: $input)\n  }\n"
): (typeof documents)["\n  mutation CreateDiary($input: CreateUserDiaryInput!) {\n    createDiary(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetDiaries($input: DiariesInput!) {\n    diaries(input: $input) {\n      id\n      title\n      content\n      createdAt\n      saveToBcAt\n      tokenId\n    }\n  }\n"
): (typeof documents)["\n  query GetDiaries($input: DiariesInput!) {\n    diaries(input: $input) {\n      id\n      title\n      content\n      createdAt\n      saveToBcAt\n      tokenId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateDiary($input: UpdateDiaryInput!) {\n    updateDiary(input: $input)\n  }\n"
): (typeof documents)["\n  mutation UpdateDiary($input: UpdateDiaryInput!) {\n    updateDiary(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserListPage {\n    users {\n      ...UserListTableUser\n    }\n  }\n"
): (typeof documents)["\n  query GetUserListPage {\n    users {\n      ...UserListTableUser\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment UserListTableUser on User {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment UserListTableUser on User {\n    id\n    name\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
