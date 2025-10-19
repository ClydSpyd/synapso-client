import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { formatDatePayload } from "@/lib/dates";
import { FaHistory } from "react-icons/fa";
import CheckinModuleContent from "./checkin-history-modal/module-content";
import CheckinHistoryModal from "./checkin-history-modal";

export const CheckIn = () => {
  const today = formatDatePayload(0);

  return (
    <ModuleWrapper>
      <div className="flex w-full justify-between items-center h-fit mb-2">
        <h1 className="font-semibold text-slate-500">Mental Check-in </h1>
        <CheckinHistoryModal>
          <div className="p-1 border rounded-sm border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-200/50 hover:border-gray-300">
            <FaHistory className="text-gray-400" size={14} />
          </div>
        </CheckinHistoryModal>
      </div>
      <CheckinModuleContent date={today} />
    </ModuleWrapper>
  );
};
