import React from "react";
import { useQuery } from "@apollo/client";
import { TimeString } from "@/gql/__generated__/graphql";
import { gql } from "@/gql/__generated__";

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

type CustomCalendarMonthProps = {
  displayDate: Date;
  today: Date;
  date: Date;
  setDate: (date: Date) => void;
  firebaseUid: string;
};

const CustomCalendarMonth: React.FC<CustomCalendarMonthProps> = ({
  displayDate,
  today,
  date,
  setDate,
  firebaseUid,
}) => {
  const { year, month } = {
    year: displayDate.getFullYear(),
    month: displayDate.getMonth(),
  };

  const { data } = useQuery(Query, {
    variables: {
      input: {
        date: new Date(Date.UTC(year, month, 1)).toISOString() as TimeString,
        firebaseUid,
      },
    },
  });

  const highlightedDates =
    data?.diaries.map((entry) => new Date(entry.diaryDate)) || [];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const renderEmptyDays = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={`empty-${i}-${month}`}
        className="h-[32px] w-[32px] m-auto"
      ></div>
    ));

  const renderDays = () => {
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday =
        today && currentDate.toDateString() === today.toDateString();
      const isSelected =
        date && currentDate.toDateString() === date.toDateString();
      const isHighlighted = highlightedDates.some(
        (d) => d && d.toDateString() === currentDate.toDateString()
      );

      days.push(
        <div
          key={`${day}-${month}`}
          className={`flex items-center justify-center rounded-full cursor-pointer h-[32px] w-[32px] m-auto
              ${isToday ? "bg-primary text-white" : ""}
              ${isSelected ? "border-2 border-primary" : ""}
              ${isHighlighted && !isToday ? "bg-primary/20" : ""}
            `}
          onClick={() => setDate(currentDate)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <>
      {renderEmptyDays(firstDay)}
      {renderDays()}
    </>
  );
};

export default CustomCalendarMonth;
