import { API } from "@/api";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { format, set } from "date-fns";
import { useRef, useState } from "react";
import { FaMinus } from "react-icons/fa6";
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
  const [noHEvents, setNoEvents] = useState<boolean>(false);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onChange(date);
    API.habits.toggleActivity(habitId, date);
    setLoclalVal(!localVal);
    if (!localVal) {
      setNoEvents(true)
      outerRef.current?.classList.add("pulse-once");
      innerRef.current?.classList.add("pulse-once");
      outerRef.current?.classList.remove("pulse-once-neg");
      innerRef.current?.classList.remove("pulse-once-neg");
      // outerRef.current?.classList.add("no-events");
    } else {
      outerRef.current?.classList.remove("pulse-once");
      innerRef.current?.classList.remove("pulse-once");
      outerRef.current?.classList.add("pulse-once-neg");
      innerRef.current?.classList.add("pulse-once-neg");
    }
    queryClient.invalidateQueries({
      queryKey: ["user-habits"],
      exact: false,
      refetchType: "active",
    });
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
          onMouseLeave={() => {
            setIsHovered(false);
            setNoEvents(false);
            // outerRef.current?.classList.remove("no-events");
          }
          }
          className={cn(
            "group rounded-lg flex items-center justify-center text-center text-sm font-semibold cursor-pointer transition-colors"
          )}
          style={{
            height: isHovered && !noHEvents ? "40px" : "38px",
            width: isHovered && !noHEvents ? "40px" : "38px",
            backgroundColor: localVal
              ? "transparent"
              : isHovered && !noHEvents
              ? "oklch(98.4% 0.003 247.858)"
              : "oklch(96.7% 0.003 264.542)",
            borderWidth: localVal || isHovered && !noHEvents ? "2px" : "2px",
            borderStyle: !localVal && !isHovered && !noHEvents ? "dashed" : "solid",
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
                  height: isHovered && !noHEvents ? "24px" : "28px",
                  width: isHovered && !noHEvents ? "24px" : "28px",
                  backgroundColor: localVal
                    ? colorConfig.accentColor
                    : "oklch(96.7% 0.003 264.542)",
                }}
              >
                {isHovered ? (
                  <FaMinus
                    style={{
                      height: "14px",
                      width: "14px",
                      color: colorConfig.mainColor
                    }}
                  />
                ) : (
                  <FaCheck
                    style={{
                      height: "14px",
                      width: "14px",
                      color: colorConfig.mainColor,
                    }}
                  />
                )}
              </div>
            ) : (
              <FaPlus
                className="scale-100 group-hover:scale-150 transition-transform duration-400"
                style={{
                  color: isHovered && !noHEvents
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
