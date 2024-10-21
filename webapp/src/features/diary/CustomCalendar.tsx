"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DateString } from "@/gql/__generated__/graphql";

type CustomCalendarProps = {
  date: Date | undefined;
  setDate: (date: Date) => void;
  monthEntries: {
    id: string;
    title: string;
    content: string;
    diaryDate: DateString;
  }[];
};

const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"];

export default function CustomCalendar({
  date,
  setDate,
  monthEntries,
}: CustomCalendarProps) {
  if (!date) {
    return null;
  }
  //   const highlightedDates = [new Date(2023, 5, 15), new Date(2023, 5, 20)]; // 例: 6月15日と20日
  const highlightedDates = monthEntries.map(
    (entry) => new Date(entry.diaryDate)
  );

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-[32px] w-[32px] m-auto"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected =
        date && currentDate.toDateString() === date.toDateString();
      const isHighlighted = highlightedDates.some(
        (d) => d.toDateString() === currentDate.toDateString()
      );

      days.push(
        <div
          key={day}
          className={`flex items-center justify-center rounded-full cursor-pointer h-[32px] w-[32px] m-auto
            ${isToday ? "bg-primary text-white" : ""}
            ${isSelected ? "border-2 border-primary" : ""}
            ${isHighlighted ? "bg-primary/20" : ""}
          `}
          onClick={() => setDate(currentDate)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + increment, 1));
  };

  const changeYear = (increment: number) => {
    setDate(new Date(date.getFullYear() + increment, date.getMonth(), 1));
  };

  return (
    <div className="h-[420px] w-full max-w-md mx-auto py-[48px] px-[17px] bg-white rounded-lg shadow">
      <div className="flex justify-between flex-col items-center mb-[24px] space-y-[10px]">
        <div className="flex justify-between items-center w-full max-w-[160px]">
          <Button variant="ghost" size="icon" onClick={() => changeYear(-1)}>
            <Image
              src="/arrow.svg"
              alt="琥珀"
              width={19}
              height={13}
              className="h-[19px] w-[13px]"
            />
          </Button>
          <span className="font-bold text-xl">
            {date.toLocaleString("ja-JP", { year: "numeric" })}
          </span>
          <Button variant="ghost" size="icon" onClick={() => changeYear(1)}>
            <Image
              src="/arrow.svg"
              alt="琥珀"
              width={19}
              height={13}
              className="h-[19px] w-[13px] rotate-180"
            />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full max-w-[160px]">
          <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)}>
            <Image
              src="/arrow.svg"
              alt="琥珀"
              width={19}
              height={13}
              className="h-[19px] w-[13px]"
            />
          </Button>
          <span className="font-bold text-xl">
            {date.toLocaleString("ja-JP", { month: "long" })}
          </span>
          <Button variant="ghost" size="icon" onClick={() => changeMonth(1)}>
            <Image
              src="/arrow.svg"
              alt="琥珀"
              width={19}
              height={13}
              className="h-[19px] w-[13px] rotate-180"
            />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-[24px] mb-[8px]">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center font-medium text-primary h-[32px] w-[32px]"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-[8px] gap-x-[24px]">
        {renderCalendar()}
      </div>
    </div>
  );
}
