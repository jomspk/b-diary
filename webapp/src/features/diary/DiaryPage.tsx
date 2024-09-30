"use client";

import { useEffect, useState } from "react";
import CustomCalendar from "@/features/diary/CustomCalendar";
import DiaryCreation from "@/features/diary/DiaryCreation";
import { UpdateDiary } from "@/features/diary/UpdateDiary";
import DiaryHistory from "@/features/diary/DiaryHistory";
import ReadDiary from "@/features/diary/ReadDiary";
import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { TimeString } from "@/gql/__generated__/graphql";
import { Claims } from "@auth0/nextjs-auth0";

const Query = gql(/* GraphQL */ `
  query GetDiaries($input: DiariesInput!) {
    diaries(input: $input) {
      id
      title
      content
      tokenId
      diaryDate
      encryptionKey
      saveToBcAt
    }
  }
`);

export default function DiaryPage({ user }: { user: Claims | undefined }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const formattedDate = date
    ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
    : "";
  const firebaseUid = user && user.sub ? user.sub : "";
  const year = date?.toLocaleDateString("ja-JP", { year: "numeric" });
  const monthAndDay = date?.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
  });

  const { data, refetch } = useSuspenseQuery(Query, {
    variables: {
      input: { date: formattedDate as TimeString, firebaseUid: firebaseUid },
    },
  });

  const diary = data.diaries.find((diary) => {
    return new Date(diary.diaryDate).toDateString() === date?.toDateString();
  });

  useEffect(() => {
    refetch({
      input: { date: formattedDate as TimeString, firebaseUid: firebaseUid },
    });
  }, [formattedDate, firebaseUid, refetch]);

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
          <DiaryHistory firebaseUid={firebaseUid} />
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-between h-screen">
        {diary ? (
          diary.saveToBcAt ? (
            <ReadDiary diary={diary} year={year} monthAndDay={monthAndDay} />
          ) : (
            <UpdateDiary year={year} monthAndDay={monthAndDay} diary={diary} />
          )
        ) : (
          <DiaryCreation
            year={year}
            monthAndDay={monthAndDay}
            formattedDate={formattedDate}
          />
        )}
      </div>
    </div>
  );
}
