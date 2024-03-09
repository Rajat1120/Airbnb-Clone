import React from "react";
import filter_icon from "../../data/Arrows/filter_icon.svg";
import Toggle from "../Toggle";

const FilterHome = () => {
  return (
    <div
      className={
        "w-[30%]  gap-x-[10px]     rounded-lg flex items-center justify-center overflow-hidden"
      }
    >
      <button className="border-[1px] py-[7px] text-[12px] font-medium w-[92px] h-[48px] border-grey-dim rounded-lg flex items-center gap-x-1 justify-center ">
        <img src={filter_icon} className="transform scale-[80%]" alt="" />
        Filters
      </button>
      <button className="border-[1px] py-[10px] px-[16px] text-[12px] font-medium w-[205px] h-[48px] border-grey-dim rounded-lg flex items-center justify-center ">
        Display total Taxes before
        {/* <Toggle></Toggle> */}
      </button>
    </div>
  );
};

export default FilterHome;
