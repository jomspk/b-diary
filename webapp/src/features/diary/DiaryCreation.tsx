"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Date from "@/components/layout/Date";
import { gql } from "@/gql/__generated__";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DateString } from "@/gql/__generated__/graphql";
import { useTranslations } from "next-intl";

const Mutation = gql(/* GraphQL */ `
  mutation CreateDiary($input: CreateUserDiaryInput!) {
    createDiary(input: $input)
  }
`);

type DiaryCreationProps = {
  year: string | undefined;
  monthAndDay: string | undefined;
  formattedDate: string;
  onReload: () => Promise<void>;
};

export default function DiaryCreation({
  year,
  monthAndDay,
  formattedDate,
  onReload,
}: Readonly<DiaryCreationProps>) {
  const t = useTranslations("diary");
  const [content, setContent] = useState<string>("");
  const [createDiary] = useMutation(Mutation, {
    onCompleted() {
      onReload();
    },
  });
  const { toast } = useToast();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setContent("");
  }, [year, monthAndDay]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const contentMaxLength = 500;

  const onSubmit = async () => {
    try {
      if (!user) throw new Error(t("get_user_fail"));
      else if (!user.sub) throw new Error(t("get_user_fail"));
      await createDiary({
        variables: {
          input: {
            firebaseUid: user.sub,
            content: content,
            title: "",
            diaryDate: formattedDate.split("T")[0] as DateString,
          },
        },
      });
      toast({ title: t("save_success") });
    } catch (e) {
      console.error(e);
      toast({ title: t("save_fail"), variant: "destructive" });
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
          {t("save")}
        </Button>
      </div>
    </>
  );
}
