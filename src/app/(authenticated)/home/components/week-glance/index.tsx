import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { getThisWeekRange } from "@/lib/dates";
import GlanceSummaryBlocks from "./glance-summary-blocks";
import GlanceHistoryModal from "./glance-history-modal";
import { FaHistory } from "react-icons/fa";

export default function WeekGlance() {
  return (
    <ModuleWrapper className="flex flex-col gap-3">
      <div className="flex w-full justify-between items-center h-fit">
        <h1 className="font-semibold text-slate-500">
          Week At A Glance{" "}
          <span className="text-xs">({getThisWeekRange()})</span>
        </h1>
        <GlanceHistoryModal>
          <div className="p-1 border rounded-sm border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-200/50 hover:border-gray-300">
            <FaHistory className="text-gray-400" size={14} />
          </div>
        </GlanceHistoryModal>
      </div>
      <GlanceSummaryBlocks weekOffset={0} />
    </ModuleWrapper>
  );
}
