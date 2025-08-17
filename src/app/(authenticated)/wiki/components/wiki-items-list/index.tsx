import StaggerContainer from "@/components/utility-comps/stagger-container";
import ListItem from "./list-item";

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

  if (items.length === 0) return (
    <div className="text-gray-500 text-center h-full flex flex-col items-center justify-center pb-[15%]">
      <p>No wiki items found.</p>
      <p>Please add some items to your wiki.</p>
    </div>
  );

  return (
    <div className="w-full grid grid-cols-4 gap-2">
      {items.map((item, idx) => (
        <StaggerContainer key={idx}>
          <ListItem item={item} />
        </StaggerContainer>
      ))}
    </div>
  );
}
