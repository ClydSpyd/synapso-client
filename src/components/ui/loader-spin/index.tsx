import React from "react";

interface LoaderSpinProps {
  size?: number;
  color?: string;
}

const LoaderSpin: React.FC<LoaderSpinProps> = ({ size = 40, color = "#6500d8" }) => {
  const strokeWidth = size * 0.4;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-[spin_0.4s_linear_infinite]"
      style={{ stroke: color }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        strokeWidth={strokeWidth}
        strokeOpacity="0.2"
        strokeLinecap="round"
      />
      <path
        d="M45 25c0-11.046-8.954-20-20-20"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoaderSpin;