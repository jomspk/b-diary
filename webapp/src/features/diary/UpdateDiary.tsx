"use client";

import { DateString, TimeString } from "@/gql/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Date from "@/components/layout/Date";
import { gql } from "@/gql/__generated__";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTranslations } from "next-intl";

const Mutation = gql(/* GraphQL */ `
  mutation UpdateDiary($input: UpdateDiaryInput!) {
    updateDiary(input: $input)
  }
`);

type UpdateDiaryProps = {
  year: string | undefined;
  monthAndDay: string | undefined;
  diary: {
    id: string;
    title: string;
    content: string;
    diaryDate: DateString;
    saveToBcAt: TimeString | null;
    tokenId: number | null;
  };
  onReload: () => Promise<void>;
};

export function UpdateDiary({
  year,
  monthAndDay,
  diary,
  onReload,
}: Readonly<UpdateDiaryProps>) {
  const t = useTranslations("diary");
  const [content, setContent] = useState<string>("");
  const [updateDiary] = useMutation(Mutation, {
    onCompleted() {
      onReload();
    },
  });
  const { toast } = useToast();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setContent(diary.content);
  }, [diary]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const contentMaxLength = 500;

  const onSubmit = async () => {
    try {
      if (!user) throw new Error(t("get_user_fail"));
      else if (!user.sub) throw new Error(t("get_user_fail"));
      await updateDiary({
        variables: {
          input: {
            id: diary.id,
            content: content,
            title: "",
          },
        },
      });
      toast({ title: t("update_success") });
    } catch (e) {
      console.error(e);
      toast({ title: t("update_fail"), variant: "destructive" });
    }
  };

  return (
    <>
      <div className="p-[16px] md:pt-0 flex flex-col space-y-4 flex-grow max-w-[540px] w-full">
        <Date year={year} monthAndDay={monthAndDay} />
        <Textarea
          placeholder={t("placeholder")}
          className="flex-grow resize-none"
          maxLength={contentMaxLength}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
        <p>
          {content.length} / {contentMaxLength} {t("count")}
        </p>
      </div>
      <div className="bg-gray-200 flex justify-center w-full p-3">
        <Button
          className="bg-primary w-[160px] hover:bg-primary/50"
          onClick={onSubmit}
        >
          {t("update")}
        </Button>
      </div>
    </>
  );
}
