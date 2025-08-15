import { wikiItemsConfig } from "../../../config";
import { IoFilmOutline } from "react-icons/io5";

export default function WikiBlockMovie({ item }: { item: WikiMovie }) {
  const config = wikiItemsConfig[item.type];

  const maximumPlotLength = 120;

  return (
    <div
      className="w-full rounded-lg  px-8 py-4 min-h-[200px] flex flex-col"
      style={{ backgroundColor: config.accentColor }}
    >
      <IoFilmOutline
        className="text-3xl 600 mb-2"
        style={{ color: config.mainColor }}
      />
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {item.title}
        <span className="text-sm">{item.year && ` (${item.year})`}</span>
      </h3>
      <p className="text-xs leading-relaxed">
        {item.plot?.slice(0, maximumPlotLength)}
        {item.plot && item.plot.length > maximumPlotLength ? "..." : ""}
      </p>
    </div>
  );
}
