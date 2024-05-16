import React, { useEffect, useRef, useState } from "react";
import house1 from "../data/houseImg/house1.jpg";
import star from "../data/Extra/star-rate.svg";
import { houses } from "../data/JsonData/HouseDetail";

const House = ({ startScroll, setStartScroll }) => {
  const houseContainerRef = useRef(); // Ref for the parent container

  /*   useEffect(() => {
    const newObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!startScroll && entry.boundingClientRect.top >= 150) {
            console.log("working");
            setStartScroll(true);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: "-50px 0px 0px 0px",
      }
    );
    if (!startScroll) newObserver.observe(houseContainerRef.current);
    return () => {
      newObserver.disconnect();
    };
  }, [startScroll, setStartScroll]); */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(startScroll);
        entries.forEach((entry) => {
          console.log(entry.isIntersecting);
          if (!entry.isIntersecting) {
            setStartScroll(false);
          }
          if (
            !startScroll &&
            entry.boundingClientRect.y >= 150 &&
            entry.boundingClientRect.y <= 160
          ) {
            console.log("ran");
            setStartScroll(true);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: "-240px 0px 0px 0px",
      }
    );
    if (startScroll) observer.observe(houseContainerRef.current); // Observe the parent container

    return () => {
      observer.disconnect();
    };
  }, [setStartScroll, startScroll]);

  useEffect(() => {
    console.log(startScroll);
  }, [startScroll]);

  return (
    <div className={`${!startScroll ? " -z-500" : ""}`}>
      <div
        ref={houseContainerRef}
        className="h-1 bg-black   w-full mb-2 "
      ></div>
      <div className=" grid gap-x-6  fixed-[50%] grid-cols-four-col justify-center items-center  gap-y-8  grid-flow-row">
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
    </div>
  );
};

export default House;
