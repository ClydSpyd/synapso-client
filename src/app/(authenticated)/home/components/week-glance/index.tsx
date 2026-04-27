import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { getThisWeekRange } from "@/lib/dates";
import GlanceSummaryBlocks from "./glance-summary-blocks";
import GlanceHistoryModal from "./glance-history-modal";
import { FaHistory } from "react-icons/fa";
// import FocusBlocks from "./focus-blocks";
import { MdFactCheck } from "react-icons/md";
import { colorCombos } from "@/config/color-config";
import HistoryBtn from "@/components/ui/history-btn";

export default function WeekGlance() {
  const colorConfig = colorCombos[4];

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
        {/* <h1 className="font-semibold text-slate-700">
          Week At A Glance{" "}
          <span className="text-xs">({getThisWeekRange()})</span>
        </h1> */}
        <div className="flex gap-2 mb-2">
          <div
            className="w-11 h-11 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: colorConfig.hintColor,
              color: colorConfig.mainColor,
            }}
          >
            <MdFactCheck size={27} />
          </div>
          <div className="grow">
            Week At A Glance{" "}
            <span className="text-xs">({getThisWeekRange()})</span>
            <p className="text-xs text-slate-500">
              A summary of your week based on your check-ins and habits,
            </p>
          </div>
        </div>
        <GlanceHistoryModal>
          <HistoryBtn />
        </GlanceHistoryModal>
      </div>
      <GlanceSummaryBlocks weekOffset={0} />
    </ModuleWrapper>
  );
}
