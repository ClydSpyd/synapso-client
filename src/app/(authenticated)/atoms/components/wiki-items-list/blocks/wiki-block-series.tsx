export default function WikiBlockSeries({ item }: { item: WikiSeries }) {
  const maximumPlotLength = 120;

  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {item.title}
        <span className="text-sm">{item.year && ` (${item.year})`}</span>
      </h3>
      <p className="text-xs leading-relaxed">
        {item.plot?.slice(0, maximumPlotLength)}
        {item.plot && item.plot.length > maximumPlotLength ? "..." : ""}
      </p>
    </>
  );
}
