"use client";

import { TimeString } from "@/gql/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Date from "@/components/layout/Date";
import { gql } from "@/gql/__generated__";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";

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
    createdAt: TimeString;
    saveToBcAt: TimeString | null;
    tokenId: number | null;
  };
};

export function UpdateDiary({ year, monthAndDay, diary }: UpdateDiaryProps) {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [updateDiary] = useMutation(Mutation);
  const { toast } = useToast();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setTitle(diary.title);
    setContent(diary.content);
  }, [diary]);

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
      await updateDiary({
        variables: {
          input: {
            id: diary.id,
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
          value={content}
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
          更新
        </Button>
      </div>
    </>
  );
}
