"use client";

import { useSuspenseQuery } from "@apollo/client";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { gql } from "@/gql/__generated__";
import { CardEditForm } from "@/features/card/CardEditForm";

const Query = gql(/* GraphQL */ `
  query GetCardEditPage($id: ID!) {
    card(id: $id) {
      ...CardEditFormCard
    }
    users {
      ...CardEditFormUser
    }
  }
`);

export function CardEditPage({ id }: { id: string }) {
  const { data } = useSuspenseQuery(Query, { variables: { id } });
  return (
    <>
      <Header>カード編集</Header>
      <Container>
        <CardEditForm card={data.card} users={data.users} />
      </Container>
    </>
  );
}
