import { Button, Textarea } from "@mantine/core";

import ActivityTypePicker from "@/components/utility-comps/activity-type-picker";
import { useEffect, useState } from "react";
import IconPicker from "@/components/icon-picker";
import { cn } from "@/lib/utils";
import { activityColorOptions } from "@/app/(authenticated)/home/components/activity-snapshot/config";
import { MdLocationOn } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import { FaRoute } from "react-icons/fa6";
import { BsFillStopwatchFill } from "react-icons/bs";
import TimeField from "@/components/utility-comps/time-input";
import StyledInput from "@/components/utility-comps/styled-input";
import Icon from "@/components/icon-picker/icon";
import { useActivitySnapshot } from "@/queries/useActivitySnapshot";
import { API } from "@/api";
import { useModalStore } from "@/stores/modal-store";
import { formatDatePayload } from "@/lib/dates";
import CaloriesSection from "./calories-section";

const requiredFields: (keyof ActivityEntry)[] = [
  "title",
  "type",
  "time",
  "duration",
  "icon",
  "location",
];

export default function ActivityEntryModal({
  defaultData,
  colorConfig,
}: {
  defaultData?: ActivityEntry;
  colorConfig?: number;
}) {
  const [formState, setFormState] = useState<{
    error: string | null;
    submitting: boolean;
    completed: boolean;
  }>({
    error: null,
    submitting: false,
    completed: false,
  });

  const [config, setConfig] = useState<Partial<ActivityEntry>>(
    defaultData ?? {
      title: "",
      time: "",
      location: "",
      colorConfig
    },
  );

  const isUpdate = !!defaultData;
  const today = formatDatePayload(0);
  const { refetch } = useActivitySnapshot(defaultData?.date ?? today);
  const { close } = useModalStore();

  useEffect(() => {
    const isComplete = requiredFields.every(
      (key) =>
        config[key as keyof ActivityEntry] !== undefined &&
        config[key as keyof ActivityEntry] !== "",
    );
    setFormState((prev) => ({
      ...prev,
      error: null,
      completed: isComplete,
    }));
  }, [config]);
  

  const colorCombo =
    activityColorOptions[colorConfig ?? defaultData?.colorConfig ?? 0];

  const handleInput = (key: keyof ActivityEntry, value: string | number) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmission = async (): Promise<void> => {
    if(!formState.completed) {
      setFormState((prev) => ({
        ...prev,
        error: "Please fill in all required fields.",
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      submitting: true,
      error: null,
    }));

    let error: string | null = null;
    if (isUpdate && defaultData?.id) {
      const response = await API.activitySnapshot.edit(
        defaultData.id,
        config as Partial<Omit<ActivityEntry, "id">>
      );
      error = response.error ?? null;
    } else {
       error = (await API.activitySnapshot.create(config as ActivityEntry)).error ?? null;
    }

    if(error) {
      console.error("Error creating activity entry:", error);
      setFormState((prev) => ({
        ...prev,
        submitting: false,
        error,
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      submitting: false,
      completed: true,
    }));
    refetch();
    close();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex mb-4 gap-2 items-end cursor-pointer">
        <div className="grow h-full flex flex-col gap-2 justify-between">
          <StyledInput
            required
            data-autofocus={true}
            title="Title"
            value={config.title}
            onChange={(value) => handleInput("title", value)}
            placeholder='e.g. "Morning Run"'
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs">
              Activity Type{" "}
              <span className="text-indigo-500 text-base leading-none">*</span>
            </p>
            <ActivityTypePicker
              onChange={(activityType: ActivityType) => {
                handleInput("type", activityType);
              }}
              value={config.type}
            />
          </div>
        </div>
        <IconPicker
          baseIconSet="activity"
          onSelect={(val: string) => handleInput("icon", val)}
        >
          <div
            className={cn(
              "h-[135px] w-[135px] flex items-center justify-center border-slate-200 rounded-md hover:border-[var(--accent-three)] transition-colors duration-300",
            )}
            style={{
              backgroundColor: colorCombo.accentColor,
              border: `2px solid ${colorCombo.mainColor}`,
            }}
          >
            {!config.icon ? (
              <p
                className="text-sm font-medium"
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
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="flex flex-col">
          <p className="text-xs mb-1">
            Time{" "}
            <span className="text-indigo-500 text-base leading-none">*</span>
          </p>
          <TimeField
            valueProp={config.time !== undefined ? String(config.time) : ""}
            onChange={(time) => handleInput("time", time)}
            leftSection={<BsClockFill className="text-gray-400" size={16} />}
            rightSection={
              <div style={{ fontSize: 12, opacity: 0.7 }}>24hrs</div>
            }
          />
        </div>
        <StyledInput
          required
          type="number"
          title="Duration"
          leftSection={
            <BsFillStopwatchFill className="text-gray-400" size={16} />
          }
          rightSection={
            <span className="text-gray-400 text-sm mr-1">mins</span>
          }
          placeholder="0"
          value={config.duration !== undefined ? String(config.duration) : ""}
          name="duration"
          onChange={(value: string) => handleInput("duration", Number(value))}
        />

        <StyledInput
          type="number"
          title="Distance"
          leftSection={<FaRoute className="text-gray-400" size={16} />}
          rightSection={<span className="text-gray-400 text-sm">km</span>}
          placeholder="0.0"
          value={config.distance ?? ""}
          name="distance"
          onChange={(value: string) => handleInput("distance", Number(value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <StyledInput
          required
          title="Location"
          value={config.location}
          onChange={(value) => handleInput("location", value)}
          placeholder="Enter location"
          leftSection={<MdLocationOn className="text-gray-400" size={21} />}
          inputClasses="!border-gray-400 focus:!border-[var(--accent-three)] !text-base"
        />
        {/* <StyledInput
          type="number"
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
        /> */}
        <CaloriesSection
          entryData={{
            type: config.type!,
            title: config.title!,
            duration: config.duration!,
            distance: config.distance,
          }}
          value={config.kcals ?? undefined}
          onChange={(value) => handleInput("kcals", value)}
          enableEstimation={
            !!config.title && !!config.type && !!config.duration
          }
        />
      </div>
      <div className="flex flex-col gap-1 mb-1">
        <p className="text-xs">Activity Description</p>
        <Textarea
          minRows={6}
          placeholder="Enter activity description"
          value={config.description !== undefined ? config.description : ""}
          name="description"
          classNames={{
            input: `!border-gray-400 focus:!border-[var(--accent-three)] !text-base`,
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleInput("description", e.target.value)
          }
        />
      </div>

      <Button
        onClick={handleSubmission}
        loading={formState.submitting}
        className="mt-4 button-zen h-[50px]"
        fullWidth
        size="lg"
        variant="gradient"
        gradient={{ from: "indigo", to: "grape", deg: 147 }}
        style={
          !formState.completed
            ? {
                opacity: 0.5,
                pointerEvents: "none",
              }
            : {}
        }
      >
        SUBMIT
      </Button>
      <div
        className={cn(
          "text-sm text-red-500 flex items-end justify-center w-full overflow-hidden transition-all duration-300",
          formState.error ? "opacity-100 h-4" : "opacity-0 h-0",
        )}
      >
        {formState.error}
      </div>
    </div>
  );
}
