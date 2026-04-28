import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarsPicker({
  defaultStars = 0,
  onChange,
}:{
  defaultStars: number;
  onChange: (stars: number) => void;
}){
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [selectedStars, setSelectedStars] = useState<number>(defaultStars);

    const handleMouseEnter = (index: number) => {
        setHoveredStar(index);
    };

    const handleMouseLeave = () => {
        setHoveredStar(null);
    };

    const handleClick = (index: number) => {
        setSelectedStars(index);
        if (onChange) {
          onChange(index);
        }
    };
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-pointer text-xl p-[2px] ${
            (hoveredStar !== null ? star <= hoveredStar : star <= selectedStars)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        >
          <FaStar />
        </div>
      ))}
    </div>
  );
}