import { activityTypes } from "@/app/(authenticated)/home/components/activity-snapshot/config";
import { Select } from "@mantine/core";

export default function ActivityTypePicker({
  onChange,
  value,
}: {
  onChange: (status: ActivityType) => void;
  value?: ActivityType;
}) {


  return (
    <Select
      data={activityTypes}
      size="lg"
      placeholder="Select Activity Type"
      className="w-full"
      classNames={{
        input: "!border-gray-400 focus:!border-[var(--accent-three)] !text-base",
        label: "!text-xs mb-1",
        option: "!text-sm",
      }}
      value={value}
      onChange={(val) => onChange(val as ActivityType)}
    />
  );
}
