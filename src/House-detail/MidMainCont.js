import React from "react";

import star from "../../src/data/Icons svg/star.svg";
import room from "../../src/data/Icons svg/roomIcon.svg";
import sharedSpace from "../../src/data/Icons svg/commonSpace.svg";
import bathroom from "../../src/data/Icons svg/bathroom.svg";
import furryFriend from "../../src/data/Icons svg/furryFriends.svg";
import HouseDescription from "./HouseDescription";

const MidMainCont = () => {
  return (
    <div className="w-[calc(100%-10em)] mx-auto flex justify-center px-[5rem] h-[198.59rem] ">
      <div className="w-[43.83rem]">
        <div className="py-8">
          <h1 className=" text-[25px]   font-[460]">Room in Theog, India</h1>
          <p className="flex items-center">
            <span className="font-light">1 queen bed</span>
            <span className="mx-2 flex items-center justify-center">
              <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
            </span>
            <span className="font-light">Shared bathroom</span>
          </p>
          <div className="flex gap-1 items-center leading-8">
            <span>
              <img className="w-4 h-4" src={star} alt="" />
            </span>
            <span className="underline"> 2 reviews</span>
          </div>
        </div>
        <div className="">
          <div className="h-[1px] bg-grey-dim"></div>
          <div>
            <div className="py-6 gap-8 items-center flex">
              <img
                className="h-10 w-10 rounded-full"
                src="https://a0.muscache.com/im/pictures/user/c4e01b26-3e06-4b65-b501-abfcd0c75840.jpg?im_w=240"
                alt=""
              />
              <div className="flex flex-col">
                <span className="font-medium">Hosted by Ankita</span>
                <span className="font-extralight text-grey text-sm">
                  {" "}
                  6 years hosting
                </span>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-grey-dim"></div>
        </div>
        <div>
          <div className="py-8 flex flex-col gap-y-5 h-[19.5rem]">
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={room} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Room in a villa</span>
                <span className="leading-8 text-sm text-grey">
                  Your own room in a home, plus access to shared spaces.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={sharedSpace} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Shared common spaces</span>
                <span className="leading-8 text-sm text-grey">
                  You’ll share parts of the home.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={bathroom} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Shared bathroom</span>
                <span className="leading-8 text-sm text-grey">
                  You’ll share the bathroom with others.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={furryFriend} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Furry friends welcome</span>
                <span className="leading-8 text-sm text-grey">
                  Bring your pets along for the stay.
                </span>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-grey-dim"></div>
        </div>
        <HouseDescription></HouseDescription>
        <div className=" ">
          <div className="pt-8 h-[58.75rem]">
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
                        <span className="text-2xl leading-6 font-bold">
                          4.34
                        </span>
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
      <div className="w-[26.32rem]">form</div>
    </div>
  );
};

export default MidMainCont;
