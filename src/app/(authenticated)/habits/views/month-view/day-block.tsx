import { colorCombos } from "@/config/color-config";
import DayItem from "./day-item";

export default function DayBlock({
  habitData,
  date,
  highlightHabit,
  idx,
  hoveredItem,
  setHoveredItem,
  count
}: {
  date: string;
  habitData: HabitActivity[];
  highlightHabit: string | null;
  idx: number;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  count: number;
}) {
  const highlightedData = !!highlightHabit
    ? habitData.find((h) => h.id === highlightHabit)
    : null;

  const highlightBlock = highlightedData?.records.find((r) => r === date);
  const highlightColorConfig = highlightedData
    ? colorCombos[highlightedData.colorScheme]
    : null;
    
  return (
    <div
      className="flex flex-wrap justify-center items-center max-w-30 gap-1 border border-slate-200/70 py-2 rounded-lg relative min-h-20"
      style={{
        ...(highlightBlock && {
          borderColor: highlightColorConfig?.accentColor,
        }),
        gridTemplateColumns: `repeat(${2}, minmax(0, 1fr))`,
      }}
    >
      <div
        className="h-[20px] w-[20px] rounded-md absolute top-[-8px] right-[-8px] flex items-center justify-center z-20 bg-gray-300 text-white"
        style={
          highlightBlock
            ? {
                color: highlightColorConfig?.mainColor,
                backgroundColor: highlightColorConfig?.accentColor,
                border: `1px solid ${highlightColorConfig?.hintColor}`,
              }
            : {}
        }
      >
        <p className="text-xs font-bold">{idx + 1}</p>
      </div>
      {habitData.length > 0
        ? habitData
            .filter(
              (habit: HabitActivity) =>
                new Date(habit.enabledAt) <= new Date(date) &&
                (!habit.disabledAt ||
                  new Date(habit.disabledAt) > new Date(date))
            )
            .map((habit: HabitActivity, idx: number) => (
              <DayItem
                key={habit.id}
                habit={habit}
                date={date}
                highlightHabit={highlightHabit}
                idx={idx}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            ))
        : Array.from({ length: 4 }).map((_, index) => (
            <div className="w-11 h-11 border rounded-sm" style={{
              borderColor: colorCombos[index % colorCombos.length].accentColor + 30,
              backgroundColor: colorCombos[index % colorCombos.length].hintColor + 50,
            }} key={index} />
          ))}
    </div>
  );
}