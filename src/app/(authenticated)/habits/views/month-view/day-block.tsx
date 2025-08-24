import { colorCombos } from "@/config/color-config";
import DayItem from "./day-item";
import { strToNumVal } from "@/lib/utils";

export default function DayBlock({
  habitData,
  date,
  highlightHabit,
  idx,
  hoveredItem,
  setHoveredItem
}: {
  date: string;
  habitData: HabitActivity[];
  highlightHabit: string | null;
  idx: number;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
}) {
  const highlightedData = !!highlightHabit
    ? habitData.find((h) => h.id === highlightHabit)
    : null;

  const highlightBlock = highlightedData?.records.find((r) => r === date);
  const highlightColorConfig = highlightedData
    ? colorCombos[strToNumVal(highlightedData.title) % colorCombos.length]
    : null;
  return (
    <div
      className="flex flex-wrap justify-center max-w-30 gap-1 border border-slate-200/70 py-2 rounded-lg relative"
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
                border: `1px solid ${highlightColorConfig?.hintColor}`
              }
            : {}
        }
      >
        <p className="text-xs font-bold">{idx + 1}</p>
      </div>
      {habitData.map((habit: HabitActivity, idx: number) => (
        <DayItem
          key={habit.id}
          habit={habit}
          date={date}
          highlightHabit={highlightHabit}
          idx={idx}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      ))}
    </div>
  );
}