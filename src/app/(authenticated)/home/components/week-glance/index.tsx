import Icon from "@/components/icon-picker/icon";
import AddFocusModal from "@/components/layout-comps/quick-access-bar/modals/add-focus-modal";
import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { colorCombos } from "@/config/color-config";
import { getThisWeekRange } from "@/lib/dates";
import { useFocusItems } from "@/queries/useFocusItems";
import { Progress, Menu } from "@mantine/core";
import { FaBrain } from "react-icons/fa";
import { FaBoltLightning, FaCircleCheck } from "react-icons/fa6";
import { MdOutlineBolt } from "react-icons/md";

import { useRef } from "react";
import { BiDotsVertical } from "react-icons/bi";
import SummaryBlock from "./summary-block";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { API } from "@/api";

const colorOptions: ColorCombo[] = [
  colorCombos[0],
  colorCombos[1],
  colorCombos[3],
];
const BlockSkeleton = ({ accentColor }: { accentColor: string }) => {
  return (
    <StaggerContainer>
      <div
        className="w-full h-full flex gap-4 items-center rounded-lg p-4 bg-slate-50/50"
        style={{ border: `1px solid ${accentColor}` }}
      >
        <div
          className="w-[70px] h-[70px] rounded-lg"
          style={{
            background: accentColor,
          }}
        ></div>
        <div
          className="h-[30px] grow rounded-sm opacity-50"
          style={{
            background: accentColor,
          }}
        />
      </div>
    </StaggerContainer>
  );
};

const FocusBlock = ({
  data,
  colorConfig,
}: {
  data: FocusItem;
  colorConfig: ColorCombo;
}) => {
  const editBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <StaggerContainer randomFactor={600}>
      <div
        className="w-full h-full flex gap-4 items-center rounded-lg p-4 bg-slate-50/50"
        style={{
          border: `1px solid ${colorConfig.accentColor}`,
          backgroundColor: colorConfig.hintColor,
        }}
      >
        <div
          className="w-[50px] h-[50px] rounded-lg flex items-center justify-center"
          style={{
            background: colorConfig.accentColor,
          }}
        >
          <Icon name={data.icon} size={30} color={colorConfig.mainColor} />
        </div>
        <div className="grow">
          <h1 className="text-sm font-semibold">{data.title}</h1>
          <p className="text-sm">{data.description}</p>
        </div>
        <Menu trigger="hover">
          <Menu.Target>
            <div className="h-[30px] w-[30px] rounded-sm flex items-center justify-center cursor-pointer">
              <BiDotsVertical className="text-slate-500" size={18} />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => editBtnRef.current?.click()}>
              <h1>Edit</h1>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="absolute hidden">
        <AddFocusModal defaultData={data}>
          <button ref={editBtnRef}></button>
        </AddFocusModal>
      </div>
    </StaggerContainer>
  );
};

export default function WeekGlance() {
  const { data: focusItems } = useFocusItems();
  API.stats.getHabitProgress();
  API.stats.getMentalCheckinStats();
  return (
    <ModuleWrapper className="flex flex-col gap-3">
      <div className="flex w-full justify-between items-center h-fit">
        <h1 className="font-semibold text-slate-500">
          Week At A Glance{" "}
          <span className="text-xs">({getThisWeekRange()})</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 w-full gap-2 h-fit">
        <SummaryBlock
          title="Habit Progress"
          icon={
            <FaCircleCheck
              style={{
                color: colorCombos[0].mainColor,
              }}
            />
          }
          stat="38/61"
          progress={55}
          summary="55% completed"
          colorConfig={colorCombos[0]}
        />
        <SummaryBlock
          title="Mental Check-ins"
          icon={
            <FaBrain
              style={{
                color: colorCombos[2].mainColor,
              }}
            />
          }
          stat="3/7"
          progress={[1, 1, 1, 1, 1, 0, 1]}
          summary="Avg mood: GOOD"
          colorConfig={colorCombos[2]}
        />
        <SummaryBlock
          title="Energy Levels"
          icon={
            <MdOutlineBolt
              style={{
                color: colorCombos[5].mainColor,
              }}
              size={25}
            />
          }
          stat="7/7"
          progress={[1, 1, 1, 1, 1, 0, 1]}
          summary="Avg. Energy: medium"
          colorConfig={colorCombos[5]}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold text-slate-500 text-sm">
          This Week's Focus
        </h1>
        <AddFocusModal>
          <button className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300 cursor-pointer">
            <h1 className="text-lg m-0 font-semibold relative bottom-0.5">+</h1>
            <p className="text-sm m-0 font-semibold">ADD FOCUS</p>
          </button>
        </AddFocusModal>
      </div>
      {focusItems && (
        <div className="relative">
          <div className="w-full grid grid-cols-1 grid-rows-3 gap-2 opacity-60">
            {focusItems?.map((item, index) => (
              <FocusBlock
                key={item.id ?? index}
                data={item}
                colorConfig={colorOptions[index]}
              />
            ))}
            {Array.from({ length: 3 - focusItems.length }).map((_, index) => (
              <BlockSkeleton
                key={`skeleton-${index}`}
                accentColor={colorOptions[index].hintColor}
              />
            ))}
          </div>
          {focusItems.length === 0 && (
            <div className="flex flex-col gap-1 items-center justify-center abs-center w-3/4 rounded-md bg-white shadow-md p-4 border border-slate-200/70">
              <h1 className="text-lg font-semibold text-slate-500">
                No Focus Items Set
              </h1>
              <p className="text-xs text-slate-400 text-center">
                Use this space to outline up to 3 short-term goals for this week
              </p>
              <div className="h-[55px] flex items-center">
                <AddFocusModal>
                  <button className="button-zen mt-2">Add Item</button>
                </AddFocusModal>
              </div>
            </div>
          )}
        </div>
      )}
    </ModuleWrapper>
  );
}
