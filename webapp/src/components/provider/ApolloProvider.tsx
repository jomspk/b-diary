"use client";

import type { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloNextAppProvider as Provider,
} from "@apollo/experimental-nextjs-app-support";
import { HttpLink } from "@apollo/client";

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <Provider makeClient={makeClient}>{children}</Provider>;
};

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL}/v1/graphql`,
    credentials: "include",
    // Next.js の Data Cache に古いデータがキャッシュされるのを防ぐために、Data Cache をスキップさせる。
    // Data Cache をスキップさせたら自動的に Full Route Cache もスキップされるため、古いデータが一瞬見える問題はなくなる。
    // その代わりに表示が一瞬遅くなってしまうが、それは許容する。
    //
    // Next.js 15 からは Data Cache が opt-in になる（デフォルトでスキップになる）ためこのコードは不要になる。
    fetchOptions: {
      cache: "no-store",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
      },
    },
    link: httpLink,
  });
};
