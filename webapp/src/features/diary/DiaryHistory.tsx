import { gql } from "@/gql/__generated__";
import { useSuspenseQuery } from "@apollo/client";

const previewDiaryMaxLength = 10;

const Query = gql(/* GraphQL */ `
  query getDiaryHistory($firebaseUid: String!) {
    diaryHistory(firebaseUid: $firebaseUid) {
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
export default function DiaryHistory({ firebaseUid }: { firebaseUid: string }) {
  const truncateText = (text: string) => {
    return text.length > previewDiaryMaxLength
      ? text.substring(0, previewDiaryMaxLength) + "..."
      : text;
  };
  const { data } = useSuspenseQuery(Query, {
    variables: { firebaseUid: firebaseUid },
  });
  return (
    <div className="p-4 bg-white rounded-md space-y-4">
      <div className="font-bold">履歴</div>
      {data.diaryHistory.map((entry) => (
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
