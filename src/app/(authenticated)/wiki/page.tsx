"use client";
import PageHeader from "@/components/page-header";
import WikiFilters from "./components/wiki-filters";
import { useWikiItems } from "@/queries/useWiki";
import WikiItemsList from "./components/wiki-items-list";

export default function WikiPage() {
  const { data: displayItems, isLoading } = useWikiItems();
  console.log("Wiki Data:", displayItems);

  return (
    <div className="h-full w-full flex flex-col py-8 px-12">
      <PageHeader
        title="Wisdom Wiki"
        subtitle="Your collection of knowledge and insights"
        rightSideElements={
          <button className="bg-zen-shift flex items-center text-white rounded-md gap-1 px-4 py-1 hover:scale-105 !transition-transform ease-in-out !duration-300">
            <h1 className="text-2xl m-0 relative bottom-0.5">+</h1>
            <p className="m-0 font-semibold">ADD</p>
          </button>
        }
      />
      <WikiFilters />
      <WikiItemsList items={displayItems ?? []} isLoading={isLoading} />
    </div>
  );
}
