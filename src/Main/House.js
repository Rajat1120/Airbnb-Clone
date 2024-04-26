import React from "react";
import house1 from "../data/houseImg/house1.jpg";

const House = () => {
  let numOfHouse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="three grid grid-cols-4 justify-items-center items-center gap-x-0 gap-y-6  grid-flow-row">
      {numOfHouse.map((item) => (
        <div className="w-[302px] h-[386px] flex gap-y-2 items-center justify-center flex-col ">
          <div className="w-[302px]  h-[286px]">
            <img
              className="rounded-[20px] w-full h-full object-cover "
              src={house1}
              alt=""
            />
          </div>
          <div className="flex w-[302px] flex-col items-start ">
            <p>Wadi Rum Village, Jordan</p>
            <p>Mountain and desert views</p>
            <p>5 nights 9-14 Mar</p>
            <p>5000 total before taxes</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default House;
