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
};

export default function DiaryHistory({ diarys }: Readonly<DiaryHistoryProps>) {
  const locale = useLocale();
  const t = useTranslations("diary");
  const truncateText = (text: string) => {
    return text.length > previewDiaryMaxLength
      ? text.substring(0, previewDiaryMaxLength) + "..."
      : text;
  };

  return (
    <div className="py-[48px] px-[24px] bg-white rounded-md">
      <div className="font-bold text-xl mb-[24px]">{t("history")}</div>
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
  );
}
