import React from "react";

import star from "../../src/data/Icons svg/star.svg";
import room from "../../src/data/Icons svg/roomIcon.svg";
import sharedSpace from "../../src/data/Icons svg/commonSpace.svg";
import bathroom from "../../src/data/Icons svg/bathroom.svg";
import furryFriend from "../../src/data/Icons svg/furryFriends.svg";
import HouseDescription from "./HouseDescription";
import SleepBed from "./SleepBedDetail";
import arrowDown from "../data/Icons svg/arrowDown.svg";
import arrowUp from "../data/Icons svg/arrowUpword.svg";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const MidMainCont = () => {
  const { id } = useParams();
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);
  const isLoading = useSelector((store) => store.houseDetail.isLoading);

  return (
    <div className="w-[calc(100%-10rem)] mx-auto flex justify-between px-[5rem] max-h-[198.59rem] relative after:content-[''] after:absolute after:bottom-0  after:w-[calc(100%-10rem)]  after:h-[1px]  after:bg-grey-dim ">
      <div className="w-[40.83rem]">
        <div className={`py-8  `}>
          <>
            {isLoading ? (
              <div className="w-[26rem] h-8 imgLoader"></div>
            ) : (
              <h1 className=" text-[25px]   font-[460]">
                {houseInfo?.title_2}
              </h1>
            )}
          </>
          <p className="flex items-center">
            {isLoading ? (
              <div className="w-80 h-5 mt-2 imgLoader"></div>
            ) : (
              <>
                <span className="font-light">1 queen bed</span>
                <span className="mx-2 flex items-center justify-center">
                  <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
                </span>
                <span className="font-light">Shared bathroom</span>
              </>
            )}
          </p>
          <div className="flex gap-1 items-center leading-8">
            {isLoading ? (
              <div className="w-4 h-4"></div>
            ) : (
              <>
                <span>
                  <img className="w-4 h-4" src={star} alt="" />
                </span>
                <span className="underline"> 2 reviews</span>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="h-20"></div>
        ) : (
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
        )}
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
        <SleepBed></SleepBed>
      </div>
      <div className="w-[26.32rem]  max-h-[125.59rem]">
        {isLoading ? (
          <div className="">
            <div className="w-40 mt-8 ml-20 h-10 imgLoader"></div>
            <div className="w-80 mt-4 ml-20 h-10 imgLoader"></div>
          </div>
        ) : (
          <div className="pt-8 flex justify-end sticky top-20">
            <div className="w-[23.14rem] shadow-priceCardShadow border-[1px] p-6 rounded-xl border-grey-dim h-[29.70rem]">
              <div className="">
                <span className="mb-6 flex items-end gap-2 text-2xl">
                  $16,530{" "}
                  <span className="text-base font-light flex items-end">
                    night
                  </span>
                </span>
                <div className="mb-4 cursor-pointer border-[1px] border-border-color rounded-lg h-28">
                  <div className="w-full h-1/2 flex   border-b-[1px] border-border-color">
                    <div className="w-1/2 h-full border-r-[1px] border-border-color flex justify-center flex-col ">
                      <div className="flex items-start justify-center flex-col pl-3">
                        <span className="text-[10px] font-semibold">
                          CHECK-IN
                        </span>
                        <span className="text-sm font-light">10/16/2024</span>
                      </div>
                    </div>
                    <div className="w-1/2 h-full flex items-center ">
                      <div className="flex items-start justify-center flex-col pl-3">
                        <span className="text-[10px] font-semibold">
                          CHECKOUT
                        </span>
                        <span className="text-sm font-light">10/24/2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex  w-full h-1/2 items-center">
                    <div className="flex px-3 w-full items-center justify-between">
                      <div className="flex items-start justify-center flex-col">
                        <span className="text-[10px] font-semibold">
                          GUESTS
                        </span>
                        <span className="text-sm font-light">2 guests</span>
                      </div>
                      <div className="h-4 w-4">
                        <img className="h-full w-full" src={arrowUp} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full rounded-lg flex-center bg-dark-pink h-12">
                  <span className="text-white">Reserve</span>
                </div>
              </div>
              <div className="w-full flex-center mt-2">
                <span className="text-sm pt-2 font-light">
                  You won't be charged yet
                </span>
              </div>
              <div className="w-full mt-6">
                <div className="flex h-[20px] w-full justify-between">
                  <span className="font-light">$16.250 x 8 nights</span>
                  <span className="font-light">$125,657 </span>
                </div>
                <div className="flex pt-4 justify-between">
                  <span className="font-light">Airbnb service fee</span>
                  <span className="font-light">$1256</span>
                </div>
                <div className="h-11 pt-6 flex justify-between items-center mt-6 border-t-[1px]  border-grey-dim">
                  <span className="font-medium">Total before taxes</span>
                  <span className="font-medium">$125,678</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MidMainCont;
