import { cn } from "@/lib/utils";
import { useState } from "react";
import FilterPill from "./filter-pill";
import { wikiItemsConfig } from "../../config";


export default function WikiFilters() {
    const [selectedVal, setSelectedVal] = useState<WikiType | null>(null);
  return (
    <div className="flex gap-1 py-4">
      <div
        className={cn(
          `px-6 py-1 rounded-3xl text-sm cursor-pointer border-2 font-medium transition-colors`,
          selectedVal !== null
            ? "border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-400"
            : "bg-indigo-300 border-transparent text-white"
        )}
        onClick={() => setSelectedVal(null)}
      >
        All
      </div>
      {Object.values(wikiItemsConfig).map((filter) => (
        <FilterPill
          key={filter.type}
          filter={filter}
          selectedVal={selectedVal}
          setSelectedVal={setSelectedVal}
        />
      ))}
    </div>
  );
}
