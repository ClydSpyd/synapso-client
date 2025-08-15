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
        title="Wisdon Wiki"
        subtitle="Your collection of knowledge and insights"
        // addItemModal={<button>Add Item</button>}
      />
      <WikiFilters />
      <WikiItemsList items={displayItems ?? []} isLoading={isLoading} />
    </div>
  );
}
