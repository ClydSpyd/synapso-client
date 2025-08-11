import { useState } from "react";
import { TextInput, NumberInput, Textarea, Button } from "@mantine/core";
import IconPicker from "@/components/icon-picker";
import Icon from "@/components/icon-picker/icon";
import { cn } from "@/lib/utils";

export default function HabitForm({
  defaultData,
  submitting,
  handleFormSubmission,
}: {
  handleFormSubmission: (payload: HabitPayload) => void;
  defaultData?: HabitPayload;
  submitting: boolean;
}) {
  const [config, setConfig] = useState<HabitPayload>(
    defaultData ?? {
      title: "",
      description: "",
      icon: "",
      target: 1,
    }
  );
  const formCompleted = Object.values(config).every((val) => val !== "");

  return (
    <>
      <div className="h-[120px] w-full flex mb-4 gap-2 items-end cursor-pointer">
        <div className="grow h-full flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs">Habit Title</p>
            <TextInput
              data-autofocus
              classNames={{
                input: "focus:!border-[var(--accent-three)]",
              }}
              className="col-span-2"
              placeholder="Enter habit title"
              value={config.title}
              name="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs">Target Frequency (per week)</p>
            <NumberInput
              classNames={{
                input: "focus:!border-[var(--accent-three)]",
              }}
              placeholder="Enter target frequency (per week)"
              value={config.target}
              name="target"
              onChange={(value) =>
                setConfig((prev) => ({
                  ...prev,
                  target: typeof value === "number" ? value : 0,
                }))
              }
              min={1}
              max={7}
              step={1}
            />
          </div>
        </div>
        <IconPicker
          onSelect={(val: string) =>
            setConfig((prev) => ({
              ...prev,
              icon: val,
            }))
          }
        >
          <div
            // onClick={open}
            className={cn(
              "h-[100px] w-[100px] flex items-center justify-center border border-slate-200 rounded-md hover:border-[var(--accent-three)] transition-colors duration-300",
              {
                "bg-[var(--accent-light-three)]": config.icon,
              }
            )}
          >
            {!config.icon ? (
              <p className="text-[var(--accent-three)] text-sm">Select Icon</p>
            ) : (
              <Icon name={config.icon} size={50} color="var(--accent-three)" />
            )}
          </div>
        </IconPicker>
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-xs">Habit Description</p>
        <Textarea
          minRows={6}
          placeholder="Enter habit description"
          value={config.description}
          name="description"
          classNames={{
            input: "focus:!border-[var(--accent-three)]",
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setConfig((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>
      <Button
        onClick={() => {
          if (formCompleted) {
            handleFormSubmission(config);
          }
        }}
        loading={submitting}
        className="mt-2 button-zen h-[50px]"
        fullWidth
        variant="gradient"
        gradient={{ from: "indigo", to: "grape", deg: 147 }}
        style={
          !formCompleted
            ? {
                opacity: 0.5,
                pointerEvents: "none",
              }
            : {}
        }
      >
        SUBMIT
      </Button>
    </>
  );
}
