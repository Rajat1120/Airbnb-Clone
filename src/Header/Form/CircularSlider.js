import React, { useState } from "react";
import "./CircularSlider.css";

const CircularSlider = () => {
  const [months, setMonths] = useState(3);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setMonths(value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <input
          type="range"
          min="1"
          max="12"
          value={months}
          onChange={handleSliderChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        <div className="absolute inset-0 rounded-full border-4 border-gray-300">
          <div
            className="absolute inset-0 rounded-full border-4 border-red-500"
            style={{
              transform: `rotate(${(months / 12) * 360}deg)`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-2xl font-bold">
          <div>{months}</div>
          <div className="text-sm">months</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        Starting on 1 July ·{" "}
        <a href="#" className="text-blue-500">
          Edit
        </a>
      </div>
    </div>
  );
};

export default CircularSlider;
