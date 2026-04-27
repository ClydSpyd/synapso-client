import { colorCombos } from "@/config/color-config";
import { useActivitySnapshot } from "@/queries/useActivitySnapshot";
import { CgPlayListRemove } from "react-icons/cg";
import ActivityListItem from "./activity-list-item";
import { isToday, format } from 'date-fns';

const EmptyState = ({ isHistory, date }: { isHistory: boolean, date: string }) => {
  const today = isToday(new Date(date));
  return (
    <div className="w-full min-h-[inherit] flex flex-col items-center justify-center gap-0 border border-gray-300 rounded-md bg-gray-50 p-4">
      <CgPlayListRemove size={35} color={colorCombos[3].mainColor} />
      <h2 className="text-[14px] font-semibold text-slate-400">
        {isHistory
          ? `No activities logged for ${today ? "today" : format(new Date(date), "EEEE do MMMM")}`
          : "No activities logged for today"}
      </h2>
    </div>
  );
};

export default function ActivityModuleContent({
  date,
  isHistory = false,
}: {
  date: string;
  isHistory?: boolean;
}) {
  const { data: activities } = useActivitySnapshot(date);
  
    const totalCalories = activities?.reduce(
      (total, activity) => total + (activity.kcals ?? 0),
      0,
    ) ?? 0;
  
    const totalDuration =
      activities?.reduce((total, activity) => total + activity.duration, 0) ?? 0;
  
    const totalActivities = activities?.length ?? 0;
  return (
    <div className="grow min-h-[inherit] flex flex-col gap-2 mt-4">
      {!activities?.length ? (
        <EmptyState isHistory={isHistory} date={date} />
      ) : (
        activities?.map((item, index) => (
          <ActivityListItem key={index} idx={index} item={item} date={date} />
        ))
      )}
      {/* Activities Summary */}
      <div
        className="grid grid-cols-3 p-4 pb-2 border-t-2 mt-1"
        style={{
          borderColor: colorCombos[1].hintColor,
        }}
      >
        <div
          className="h-18 flex flex-col items-center justify-center"
          style={{
            color: colorCombos[1].mainColor,
          }}
        >
          <p className="font-semibold text-sm text-slate-400">TOTAL DURATION</p>
          <h3 className="text-2xl font-bold">
            {totalDuration > 0 ? totalDuration : "--"}
            <span className="text-lg ml-1 font-normal">min</span>
          </h3>
        </div>
        <div
          className="h-18 flex flex-col items-center justify-center border-x-2"
          style={{
            borderColor: colorCombos[1].hintColor,
            color: colorCombos[3].mainColor,
          }}
        >
          <p className="font-semibold text-sm text-slate-400">
            CALORIES BURNED
          </p>
          <h3 className="text-2xl font-bold">
            {totalCalories > 0 ? totalCalories : "--"}
            <span className="text-lg ml-1 font-normal">kcal</span>
          </h3>
        </div>
        <div
          className="h-18 flex flex-col items-center justify-center"
          style={{
            color: colorCombos[4].mainColor,
          }}
        >
          <p className="font-semibold text-sm text-slate-400">ACTIVITIES</p>
          <h3 className="text-2xl font-bold">
            {totalActivities > 0 ? totalActivities : "--"}
          </h3>
        </div>
      </div>
    </div>
  );
}
