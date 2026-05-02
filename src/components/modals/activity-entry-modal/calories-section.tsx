import StyledInput from "@/components/utility-comps/styled-input";
import { colorCombos } from "@/config/color-config";
import { estimateCalories } from "@/lib/kcal-estimation";
import { EstimateInput } from "@/lib/kcal-estimation/types";
import { Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

export default function CaloriesSection({
  value,
  onChange,
  enableEstimation,
  entryData,
}: {
  value: number | undefined;
  onChange: (value: number) => void;
  enableEstimation: boolean;
  entryData: EstimateInput;
}) {
  const [showConfig, setShowConfig] = useState(false);
  const [calConfig, setCalConfig] = useState<{
    weight?: number;
    sex?: "male" | "female";
  }>({});

  const colorConfig = colorCombos[3];

  const handleEstimate = () => {
    // if (calConfig.weight !== undefined) {
    //   const calories = estimateCalories(entryData, calConfig.weight, calConfig.sex);
    //   onChange(calories.calories);
    // }
    const {calories} = estimateCalories(entryData, 83, "male");
    onChange(calories);

  };

  return (
    <div className="w-full relative">
      <div
        style={{
          width: "calc(100% + 10px)",
          height: "calc(100% + 10px)",
          position: "absolute",
          top: "-8px",
          left: "-5px",
          zIndex: -1,
          borderRadius: "6px",
          border: showConfig ? `2px solid ${colorConfig.hintColor}` : "",
          transition: "border 0.1s ease-in-out",
        }}
      />
      <div
        className="absolute top-[-10px] right-0 z-20 duration-300 ease-in-out transition-opacity"
        style={{
          display: !showConfig ? "flex" : "none",
          opacity: enableEstimation ? 1 : 0,
          pointerEvents: enableEstimation ? "auto" : "none",
        }}
      >
        <button
          //   style={{
          //     borderRadius: "6px",
          //     padding: "6px 8px",
          //   }}
          //   onClick={() => setShowConfig((prev) => !prev)}
          onClick={handleEstimate}
          className="flex gap-1 items-center cursor-pointer bg-zen-shift px-2 py-1 !transition-all ease-in-out !duration-300 rounded-sm"
        >
          <FaFireFlameCurved size={16} color={"white"} />
          <p className="text-xs font-semibold text-white">estimate</p>
        </button>
        {/* 
        <Button
          size="xs"
          variant="filled"
          radius={"sm"}
          color="grape"
        >
          Estimate
        </Button> */}
      </div>
      <div className="w-full relative overflow-hidden h-[75px]">
        <div
          className="w-full"
          style={{
            position: "absolute",
            top: showConfig ? "-76px" : "0",
            left: 0,
            transition: "top 0.1s ease-in-out",
          }}
        >
          <div className="w-full h-[75px] relative">
            <StyledInput
              disabled={showConfig}
              type="number"
              title="Calories Burned"
              leftSection={
                <FaFireFlameCurved className="text-gray-400" size={16} />
              }
              placeholder="0"
              rightSection={
                <span className="text-gray-400 text-sm mr-1">kcals</span>
              }
              value={value}
              name="kcals"
              onChange={(value: string) => onChange(Number(value))}
            />
          </div>
          <div className="w-full h-[75px] grid grid-cols-7 gap-2 relative left-[2px]">
            <div className="col-span-3">
              <p className="text-xs mb-1">Weight</p>
              <TextInput
                disabled={!showConfig}
                rightSection={
                  <span className="text-gray-400 text-sm mr-1">kg</span>
                }
                size="lg"
                placeholder="0"
                value={
                  calConfig.weight !== undefined ? String(calConfig.weight) : ""
                }
                name="weight"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCalConfig((prev) => ({
                    ...prev,
                    weight: Number(e.target.value),
                  }));
                }}
                classNames={{
                  input: `!border-gray-400 focus:!border-[var(--accent-three)] !text-base`,
                }}
              />
            </div>
            <div className="col-span-3">
              <p className="text-xs mb-1">Sex</p>
              <Select
                disabled={!showConfig}
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                size="lg"
                placeholder="-"
                className="w-full"
                classNames={{
                  input:
                    "!border-gray-400 focus:!border-[var(--accent-three)] !text-base",
                  label: "!text-xs mb-1",
                  option: "!text-sm",
                }}
                value={calConfig.sex}
                onChange={(val: string | null) =>
                  setCalConfig((prev) => ({
                    ...prev,
                    sex: val as "male" | "female",
                  }))
                }
              />
            </div>
            <div className="col-span-1 flex flex-col justify-end items-center h-full pb-3">
              <div className="h-[42px] relative left-[-3px] flex items-center justify-center w-full">
                <FaCircleCheck
                  onClick={() => {
                    setShowConfig(false);
                  }}
                  size={25}
                  color={colorConfig.mainColor}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
