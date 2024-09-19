"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CustomCalendarProps = {
  date: Date | undefined;
  setDate: (date: Date) => void;
  monthEntries: { date: Date; content: string }[];
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
  const highlightedDates = monthEntries.map((entry) => entry.date);

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
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
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
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer
            ${isToday ? "bg-orange-500 text-white" : ""}
            ${isSelected ? "border-2 border-orange-500" : ""}
            ${isHighlighted ? "bg-orange-200" : ""}
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
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between flex-col items-center mb-4 space-y-2">
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={() => changeYear(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {date.toLocaleString("ja-JP", { year: "numeric" })}
          </span>
          <Button variant="outline" size="icon" onClick={() => changeYear(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {date.toLocaleString("ja-JP", { month: "long" })}
          </span>
          <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center font-semibold text-orange-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
    </div>
  );
}
