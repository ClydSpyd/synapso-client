import "./styles.css";

import Image from "next/image";

export default function CircleTick({
  height,
  width,
  color
}: {
  height: number;
  width: number;
  color?: string;
}) {
  const dynamicContainerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `${height}px`,
    width: `${width}px`,
    padding: "0",
    position: "relative"
  };

  const tickSize: number = height ? (height / 100) * 40 : 0;

  return (
    <div style={dynamicContainerStyles}>
      <svg
        className="outer-circle"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color ?? "#4ECA70"}
          strokeWidth="6"
          strokeDasharray="251"
          strokeDashoffset="251"
        />
      </svg>
      <div
        className="tick-circle"
        style={{ backgroundColor: color ?? "#4ECA70" }}
      >
        <Image
          src="/images/tick-white.png"
          height={tickSize}
          width={tickSize}
          alt={"tick"}
        />
      </div>
    </div>
  );
}
