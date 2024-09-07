"use client";

import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { CardCreationForm } from "@/features/card/CardCreationForm";

const Query = gql(/* GraphQL */ `
  query GetCardCreationPage {
    users {
      ...CardCreationFormUser
    }
  }
`);

export function CardCreationPage() {
  const { data } = useSuspenseQuery(Query);
  return (
    <>
      <Header>カード発行</Header>
      <Container>
        <CardCreationForm users={data.users} />
      </Container>
    </>
  );
}
