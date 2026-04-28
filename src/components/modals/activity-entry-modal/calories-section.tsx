import StyledInput from "@/components/utility-comps/styled-input";
import { FaFireFlameCurved } from "react-icons/fa6";

export default function CaloriesSection({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <StyledInput
      type="number"
      title="Calories Burned"
      leftSection={<FaFireFlameCurved className="text-gray-400" size={16} />}
      placeholder="0"
      rightSection={<span className="text-gray-400 text-sm mr-1">kcals</span>}
      value={value}
      name="kcals"
      onChange={(value: string) => onChange(Number(value))}
    />
  );
}
