import React from "react";
import star from "../../src/data/Icons svg/star.svg";
import Review from "./Review";
import Map from "./Map";
const BottomMainCont = () => {
  return (
    <div className="w-[calc(100%-10rem)] mx-auto px-[5rem] flex flex-col items-center max-h-[72rem]">
      <Review></Review>
      <Map></Map>
      <div className="flex w-full justify-start">
        <div className="pt-8 h-[20.75rem]">
          <div className="mb-6">
            <h1 className="text-[25px]   font-[460]">Meet your host</h1>
          </div>
          <div className=" ">
            <div className="h-[14.37rem] shadow-2xl rounded-3xl w-[23.75rem] grid grid-cols-3">
              <div className="col-span-2 w-full   grid-cols-1 grid ">
                <div className="w-full  flex justify-center items-end">
                  <img
                    className="w-28 h-28 rounded-full"
                    src="https://a0.muscache.com/im/pictures/user/c4e01b26-3e06-4b65-b501-abfcd0c75840.jpg?im_w=240"
                    alt="host-image"
                  />
                </div>
                <div className="flex w-full justify-start pt-2 flex-col items-center">
                  <h1 className="text-[32px] leading-9 tracking-wide font-[600]">
                    Ankita
                  </h1>
                  <span className="leading-4 pb-2 text-sm font-medium">
                    Host
                  </span>
                </div>
              </div>
              <div className="col-start-3 items-center justify-items-end grid grid-cols-1 col-end-4">
                <div className="w-24 flex flex-col justify-between h-44">
                  <div className="flex items-start justify-start flex-col">
                    <span className="text-2xl leading-6 font-bold">1607</span>
                    <span className="text-[10px] font-medium leading-4 pt-1 ">
                      Reviews
                    </span>
                  </div>
                  <div className="h-[1px] bg-grey-dim"></div>
                  <div className="flex items-start justify-start flex-col">
                    <div className="flex gap-[2px] items-center">
                      <span className="text-2xl leading-6 font-bold">4.34</span>
                      <span>
                        <img className="w-4 h-4" src={star} alt="" />
                      </span>
                    </div>
                    <span className="text-[10px] font-medium leading-4 pt-1 ">
                      Rating
                    </span>
                  </div>
                  <div className="h-[1px] bg-grey-dim"></div>
                  <div className="flex items-start justify-start flex-col">
                    <span className="text-2xl leading-6 font-bold">6</span>
                    <span className="text-[10px] font-medium leading-4 pt-1 ">
                      Years hosting
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomMainCont;
