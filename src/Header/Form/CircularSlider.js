import React, { useState } from "react";

const CircularSlider = () => {
  const [currentDot, setCurrentDot] = useState(2);
  const [onHover, setOnHover] = useState(false);
  console.log(currentDot);
  let NumOfMonths = currentDot;

  const dotCount = 12;

  const handleClick = (index) => {
    setCurrentDot(index);
  };

  return (
    <div className="h-[25rem] flex flex-col items-center justify-center">
      <p>When's your trip?</p>
      <div className="h-[23rem] relative flex items-center justify-center w-[23rem]">
        <div className="h-[18.12rem] flex items-center justify-center bg-[#E6E6E6] bg-clip-border rounded-[50%] w-[18.12rem] shadow-sliderShadow relative">
          {/* Container for the dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dots */}
            {[...Array(dotCount)].map((_, index) => (
              <div
                key={index}
                onMouseEnter={() => setOnHover(index)}
                onMouseLeave={() => setOnHover("")}
                className="absolute flex items-center justify-center bg-transparent rounded-full cursor-pointer"
                style={{
                  width: "5rem",
                  height: "5rem",
                  transform: `rotate(${
                    index * (360 / dotCount)
                  }deg) translate(0, -7rem)`,
                }}
                onClick={() => handleClick(index)}
              >
                <div
                  className={`h-2 w-2 ${
                    onHover === index ? "bg-black scale-150" : "bg-[#4d4d4d]"
                  } ${
                    currentDot === 0
                      ? "bg-dark-pink"
                      : index > 0 && index <= currentDot - 1 && "bg-dark-pink"
                  }  rounded-full`}
                ></div>
              </div>
            ))}
          </div>

          <div
            className="absolute bg-pink rounded-full"
            style={{
              width: "36px",
              height: "36px",
              transition: "transform 0.2s ease",
              transform: `rotate(${
                currentDot === 0 ? 360 : currentDot * (360 / dotCount)
              }deg) translate(0, -7rem)`,
            }}
          ></div>
          <div className="h-[10.62rem] flex items-center justify-center bg-white rounded-[50%] shadow-sliderShadow2 w-[10.62rem]">
            <span className="flex  flex-col items-center justify-center">
              <p className="text-[6rem] h-[7rem] mb-2 font-semibold p-0 m-0">
                {currentDot === 0 ? 12 : NumOfMonths}
              </p>{" "}
              <p className="mb-6 font-bold text-lg">
                month{currentDot === 1 ? "" : "s"}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularSlider;
