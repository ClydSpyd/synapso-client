"use client";
import PageHeader from "@/components/page-header";
import WikiFilters from "./components/wiki-filters";
import { useWikiItems } from "@/queries/useWiki";
import WikiItemsList from "./components/wiki-items-list";
import { useEffect, useState } from "react";
import { useModalStore } from "@/stores/modal-store";

export default function WikiPage() {
  const { data: allItems, isLoading } = useWikiItems();
  const [displayItems, setDisplayItems] = useState<(WikiItem & { type: WikiType })[]>(allItems ?? []);
  const [filterType, setFilterType] = useState<WikiType | null>(null);
  const { open } = useModalStore();

  useEffect(() => {
    if (filterType) {
      setDisplayItems(allItems?.filter(item => item.type === filterType) ?? []);
    } else {
      setDisplayItems(allItems ?? []);
    }
  }, [filterType, allItems]);

  return (
    <div className="h-full w-full flex flex-col py-8 px-12">
      <PageHeader
        title="Atoms"
        subtitle="Your collection of atomic ideas and insights"
        rightSideElements={
          <button
            onClick={() => {
              open({
                title: "Add Atom",
                type: "atom",
                modalStyles: {
                  content: {
                    maxWidth: "fit-content",
                    minWidth: "fit-content",
                    borderRadius: "8px",
                  },
                },
              });
            }}
            className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-4 py-1 hover:scale-105 !transition-transform ease-in-out !duration-300"
          >
            <h1 className="text-2xl m-0 relative bottom-0.5">+</h1>
            <p className="m-0 font-semibold">ADD</p>
          </button>
        }
      />
      <WikiFilters setFilterType={setFilterType} activeFilter={filterType} />
      <WikiItemsList items={displayItems ?? []} isLoading={isLoading} />
    </div>
  );
}
