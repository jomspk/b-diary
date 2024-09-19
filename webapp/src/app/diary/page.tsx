"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomCalendar from "@/features/diary/customCalendar";

const previewDiaryMaxLength = 10;

export default function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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

  const monthEntries = [
    {
      date: new Date(2024, 8, 2),
      content: "今日は晴れでした。公園に行きました。",
    },
    { date: new Date(2024, 8, 9), content: "友人と電話で話しました。" },
    { date: new Date(2024, 8, 10), content: "新しい本を読み始めました。" },
    { date: new Date(2024, 8, 11), content: "仕事が忙しかったです。" },
    { date: new Date(2024, 8, 17), content: "家族と食事に行きました。" },
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
            monthEntries={monthEntries}
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
        <div className="p-10 flex flex-col space-y-4 flex-grow">
          <div className="space-y-2">
            <div className="text-sm">
              {date?.toLocaleDateString("ja-JP", { year: "numeric" })}
            </div>
            <div className="text-2xl font-bold">
              {date?.toLocaleDateString("ja-JP", {
                month: "long",
                day: "numeric",
              })}
            </div>
            <div>
              <div className="bg-orange-500 h-0.5 w-1/12"></div>
              <div className="bg-orange-500 h-px w-5/12"></div>
            </div>
          </div>
          <Textarea
            placeholder="今日の出来事を書いてください..."
            className="flex-grow resize-none"
          />
        </div>
        <div className="bg-gray-200 flex justify-center w-full p-3">
          <Button className="bg-orange-500 w-3/12 hover:bg-orange-400">
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
