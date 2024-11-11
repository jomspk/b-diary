import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Claims } from "@auth0/nextjs-auth0";
import CustomCalendarMonth from "./CustomCalendarMonth";

type CustomCalendarProps = {
  user: Claims | undefined;
  date: Date;
  setDate: (date: Date) => void;
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
};

export default function CustomCalendar({
  user,
  date,
  setDate,
  onOpen,
  setOnOpen,
}: Readonly<CustomCalendarProps>) {
  const locale = useLocale();
  const t = useTranslations("diary");
  const WEEKDAYS = [
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
    t("sunday"),
  ];
  const [today, setToday] = useState<Date | null>(null);
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
  const firebaseUid = user?.sub ? user.sub : "";

  useEffect(() => {
    setToday(new Date());
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo(0, 395);
    }
  }, [isMobile, containerRef, date]);

  const addMonthAtTop = useCallback(() => {
    setDisplayedMonths((prevMonths) => [
      new Date(prevMonths[0].getFullYear(), prevMonths[0].getMonth() - 1, 1),
      ...prevMonths,
    ]);
    if (containerRef.current !== null) {
      containerRef.current.scrollTo(0, 365);
    }
  }, []);

  const addMonthAtBottom = useCallback(() => {
    setDisplayedMonths((prevMonths) => [
      ...prevMonths,
      new Date(
        prevMonths[prevMonths.length - 1].getFullYear(),
        prevMonths[prevMonths.length - 1].getMonth() + 1,
        1
      ),
    ]);
  }, []);

  const changeMonth = useCallback(
    (increment: number) => {
      if (date) {
        setDate(new Date(date.getFullYear(), date.getMonth() + increment, 1));
      }
    },
    [date, setDate]
  );

  useEffect(() => {
    if (isMobile && loadMoreRefT.current && loadMoreRefB.current) {
      const observerT = new IntersectionObserver(([entry]) => {
        if (
          entry.isIntersecting &&
          onOpen &&
          containerRef.current &&
          containerRef.current.scrollTop < 365
        ) {
          addMonthAtTop();
        }
      });
      const observerB = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && onOpen) {
          addMonthAtBottom();
        }
      });

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

  const changeYear = (currentDate: Date, increment: number) => {
    setDate(
      new Date(currentDate.getFullYear() + increment, currentDate.getMonth(), 1)
    );
  };

  return isMobile ? (
    <div
      className={`${onOpen ? "pt-[48px] flex-1" : "py-[8px]"} w-full max-w-md mx-auto bg-white rounded-lg shadow transition-all duration-300 ease-in-out`}
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeYear(displayedMonths[1], -1)}
          >
            <Image
              src="/arrow.svg"
              alt="琥珀"
              width={19}
              height={13}
              className="h-[19px] w-[13px]"
            />
          </Button>
          <span className="font-bold text-xl">
            {displayedMonths[1].toLocaleString("ja-JP", { year: "numeric" })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeYear(displayedMonths[1], 1)}
          >
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
          className="flex-grow overflow-y-scroll overflow-x-hidden hidden-scrollbar"
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
                <CustomCalendarMonth
                  displayDate={displayDate}
                  today={today}
                  date={date}
                  setDate={setDate}
                  firebaseUid={firebaseUid}
                />
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeYear(date, -1)}
          >
            <Image
              src="/arrow.svg"
              alt="琥珀"
              width={19}
              height={13}
              className="h-[19px] w-[13px]"
            />
          </Button>
          <span className="font-bold text-xl">
            {date.toLocaleString(locale, { year: "numeric" })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeYear(date, 1)}
          >
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
            {date.toLocaleString(locale, { month: "long" })}
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
        <CustomCalendarMonth
          displayDate={date}
          today={today}
          date={date}
          setDate={setDate}
          firebaseUid={firebaseUid}
        />
      </div>
    </div>
  );
}
