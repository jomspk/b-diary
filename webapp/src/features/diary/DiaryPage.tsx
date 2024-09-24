"use client";

import { useState } from "react";
import CustomCalendar from "@/features/diary/CustomCalendar";
import { DiaryCreation } from "@/features/diary/DiaryCreation";
import ReadDiary from "@/features/diary/ReadDiary";
import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { TimeString } from "@/gql/__generated__/graphql";
import { Claims } from "@auth0/nextjs-auth0";

const previewDiaryMaxLength = 10;

const Query = gql(/* GraphQL */ `
  query GetDiaries($input: DiariesInput!) {
    diaries(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`);

export default function DiaryPage({ user }: { user: Claims | undefined }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const formattedDate = date ? date.toISOString() : "";
  const firebaseUid = user && user.sub ? user.sub : "";
  const year = date?.toLocaleDateString("ja-JP", { year: "numeric" });
  const monthAndDay = date?.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
  });
  const { data } = useSuspenseQuery(Query, {
    variables: {
      input: { date: formattedDate as TimeString, firebaseUid: firebaseUid },
    },
  });

  const results = data.diaries.filter((diary) => {
    return new Date(diary.createdAt).toDateString() === date?.toDateString();
  });

  // 過去の日記データのモックアップ（実際のアプリケーションではデータベースから取得します）
  const pastEntries = [
    {
      date: new Date(2024, 8, 17),
      content: "今日は晴れでした。公園に行きました。",
      id: "hogehoge1",
    },
    {
      date: new Date(2024, 8, 11),
      content: "友人と電話で話しました。",
      id: "hogehoge2",
    },
    {
      date: new Date(2024, 8, 10),
      content: "新しい本を読み始めました。",
      id: "hogehoge3",
    },
  ];

  const truncateText = (text: string) => {
    return text.length > previewDiaryMaxLength
      ? text.substring(0, previewDiaryMaxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-full grid grid-cols-3">
      <div className="bg-[url('/bdiary_background.png')] bg-cover bg-center">
        <div className="space-y-4 col-span-1 p-4">
          <div className="text-white text-xl">琥珀</div>
          <CustomCalendar
            date={date}
            setDate={setDate}
            monthEntries={data.diaries}
          />
          {/* 取得する日記の数を三つに固定する */}
          <div className="p-4 bg-white rounded-md space-y-4">
            <div className="font-bold">履歴</div>
            {pastEntries.map((entry) => (
              <div key={entry.id}>
                <div className="bg-gray-300 h-px my-3"></div>
                <div className="flex space-x-4">
                  <span className="text-sm font-medium">
                    {entry.date?.toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <p className="text-sm">{truncateText(entry.content)}</p>
                </div>
              </div>
            ))}
            <div className="bg-gray-300 h-px my-3"></div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-between h-screen">
        {results.length > 0 ? (
          <ReadDiary results={results} year={year} monthAndDay={monthAndDay} />
        ) : (
          <DiaryCreation year={year} monthAndDay={monthAndDay} />
        )}
      </div>
    </div>
  );
}
