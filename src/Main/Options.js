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
    <div className=" bg-white justify-self-center ">
      <div className="h-[98px] flex    py-3  ">
        <div
          className={
            "w-[980px] flex relative  items-center  rounded-lg overflow-hidden"
          }
        >
          <div className="flex inset-shadow    overflow-scroll w-[970px] justify-evenly ">
            <button className=" absolute  top-[25%] left-1 rounded-[50%] border-2">
              <img src={arrow_left} className="h-6 " alt="" />
            </button>
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
            <button className=" absolute top-[25%] z-20 -right-2 rounded-[50%] border-2">
              <img src={arrow_right} className="h-6 " alt="" />
            </button>
          </div>
        </div>
        <FilterHome></FilterHome>
      </div>
    </div>
  );
};

export default Options;
