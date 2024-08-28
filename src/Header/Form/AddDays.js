import React from "react";

const AddDays = () => {
  return (
    <div className="w-full flex overflow-auto space-x-3 items-center justify-start px-2 1xz:px-10 1xz:py-6 py-2">
      <button className=" text-xs text-nowrap px-4 h-8 rounded-full border-[1px]  border-grey-dim">
        Exact dates
      </button>

      <button className=" px-4 text-nowrap flex  justify-center items-center text-xs h-8 space-x-1 rounded-full border-[1px] border-gray-300">
        <div className="flex flex-col items-center text-xs">
          <p className="h-[6px] flex-center leading-none">+</p>
          <p className="h-[6px] flex-center leading-none">-</p>
        </div>
        <span className="leading-none">1 days</span>
      </button>
      <button className=" px-4 text-nowrap flex  justify-center items-center text-xs h-8 space-x-1 rounded-full border-[1px] border-gray-300">
        <div className="flex flex-col items-center text-xs">
          <p className="h-[6px] flex-center leading-none">+</p>
          <p className="h-[6px] flex-center leading-none">-</p>
        </div>
        <span className="leading-none">2 days</span>
      </button>
      <button className=" px-4 text-nowrap flex  justify-center items-center text-xs h-8 space-x-1 rounded-full border-[1px] border-gray-300">
        <div className="flex flex-col items-center text-xs">
          <p className="h-[6px] flex-center leading-none">+</p>
          <p className="h-[6px] flex-center leading-none">-</p>
        </div>
        <span className="leading-none">3 days</span>
      </button>
      <button className=" px-4 text-nowrap flex  justify-center items-center text-xs h-8 space-x-1 rounded-full border-[1px] border-gray-300">
        <div className="flex flex-col items-center text-xs">
          <p className="h-[6px] flex-center leading-none">+</p>
          <p className="h-[6px] flex-center leading-none">-</p>
        </div>
        <span className="leading-none">7 days</span>
      </button>
      <button className=" px-4 text-nowrap flex  justify-center items-center text-xs h-8 space-x-1 rounded-full border-[1px] border-gray-300">
        <div className="flex flex-col items-center text-xs">
          <p className="h-[6px] flex-center leading-none">+</p>
          <p className="h-[6px] flex-center leading-none">-</p>
        </div>
        <span className="leading-none">14 days</span>
      </button>
    </div>
  );
};

export default AddDays;
