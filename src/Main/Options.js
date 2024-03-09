import React from "react";
import FilterHome from "./buttons/FilterHome";
import arrow_left from "./../data/Arrows/arrow-left.svg";
import arrow_right from "./../data/Arrows/arrow-right.svg";

// import options from "../data/Options-Svg";

const Options = () => {
  function importAll(r) {
    return r.keys().map((item) => {
      return { key: item.slice(1, -4), svg: r(item) };
    });
  }

  const options = importAll(
    require.context("../data/Options-Svg", false, /\.svg$/)
  );

  console.log(options);
  return (
    <div className="px-[40px]  ">
      <div className="h-[98px] flex  py-3 relative ">
        <div
          className={
            "w-[70%] flex relative items-center   rounded-lg overflow-hidden"
          }
        >
          <button className=" absolute top-[25%] left-1 rounded-[50%] border-2">
            <img src={arrow_left} className="h-6 " alt="" />
          </button>
          <div className="flex inset-shadow relative  overflow-scroll justify-evenly ">
            {options.map((item) => {
              return (
                <div
                  key={item.key}
                  className="opacity-60 hover:opacity-100 cursor-pointer  flex px-4 space-y-2 h-[48px] my-[12px] py-[4px]  flex-col justify-center "
                >
                  <img src={item.svg} className="h-6 cursor-pointer " alt="" />
                  <p className="text-xs cursor-pointer  ">Trending</p>
                </div>
              );
            })}
          </div>

          <button className=" absolute top-[25%] z-20 -right-2 rounded-[50%] border-2">
            <img src={arrow_right} className="h-6 " alt="" />
          </button>
        </div>
        <FilterHome></FilterHome>
      </div>
    </div>
  );
};

export default Options;
