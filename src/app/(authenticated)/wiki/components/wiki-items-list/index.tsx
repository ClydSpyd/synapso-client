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

  return (
    <div className="w-full grid grid-cols-4 gap-2">
      {items.map((item, idx) => (
        <ListItem key={idx} item={item} />
      ))}
    </div>
  );
}
