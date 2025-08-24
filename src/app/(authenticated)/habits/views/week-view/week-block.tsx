import Icon from "@/components/icon-picker/icon";
import { colorCombos } from "@/config/color-config";
import { cn, strToNumVal } from "@/lib/utils";
import DayToggle from "./day-toggle";
import { useMemo, useState } from "react";
import CircleTick from "@/components/ui/circle-tick";

const successColorCombo: ColorCombo = {
  mainColor: "#84cc16",    // lime-500
  accentColor: "#d9f99d",  // lime-200
  hintColor: "rgba(247, 254, 231, 0.5)", // lime-100 at 50% opacity
}

export default function WeekBlock({
  habitData,
  dates,
}: {
  habitData: HabitActivity;
  dates: string[];
}) {
  const [localRecords, setLocalRecords] = useState<string[]>(habitData.records);

  const colorConfig =
    colorCombos[strToNumVal(habitData.title) % colorCombos.length];

  const goalReached = useMemo(
    () => localRecords.length >= habitData.target,
    [localRecords, habitData.target]
  );

  return (
    habitData && (
      <div
        className={cn(
          "w-full flex items-center justify-between py-6 px-4 border bg-white rounded-lg shadow-sm relative",
          {
            "pulse-once-sm": goalReached,
          }
        )}
        style={{
          backgroundColor: goalReached
            ? successColorCombo.hintColor
            : colorConfig.hintColor,
          borderColor: goalReached
            ? successColorCombo.accentColor
            : colorConfig.accentColor,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="h-18 w-18 rounded-lg flex items-center justify-center "
            style={{
              backgroundColor: goalReached
                ? successColorCombo.accentColor
                : colorConfig.accentColor,
            }}
          >
            {goalReached && (
              <span
                className="pulse-once top-[-10px] right-[-10px] absolute flex items-center justify-center rounded-full"
                // style={{
                //   backgroundColor: successColorCombo.mainColor,
                // }}
              >
                {/* <FaCheck
                className="w-[13px] h-[13px]"
                style={{
                  color: successColorCombo.accentColor,
                }}
              /> */}
                <CircleTick
                  height={28}
                  width={28}
                  color={successColorCombo.mainColor}
                />
              </span>
            )}
            <Icon
              name={habitData.icon}
              className="w-[42px] h-[42px]"
              style={{
                color: goalReached
                  ? successColorCombo.mainColor
                  : colorConfig.mainColor,
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl text-slate-600 flex items-center">
              {habitData.title}
              <span
                style={{
                  position: "relative",
                  marginTop: "4px",
                  marginLeft: "14px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  width: "fit-content",
                  fontWeight: "700",
                  fontSize: "12px",
                  backgroundColor: goalReached
                    ? successColorCombo.accentColor
                    : colorConfig.accentColor,
                  color: goalReached
                    ? successColorCombo.mainColor
                    : colorConfig.mainColor,
                }}
              >
                {habitData.target}x/week
              </span>
            </h1>
            <p className="text-xs text-slate-500">{habitData.description}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {dates.map((date) => (
            <DayToggle
              onChange={(val: string) => {
                setLocalRecords((prev) =>
                  prev.includes(val)
                    ? prev.filter((d) => d !== val)
                    : [...prev, val]
                );
              }}
              colorConfig={goalReached ? successColorCombo : colorConfig}
              habitId={habitData.id}
              key={date}
              date={date}
              isActive={habitData.records.includes(date)}
            />
          ))}
        </div>
      </div>
    )
  );
}
