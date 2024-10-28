import Image from "next/image";
import { Button } from "@/components/ui/button";
import { gql } from "@/gql/__generated__";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GetDiariesQuery, TimeString } from "@/gql/__generated__/graphql";
import { getSession } from "@auth0/nextjs-auth0";

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

type CustomCalendarProps = {
  today: Date;
  date: Date;
  setDate: (date: Date) => void;
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
};

const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"];

export default async function CustomCalendar({
  today,
  date,
  setDate,
  onOpen,
  setOnOpen,
}: CustomCalendarProps) {
  const session = await getSession();
  const user = session?.user;
  const [isMobile, setIsMobile] = useState(false);
  const [displayedMonths, setDisplayedMonths] = useState<Date[]>([]);

  useEffect(() => {
    if (date) {
      setDisplayedMonths([
        new Date(date.getFullYear(), date.getMonth() - 1, 1),
        date,
        new Date(date.getFullYear(), date.getMonth() + 1, 1),
      ]);
    }
  }, [date]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRefT = useRef<HTMLDivElement | null>(null);
  const loadMoreRefB = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo(0, 395);
    }
  }, [isMobile, onOpen, containerRef]);

  const addMonthAtTop = useCallback(() => {
    setDisplayedMonths((prevMonths) => [
      new Date(prevMonths[0].getFullYear(), prevMonths[0].getMonth() - 1, 1),
      ...prevMonths,
    ]);
    if (containerRef.current !== null) {
      containerRef.current.scrollTo(0, 365);
    }
  }, [date]);

  const addMonthAtBottom = useCallback(() => {
    setDisplayedMonths((prevMonths) => [
      ...prevMonths,
      new Date(
        prevMonths[prevMonths.length - 1].getFullYear(),
        prevMonths[prevMonths.length - 1].getMonth() + 1,
        1
      ),
    ]);
  }, [date]);

  const changeMonth = useCallback(
    (increment: number) => {
      if (date) {
        setDate(new Date(date.getFullYear(), date.getMonth() + increment, 1));
      }
    },
    [date, setDate]
  );

  useEffect(() => {
    console.log(
      loadMoreRefT.current,
      loadMoreRefB.current,
      containerRef.current
    );

    if (isMobile && loadMoreRefT.current && loadMoreRefB.current) {
      const observerT = new IntersectionObserver(
        ([entry]) => {
          console.log(containerRef.current?.scrollTop);
          if (
            entry.isIntersecting &&
            onOpen &&
            containerRef.current &&
            containerRef.current.scrollTop < 365
          ) {
            addMonthAtTop();
          }
        },
        { rootMargin: "0px", threshold: 1.0 }
      );
      const observerB = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && onOpen) {
            addMonthAtBottom();
          }
        },
        { rootMargin: "0px", threshold: 1.0 }
      );

      observerT.observe(loadMoreRefT.current);
      observerB.observe(loadMoreRefB.current);

      return () => {
        observerT.disconnect();
        observerB.disconnect();
      };
    }
  }, [isMobile, onOpen, addMonthAtTop, addMonthAtBottom]);

  if (!date) {
    return null;
  }

  const changeYear = (increment: number) => {
    setDate(new Date(date.getFullYear() + increment, date.getMonth(), 1));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = (displayDate: Date) => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // const firebaseUid = user?.sub ? user.sub : "";
    // console.log(displayDate);
    // const { data } = useSuspenseQuery(Query, {
    //   variables: {
    //     input: {
    //       date: new Date(
    //         Date.UTC(displayDate.getFullYear(), displayDate.getMonth(), 1)
    //       ).toISOString() as TimeString,
    //       firebaseUid: firebaseUid,
    //     },
    //   },
    // });

    const data: GetDiariesQuery = { diaries: [] };
    const highlightedDates = data.diaries.map(
      (entry) => new Date(entry.diaryDate)
    );

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}-${month}`}
          className="h-[32px] w-[32px] m-auto"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected =
        date && currentDate.toDateString() === date.toDateString();
      const isHighlighted = highlightedDates.some(
        (d) => d.toDateString() === currentDate.toDateString()
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

  return isMobile ? (
    <div
      className={`${onOpen ? "pt-[48px] flex-1" : "py-[8px]"} w-full max-w-md mx-auto bg-white rounded-lg shadow overflow-y-scroll transition-all duration-300 ease-in-out`}
    >
      {!onOpen ? (
        <div
          className="font-bold text-xl px-[24px]"
          onClick={() => setOnOpen(!onOpen)}
        >
          カレンダー
        </div>
      ) : (
        <></>
      )}
      <div
        className={`${onOpen ? "h-[calc(100vh-330px)]" : "h-0"} px-[13px] overflow-hidden transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex m-auto justify-between w-[160px] pb-[24px]">
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
        <div
          className="flex-grow overflow-y-scroll overflow-x-hidden"
          ref={containerRef}
        >
          <div ref={loadMoreRefT} className="w-full"></div>
          {displayedMonths.map((displayDate, index) => (
            <div
              className="h-[365px] w-full max-w-md mx-auto mb-[24px] text-center"
              key={index}
            >
              <span className="font-bold text-xl">
                {displayDate.toLocaleString("ja-JP", { month: "long" })}
              </span>
              <div className="grid grid-cols-7 gap-x-[18px] mb-[24px] mt-[24px]">
                {WEEKDAYS.map((day) => (
                  <div
                    key={`${index}-${day}`}
                    className="text-center font-medium text-primary h-[32px] w-[32px]"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-[24px] gap-x-[18px]">
                {renderCalendar(displayDate)}
              </div>
            </div>
          ))}
          <div ref={loadMoreRefB} className="w-full"></div>
        </div>
      </div>
    </div>
  ) : (
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
        {renderCalendar(date)}
      </div>
    </div>
  );
}
