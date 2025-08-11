import { cn } from "@/lib/utils";
import { useState } from "react";

export default function QuickAccessItem({
  children,
  accentColor,
  hoverColor,
  text,
}: {
  children: React.ReactNode;
  accentColor: string;
  hoverColor: string;
  text: string;
}) {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{
        borderColor: accentColor,
        backgroundColor: mouseOver ? hoverColor : "transparent",
      }}
      className={cn(
        `w-[200px] flex items-center gap-2 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out border rounded-sm opacity-70 hover:opacity-100`
      )}
    >
      {children}
      <p className="text-sm">{text}</p>
    </div>
  );
}
