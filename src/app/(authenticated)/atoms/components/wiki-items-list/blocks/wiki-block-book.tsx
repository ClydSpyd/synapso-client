export default function WikiBlockBook({ item }: { item: WikiBook }) {
  const maximumDescriptionLength = 120;

  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {item.title}
        <span className="text-sm">{item.year && ` (${item.year})`}</span>
      </h3>
      <p className="text-xs font-semibold mb-2">
        {item.authors.length > 0 ? `by ${item.authors[0]}` : "Author Unknown"}
      </p>
      <p className="text-xs leading-relaxed">
        {item.description?.slice(0, maximumDescriptionLength)}
        {item.description && item.description.length > maximumDescriptionLength
          ? "..."
          : ""}
      </p>
    </>
  );
}
