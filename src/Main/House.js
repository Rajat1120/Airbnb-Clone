import React, { useEffect, useRef } from "react";
import house1 from "../data/houseImg/house1.jpg";
import star from "../data/Extra/star-rate.svg";
import { houses } from "../data/JsonData/HouseDetail";
const House = () => {
  let houseRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log(entry.target);
        }
      });
    });
    observer.observe(houseRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      ref={houseRef}
      className=" grid gap-x-6  grid-cols-four-col justify-center items-center  gap-y-8  grid-flow-row"
    >
      {houses.map((item) => (
        <div
          key={item.id}
          className="w-[280px] h-[386px] flex gap-y-4 items-center justify-center flex-col "
        >
          <div className="w-[302px]  h-[286px]">
            <img
              className="rounded-[20px] w-full h-full object-cover "
              src={house1}
              alt=""
            />
          </div>
          <div className="flex w-[302px] justify-between  items-start ">
            <div className="">
              <p className="  text-ellipsis overflow-hidden  font-normal">
                {item.location}
              </p>
              <p className="text-gray-400 text-sm">
                {Math.floor(Math.random() * 20 + 200)} kilometers away
              </p>
              <p className="text-gray-400 text-sm">16-21 May</p>
              <p className="inline">
                ${item.price_per_night}{" "}
                <span className="text-gray-500 inline"> night</span>
              </p>
            </div>
            <p className="flex  justify-between items-center">
              <img src={star} className="w-5" alt="" /> 4.75
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default House;
