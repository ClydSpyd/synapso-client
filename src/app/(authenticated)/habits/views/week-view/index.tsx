import { useState } from "react";
import WeekHeader from "./week-header";
import { useHabits } from "@/queries/useHabits";
import WeekBlock from "./week-block";
import StaggerContainer from "@/components/utility-comps/stagger-container";

// YYY-MM-DD format for the start of the week
const getMondayOfWeek = (weekOffset: number) => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);
  const yyyy = monday.getFullYear();
  const mm = String(monday.getMonth() + 1).padStart(2, "0");
  const dd = String(monday.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// array YYYY-DD-MM format for the week
const getDatesOfWeek = (weekOffset: number) => {
  const dates: string[] = [];
  const monday = new Date(getMondayOfWeek(weekOffset));
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
  }
  return dates;
}

export default function WeekView() {
  const [weekIdx, setWeekIdx] = useState<number>(0);

  const { data: habitsData } = useHabits({
    withActivity: true,
    dateRange: 7,
    startDate: getMondayOfWeek(weekIdx),
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <WeekHeader weekIdx={weekIdx} setWeekIdx={setWeekIdx} />
      <div className="flex flex-col gap-3">
        {habitsData?.map((habit) => (
          <StaggerContainer key={habit.id}>
            <WeekBlock
              key={habit.id}
              habitData={habit}
              dates={getDatesOfWeek(weekIdx)}
            />
          </StaggerContainer>
        ))}
      </div>
    </div>
  );
}
