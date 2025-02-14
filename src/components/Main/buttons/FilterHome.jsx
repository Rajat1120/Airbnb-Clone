import React, { useState } from "react";
import filter_icon from "../../../asset/Icons_svg/filter_icon.svg";
import Toggle from "../Toggle";

const FilterHome = () => {
  const [isChecked, setIsChecked] = useState(false); // Initial state
  const handleToggle = () => {
    setIsChecked(!isChecked); // Toggle checked state on click
  };

  return (
    <div
      className={
        "w-[20.25rem] hidden  gap-x-[10px] mx-0    rounded-lg 1sm:flex items-center justify-around "
      }
    >
      <div className="border-[1px] hover:bg-gray-100 hover:border-black py-[7px] text-[12px] font-medium w-[112px] h-[48px] border-grey-dim rounded-xl flex items-center gap-x-1 justify-center ">
        <img src={filter_icon} className="transform scale-[80%]" alt="" />
        Filters
      </div>
      <div className="border-[1px]  hover:bg-gray-100 hover:border-black text-[11px] font-medium w-[240px] h-[48px] border-grey-dim rounded-xl flex justify-between  items-center ">
        <div className=" py-[15px] pr-[5px] px-[14px] " onClick={handleToggle}>
          <p>Display total before taxes</p>
        </div>
        <Toggle isChecked={isChecked} handleToggle={handleToggle}></Toggle>
      </div>
    </div>
  );
};

export default FilterHome;
