import { FaHistory } from "react-icons/fa";

export default function HistoryBtn({
  size,
  ...rest
}: { size?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="p-1 border rounded-sm border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-200/50 hover:border-gray-300"
      {...rest}
    >
      <FaHistory className="text-gray-400" size={size ?? 18} />
    </div>
  );
}
