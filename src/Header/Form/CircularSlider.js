import React from "react";

const CircularSlider = () => {
  return (
    <div className="h-[25rem] flex flex-col items-center justify-center">
      <p>When's your trip?</p>
      <div className="h-[23rem] relative flex items-center justify-center w-[23rem]">
        <div className="h-[18.12rem] flex items-center justify-center bg-[#E6E6E6] bg-clip-border rounded-[50%]  w-[18.12rem] shadow-sliderShadow ">
          <div className="h-[10.62rem] bg-white  rounded-[50%] shadow-sliderShadow2 w-[10.62rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default CircularSlider;
