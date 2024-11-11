import { DateString } from "@/gql/__generated__/graphql";
import { useLocale, useTranslations } from "next-intl";

const previewDiaryMaxLength = 10;

type DiaryHistoryProps = {
  diarys: {
    id: string;
    title: string;
    content: string;
    diaryDate: DateString;
  }[];
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
};

export default function DiaryHistory({
  diarys,
  onOpen,
  setOnOpen,
}: Readonly<DiaryHistoryProps>) {
  const locale = useLocale();
  const t = useTranslations("diary");
  const truncateText = (text: string) => {
    return text.length > previewDiaryMaxLength
      ? text.substring(0, previewDiaryMaxLength) + "..."
      : text;
  };

  return (
    <button
      className={`${onOpen ? "py-[48px] flex-1" : "py-[8px]"} md:py-[48px] px-[24px] bg-white rounded-md`}
      onClick={() => setOnOpen(!onOpen)}
    >
      <div className="font-bold text-xl">{t("history")}</div>
      <div
        className={`${onOpen ? "h-auto mt-[24px]" : "h-0"} md:mt-[24px] overflow-hidden md:h-auto transition-all duration-300 ease-in-out`}
      >
        {diarys.map((entry) => (
          <div key={entry.id}>
            <div className="bg-gray-300 h-px my-[8px]"></div>
            <div className="flex space-x-4 items-center">
              <span className="text-xs font-medium">
                {new Date(entry.diaryDate)?.toLocaleDateString(locale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <p className="text-base">{truncateText(entry.content)}</p>
            </div>
          </div>
        ))}
        <div className="bg-gray-300 h-px my-[8px]"></div>
      </div>
    </button>
  );
}
