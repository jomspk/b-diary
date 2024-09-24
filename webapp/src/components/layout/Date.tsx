type DateProps = {
  year: string | undefined;
  monthAndDay: string | undefined;
};

export default function Date({ year, monthAndDay }: DateProps) {
  return (
    <>
      <div className="space-y-2">
        <div className="text-sm">{year}</div>
        <div className="text-2xl font-bold">{monthAndDay}</div>
        <div>
          <div className="bg-orange-500 h-0.5 w-1/12"></div>
          <div className="bg-orange-500 h-px w-5/12"></div>
        </div>
      </div>
    </>
  );
}
