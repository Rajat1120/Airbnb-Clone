import React from "react";

import star from "../data/Icons svg/star.svg";
import spray from "../data/Icons svg/Spray.svg";
import checkMark from "../data/Icons svg/accuracy.svg";
import key from "../data/Icons svg/key.svg";
import msg from "../data/Icons svg/msg.svg";
import location from "../data/Icons svg/location.svg";
import value from "../data/Icons svg/value.svg";

const Review = () => {
  return (
    <div className="py-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim  w-full ]">
      <div className="pb-12 mb-12 border-b-[1px] border-grey-dim w-full">
        <div className="h-[1.87rem] mb-10 flex items-center  w-full">
          <div className="flex items-center gap-x-2 ">
            <span>
              <img className="w-6 h-6" src={star} alt="" />
            </span>
            <span className="text-2xl font-medium">4.23</span>
          </div>

          <span className="mx-2 flex items-center justify-center">
            <span className="w-[4px] h-[4px] bg-current rounded-full"></span>
          </span>
          <span className="text-2xl font-medium">95 reviews</span>
        </div>
        <div className="w-full grid  grid-cols-7 h-[6.90rem]  ">
          <div className=" border-r-[1px] border-grey-dim w-[10.62rem] flex justify-center  h-full">
            <div className="w-full mr-8  h-full">
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
          <div className=" border-r-[1px] border-grey-dim  flex justify-center  h-full">
            <div className=" w-[6.90rem]  h-[6.45rem]">
              <div className="flex flex-col h-full  justify-between">
                <div>
                  <h3 className="text-sm font-medium ">Cleanliness</h3>
                  <span className="text-lg font-medium">5.0</span>
                </div>

                <img className="h-8 w-8" src={spray} alt="" />
              </div>
            </div>
          </div>
          <div className=" border-r-[1px] border-grey-dim flex justify-center  h-full">
            <div className=" w-[6.90rem]  h-[6.45rem]">
              <div className="flex flex-col h-full  justify-between">
                <div>
                  <h3 className="text-sm font-medium ">Accuracy</h3>
                  <span className="text-lg font-medium">5.0</span>
                </div>

                <img className="h-8 w-8" src={checkMark} alt="" />
              </div>
            </div>
          </div>
          <div className=" border-r-[1px] border-grey-dim flex justify-center  h-full">
            <div className=" w-[6.90rem]  h-[6.45rem]">
              <div className="flex flex-col h-full  justify-between">
                <div>
                  <h3 className="text-sm font-medium ">Check-in</h3>
                  <span className="text-lg font-medium">5.0</span>
                </div>

                <img className="h-8 w-8" src={key} alt="" />
              </div>
            </div>
          </div>
          <div className=" border-r-[1px] border-grey-dim flex justify-center  h-full">
            <div className=" w-[6.90rem]  h-[6.45rem]">
              <div className="flex flex-col h-full  justify-between">
                <div>
                  <h3 className="text-sm font-medium ">Communication</h3>
                  <span className="text-lg font-medium">5.0</span>
                </div>

                <img className="h-8 w-8" src={msg} alt="" />
              </div>
            </div>
          </div>
          <div className="border-r-[1px] border-grey-dim flex justify-center  h-full">
            <div className=" w-[6.90rem]  h-[6.45rem]">
              <div className="flex flex-col h-full  justify-between">
                <div>
                  <h3 className="text-sm font-medium ">Location</h3>
                  <span className="text-lg font-medium">4.9</span>
                </div>

                <img className="h-8 w-8" src={location} alt="" />
              </div>
            </div>
          </div>
          <div className="  flex justify-center  h-full">
            <div className=" w-[6.90rem]  h-[6.45rem]">
              <div className="flex flex-col h-full  justify-between">
                <div>
                  <h3 className="text-sm font-medium ">Value</h3>
                  <span className="text-lg font-medium">4.9</span>
                </div>

                <img className="h-8 w-8" src={value} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full max-h-[38.87rem]  grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="h-[14rem]  px-2 mr-[5.91rem] ">
            <div className="mb-10 overflow-hidden  min-h-[6.62rem] max-h-[11.40rem] ">
              <div className="h-[4.8rem] flex flex-col justify-between mb-1">
                <div className="h-12 gap-2 flex items-center ">
                  <img
                    className="h-12 rounded-full object-cover w-12"
                    src="https://a0.muscache.com/im/pictures/user/da905aa9-41c5-4edb-8e51-527726a3f2ee.jpg?im_w=240"
                    alt=""
                  />
                  <div className="h-10 flex flex-col justify-center box-border ">
                    <span className="font-medium">Jonas</span>
                    <span className="text-sm font-light">
                      7 years on Airbnb
                    </span>
                  </div>
                </div>
                <div className=" flex items-center ">
                  <div className="flex h-[10px] w-12">
                    <img className="h-auto w-auto" src={star} alt="" />
                    <img className="h-auto w-auto" src={star} alt="" />
                    <img className="h-auto w-auto" src={star} alt="" />
                    <img className="h-auto w-auto" src={star} alt="" />
                    <img className="h-auto w-auto" src={star} alt="" />
                  </div>
                  <span className="mx-2 flex items-center justify-center">
                    <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
                  </span>
                  <span className="text-sm">1 week ago</span>
                </div>
              </div>
              <div className="w-full h-auto overflow-scroll">
                <span className="h-full overflow-hidden">
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                  Very nice villa. Nice and helpful staff. Really enjoyed here.
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
