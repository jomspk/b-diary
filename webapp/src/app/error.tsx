"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">予期せぬエラーが発生しました</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error.name}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <div>
          <Button onClick={() => reset()}>リトライ</Button>
        </div>
      </div>
    </Container>
  );
}
