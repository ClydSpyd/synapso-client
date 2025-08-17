import { formatWeek } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export default function WeekHeader({
  weekIdx,
  setWeekIdx,
}: {
  weekIdx: number;
  setWeekIdx: (idx: number) => void;
}) {
  const handlePrevWeek = () => {
    setWeekIdx(weekIdx - 1);
  };
  const handleNextWeek = () => {
    if (weekIdx < 0) setWeekIdx(weekIdx + 1);
  };
  return (
    <div className="w-full flex items-center justify-between py-2 px-4 border border-slate-100 rounded-lg  shadow-sm bg-white">
      <div className="flex items-center gap-1">
        <BiChevronLeft
          className="text-3xl text-indigo-600 cursor-pointer"
          onClick={handlePrevWeek}
        />
        <p className="font-semibold w-[200px] text-center text-slate-500">
          Week of {formatWeek(weekIdx)}
        </p>
        <BiChevronRight
          className={cn("text-3xl text-indigo-600 cursor-pointer", {
            "opacity-40 cursor-not-allowed": weekIdx >= 0,
          })}
          onClick={handleNextWeek}
        />
      </div>
      <div className="flex gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="w-[50px] text-center text-sm font-semibold text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
