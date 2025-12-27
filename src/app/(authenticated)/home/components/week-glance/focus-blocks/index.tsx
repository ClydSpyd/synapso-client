import { useRef, useState } from "react";
import Icon from "@/components/icon-picker/icon";
import AddFocusModal from "@/components/layout-comps/quick-access-bar/modals/add-focus-modal";
import { colorCombos } from "@/config/color-config";
import { useFocusItems } from "@/queries/useFocusItems";
import { Menu, Text } from "@mantine/core";
import { BiDotsVertical } from "react-icons/bi";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { cn } from "@/lib/utils";
import { API } from "@/api";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useClickOutside } from "@mantine/hooks";
import { RiFocus2Line } from "react-icons/ri";
import ModuleWrapper from "@/components/utility-comps/module-wrapper";

const colorOptions: ColorCombo[] = [
  colorCombos[0],
  colorCombos[1],
  colorCombos[3],
  colorCombos[4],
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
  const [confState, setConfState] = useState<boolean>(false);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const { refetch } = useFocusItems();

  const handleDelete = async () => {
    await API.focus.delete(data.id);
    refetch();
  };

  const ref = useClickOutside(() => {
    setConfState(false);
  });

  return (
    <StaggerContainer randomFactor={600}>
      <div
        ref={ref}
        className="w-full h-full flex gap-4 items-center rounded-lg overflow-hidden relative p-4 bg-slate-50/50"
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
        <Menu trigger="click">
          <Menu.Target>
            <div className="h-[30px] w-[30px] rounded-sm flex items-center justify-center cursor-pointer">
              <BiDotsVertical className="text-slate-500" size={18} />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => editBtnRef.current?.click()}
              leftSection={
                <MdEdit className="text-lg text-slate-500 cursor-pointer" />
              }
            >
              <Text size="xs">Edit item</Text>
            </Menu.Item>
            <Menu.Item
              onClick={() => setConfState(true)}
              leftSection={
                <MdDeleteForever className="text-lg text-slate-500 cursor-pointer" />
              }
            >
              <Text size="xs">Delete item</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {/* delete confirmation state */}
        <div
          className={cn(
            "absolute w-full h-full backdrop-blur-md bg-gray-200/10 flex flex-col gap-2 transition-all ease-in-out duration-200 left-0 items-center justify-center z-20",
            confState
              ? "bottom-0 opacity-100 pointer-events-auto"
              : "bottom-1/3 opacity-0 pointer-events-none"
          )}
        >
          <p className="text-sm text-slate-600 font-semibold">Are you sure?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfState(false)}
              className="px-2 py-1 bg-slate-200 rounded-md !text-sm font-semibold cursor-pointer text-slate-700 border border-gray-400"
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-red-500 rounded-md !text-sm font-semibold cursor-pointer text-white"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="absolute hidden">
        <AddFocusModal defaultData={data}>
          <button ref={editBtnRef}></button>
        </AddFocusModal>
      </div>
    </StaggerContainer>
  );
};

export default function FocusBlocks() {
  const moduleColorConf = colorCombos[2];
  const { data: focusItems } = useFocusItems();
  return (
    <ModuleWrapper className="flex flex-col gap-3">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2">
          <div
            className="w-11 h-11 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: moduleColorConf.hintColor,
              color: moduleColorConf.mainColor,
            }}
          >
            <RiFocus2Line size={27} />
          </div>
          <div className="grow">
            <h1 className="font-semibold text-slate-500">Focus Items</h1>
            <p className="text-xs text-slate-400/60">
              Outline up to 4 goals/focus points for this week
            </p>
          </div>
        </div>
        <AddFocusModal disabled={focusItems && focusItems.length >= 4}>
          <button className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300">
            <h1 className="text-lg m-0 font-semibold relative bottom-0.5">+</h1>
            <p className="text-sm m-0 font-semibold">ADD FOCUS</p>
          </button>
        </AddFocusModal>
      </div>
      {focusItems && (
        <div className="relative">
          <div
            className="w-full grid grid-cols-2 max-grid-rows-2 gap-2 opacity-60"
            style={{ gridAutoRows: "85px" }}
          >
            {focusItems?.map((item, index) => (
              <FocusBlock
                key={item.id ?? index}
                data={item}
                colorConfig={colorOptions[index]}
              />
            ))}
            {Array.from({ length: 4 - focusItems.length }).map((_, index) => (
              <BlockSkeleton
                key={`skeleton-${index}`}
                accentColor={colorOptions[index].hintColor}
              />
            ))}
          </div>
          {focusItems.length === 0 && (
            <div className="flex flex-col gap-1 items-center justify-center abs-center w-1/4 rounded-md bg-white shadow-md p-4 border border-slate-200/70">
              <h1 className="text-sm font-semibold text-slate-400">
                No Focus Items Set
              </h1>
              {/* <p className="text-xs text-slate-400 text-center">
                Use this space to outline up to 4 short-term goals for this week
              </p> */}
              {/* <div className="h-[55px] flex items-center">
                <AddFocusModal>
                  <button className="button-zen mt-2">Add Item</button>
                </AddFocusModal>
              </div> */}
            </div>
          )}
        </div>
      )}
    </ModuleWrapper>
  );
}
