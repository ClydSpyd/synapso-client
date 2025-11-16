import { Select } from "@mantine/core";

export default function StatusPicker({
  onChange,
  value,
}: {
  onChange: (status: TaskStatus) => void;
  value: string;
}) {
  const statusOptions: { value: TaskStatus; label: string }[] = [
    {
      value: "todo",
      label: "Pending",
    },
    {
      value: "in-progress",
      label: "Active",
    },
    {
      value: "blocked",
      label: "Waiting",
    },
    {
      value: "done",
      label: "Done",
    },
  ];

  return (
    <Select
      data={statusOptions}
      placeholder="Select Status"
      className="w-full"
      classNames={{
        input: "focus:!border-[var(--accent-three)]",
        label: "text-xs mb-1",
      }}
      value={value}
      onChange={(val) => onChange(val as TaskStatus)}
    />
  );
}
