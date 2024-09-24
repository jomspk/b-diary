import { TimeString } from "@/gql/__generated__/graphql";
import Date from "@/components/layout/Date";

type ReadDiaryProps = {
  results: {
    id: string;
    title: string;
    content: string;
    createdAt: TimeString;
  }[];
  year: string | undefined;
  monthAndDay: string | undefined;
};

export default function ReadDiary({
  results,
  year,
  monthAndDay,
}: ReadDiaryProps) {
  return (
    <div className="p-10 flex flex-col space-y-4 flex-grow">
      <Date year={year} monthAndDay={monthAndDay} />
      {results.map((diary) => (
        <div key={diary.id} className="flex flex-col space-y-4">
          <div className="text-2xl font-bold">{diary.title}</div>
          {diary.content}
        </div>
      ))}
    </div>
  );
}
