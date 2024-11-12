"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox, CheckboxLabel } from "@/components/ui/checkbox";
import Terms from "@/features/login/Terms";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("login");
  const [onChecked, setOnChecked] = useState<CheckedState>(false);
  return (
    <div className="bg-[url('/kohaku_background.jpg')] bg-cover bg-center min-h-full w-full flex ">
      <div className="bg-white/75 flex items-center justify-center p-4 flex-grow">
        <Card className="w-full max-w-[720px] min-h-90 flex items-center justify-center flex-col py-[40px] md:py-[80px] px-1">
          <CardHeader>
            <Image src="/logo_text.svg" alt="琥珀" width={202} height={57} />
          </CardHeader>
          <CardContent className="w-full max-w-[480px]">
            <Terms />
          </CardContent>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={onChecked}
                onCheckedChange={setOnChecked}
              />
              <CheckboxLabel htmlFor="terms" className="text-base">
                {t("agree")}
              </CheckboxLabel>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full sm:w-auto" disabled={!onChecked}>
              <a href="/api/auth/login">{t("button")}</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
