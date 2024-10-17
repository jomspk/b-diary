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
    <div className="p-4 bg-white rounded-md space-y-4">
      <div className="font-bold">履歴</div>
      {diarys.map((entry) => (
        <div key={entry.id}>
          <div className="bg-gray-300 h-px my-3"></div>
          <div className="flex space-x-4">
            <span className="text-sm font-medium">
              {new Date(entry.diaryDate)?.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <p className="text-sm">{truncateText(entry.content)}</p>
          </div>
        </div>
      ))}
      <div className="bg-gray-300 h-px my-3"></div>
    </div>
  );
}
