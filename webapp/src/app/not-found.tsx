import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">ページが見つかりません</h2>
        <Link href="/">
          <Button>ホーム画面へ戻る</Button>
        </Link>
      </div>
    </Container>
  );
}
