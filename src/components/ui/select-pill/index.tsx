import { useState } from "react";

interface SelectPillProps {
  isSelected: boolean;
  onClick: () => void;
  label: string;
  value: string;
  colorConfig: ColorCombo;
  css?: React.CSSProperties;
}
export default function SelectPill({
  isSelected,
  onClick,
  label,
  colorConfig,
  css,
}: SelectPillProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`px-2 py-1 rounded-lg text-sm cursor-pointer transition-colors flex items-center h-fit`}
      style={{
        fontWeight: "500",
        // borderColor: isSelected ? "transparent" : colorConfig.mainColor,
        backgroundColor: isSelected
          ? colorConfig.mainColor
          : hovered
          ? colorConfig.accentColor
          : "transparent",
        color: isSelected ? "white": colorConfig.mainColor,
        ...css,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </div>
  );
}
