"use client";

import { useMemo, useState } from "react";
import CustomCalendar from "@/features/diary/CustomCalendar";
import DiaryCreation from "@/features/diary/DiaryCreation";
import { UpdateDiary } from "@/features/diary/UpdateDiary";
import DiaryHistory from "@/features/diary/DiaryHistory";
import ReadDiary from "@/features/diary/ReadDiary";
import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";
import { TimeString } from "@/gql/__generated__/graphql";
import { Claims } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";

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

const HistoryQuery = gql(/* GraphQL */ `
  query getDiaryHistory($firebaseUid: String!) {
    diaryHistory(firebaseUid: $firebaseUid) {
      id
      title
      content
      diaryDate
    }
  }
`);

type DiaryPageProps = {
  user: Claims | undefined;
};

export default function DiaryPage({ user }: DiaryPageProps) {
  const locale = useLocale();
  const [date, setDate] = useState<Date>(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  const formattedDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  const currentYearMonth = useMemo(() => {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), 1)
    ).toISOString();
  }, [date]);

  const firebaseUid = user?.sub ? user.sub : "";
  const year = date.toLocaleDateString(locale, { year: "numeric" });
  const monthAndDay = date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
  });

  const { data, refetch } = useSuspenseQuery(Query, {
    variables: {
      input: { date: currentYearMonth as TimeString, firebaseUid: firebaseUid },
    },
  });

  const { data: historyData, refetch: historyRefetch } = useSuspenseQuery(
    HistoryQuery,
    {
      variables: { firebaseUid: firebaseUid },
    }
  );

  const diary = useMemo(() => {
    return data.diaries.find((diary) => {
      return new Date(diary.diaryDate).toDateString() === date.toDateString();
    });
  }, [data, date]);

  const onReload = async () => {
    await refetch();
    await historyRefetch();
  };

  return (
    <div className="min-h-full flex">
      <div
        className={`bg-[url('/kohaku_background.jpg')] bg-cover bg-center flex-initial max-w-[464px] absolute md:relative h-screen overflow-x-hidden w-full sm:w-auto origin-left ${menuOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} z-50 md:scale-x-100 md:opacity-100 md:w-full transition-all duration-300 ease-in-out overflow-scroll	`}
      >
        <div className="bg-white/75 w-full min-h-screen px-[16px] pb-[16px] pt-[56px] sm:p-[24px] space-y-[24px]">
          <div className="flex flex-row justify-between">
            <Image
              className="md:hidden"
              src="/logo.svg"
              alt="琥珀"
              width={48}
              height={48}
            />
            <Image
              className="hidden md:block"
              src="/logo_text.svg"
              alt="琥珀"
              width={160}
              height={48}
            />
            <button onClick={() => setMenuOpen(false)} className="md:hidden">
              <X className="h-[32px] w-[32px]" />
            </button>
          </div>
          <CustomCalendar
            date={date}
            setDate={setDate}
            monthEntries={data.diaries}
          />
          <DiaryHistory diarys={historyData.diaryHistory} />
        </div>
      </div>
      <div className="col-span-3 md:col-span-2 flex-1 flex flex-col pt-[84px] items-center">
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden absolute top-[20px] left-[20px] md:top-[40px] md:left-[40px]"
        >
          <Menu className="h-[24px] w-[24px]" />
        </button>
        {diary ? (
          diary.saveToBcAt ? (
            <ReadDiary diary={diary} year={year} monthAndDay={monthAndDay} />
          ) : (
            <UpdateDiary
              year={year}
              monthAndDay={monthAndDay}
              diary={diary}
              onReload={onReload}
            />
          )
        ) : (
          <DiaryCreation
            year={year}
            monthAndDay={monthAndDay}
            formattedDate={formattedDate}
            onReload={onReload}
          />
        )}
      </div>
    </div>
  );
}
