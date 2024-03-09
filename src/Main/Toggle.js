import React from "react";

const Toggle = () => {
  return (
    <div className="w-[90px] ml-12  cursor-pointer h-[30px]">
      <input type="checkbox" id="check" />
      <label
        htmlFor="check"
        className="bg-black w-[100px] h-[80px] rounded-s"
      ></label>
    </div>
  );
};

export default Toggle;
