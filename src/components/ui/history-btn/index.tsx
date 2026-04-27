import { FaHistory } from "react-icons/fa";

export default function HistoryBtn({
  size,
  ...rest
}: { size?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="border rounded-sm border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-200/50 hover:border-gray-300 p-[25%]"
      style={{
        height: size ? `${size}px` : "35px",
        width: size ? `${size}px` : "35px",
      }}
      {...rest}
    >
      <FaHistory className="text-gray-400" size={"auto"} />
    </div>
  );
}
