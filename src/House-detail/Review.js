import React from "react";

import star from "../data/Icons svg/star.svg";
import spray from "../data/Icons svg/Spray.svg";
import checkMark from "../data/Icons svg/accuracy.svg";
import key from "../data/Icons svg/key.svg";
import msg from "../data/Icons svg/msg.svg";
import location from "../data/Icons svg/location.svg";
import value from "../data/Icons svg/value.svg";
import { useSelector } from "react-redux";
import CustomerReviews from "./CustomerReviews";

const Review = () => {
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  let houseRating = Boolean(houseInfo?.house_rating > 2);

  function formatSingleDigit(number) {
    // Convert the number to a string
    let numStr = number.toString();

    // Split the number into the integer and decimal parts
    let [integerPart, decimalPart] = numStr.split(".");

    // Check if the integer part is a single digit and decimal part is undefined
    if (integerPart.length === 1 && !decimalPart) {
      // Append ".0" to the single-digit number
      numStr = integerPart + ".0";
    }

    return numStr;
  }

  function isNumberGreaterThanTen(inputString) {
    // Use a regular expression to extract the number from the string
    const numberMatch = inputString?.match(/\d+/);

    // If a number is found, convert it to an integer
    const number = numberMatch ? parseInt(numberMatch[0], 10) : 0;

    // Return true if the number is greater than 10, else return false
    return number > 10;
  }

  return (
    <div id="Reviews" className="pt-12 scroll-mt-16 relative   w-full ]">
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
                {houseRating && formatSingleDigit(houseInfo?.house_rating)}
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
            {houseRating && (
              <span className="text-2xl font-medium">
                {formatSingleDigit(houseInfo?.house_rating)}
              </span>
            )}
          </div>

          {houseRating && (
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
      {isNumberGreaterThanTen(houseInfo?.rating_count) && (
        <CustomerReviews></CustomerReviews>
      )}
    </div>
  );
};

export default Review;
