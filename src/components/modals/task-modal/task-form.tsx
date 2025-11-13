import { useState } from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import TagPicker from "@/components/utility-comps/tag-picker";
import SpacePicker from "@/components/utility-comps/space-picker";
import StatusPicker from "@/components/utility-comps/status-picker";

export default function TaskForm({
  defaultData,
  submitting,
  handleFormSubmission,
}: {
  handleFormSubmission: (payload: TaskPayload) => void;
  defaultData?: TaskPayload;
  submitting: boolean;
}) {
  const [config, setConfig] = useState<TaskPayload>(
    defaultData
      ? { ...defaultData, space_id: Number(defaultData.space?.id) ?? undefined }
      : {
          title: "",
          description: "",
          resourceLinks: [],
          updates: [],
          tags: [],
          status: "todo",
        }
  );

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputTags = (e.target as HTMLInputElement).value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    setConfig((prev) => ({
      ...prev,
      tags: Array.from(new Set([...(prev.tags ?? []), ...inputTags])),
    }));
  }

  const removeTag = (idx: number) => {
    setConfig((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== idx),
    }));
  }

  const formCompleted = Object.values(config).every((val) => val !== "");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs">Title</p>
        <TextInput
          data-autofocus
          classNames={{
            input: "focus:!border-[var(--accent-three)]",
          }}
          className="w-full"
          placeholder="Enter Task title"
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
      <div className="flex flex-col gap-1 mb-1">
        <p className="text-xs">Description</p>
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
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="flex flex-col gap-2">
          <p className="text-xs">Status</p>
          <StatusPicker
            onChange={(status: TaskStatus) => {
              console.log({ status });
              setConfig((prev) => ({
                ...prev,
                status: status,
              }));
            }}
            value={config.status !== undefined ? String(config.status) : ""}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Space</p>
          <SpacePicker
            onChange={(spaceId: number) =>
              setConfig((prev) => ({
                ...prev,
                space_id: spaceId,
              }))
            }
            value={config.space_id !== undefined ? String(config.space_id) : ""}
          />
        </div>
      </div>

      <TagPicker
        tags={config.tags ?? []}
        onInput={handleTagInput}
        onDelete={removeTag}
      />

      <Button
        onClick={() => {
          if (formCompleted) {
            handleFormSubmission(config);
          }
        }}
        loading={submitting}
        className="mt-4 button-zen h-[50px]"
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
    </div>
  );
}
