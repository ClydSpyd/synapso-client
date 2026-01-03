import { colorCombos } from "@/config/color-config";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

export const PinnedItemSkeletonBox = ({colorIdx}: {colorIdx: number}) => {
    const colorConfig = colorCombos[colorIdx % colorCombos.length];
    return (
      <div
        className="flex flex-col gap-2 w-full rounded-lg p-4 min-h-[200px] h-full relative border opacity-75"
        style={{
          borderColor: colorConfig.accentColor + 40,
          backgroundColor: colorConfig.hintColor + 70,
        }}
      >
        <div
          className="h-10 w-10 rounded-sm "
          style={{
            backgroundColor: colorConfig.hintColor + 90,
          }}
        />
        <div
          className="h-5 w-1/2 max-w-36 rounded-sm"
          style={{
            backgroundColor: colorConfig.hintColor + 90,
          }}
        />
        <div
          className="h-5 w-2/3 max-w-48 rounded-sm"
          style={{
            backgroundColor: colorConfig.hintColor + 90,
          }}
        />
        <div
          className="h-5 w-7/8 max-w-56 rounded-sm"
          style={{
            backgroundColor: colorConfig.hintColor + 90,
          }}
        />
        <div
          className="h-5 w-1/2 max-w-36 rounded-sm"
          style={{
            backgroundColor: colorConfig.hintColor + 90,
          }}
        />
      </div>
    );
}


export default function PinnedItemsEmptyState(){
    return (
      <div className="grid grid-cols-1 min-h-[calc(100%-50px)] gap-2 relative">
        {Array.from({ length: 2 }).map((_, idx) => (
          <PinnedItemSkeletonBox key={idx} colorIdx={idx} />
        ))}
        <div className="text-center flex flex-col gap-1 items-center justify-center abs-center rounded-md bg-white shadow-md p-4 border border-slate-200/70 whitespace-nowrap">
          <h1 className="text-sm font-semibold text-slate-400">
            No pinned items
          </h1>
          <Link href={"/atoms"} className="text-xs flex gap-1 font-semibold items-center border rounded-sm mt-1" style={{
            color: colorCombos[2].mainColor,
            padding: "4px 8px",
            borderColor: colorCombos[2].mainColor,
          }}>
            Browse atoms <FaArrowRightLong />
          </Link>
        </div>
      </div>
    );
}