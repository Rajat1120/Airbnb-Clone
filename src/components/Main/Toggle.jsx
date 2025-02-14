import React from "react";

const Toggle = ({ isChecked, handleToggle }) => {
  return (
    <label
      htmlFor="toggleA"
      className="flex  py-[12px]  pl-[2px] pr-[15px]  z-20 items-center justify-start"
    >
      <div className="relative">
        <input
          id="toggleA"
          type="checkbox"
          className="sr-only"
          checked={isChecked} // Set checked state based on component state
          onChange={handleToggle} // Call handleToggle on checkbox change
        />
        <div
          className={`h-5 w-8 rounded-full ${
            isChecked ? "bg-black" : " bg-gray-300 "
          } shadow-inner`}
        ></div>
        <div
          className={`dot absolute -left-1 top-0 h-5 w-5 rounded-full bg-white shadow transition ${
            isChecked ? "translate-x-full " : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;
