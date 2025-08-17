"use client";
import { useAuth } from "@/context/auth-context";
import FocusBlocks from "./components/focus-blocks";
import SummaryBlocks from "./components/summary-blocks";
import { usePinnedItems } from "@/queries/usePinnedItems";
import ListItem from "../wiki/components/wiki-items-list/list-item";

export default function Home() {
  const { user } = useAuth();
  const { data: pinnedItems } = usePinnedItems(true);
  console.log("Pinned Items:", pinnedItems);

  return (
    <div className="h-[calc(100vh-60px)] w-full grid grid-rows-[auto_1fr] grid-cols-12 gap-4 bg-gray-100/40 p-4">
      {/* Row 1: Two columns side-by-side */}
      <div className="col-span-6 flex flex-col gap-4">
        <div className="w-full h-[130px] rounded-md !overflow-hidden px-6 flex flex-col justify-center relative z-10">
          <div className="!absolute min-h-[50vw] min-w-[50vw] left-0 z-[-1] abs-center">
            <div className="!absolute h-full w-full left-0 gradient-bg-zen-alt rotate-alt" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-lg text-white">
            Let&apos;s get those thoughts organised.
          </p>
        </div>
        <SummaryBlocks />
      </div>

      <div className="col-span-6">
        <FocusBlocks />
      </div>

      {/* Row 2: Stretches and fills remaining height */}
      <div className="col-span-12 self-stretch pb-2 rounded-xl bg-white shadow-lg p-4 border border-gray-100">
        <h1 className="font-semibold text-slate-500 mb-3">Your Pinned Items</h1>
        <div className="grid grid-cols-4 min-h-[calc(100%-50px)] gap-2">
          {
            pinnedItems?.map((item) => (
              <ListItem key={item.id} item={item.item} />
            )) || (
              <div className="col-span-3 text-center text-gray-400">
                No pinned items yet.
              </div>
            )
          }
        </div>
        {/* <div className="h-full rounded-lg bg-[var(--accent-light-one)] shadow-md"></div>
        <div className="h-full rounded-lg bg-[var(--accent-light-three)] shadow-md"></div>
        <div className="h-full rounded-lg bg-[var(--accent-light-four)] shadow-md"></div> */}
      </div>
    </div>
  );
}
