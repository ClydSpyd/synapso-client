import StaggerContainer from "@/components/utility-comps/stagger-container";
import ListItem from "./list-item";
import { PinnedItemSkeletonBox } from "@/app/(authenticated)/home/components/pinned-items/empty.state";

export default function WikiItemsList({
  items,
  isLoading,
  error,
}: {
  items: WikiItem[];
  isLoading: boolean;
  error?: string;
}) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // if (items.length === 0) return (
  //   <div className="text-gray-500 text-center h-full flex flex-col items-center justify-center pb-[15%]">
  //     <p>No wiki items found.</p>
  //     <p>Please add some items to your wiki.</p>
  //   </div>
  // );

  return (
    <div className="w-full @container">
      <div className="@container w-full grid grid-cols-1 @[400px]:grid-cols-2 @[650px]:grid-cols-3 @[900px]:grid-cols-4 gap-2 relative">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <StaggerContainer key={idx}>
              <ListItem pinId={item.id} item={item} />
            </StaggerContainer>
          ))
        ) : (
          <>
            <div className="text-center flex flex-col gap-1 items-center justify-center abs-center rounded-md bg-white shadow-md p-4 border border-slate-200/70 whitespace-nowrap z-10">
              <h1 className="text-sm font-semibold text-slate-400">
                No atoms added added
              </h1>
            </div>
            {[...Array(12)].map((_, idx) => (
              <StaggerContainer key={idx}>
                <PinnedItemSkeletonBox
                  colorIdx={Math.floor(Math.random() * 6)}
                />
              </StaggerContainer>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
