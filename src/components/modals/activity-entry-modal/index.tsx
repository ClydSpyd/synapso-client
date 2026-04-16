import { TextInput, Button } from "@mantine/core";

import ActivityTypePicker from "@/components/utility-comps/activity-type-picker";
import { useState } from "react";
import IconPicker from "@/components/icon-picker";
import { cn } from "@/lib/utils";
import { activityColorOptions } from "@/app/(authenticated)/home/components/activity-snapshot/config";
import { CiLocationOn } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import { FaRoute } from "react-icons/fa6";
import { FaFireFlameCurved } from "react-icons/fa6";
import { BsFillStopwatchFill } from "react-icons/bs";
import TimeField from "@/components/utility-comps/time-input";
import StyledInput from "@/components/utility-comps/styled-input";
import Icon from "@/components/icon-picker/icon";


export default function ActivityEntryModal({
  defaultData,
  colorConfig,
}: {
  defaultData?: ActivityEntry;
    colorConfig?: number;
}) {
    const [config, setConfig] = useState<Partial<ActivityEntry>>(
      defaultData ?? {
        title: "",
        time: "",
        // duration: 0,
        location: "",
        // kcals: 0,
      },
    );
    const colorCombo =
      activityColorOptions[colorConfig ?? defaultData?.colorConfig ?? 0];

    const handleInput = (key: keyof ActivityEntry, value: string | number) => {
      setConfig((prev) => ({
        ...prev,
        [key]: value,
      }));
    }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex mb-4 gap-2 items-end cursor-pointer">
        <div className="grow h-full flex flex-col gap-2 justify-between">
          <StyledInput
            data-autofocus={true}
            title="Title"
            value={config.title ?? ""}
            onChange={(value) => handleInput("title", value)}
            placeholder='e.g. "Morning Run"'
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs">Activity Type</p>
            <ActivityTypePicker
              onChange={(activityType: ActivityType) => {
                handleInput("type", activityType);
              }}
              value={config.type !== undefined ? config.type : undefined}
            />
          </div>
        </div>
        <IconPicker
          baseIconSet="activity"
          onSelect={(val: string) =>
            setConfig((prev) => ({
              ...prev,
              icon: val,
            }))
          }
        >
          <div
            className={cn(
              "h-[135px] w-[135px] flex items-center justify-center border border-slate-200 rounded-md hover:border-[var(--accent-three)] transition-colors duration-300",
            )}
            style={{
              backgroundColor: colorCombo.accentColor,
              borderColor: config.icon
                ? colorCombo.accentColor
                : "border-slate-200",
            }}
          >
            {!config.icon ? (
              <p
                className="text-sm"
                style={{
                  color: colorCombo.mainColor,
                }}
              >
                Select Icon
              </p>
            ) : (
              <Icon name={config.icon} size={90} color={colorCombo.mainColor} />
            )}
          </div>
        </IconPicker>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <StyledInput
          title="Location"
          value={config.location !== undefined ? String(config.location) : ""}
          onChange={(value) => handleInput("location", value)}
          placeholder="Enter location"
          leftSection={<MdLocationOn className="text-gray-400" size={21} />}
          inputClasses="!border-gray-400 focus:!border-[var(--accent-three)] !text-base"
        />
        <StyledInput
          title="Calories Burned"
          leftSection={
            <FaFireFlameCurved className="text-gray-400" size={16} />
          }
          placeholder="0"
          rightSection={
            <span className="text-gray-400 text-sm mr-1">kcals</span>
          }
          value={config.kcals !== undefined ? String(config.kcals) : ""}
          name="kcals"
          onChange={(value: string) => handleInput("kcals", Number(value))}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        <StyledInput
          title="Distance"
          leftSection={<FaRoute className="text-gray-400" size={16} />}
          rightSection={<span className="text-gray-400 text-sm">km</span>}
          placeholder="0.0"
          value={config.distance !== undefined ? String(config.distance) : ""}
          name="distance"
          onChange={(value: string) => handleInput("distance", Number(value))}
        />
        <StyledInput
          title="Duration"
          leftSection={
            <BsFillStopwatchFill className="text-gray-400" size={16} />
          }
          rightSection={
            <span className="text-gray-400 text-sm mr-1">hh:mm</span>
          }
          placeholder="00:00"
          value={config.duration !== undefined ? String(config.duration) : ""}
          name="duration"
          onChange={(value: string) => handleInput("duration", value)}
        />

        <div className="flex flex-col">
          <p className="text-xs mb-1">Time</p>
          <TimeField
            valueProp={config.time !== undefined ? String(config.time) : ""}
            onChange={(time) =>
              setConfig((prev) => ({
                ...prev,
                time,
              }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        {/* <div className="flex flex-col gap-2">
          <p className="text-xs">Calories Burned</p>
          <TextInput
            placeholder="Calories burned (kcals)"
            value={config.kcals !== undefined ? String(config.kcals) : ""}
            name="kcals"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfig((prev) => ({
                ...prev,
                kcals: Number(e.target.value),
              }))
            }
          />
        </div> */}
      </div>

      <Button
        // onClick={() => {
        //   if (formCompleted) {
        //     handleFormSubmission(config);
        //   }
        // }}
        // loading={submitting}
        className="mt-4 button-zen h-[50px]"
        fullWidth
        size="lg"
        variant="gradient"
        gradient={{ from: "indigo", to: "grape", deg: 147 }}
        // style={
        //   !formCompleted
        //     ? {
        //         opacity: 0.5,
        //         pointerEvents: "none",
        //       }
        //     : {}
        // }
      >
        SUBMIT
      </Button>
    </div>
  );
}
