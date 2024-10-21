import { DateString } from "@/gql/__generated__/graphql";

const previewDiaryMaxLength = 10;

type DiaryHistoryProps = {
  diarys: {
    id: string;
    title: string;
    content: string;
    diaryDate: DateString;
  }[];
};

export default function DiaryHistory({ diarys }: DiaryHistoryProps) {
  const truncateText = (text: string) => {
    return text.length > previewDiaryMaxLength
      ? text.substring(0, previewDiaryMaxLength) + "..."
      : text;
  };

  return (
    <div className="py-[48px] px-[24px] bg-white rounded-md">
      <div className="font-bold text-xl mb-[24px]">履歴</div>
      {diarys.map((entry) => (
        <div key={entry.id}>
          <div className="bg-gray-300 h-px my-[8px]"></div>
          <div className="flex space-x-4 items-center">
            <span className="text-xs font-medium">
              {new Date(entry.diaryDate)?.toLocaleDateString("ja-JP", {
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
