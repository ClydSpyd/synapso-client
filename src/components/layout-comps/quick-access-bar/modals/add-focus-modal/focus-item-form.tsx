import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import IconPicker from "@/components/icon-picker";
import Icon from "@/components/icon-picker/icon";
import { cn } from "@/lib/utils";
import { getMonday } from "@/lib/dates";

export default function FocusItemForm({
  defaultData,
  submitting,
  handleFormSubmission,
}: {
  handleFormSubmission: (payload: FocusPayload) => void;
  defaultData?: FocusPayload;
  submitting: boolean;
}) {
  const monday = getMonday();
  console.log({ monday });
  const [config, setConfig] = useState<FocusPayload>(
    defaultData ?? {
      title: "",
      description: "",
      icon: "",
      week_starting: monday,
    }
  );
  const formCompleted = Object.values(config).every((val) => val !== "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="h-[120px] w-full flex mb-4 gap-2 items-end cursor-pointer">
        <div className="grow h-full flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs">Title</p>
            <TextInput
              data-autofocus
              classNames={{
                input: "focus:!border-[var(--accent-three)]",
              }}
              className="col-span-2"
              placeholder="Enter title"
              value={config.title}
              name="title"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs">Description</p>
            <TextInput
              classNames={{
                input: "focus:!border-[var(--accent-three)]",
              }}
              placeholder="Enter Description"
              value={config.description}
              name="description"
              onChange={handleInputChange}
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
