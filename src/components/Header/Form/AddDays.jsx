import React from "react";

// reusable DayButton component
const DayButton = ({ text, isExactDate = false }) => {
  return (
    <button className="cursor-auto px-4 text-nowrap flex justify-center items-center text-xs h-8 space-x-1 rounded-full border-[1px] border-gray-300">
      {isExactDate ? (
        // Render "Exact dates" button
        <span>{text}</span>
      ) : (
        // Render days button with +/- indicators
        <>
          <div className="flex flex-col items-center text-xs">
            <p className="h-[6px] flex-center leading-none">+</p>
            <p className="h-[6px] flex-center leading-none">-</p>
          </div>
          <span className="leading-none">{text}</span>
        </>
      )}
    </button>
  );
};

// Main AddDays component
const AddDays = () => {
  return (
    <div className="w-full flex overflow-auto space-x-3 items-center justify-start px-2 1xz:px-10 1xz:py-6 py-2">
      {/* Render exact date button */}
      <DayButton text="Exact dates" isExactDate={true} />

      {/* Render other day buttons with dynamic text */}
      <DayButton text="1 day" />
      <DayButton text="2 days" />
      <DayButton text="3 days" />
      <DayButton text="7 days" />
      <DayButton text="14 days" />
    </div>
  );
};

export default AddDays;
