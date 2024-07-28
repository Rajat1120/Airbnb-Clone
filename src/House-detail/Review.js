import React from "react";

import star from "../data/Icons svg/star.svg";

const Review = () => {
  return (
    <div className="py-12 w-full max-h-[65.93rem]">
      <div className="h-[6.3rem] flex items-center gap-x-2 w-full">
        <span>
          <img className="w-6 h-6" src={star} alt="" />
        </span>
        <span className="text-2xl font-medium">4.23</span>
      </div>
      <div className="w-full h-[6.90rem] flex border-2 border-black">
        <div className="w-[8.62rem] mr-8 h-full">
          <div className=" w-full h-full">
            <div className="flex flex-col justify-between">
              <h3 className="text-sm font-medium mb-2 ">Overall rating</h3>
              <ol>
                <li className="flex justify-between gap-x-2 items-center">
                  <span className="text-xs">5</span>
                  <div className="w-full h-1 bg-grey-dim">
                    <div className="w-[60%] h-full bg-black"></div>
                  </div>
                </li>
                <li className="flex justify-between gap-x-2 items-center">
                  <span className="text-xs">4</span>
                  <div className="w-full h-1 bg-grey-dim">
                    <div className="w-[30%] h-full bg-black"></div>
                  </div>
                </li>
                <li className="flex justify-between gap-x-2 items-center">
                  <span className="text-xs">3</span>
                  <div className="w-full h-1 bg-grey-dim">
                    <div className="w-[20%] h-full bg-black"></div>
                  </div>
                </li>
                <li className="flex justify-between gap-x-2 items-center">
                  <span className="text-xs">2</span>
                  <div className="w-full h-1 bg-grey-dim">
                    <div className="w-[15%] h-full bg-black"></div>
                  </div>
                </li>
                <li className="flex justify-between gap-x-2 items-center">
                  <span className="text-xs ">1</span>
                  <div className="w-full h-1 bg-grey-dim">
                    <div className="w-[0%] h-full bg-black"></div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="w-[8.62rem] mr-8 h-full">
          <div className=" w-full h-full">
            <div className="flex flex-col justify-between">
              <h3 className="text-sm font-medium mb-2">Cleanliness</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
