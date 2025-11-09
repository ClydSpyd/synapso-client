import { useState } from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import { useSpaceSummaries } from "@/queries/useSpaces";
import { getTagColorConfig } from "@/lib/utils";
import { TiDelete } from "react-icons/ti";

export default function TaskForm({
  defaultData,
  submitting,
  handleFormSubmission,
}: {
  handleFormSubmission: (payload: TaskPayload) => void;
  defaultData?: TaskPayload;
  submitting: boolean;
}) {
  const { data: spaces } = useSpaceSummaries();
  console.log({ spaces });
  const [tagInput, setTagInput] = useState("");
  const [config, setConfig] = useState<TaskPayload>(
    defaultData ?? {
      title: "",
      description: "",
      resourceLinks: [],
      updates: [],
      tags: [],
      status: "todo",
    }
  );

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setTagInput("");
      setConfig((prev) => ({
        ...prev,
        tags: [
          ...(prev.tags ?? []),
          ...(e.target as HTMLInputElement).value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        ],
      }));
    }
    console.log(e);
  }

  const removeTag = (idx: number) => {
    setConfig((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== idx),
    }));
  }

  const formCompleted = Object.values(config).every((val) => val !== "");

  return (
    <>
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
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs">Tags</p>
        <TextInput
          value={tagInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTagInput(e.target.value)
          }
          onKeyUp={handleTagInput}
          type="text"
          placeholder="work, idea, urgent..."
          classNames={{
            input: "focus:!border-[var(--accent-three)]",
          }}
        />
        <div className="flex gap-2 mt-2">
          {config.tags?.map((tag, idx) => {
            const colorConfig = getTagColorConfig(tag.toLowerCase());
            return (
              <span
                onClick={() => removeTag(idx)}
                key={idx}
                className="text-sm px-2 py-[2px] rounded-full relative flex items-center justify-center overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: colorConfig.accentColor,
                  color: colorConfig.mainColor,
                }}
              >
                {tag.toLowerCase()}
                <div
                  className="absolute h-full w-full flex items-center justify-center opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-75"
                  style={{
                    backgroundColor: colorConfig.accentColor,
                    color: colorConfig.mainColor,
                  }}
                >
                  <TiDelete size={22} />
                </div>
              </span>
            );
          })}
        </div>
      </div>
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
    </>
  );
}
