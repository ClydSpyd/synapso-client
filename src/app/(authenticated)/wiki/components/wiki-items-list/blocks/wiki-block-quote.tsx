import { BiSolidQuoteLeft } from "react-icons/bi";
import { wikiItemsConfig } from "../../../config";

export default function WikiBlockQuote({ item }: { item: WikiQuote }) {
  const config = wikiItemsConfig[item.type];
  return (
    <div
      className="w-full rounded-lg px-8 py-4 min-h-[200px] flex flex-col"
      style={{ backgroundColor: config.accentColor }}
    >
      <BiSolidQuoteLeft
        className="text-3xl 600"
        style={{ color: config.mainColor }}
      />
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col justify-center flex-1">
          <p className="text-base italic text-gray-700 font-semibold">
            {item.content}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          - {item.author}
          {item.year && <span>{`, ${item.year}`}</span>}
        </div>
      </div>

      {/* {item.additionalData && (
        <div className="text-xs text-gray-400">{item.additionalData}</div>
      )} */}
    </div>
  );
}
