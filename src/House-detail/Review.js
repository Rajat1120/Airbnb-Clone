import React from "react";

import star from "../data/Icons svg/star.svg";
import spray from "../data/Icons svg/Spray.svg";
import checkMark from "../data/Icons svg/accuracy.svg";
import key from "../data/Icons svg/key.svg";
import msg from "../data/Icons svg/msg.svg";
import location from "../data/Icons svg/location.svg";
import value from "../data/Icons svg/value.svg";
import { useSelector } from "react-redux";

const Review = () => {
  let totalCards = 5;
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  return (
    <div
      id="Reviews"
      className="py-12 scroll-mt-16 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim  w-full ]"
    >
      {/* Guest favourite */}
      {houseInfo.guest_favorite === "Guest favourite" && (
        <div className="h-[13.38rem] mt-4 mb-16 flex flex-col justify-between items-center">
          <div className="h-[8.25rem] items-start flex w-[23.86rem] ">
            <img
              className="h-full"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
              alt=""
            />
            <span className=" h-full w-[196px] flex items-start justify-center">
              <span className=" text-[5rem] h-full font-bold leading-[4rem] ">
                {houseInfo.house_rating}
              </span>
            </span>
            <img
              className="h-full"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
              alt=""
            />
          </div>
          <div className="pb-2 h-[1.62rem] flex-center   w-[10.21rem]">
            <span className="text-xl font-medium"> Guest favourite</span>
          </div>
          <div className="w-[23.75rem] flex-center h-12 ">
            <span className="text-center leading-6 font-extralight text-grey  w-full px-2 text-lg">
              One of the most loved homes on Airbnb based on ratings, reviews
              and reliability
            </span>
          </div>
        </div>
      )}

      {/* reviews count section */}
      <div className="pb-12 mb-12 border-b-[1px] border-grey-dim w-full">
        <div className="h-[1.87rem] mb-10 gap-x-2 flex items-center  w-full">
          <div className="flex items-center gap-x-2 ">
            <span>
              <img className="w-6 h-6" src={star} alt="" />
            </span>
            {houseInfo?.house_rating && (
              <span className="text-2xl font-medium">
                {houseInfo?.house_rating}
              </span>
            )}
          </div>

          {houseInfo?.house_rating && (
            <span className=" flex items-center justify-center">
              <span className="w-[4px] h-[4px] bg-current rounded-full"></span>
            </span>
          )}
          <span className="text-2xl font-medium">
            {houseInfo?.rating_count}
          </span>
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
      {/* reviews section */}
      <div className="grid w-full max-h-[38.87rem]  grid-cols-2">
        {Array.from({ length: totalCards }).map((_, index) => (
          <div
            key={index}
            className="min-h-[10rem] max-h-[14rem]  px-2 mr-[5.91rem] "
          >
            <div
              className={` ${
                index < totalCards - 2 ? "mb-10" : ""
              } mb-10 overflow-hidden  min-h-[6.62rem] max-h-[11.40rem] `}
            >
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
