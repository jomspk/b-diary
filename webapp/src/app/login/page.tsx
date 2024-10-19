"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox, CheckboxLabel } from "@/components/ui/checkbox";
import Terms from "@/features/login/Terms";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

export default function Component() {
  const [onChecked, setOnChecked] = useState<CheckedState>(false);
  return (
    <div className="bg-[url('/kohaku_background.jpg')] bg-cover bg-center min-h-full w-full flex items-center justify-center p-4">
      <Card className="w-3/5 min-h-96 flex items-center justify-center flex-col p-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            琥珀Diary
          </CardTitle>
        </CardHeader>
        <CardContent className="my-7">
          <p>
            当社の製品は、あなたの生産性を向上させ、ワークフローを効率化します。
            今すぐログインして、素晴らしい機能をお試しください！
          </p>
          <Terms />
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="terms"
              checked={onChecked}
              onCheckedChange={setOnChecked}
            />
            <CheckboxLabel htmlFor="terms">同意する</CheckboxLabel>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full sm:w-auto" disabled={!onChecked}>
            <a href="/api/auth/login">ログイン</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
