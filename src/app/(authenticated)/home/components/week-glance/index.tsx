import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { getThisWeekRange } from "@/lib/dates";
import GlanceSummaryBlocks from "./glance-summary-blocks";
import GlanceHistoryModal from "./glance-history-modal";
import { FaHistory } from "react-icons/fa";
import FocusBlocks from "./focus-blocks";

export default function WeekGlance() {

  return (
    <ModuleWrapper className="flex flex-col gap-3">
      {/* <div className="w-full py-4 rounded-xl !overflow-hidden px-6 flex flex-col justify-center relative z-10">
        <div className="!absolute min-h-[50vw] min-w-[50vw] left-0 z-[-1] abs-center">
          <div className="!absolute h-full w-full left-0 gradient-bg-zen-alt rotate-alt" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-md text-white">
          Let&apos;s get those thoughts organised.
        </p>
      </div> */}
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
      <FocusBlocks />
    </ModuleWrapper>
  );
}
