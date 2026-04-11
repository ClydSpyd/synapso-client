import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { colorCombos } from "@/config/color-config";
import { RiRunFill } from "react-icons/ri";
import { dummyActivityEntries } from "./config";
import ActivityListItem from "./activity-list-item";
import { FaHistory } from "react-icons/fa";

export default function ActivitySnapshot() {
  const moduleColorConf = colorCombos[2];

  return (
    <ModuleWrapper>
      <div className="flex gap-2">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-lg"
          style={{
            backgroundColor: moduleColorConf.hintColor,
            color: moduleColorConf.mainColor,
          }}
        >
          <RiRunFill size={27} />
        </div>
        <div className="grow">
          <h1 className="font-semibold text-slate-700">Activity Snapshot</h1>
          <p className="text-xs text-slate-500">
            Keep track of your your daily workouts, sports sessions and other
            activities
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button className="w-[120px] bg-zen-shift h-fit flex justify-center items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300">
            <h1 className="text-lg m-0 font-semibold relative bottom-0.5">+</h1>
            <p className="text-sm m-0 font-semibold">LOG ENTRY</p>
          </button>

          <div className="p-1 border rounded-sm border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-200/50 hover:border-gray-300">
            <FaHistory className="text-gray-400" size={14} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {dummyActivityEntries.map((item, index) => (
          <ActivityListItem key={index} item={item} />
        ))}
      </div>
    </ModuleWrapper>
  );
}
