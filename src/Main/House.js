import React from "react";
import house1 from "../data/houseImg/house1.jpg";
import star from "../data/Extra/star-rate.svg";
const House = () => {
  let numOfHouse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className=" grid gap-x-6  grid-cols-four-col justify-center items-center  gap-y-8  grid-flow-row">
      {numOfHouse.map((item) => (
        <div className="w-[280px] h-[386px] flex gap-y-4 items-center justify-center flex-col ">
          <div className="w-[302px]  h-[286px]">
            <img
              className="rounded-[20px] w-full h-full object-cover "
              src={house1}
              alt=""
            />
          </div>
          <div className="flex w-[302px] justify-between  items-start ">
            <div>
              <p>Wadi Rum Village, Jordan</p>
              <p>Mountain and desert views</p>
              <p>5 nights 9-14 Mar</p>
              <p>5000 total before taxes</p>
            </div>
            <p className="flex justify-between items-center">
              <img src={star} className="w-5" alt="" /> 4.75
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default House;
