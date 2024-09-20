import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="bg-[url('/bdiary_background.png')] bg-cover bg-center min-h-full w-full flex items-center justify-center p-4">
      <Card className="w-3/5 min-h-96 flex items-center justify-center flex-col p-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">琥珀</CardTitle>
        </CardHeader>
        <CardContent className="my-7">
          <p>
            当社の製品は、あなたの生産性を向上させ、ワークフローを効率化します。
            今すぐログインして、素晴らしい機能をお試しください！
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full sm:w-auto">
            <a href="/api/auth/login">ログイン</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
