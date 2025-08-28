import { API } from "@/api";
import Icon from "@/components/icon-picker/icon";
import StaggerContainer from "@/components/utility-comps/stagger-container";
import { colorCombos, disabledColorCombo } from "@/config/color-config";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function DayItem({
  habit,
  date,
  highlightHabit,
  idx,
  hoveredItem,
  setHoveredItem,
}: {
  habit: HabitActivity;
  date: string;
  highlightHabit: string | null;
  idx: number;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
}) {
  const [hovered, setHovered] = useState(hoveredItem === habit.id + date);
  const [completed, setCompleted] = useState(habit.records.includes(date));

  useEffect(() => {
    setHovered(hoveredItem === habit.id + date);
  }, [hoveredItem, habit.id, date]);

  useEffect(() => {
    setCompleted(habit.records.includes(date));
  }, [habit.records, date]);

  const highlighted = highlightHabit === habit.id;
  const colorCombo = colorCombos[habit.colorScheme];
  const colorConfig: ColorCombo = {
    mainColor:
      completed || hovered
        ? colorCombo.mainColor
        : disabledColorCombo.hintColor,
    accentColor:
      completed || hovered
        ? colorCombo.accentColor
        : disabledColorCombo.hintColor,
    hintColor: completed || hovered ? colorCombo.hintColor : "#f7f6f2",
  };
  const queryClient = useQueryClient();
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleToggle = async () => {
    await API.habits.toggleActivity(habit.id, date);
    setCompleted(!completed);
    //   setLoclalVal(!localVal);
    if (!completed) {
      // setNoEvents(true)
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
    <StaggerContainer key={date + habit.id + idx}>
      <div
        ref={outerRef}
        onClick={handleToggle}
        onMouseEnter={() => setHoveredItem(habit.id + date)}
        onPointerLeave={() => setHoveredItem(null)}
        className="w-11 h-11 border rounded-md flex items-center justify-center transition duration-500 ease-out cursor-pointer"
        style={{
          // backgroundColor: highlighted ? colorConfig.hintColor : "transparent",
          backgroundColor: completed || highlighted ? colorConfig.hintColor : "transparent",
          border: completed
            ? "none"
            : `1px ${completed ? "solid" : "dashed"} ${
                colorConfig[highlighted ? "mainColor" : "mainColor"]
              }`,
          transform:
            highlighted && completed
              ? "scale(1.12)"
              : hovered
              ? "scale(1.05)"
              : "scale(1)",
          opacity: !!highlightHabit && !highlighted && completed ? 0.25 : 1,
        }}
      >
        {hovered ? (
          completed ? (
            <FaMinus
              style={{
                height: "15px",
                width: "15px",
                color: colorConfig.mainColor,
              }}
            />
          ) : (
            <FaPlus
              style={{
                height: "16px",
                width: "16px",
                color: colorConfig.mainColor,
              }}
            />
          )
        ) : (
          <Icon
            name={habit.icon}
            className="w-[30px] h-[30px] transition duration-500 ease-out"
            style={{
              color: colorConfig[highlighted ? "mainColor" : "mainColor"],
            }}
          />
        )}
      </div>
    </StaggerContainer>
  );
}
