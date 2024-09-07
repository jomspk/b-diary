"use client";

import { useRouter } from "next/navigation";
import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { UserListTable } from "@/features/user/UserListTable";
import { Button } from "@/components/ui/button";

const Query = gql(/* GraphQL */ `
  query GetUserListPage {
    users {
      ...UserListTableUser
    }
  }
`);

export function UserListPage() {
  const router = useRouter();
  const { data } = useSuspenseQuery(Query);
  return (
    <>
      <Header>ユーザー一覧</Header>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button onClick={() => router.push("/users/new")}>
              ユーザー作成
            </Button>
          </div>
          <UserListTable users={data.users} />
        </div>
      </Container>
    </>
  );
}
