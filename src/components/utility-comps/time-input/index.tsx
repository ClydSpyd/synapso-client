import { TextInput } from "@mantine/core";
import { BsClockFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function TimeField({
  onChange,
  valueProp,
}: {
  valueProp?: string;
  onChange?: (time: string) => void;
}) {
  const [value, setValue] = useState(valueProp ?? "");

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const formatTimeInput = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  };

  return (
    // <TextInput
    //             leftSection={<BsClockFill className="text-gray-400" size={16} />}
    //             rightSection={<span className="text-gray-400 text-sm pr-2">am/pm</span>}
    //             size="lg"
    //             placeholder="--:--"
    //             value={config.time !== undefined ? String(config.time) : ""}
    //             name="time"
    //             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //               setConfig((prev) => ({
    //                 ...prev,
    //                 time: e.target.value,
    //               }))
    //             }
    //             classNames={{
    //               input:
    //                 "!border-gray-400 focus:!border-[var(--accent-three)] h-8 !text-base",
    //             }}
    //           />
    <TextInput
      value={value}
      onChange={(e) => setValue(formatTimeInput(e.currentTarget.value))}
      placeholder="--:--"
      inputMode="numeric"
      maxLength={5}
      // LEFT ICON
      leftSection={<BsClockFill className="text-gray-400" size={16} />}
      // RIGHT SECTION (am/pm toggle example)
      rightSection={<div style={{ fontSize: 12, opacity: 0.7 }}>am/pm</div>}
      size="lg"
      classNames={{
        input:
          "!border-gray-400 focus:!border-[var(--accent-three)] h-8 !text-base",
      }}
    />
  );
}
