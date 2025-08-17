import Icon from "@/components/icon-picker/icon";
import { Switch } from "@mantine/core";
import { useState } from "react";

export default function HabitItem({
  habitData,
  colorConfig,
  handleToggle,
  defaultChecked
}: {
  habitData: HabitActivity;
  colorConfig: ColorCombo;
  handleToggle: (habitId: string) => void;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  return (
    <div
      className="w-full p-2 flex gap-2 items-center border border-gray-200 rounded-lg"
      style={{ backgroundColor: colorConfig.hintColor }}
    >
      <div
        className="h-18 w-18 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: colorConfig.accentColor }}
      >
        <Icon
          name={habitData.icon}
          className="w-[42] h-[42]"
          style={{ color: colorConfig.mainColor }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start h-full">
        <h1 className="font-semibold">{habitData.title}</h1>
        <p className="text-xs">{habitData.description}</p>
      </div>
      <div className="p-2">
        <Switch
          styles={{
            track: {
              border: "none",
              cursor: "pointer",
              backgroundColor: checked
                ? colorConfig.mainColor
                : "var(--mantine-color-gray-3)",
            },
          }}
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
            handleToggle(habitData.id);
          }}
        />
      </div>
    </div>
  );
}
