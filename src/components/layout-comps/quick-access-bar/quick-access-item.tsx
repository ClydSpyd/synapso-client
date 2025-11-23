import { cn } from "@/lib/utils";
import { useState } from "react";
import React from "react";

export interface QuickAccessItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text: string;
  colorConfig: ColorCombo;
}

export default function QuickAccessItem({
  children,
  text,
  colorConfig,
  ...divProps
}: QuickAccessItemProps) {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{
        borderColor: !mouseOver
          ? colorConfig.accentColor + 50
          : colorConfig.accentColor,
        backgroundColor: colorConfig.hintColor,
        ...divProps.style,
      }}
      className={cn(
        `w-[200px] flex items-center gap-2 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out border rounded-sm opacity-90 hover:opacity-100 shadow-sm`,
        divProps.className
      )}
      {...divProps}
    >
      {children}
      <p
        className="text-sm"
        style={{
          color: colorConfig.mainColor,
        }}
      >
        {text}
      </p>
    </div>
  );
}
