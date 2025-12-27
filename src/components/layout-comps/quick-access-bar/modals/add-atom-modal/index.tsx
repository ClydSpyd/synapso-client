import { wikiItemsConfig } from "@/app/(authenticated)/atoms/config";
import { ModalType, useModalStore } from "@/stores/modal-store";
import { useState } from "react";

export default function AddAtomModal({}) {
    const { open } = useModalStore();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    return (
      <div
        className="w-full grid grid-cols-3 grid-rows-3 gap-2"
        style={{
          gridTemplateRows: "repeat(2, 100px)",
          gridTemplateColumns: "repeat(3, 100px)",
        }}
      >
        {Object.values(wikiItemsConfig).map((item) => {
          const isMovieSeries = ["series", "movie"].includes(item.type);
          return (
            <div
              key={item.type}
              onMouseEnter={() => setHoveredItem(item.type)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex flex-col items-center justify-center gap-1 cursor-pointer rounded-lg border border-transparent  transition-transform ease-in-out duration-300`}
              style={{
                backgroundColor: item.accentColor,
                color: item.mainColor,
                borderColor:
                  hoveredItem === item.type ? item.mainColor : "transparent",
                transform:
                  hoveredItem === item.type ? "scale(1.02)" : "scale(1.0)",
              }}
              onClick={() => {
                open({
                  title: `Add ${isMovieSeries ? "Movie/Series" : item.label}`,
                  type: isMovieSeries
                    ? "atom_movie_series"
                    : (`atom_${item.type}` as ModalType),
                  payload: isMovieSeries ? { type: item.type } : undefined,
                });
              }}
            >
              <item.icon
                className={"text-3xl"}
                style={{ color: item.mainColor }}
              />
              <div className="text-sm font-semibold">{item.type}</div>
            </div>
          );
        })}
      </div>
    );
}