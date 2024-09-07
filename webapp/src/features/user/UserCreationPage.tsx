"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { UserCreationForm } from "@/features/user/UserCreationForm";

export function UserCreationPage() {
  return (
    <>
      <Header>ユーザー作成</Header>
      <Container>
        <UserCreationForm />
      </Container>
    </>
  );
}
