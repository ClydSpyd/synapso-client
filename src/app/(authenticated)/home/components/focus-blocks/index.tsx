import Icon from "@/components/icon-picker/icon";
import AddFocusModal from "@/components/layout-comps/quick-access-bar/modals/add-focus-modal";
import { colorCombos } from "@/config/color-config";
import { getThisWeekRange } from "@/lib/dates";
import { useFocusItems } from "@/queries/useFocusItems";
import { Button, Menu } from "@mantine/core";
import { useRef } from "react";
import { BiDotsVertical } from "react-icons/bi";

const colorOptions: ColorCombo[] = [
  colorCombos[0],
  colorCombos[1],
  colorCombos[3],
]
const BlockSkeleton = ({ accentColor }: { accentColor: string }) => {
  return (
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
    <>
      <div
        className="w-full h-full flex gap-4 items-center rounded-lg p-4 py-2 bg-slate-50/50"
        style={{
          // border: `1px solid ${colorConfig.accentColor}`,
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
    </>
  );
};

export default function FocusBlocks() {
  const { data: focusItems } = useFocusItems();
  return (
    <div className="w-full h-full flex flex-col px-6 py-4 relative z-10  bg-white border border-gray-100 rounded-md shadow-md">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-semibold text-slate-500">
          This Week&apos;s Focus{" "}
          <span className="text-xs">({getThisWeekRange()})</span>
        </h1>
        <AddFocusModal>
          <Button color="grape">Add</Button>
        </AddFocusModal>
      </div>
      {focusItems && (
        <>
          <div className="w-full h-full grid grid-cols-1 grid-rows-3 gap-2 mt-4 opacity-60">
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
                accentColor={
                  colorOptions[index].hintColor
                }
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
        </>
      )}
    </div>
  );
}
