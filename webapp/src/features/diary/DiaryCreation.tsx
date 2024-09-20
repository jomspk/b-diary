"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { gql } from "@/gql/__generated__";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";

const Mutation = gql(/* GraphQL */ `
  mutation CreateDiary($input: CreateUserDiaryInput!) {
    createDiary(input: $input)
  }
`);

type DiaryCreationProps = {
  date: Date | undefined;
};

export function DiaryCreation({ date }: DiaryCreationProps) {
  const year = date?.toLocaleDateString("ja-JP", { year: "numeric" });
  const monthAndDay = date?.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
  });
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>(`${year}${monthAndDay}の日記`);
  const [createDiary] = useMutation(Mutation);
  const { toast } = useToast();
  const { user, error, isLoading } = useUser();

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
        <div className="space-y-2">
          <div className="text-sm">{year}</div>
          <div className="text-2xl font-bold">{monthAndDay}</div>
          <div>
            <div className="bg-orange-500 h-0.5 w-1/12"></div>
            <div className="bg-orange-500 h-px w-5/12"></div>
          </div>
        </div>
        <Textarea
          placeholder="タイトルを書いてください..."
          className="resize-none"
          defaultValue={title}
          maxLength={titleMaxLength}
          onChange={(event) => setTitle(event.target.value)}
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
