import DayBlock from "./day-block";

export default function MonthGrid({ habitData }: { habitData: HabitActivity[] }) {
  return (
    <div className="w-full grid grid-cols-7 gap-2 shadow-md p-6 rounded-xl border border-slate-200">
      {Array.from({ length: 31 }).map((_, index) => (
        // <div
        //   key={index}
        //   className="h-16 w-full flex items-center justify-center border border-indigo-200 rounded-lg"
        // >
        //   {index + 1}
        // </div>
        <DayBlock
          key={"hello" + index}
          date={String(index)}
          habitData={habitData}
        />
      ))}
    </div>
  );
}
