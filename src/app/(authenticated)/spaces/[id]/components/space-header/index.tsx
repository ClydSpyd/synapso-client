import { colorCombos } from "@/config/color-config";
import { IoIosRocket } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import ModulePickerModal from "../module-picker-modal";

export default function SpaceHeader() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md">
      <div className="w-full h-[100px] relative">
        <div className="w-full h-[100px] bg-zen-shift overflow-hidden absolute top-0 left-0" />
        <div className="h-[100px] w-[100px] rounded-md bg-white absolute flex justify-center items-center left-10 bottom-[-40px] shadow-sm">
          <div
            className="h-[90px] w-[90px] absolute rounded-md"
            style={{
              backgroundColor: colorCombos[2].hintColor,
            }}
          >
            <IoIosRocket
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              size={48}
              style={{
                color: colorCombos[2].mainColor,
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full px-8 py-12 pb-10 bg-white text-slate-500 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Health + Wellbeing</h1>
          <p className="leading-snug text-slate-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
            quae facere nulla maiores
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <button className="w-fit h-[40px] bg-white border !border-gray-200 flex items-center text-slate-500 rounded-md gap-1 px-2 py-1 !transition-transform ease-in-out !duration-300 cursor-pointer btn-hvr-border">
            <HiOutlineAdjustmentsHorizontal className="text-2xl" />
          </button>
          <ModulePickerModal>
            <button className="w-[130px] h-[40px] bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300 cursor-pointer">
              <h1 className="text-lg m-0 font-semibold relative bottom-0.5">
                +
              </h1>
              <p className="text-sm m-0 font-semibold">ADD MODULE</p>
            </button>
          </ModulePickerModal>
        </div>
      </div>
    </div>
  );
}