"use client";

import { useRouter } from "next/navigation";
import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { CardListTable } from "@/features/card/CardListTable";
import { Button } from "@/components/ui/button";

const Query = gql(/* GraphQL */ `
  query GetCardListPage {
    cards {
      ...CardListTableCard
    }
  }
`);

export function CardListPage() {
  const router = useRouter();
  const { data } = useSuspenseQuery(Query);
  return (
    <>
      <Header>カード一覧</Header>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button onClick={() => router.push("/cards/new")}>
              カード発行
            </Button>
          </div>
          <CardListTable cards={data.cards} />
        </div>
      </Container>
    </>
  );
}
