import { useSpaceSummaries } from "@/queries/useSpaces";
import { Select } from "@mantine/core";

export default function SpacePicker({
    onChange,
    value,
}:{
    onChange: (spaceId: number) => void;
    value: string;
}) {
  const { data: spaces } = useSpaceSummaries();
  console.log({ spaces });
  return (
    <Select
      data={
        spaces
          ? spaces.map((space) => ({
              value: String(space.id),
              label: space.title,
            }))
          : []
      }
      placeholder="Select Space"
      className="w-full"
      classNames={{
        input: "focus:!border-[var(--accent-three)]",
        label: "text-xs mb-1",
      }}
      value={value}
      onChange={(val) => onChange(+val!)}
    />
  );
}
