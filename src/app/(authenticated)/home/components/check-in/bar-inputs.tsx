import { colorCombos } from "@/config/color-config";
import { useEffect, useState } from "react";
import { CheckinValues } from "./checkin-history-modal/module-content";

const BarRow = ({
  colorConfig,
  title,
  value,
  onChange,
}: {
  colorConfig: ColorCombo;
  title: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  const [localVal, setLocalVal] = useState(value);

  // Sync localVal with value prop when it changes
  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  useEffect(() => {
    onChange(localVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localVal]);

  return (
    <div className="flex items-center gap-4 my-1">
      <p className="w-[40px] text-xs font-medium text-gray-600 cursor-pointer">
        {title}
      </p>
      <div
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const updateValue = (clientX: number) => {
            const clickX = Math.max(
              0,
              Math.min(clientX - rect.left, rect.width)
            );
            const percent = Math.round(((clickX / rect.width) * 100) / 5) * 5;
            setLocalVal(percent);
          };

          updateValue(e.clientX);

          const onMouseMove = (moveEvent: MouseEvent) => {
            updateValue(moveEvent.clientX);
          };

          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };

          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
        className="grow h-2 rounded-full bg-gray-200 cursor-pointer"
      >
        <div
          className="h-2 rounded-full transition-all duration-200 ease-in-out"
          style={{
            width: `${localVal}%`,
            backgroundColor: colorConfig.mainColor,
          }}
        ></div>
      </div>
      <p className="text-xs font-medium text-gray-600 w-[30px]">{localVal}%</p>
    </div>
  );
};

export default function BarInputs({
  onChange,
  values,
}: {
  onChange: (field: keyof CheckinValues, value: number) => void;
  values: CheckinValues;
}) {
  return (
    <>
      <BarRow
        colorConfig={colorCombos[3]}
        title="Energy"
        value={values.energy_level}
        onChange={(val: number) => onChange("energy_level", val)}
      />
      <BarRow
        colorConfig={colorCombos[4]}
        title="Focus"
        value={values.focus_level}
        onChange={(val: number) => onChange("focus_level", val)}
      />
      <BarRow
        colorConfig={colorCombos[0]}
        title="Stress"
        value={values.stress_level}
        onChange={(val: number) => onChange("stress_level", val)}
      />
    </>
  );
}
