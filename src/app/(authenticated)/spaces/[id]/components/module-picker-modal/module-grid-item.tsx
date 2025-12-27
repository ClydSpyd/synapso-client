"use client";

import { useState } from "react";

export default function ModuleGridItem({
  item,
  colorConfig,
  selected,
  onSelect,
}: {
  item: SpaceModule;
  colorConfig: ColorCombo;
  selected: boolean;
  onSelect: (type: SpaceModuleType) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(item.type)}
      className="w-full p-4 border rounded-lg flex gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        margin: !selected ? "2px" : "1px",
        borderWidth: selected ? "2px" : "1px",
        borderColor: selected
          ? colorConfig.mainColor
          : isHovered
          ? colorConfig.accentColor
          : "#e0e0e0",
      }}
    >
      <div
        className="flex items-center justify-center min-h-[40px] min-w-[40px] max-w-[40px] max-h-[40px] rounded-lg"
        style={{
          color: colorConfig.mainColor,
          backgroundColor: colorConfig.hintColor,
        }}
      >
        <item.icon size={item.iconSize} />
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-md">{item.title}</h3>
        <p className="text-xs text-slate-500">{item.description}</p>
      </div>
    </div>
  );
}
