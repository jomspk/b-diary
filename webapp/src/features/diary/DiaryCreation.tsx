"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Date from "@/components/layout/Date";
import { gql } from "@/gql/__generated__";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";

const Mutation = gql(/* GraphQL */ `
  mutation CreateDiary($input: CreateUserDiaryInput!) {
    createDiary(input: $input)
  }
`);

type DiaryCreationProps = {
  year: string | undefined;
  monthAndDay: string | undefined;
};

export function DiaryCreation({ year, monthAndDay }: DiaryCreationProps) {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createDiary] = useMutation(Mutation);
  const { toast } = useToast();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setTitle(`${year}${monthAndDay}の日記`);
  }, [year, monthAndDay]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const titleMaxLength = 50;
  const contentMaxLength = 500;

  const onSubmit = async () => {
    try {
      if (!user)
        throw new Error(
          "ユーザー情報を取得できません。再度ログインしてください。"
        );
      else if (!user.sub)
        throw new Error(
          "ユーザー情報を取得できません。再度ログインしてください。"
        );
      await createDiary({
        variables: {
          input: {
            firebaseUid: user.sub,
            content: content,
            title: title,
          },
        },
      });
      toast({ title: "日記の作成に成功しました" });
    } catch (e) {
      console.error(e);
      toast({ title: "日記の作成に失敗しました", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="p-10 flex flex-col space-y-4 flex-grow">
        <Date year={year} monthAndDay={monthAndDay} />
        <Textarea
          placeholder="タイトルを書いてください..."
          className="resize-none"
          defaultValue={`${year}${monthAndDay}の日記`}
          maxLength={titleMaxLength}
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <p>
          {title.length} / {titleMaxLength} 文字
        </p>
        <Textarea
          placeholder="今日の出来事を書いてください..."
          className="flex-grow resize-none"
          maxLength={contentMaxLength}
          onChange={(event) => setContent(event.target.value)}
        />
        <p>
          {content.length} / {contentMaxLength} 文字
        </p>
      </div>
      <div className="bg-gray-200 flex justify-center w-full p-3">
        <Button
          className="bg-orange-500 w-3/12 hover:bg-orange-400"
          onClick={onSubmit}
        >
          保存
        </Button>
      </div>
    </>
  );
}
