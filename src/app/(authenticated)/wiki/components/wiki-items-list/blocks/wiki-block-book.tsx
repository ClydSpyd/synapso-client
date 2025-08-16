import { wikiItemsConfig } from "../../../config";
import { FaBook } from "react-icons/fa";

export default function WikiBlockBook({ item }: { item: WikiBook }) {
  const config = wikiItemsConfig[item.type];

  const maximumDescriptionLength = 120;

  return (
    <div
      className="w-full rounded-lg  px-8 py-4 min-h-[200px] flex flex-col"
      style={{ backgroundColor: config.accentColor }}
    >
      <FaBook
        className="text-3xl 600 mb-2"
        style={{ color: config.mainColor }}
      />
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {item.title}
        <span className="text-sm">{item.year && ` (${item.year})`}</span>
      </h3>
      <p className="text-xs font-semibold mb-2">
        {item.authors.length > 0 ? `by ${item.authors.join(", ")  }` : "Author Unknown"}
      </p>
      <p className="text-xs leading-relaxed">
        {item.description?.slice(0, maximumDescriptionLength)}
        {item.description && item.description.length > maximumDescriptionLength
          ? "..."
          : ""}
      </p>
    </div>
  );
}
