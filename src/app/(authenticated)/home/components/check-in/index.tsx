import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { formatDatePayload } from "@/lib/dates";
import { FaHistory } from "react-icons/fa";
import CheckinModuleContent from "./checkin-history-modal/module-content";
import CheckinHistoryModal from "./checkin-history-modal";
import { RiMentalHealthFill } from "react-icons/ri";
import { colorCombos } from "@/config/color-config";


export const CheckIn = () => {
  const today = formatDatePayload(0);
  const colorConfig = colorCombos[2];

  return (
    <ModuleWrapper>
      <div className="flex w-full justify-between items-center h-fit mb-2">
        <div className="flex gap-2">
          <div
            className="w-11 h-11 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: colorConfig.hintColor,
              color: colorConfig.mainColor,
            }}
          >
            <RiMentalHealthFill size={27} />
          </div>
          <div className="grow">
            <h1 className="font-semibold text-slate-700">Mental Check-in</h1>
            <p className="text-xs text-slate-500">
              Take a moment to reflect on your mental state, emotions, and
              overall well-being.
            </p>
          </div>
        </div>
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
