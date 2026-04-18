import { TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export default function TimeField({
  onChange,
  valueProp,
  placeholder,
  leftSection,
  rightSection,
}: {
  valueProp: string;
  onChange: (time: string) => void;
  leftSection: React.ReactNode;
  rightSection?: React.ReactNode;
  placeholder?: string;
}) {
  const [value, setValue] = useState(valueProp);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const formatTimeInput = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  };

  const getDigitIndexFromCaret = (input: string, caret: number) => {
    return input.slice(0, caret).replace(/\D/g, "").length;
  };

  const getCaretFromDigitIndex = (formatted: string, digitIndex: number) => {
    if (digitIndex <= 0) return 0;

    let digitsSeen = 0;

    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        digitsSeen++;
      }

      if (digitsSeen === digitIndex) {
        return i + 1;
      }
    }

    return formatted.length;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const caret = e.currentTarget.selectionStart ?? input.length;

    const digitIndex = getDigitIndexFromCaret(input, caret);
    const formatted = formatTimeInput(input);

    setValue(formatted);

    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;

      const nextCaret = getCaretFromDigitIndex(formatted, digitIndex);
      el.setSelectionRange(nextCaret, nextCaret);
    });
  };

  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder ?? "--:--"}
      inputMode="numeric"
      maxLength={5}
      // LEFT ICON
      leftSection={leftSection}
      // RIGHT SECTION (am/pm toggle example)
      rightSection={rightSection}
      size="lg"
      classNames={{
        input:
          "!border-gray-400 focus:!border-[var(--accent-three)] h-8 !text-base",
      }}
    />
  );
}
