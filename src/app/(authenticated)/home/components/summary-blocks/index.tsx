"use client";
import { DownIcon, HappyIcon, NeutralIcon, SadIcon, UpIcon } from "@/components/ui/emojis";
import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import { colorCombos } from "@/config/color-config";
import { FaBrain, FaLightbulb } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbCalendarRepeat } from "react-icons/tb";

const Block = ({
  icon,
  title,
  iconBoxClassName,
  count,
}: {
  title: string;
  icon: React.ReactNode;
  iconBoxClassName: string;
  count: number;
  description: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 border border-slate-100 rounded-md">
      <div className="flex justify-between items-center w-full">
        <div
          className={`w-[50px] h-[50px] rounded-md flex items-center justify-center ${iconBoxClassName}`}
        >
          {icon}
        </div>
        <h1 className="text-xl font-semibold text-slate-600">{count}</h1>
      </div>
      <h1 className="text-md font-bold text-slate-400">{title}</h1>
    </div>
  );
};

export default function SummaryBlocks() {
  return (
    <ModuleWrapper className="grid grid-cols-2 grid-rows-2 gap-4">
      {/* <Block
        title="Habits"
        count={5}
        icon={<TbCalendarRepeat className="text-2xl text-indigo-700" />}
        iconBoxClassName="bg-violet-100"
        description="Manage your tasks efficiently."
        onClick={() => {}}
        className="col-span-2"
      /> */}
      <div className="flex gap-2">
        <SadIcon size={40} color={colorCombos[1].scale[4]} />
        <DownIcon size={40} color={colorCombos[1].scale[3]} />
        <NeutralIcon size={40} color={colorCombos[1].scale[2]} />
        <UpIcon size={40} color={colorCombos[1].scale[1]} />
        <HappyIcon size={40} color={colorCombos[1].scale[0]} />
      </div>
      <Block
        title="Ideas"
        count={16}
        icon={<FaLightbulb className="text-xl text-fuchsia-500" />}
        iconBoxClassName="bg-fuchsia-100"
        description="Manage your tasks efficiently."
        onClick={() => {}}
        className="col-span-2"
      />
      <Block
        title="Wiki"
        count={18}
        icon={<FaBrain className="text-xl text-sky-700" />}
        iconBoxClassName="bg-cyan-100"
        description="Manage your tasks efficiently."
        onClick={() => {}}
        className="col-span-2"
      />
      <Block
        title="Active Tasks"
        count={12}
        icon={<FaListCheck className="text-xl text-indigo-500" />}
        iconBoxClassName="bg-blue-100"
        description="Manage your tasks efficiently."
        onClick={() => {}}
        className="col-span-2"
      />
    </ModuleWrapper>
  );
}
