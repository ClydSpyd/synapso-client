/* eslint-disable react-hooks/exhaustive-deps */
import { useHabits } from "@/queries/useHabits";
import { cn } from "@/lib/utils";
import DayBlock from "./day-block";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { useEffect, useState } from "react";
import HabitToggles from "./habit-toggles";
import { getMonthData } from "@/lib/dates";

export default function MonthView() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const { data } = useHabits({
    withActivity: true,
    startDate: new Date(year, month, 1).toISOString().slice(0, 10), // "yyyy-mm-dd"
    dateRange: 31,
  });

  const [highlightHabit, setHighlightHabit] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [displayHabits, setDisplayHabits] = useState<string[]>(
    data?.map((habit) => habit.id) ?? []
  );

  useEffect(() => {
    if (data && displayHabits.length === 0) {
      setDisplayHabits(data.map((habit) => habit.id));
    }
  }, [data]);

  const handleMonthArrow = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setMonth((prev) => (prev === 0 ? 11 : prev - 1));
      setYear((prev) => (month === 0 ? prev - 1 : prev));
    } else {
      setMonth((prev) => (prev === 11 ? 0 : prev + 1));
      setYear((prev) => (month === 11 ? prev + 1 : prev));
    }
  };

  const currentMonthSelected =
    year === new Date().getFullYear() && month === new Date().getMonth();

  const monthData: MonthConfig = getMonthData(year, month);
  const daysInMonth = monthData.dates.length;
  const totalCells = monthData.firstDay + daysInMonth;
  const emptyEndCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7) + 1;

  return (
    <div className="w-full flex flex-col gap-4 pb-10">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-center items-center gap-1">
          <BiChevronLeft
            className={cn("text-3xl text-indigo-600 cursor-pointer")}
            onClick={() => handleMonthArrow("prev")}
          />
          <p className="font-semibold w-[200px] text-center text-slate-500">
            {new Date(year, month).toLocaleString("default", {
              month: "long",
            })}
            , {year}
          </p>
          <BiChevronRight
            className={cn("text-3xl text-indigo-600 cursor-pointer", {
              "opacity-40 pointer-events-none": currentMonthSelected,
            })}
            onClick={() => handleMonthArrow("next")}
          />
        </div>
        <div className="grow flex gap-2">
          <HabitToggles
            displayHabits={displayHabits}
            setDisplayHabits={setDisplayHabits}
            setHighlightHabit={setHighlightHabit}
          />
          <div className="w-full grid grid-cols-7 p-6 pt-3 gap-[10px] shadow-md rounded-xl border border-slate-200 bg-white">
            <div className="text-center text-xs font-semibold text-gray-500">
              MON
            </div>
            <div className="text-center text-xs font-semibold text-gray-500">
              TUES
            </div>
            <div className="text-center text-xs font-semibold text-gray-500">
              WED
            </div>
            <div className="text-center text-xs font-semibold text-gray-500">
              THU
            </div>
            <div className="text-center text-xs font-semibold text-gray-500">
              FRI
            </div>
            <div className="text-center text-xs font-semibold text-gray-500">
              SAT
            </div>
            <div className="text-center text-xs font-semibold text-gray-500">
              SUN
            </div>
            {monthData.firstDay - 1 < 7 &&
              Array.from({ length: monthData.firstDay - 1 }).map((_, index) => (
                <div
                  key={"empty-before-" + index}
                  className="flex flex-wrap justify-center max-w-30 gap-1 border border-slate-200/70 bg-gray-50/30 py-2 rounded-lg relative"
                  style={{
                    gridTemplateColumns: `repeat(${2}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="w-[20px]" />
                  <div className="w-[20px]" />
                </div>
              ))}
            {monthData.dates.map((date, idx) => (
              <StaggerContainer key={"date-" + idx}>
                <DayBlock
                  idx={idx}
                  date={date}
                  habitData={
                    data?.filter((habit) => displayHabits.includes(habit.id)) ??
                    []
                  }
                  highlightHabit={highlightHabit}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  count={displayHabits.length}
                />
              </StaggerContainer>
            ))}
            {emptyEndCount < 7 &&
              Array.from({ length: emptyEndCount }).map((_, index) => (
                <div
                  key={"empty-after-" + index}
                  className="flex flex-wrap justify-center max-w-30 gap-1 border border-slate-200/70 bg-gray-50/30 py-2 rounded-lg relative"
                  style={{
                    gridTemplateColumns: `repeat(${2}, minmax(0, 1fr))`,
                  }}
                >
                  <div className="w-[20px]" />
                  <div className="w-[20px]" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
