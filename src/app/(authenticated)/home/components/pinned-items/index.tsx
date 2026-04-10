import ListItem from "@/app/(authenticated)/atoms/components/wiki-items-list/list-item";
import ModuleWrapper from "@/components/utility-comps/module-wrapper";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { usePinnedItems } from "@/queries/usePinnedItems";
import PinnedItemsEmptyState from "./empty.state";
import { cn } from "@/lib/utils";

export default function PinnedItems() {
  const { data: pinnedItems } = usePinnedItems(true);

  return (
    <ModuleWrapper>
      <h1 className="font-semibold text-slate-700 mb-3">Your Pinned Items</h1>
      <div className={cn("grid min-h-[calc(100%-50px)] gap-2", !!pinnedItems && pinnedItems?.length > 0 ? "grid-cols-1 md:grid-cols-2 " : "grid-cols-1")}>
        {!!pinnedItems && pinnedItems?.length > 0 ? (
          pinnedItems?.map((item) => (
            <StaggerContainer
              staggerDelay={200}
              randomFactor={500}
              key={item.id}
            >
              <ListItem pinId={item.id} item={item.item} pinned />
            </StaggerContainer>
          ))
        ) : (
          <PinnedItemsEmptyState />
        )}
      </div>
    </ModuleWrapper>
  );
}
