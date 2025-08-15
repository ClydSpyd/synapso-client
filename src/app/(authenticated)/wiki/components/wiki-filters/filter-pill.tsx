import { useState } from "react";

export default function FilterPill({
  filter,
  selectedVal,
  setSelectedVal,
}: {
  filter: WikiItemConfig;
  selectedVal: WikiType | null;
  setSelectedVal: (val: WikiType | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const bgColor =
    isHovered && selectedVal !== filter.type
      ? filter.accentColor
      : selectedVal === filter.type
      ? filter.mainColor
      : "white";

  return (
    <div
      key={filter.type}
      className={`px-4 py-1 rounded-3xl text-sm cursor-pointer border-2  transition-colors`}
      style={{
        fontWeight: "500",
        borderColor:
          selectedVal === filter.type ? "transparent" : filter.mainColor,
        backgroundColor: bgColor,
        color: selectedVal !== filter.type ? filter.mainColor : "white",
      }}
      onClick={() => setSelectedVal(filter.type)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {filter.label}
    </div>
  );
}
