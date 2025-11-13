import { getTagColorConfig } from "@/lib/utils";
import { TextInput } from "@mantine/core";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function TagPicker({
  tags,
  onInput,
  onDelete,
}: {
  tags: string[];
  onInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDelete: (idx: number) => void;
}) {
  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setTagInput("");
      onInput(e);
    }
    console.log(e);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-xs">Tags</p>
      <TextInput
        value={tagInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTagInput(e.target.value)
        }
        onKeyUp={handleTagInput}
        type="text"
        placeholder="Comma-separated, hit 'return' to add"
        classNames={{
          input: "focus:!border-[var(--accent-three)]",
        }}
      />
      <div className="flex gap-2 mt-2">
        {tags?.map((tag, idx) => {
          const colorConfig = getTagColorConfig(tag.toLowerCase());
          return (
            <span
              onClick={() => onDelete(idx)}
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
  );
}
