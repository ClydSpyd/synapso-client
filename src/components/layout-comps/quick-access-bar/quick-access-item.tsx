import { cn } from "@/lib/utils";
import { useState } from "react";

export default function QuickAccessItem({
  children,
  text,
  colorConfig
}: {
  children: React.ReactNode;
  text: string;
  colorConfig: ColorCombo;
}) {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{
        borderColor: !mouseOver
          ? colorConfig.accentColor
          : colorConfig.mainColor,
        backgroundColor: colorConfig.hintColor,
      }}
      className={cn(
        `w-[200px] flex items-center gap-2 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out border rounded-sm opacity-70 hover:opacity-90`
      )}
    >
      {children}
      <p className="text-sm">{text}</p>
    </div>
  );
}
