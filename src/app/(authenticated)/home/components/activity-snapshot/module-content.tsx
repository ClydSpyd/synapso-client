import { colorCombos } from "@/config/color-config";
import { useActivitySnapshot } from "@/queries/useActivitySnapshot";
import { CgPlayListRemove } from "react-icons/cg";
import ActivityListItem from "./activity-list-item";

const EmptyState = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-0 border border-gray-300 rounded-md bg-gray-50 p-4">
      <CgPlayListRemove size={35} color={colorCombos[3].mainColor} />
      <h2 className="text-[14px] font-semibold text-slate-400">
        No activities logged for today
      </h2>
    </div>
  );
};

export default function ActivityModuleContent({ date }: { date: string }) {
  const { data: activities } = useActivitySnapshot(date);
  return (
    <div className="flex flex-col gap-2 mt-4">
      {!activities?.length ? (
        <EmptyState />
      ) : (
        activities?.map((item, index) => (
          <ActivityListItem key={index} idx={index} item={item} />
        ))
      )}
    </div>
  );
}
