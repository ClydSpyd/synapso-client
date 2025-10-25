import { colorCombos } from "@/config/color-config";

import { FaBrain } from "react-icons/fa";
import { TbMoodWrrrFilled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineBolt } from "react-icons/md";
import { RiFocus2Line } from "react-icons/ri";

import SummaryBlock from "./summary-block";
import ProgressBlock from "./progress-block";
import { useGlanceStats } from "@/queries/useGlanceStats";
import {
  getAvgString,
  percentToIndex,
  percentToInverseIndex,
} from "@/lib/utils";

export default function GlanceSummaryBlocks({ weekOffset }: { weekOffset: number }) {
  const { data } = useGlanceStats(weekOffset);
  const totalCompletions = data
    ? data.habits.reduce(
        (acc: number, habit: HabitCompletionStats) =>
          acc + Math.min(habit.completions.length, habit.target),
        0
      )
    : 0;

  const totalTarget = data
    ? data.habits.reduce(
        (acc: number, habit: HabitCompletionStats) => acc + habit.target,
        0
      )
    : 0;

  return (
    data && (
      <div className="grid grid-cols-5 w-full gap-2 h-fit">
        <ProgressBlock
          title="Habit Progress"
          icon={
            <FaCircleCheck
              style={{
                color: colorCombos[0].mainColor,
              }}
            />
          }
          completed={totalCompletions}
          total={totalTarget}
          colorConfig={colorCombos[0]}
          colSpan={2}
        />
        <div className="grid grid-cols-2 col-span-3 grid-rows-2 gap-2">
          <SummaryBlock
            title="Mood"
            icon={
              <FaBrain
                style={{
                  color: colorCombos[2].mainColor,
                }}
              />
            }
            entries={data.checkins.mood_per_day}
            average={
              data.checkins.average_mood
                ? getAvgString(data.checkins.average_mood)
                : null
            }
            colorConfig={colorCombos[2]}
          />
          <SummaryBlock
            title="Energy"
            icon={
              <MdOutlineBolt
                style={{
                  color: colorCombos[5].mainColor,
                }}
                size={25}
              />
            }
            entries={data.checkins.energy_per_day.map((val: number | null) =>
              val !== null ? percentToIndex(val) : null
            )}
            average={
              data.checkins.average_energy_level
                ? getAvgString(
                    percentToIndex(data.checkins.average_energy_level),
                    true
                  )
                : null
            }
            colorConfig={colorCombos[5]}
          />
          <SummaryBlock
            title="Focus"
            icon={
              <RiFocus2Line
                size={20}
                style={{
                  color: colorCombos[3].mainColor,
                }}
              />
            }
            entries={data.checkins.focus_per_day.map(
              (val: number | null, idx: number) =>
                val !== null ? percentToIndex(val, `FOCUS: ${idx}`) : null
            )}
            average={
              data.checkins.average_focus_level
                ? getAvgString(
                    percentToIndex(data.checkins.average_focus_level)
                  )
                : null
            }
            colorConfig={colorCombos[3]}
          />
          <SummaryBlock
            title="Stress"
            icon={
              <TbMoodWrrrFilled
                style={{
                  color: colorCombos[0].mainColor,
                }}
                size={20}
              />
            }
            entries={data.checkins.stress_per_day.map((val: number | null) =>
              val !== null ? percentToInverseIndex(val) : null
            )}
            average={
              data.checkins.average_stress_level
                ? getAvgString(
                    percentToIndex(data.checkins.average_stress_level),
                    true
                  )
                : null
            }
            colorConfig={colorCombos[0]}
          />
        </div>
      </div>
    )
  );
}
