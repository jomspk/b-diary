"use client";

import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { CardDetailTable } from "@/features/card/CardDetailTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CardStateActionButton } from "@/features/card/CardStateActionButton";

const Query = gql(/* GraphQL */ `
  query GetCardDetailPage($id: ID!) {
    card(id: $id) {
      ...CardDetailTableCard
    }
  }
`);

export function CardDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const { data, refetch } = useSuspenseQuery(Query, { variables: { id } });
  return (
    <>
      <Header>カード詳細</Header>
      <Container>
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="justify-end flex flex-row gap-4">
            <CardStateActionButton
              id={data.card.id}
              state={data.card.state}
              onUpdate={refetch}
            />
            <Button onClick={() => router.push(`/cards/${id}/edit`)}>
              編集
            </Button>
          </div>
          <CardDetailTable card={data.card} />
        </div>
      </Container>
    </>
  );
}
