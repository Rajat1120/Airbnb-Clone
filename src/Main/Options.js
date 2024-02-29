import React from "react";
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
    <div className="px-[40px]">
      <div className="h-[98px] py-3">
        <div className="w-[60%]   border-black border-2">
          <div className="flex overflow-scroll justify-evenly ">
            {options.map((item) => {
              return (
                <div className="opacity-60 flex px-4 space-y-2 h-[48px] my-[12px] py-[4px] flex-col justify-center ">
                  <img src={item.svg} className="h-6" alt="" />
                  <p className="text-xs ">Trending</p>
                </div>
              );
            })}
          </div>
          <button>
            <img src={arrow_right} className="h-6" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
