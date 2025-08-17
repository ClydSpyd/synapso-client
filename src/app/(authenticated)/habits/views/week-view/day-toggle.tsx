import { API } from "@/api";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa6";

export default function DayToggle({
  isActive,
  habitId,
  date,
  colorConfig,
  onChange,
}: {
  isActive: boolean;
  habitId: string;
  date: string;
  colorConfig: ColorCombo;
  onChange: (val: string) => void;
}) {
  const queryClient = useQueryClient();
  const [localVal, setLoclalVal] = useState<boolean>(isActive);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onChange(date);
    API.habits.toggleActivity(habitId, date);
    setLoclalVal(!localVal);
    if (!localVal) {
      outerRef.current?.classList.add("pulse-once");
      innerRef.current?.classList.add("pulse-once");
      outerRef.current?.classList.remove("pulse-once-neg");
      innerRef.current?.classList.remove("pulse-once-neg");
    } else {
      outerRef.current?.classList.remove("pulse-once");
      innerRef.current?.classList.remove("pulse-once");
      outerRef.current?.classList.add("pulse-once-neg");
      innerRef.current?.classList.add("pulse-once-neg");
    }
    queryClient.invalidateQueries({ queryKey: ["user-habits"] });
  };

  return (
    <Tooltip
      label={
        <p
          className="text-xs font-medium"
          style={{ color: colorConfig.mainColor }}
        >
          {format(new Date(date), "EEE do")}
        </p>
      }
      openDelay={400}
      color={colorConfig.hintColor}
      position="bottom"
    >
      <div className="w-[50px] h-[50px] flex justify-center items-center">
        <div
          ref={outerRef}
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "group rounded-lg flex items-center justify-center text-center text-sm font-semibold cursor-pointer transition-colors"
          )}
          style={{
            height: isHovered ? "40px" : "38px",
            width: isHovered ? "40px" : "38px",
            backgroundColor: localVal
              ? "transparent"
              : isHovered
              ? "oklch(98.4% 0.003 247.858)"
              : "oklch(96.7% 0.003 264.542)",
            borderWidth: localVal || isHovered ? "2px" : "2px",
            borderStyle: !localVal && !isHovered ? "dashed" : "solid",
            borderColor: colorConfig.accentColor,
          }}
        >
          <span ref={innerRef}>
            {localVal ? (
              <div
                className={cn(
                  "transition-all rounded-sm flex items-center justify-center",
                  {}
                )}
                style={{
                  height: isHovered ? "24px" : "28px",
                  width: isHovered ? "24px" : "28px",
                  backgroundColor: localVal
                    ? colorConfig.accentColor
                    : "oklch(96.7% 0.003 264.542)",
                }}
              >
                <FaCheck
                  style={{
                    height: "14px",
                    width: "14px",
                    color: colorConfig.mainColor,
                  }}
                />
              </div>
            ) : (
              <FaPlus
                className="scale-100 group-hover:scale-150 transition-transform duration-400"
                style={{
                  color: isHovered
                    ? colorConfig.mainColor
                    : "oklch(86.9% 0.022 252.894)",
                }}
              />
            )}
          </span>
        </div>
      </div>
    </Tooltip>
  );
}
