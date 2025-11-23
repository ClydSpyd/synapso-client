import Icon from "@/components/icon-picker/icon";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { colorCombos, disabledColorCombo } from "@/config/color-config";
import { useHabits } from "@/queries/useHabits";
import { useModalStore } from "@/stores/modal-store";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";

export default function HabitToggles({
  displayHabits,
  setDisplayHabits,
  setHighlightHabit,
  month,
  year,
}: {
  displayHabits: string[];
  setDisplayHabits: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightHabit: React.Dispatch<React.SetStateAction<string | null>>;
  month: number;
  year: number;
}) {
  const { data } = useHabits({ withActivity: false });
  const { open } = useModalStore();

  const handleHabitClick = (habit: Habit) => {
    open({ type: "habit", payload: habit });
  };

  return (
    data && (
      <div className="w-[300px] bg-white border border-slate-200 rounded-xl shadow-md gap-2 p-4 flex flex-col justify-start relative">
        <h3 className="text-slate-400 text-sm font-semibold">
          Show/hide habits:
        </h3>
        <div className="w-full gap-1 flex flex-col justify-start sticky top-2">
            {data
              .filter((habit) => {
              // show habits that are not disabled during the current month and were enabled before the start of the current month
              const startOfMonth = new Date(year, month, 1);
              const endOfMonth = new Date(year, month + 1, 0);
              const enabledDate = habit.enabledAt ? new Date(habit.enabledAt) : null;
              if (enabledDate && enabledDate > endOfMonth) return false;
              if (!habit.disabledAt) return true;
              const disabledDate = new Date(habit.disabledAt);
              return disabledDate >= startOfMonth;
              })
              .map((habit: Habit, idx: number) => {
              const handleClick = () => {
                setHighlightHabit(null);
                setDisplayHabits((prev) =>
                prev.includes(habit.id)
                  ? prev.filter((h) => h !== habit.id)
                  : [...prev, habit.id]
                );
              };
              const colorConfig = displayHabits.includes(habit.id)
                ? colorCombos[habit.colorScheme]
                : disabledColorCombo;

              return (
                <React.Fragment key={habit.id + idx}>
                <StaggerContainer className="h-fit relative group">
                  <div
                  key={habit.id + idx}
                  onClick={handleClick}
                  onMouseOver={() =>
                    displayHabits.includes(habit.id) &&
                    setHighlightHabit(habit.id)
                  }
                  onMouseLeave={() => setHighlightHabit(null)}
                  className="flex gap-2 items-center rounded-xl border p-2 cursor-pointer hover:shadow-sm"
                  style={{
                    borderColor: colorConfig.accentColor,
                    backgroundColor: displayHabits.includes(habit.id)
                    ? colorConfig.hintColor
                    : "transparent",
                  }}
                  >
                  <div
                    className="absolute top-2 right-2"
                    onMouseOver={() => setHighlightHabit(null)}
                    onClick={(e) => {
                    e.stopPropagation();
                    setHighlightHabit(null);
                    handleHabitClick(habit);
                    }}
                  >
                    <BiSolidEdit
                    className="text-md cursor-pointer transition opacity-0 group-hover:opacity-100"
                    style={{
                      color: colorConfig.mainColor,
                    }}
                    />
                  </div>
                  <div
                    className="h-12 w-12 rounded-lg flex items-center justify-center "
                    style={{
                    backgroundColor: colorConfig.accentColor,
                    }}
                  >
                    <Icon
                    name={habit.icon}
                    className="w-[32px] h-[32px]"
                    style={{
                      color: colorConfig.mainColor,
                    }}
                    />
                  </div>
                  <div>
                    <h1
                    style={{
                      color: colorConfig.mainColor,
                      fontWeight: 700,
                    }}
                    >
                    {habit.title}
                    </h1>
                    <p className="text-xs text-slate-400">
                    {habit.target}x per week
                    </p>
                  </div>
                  </div>
                </StaggerContainer>
                </React.Fragment>
              );
              })}
        </div>
      </div>
    )
  );
}
