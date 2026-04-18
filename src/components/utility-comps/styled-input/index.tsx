import { TextInput, type TextInputProps } from "@mantine/core";

interface StyledInputProps extends Omit<TextInputProps, "onChange"> {
  title: string;
  onChange?: (value: string) => void;
  inputClasses?: string;
  required?: boolean;
}

export default function StyledInput({
  title,
  value,
  onChange,
  placeholder,
  leftSection,
  rightSection,
  inputClasses,
  required,
  ...rest
}: StyledInputProps) {
    
  return (
    <div className="flex flex-col">
      <p className="text-xs mb-1">
        {title} {required && <span className="text-indigo-500 text-base leading-none">*</span>}
      </p>
      <TextInput
        {...rest}
        leftSection={leftSection}
        rightSection={rightSection}
        size="lg"
        placeholder={placeholder}
        value={value}
        name={title.toLowerCase().trim()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e.target.value);
        }}
        classNames={{
          input: `!border-gray-400 focus:!border-[var(--accent-three)] !text-base ${inputClasses}`,
        }}
      />
    </div>
  );
}
