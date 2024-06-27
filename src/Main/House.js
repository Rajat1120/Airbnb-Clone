import React, { useEffect, useRef, useState } from "react";
import house1 from "../data/houseImg/house1.jpg";
import star from "../data/Extra/star-rate.svg";
import { houses } from "../data/JsonData/HouseDetail";
import { useDispatch, useSelector } from "react-redux";
import { setStartScroll } from "./AppSlice";

const House = () => {
  let lastScrollPosition = useRef(window.scrollY);

  const startScroll = useSelector((store) => store.app.startScroll);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition.current) {
        // Scrolling down (no change needed here)
        dispatch(setStartScroll(false)); // Set)
      } else if (currentScrollPosition < 22) {
        // Scrolling up
        dispatch(setStartScroll(true));
      }

      lastScrollPosition.current = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startScroll, dispatch]);

  useEffect(() => {}, [startScroll]);

  return (
    <div
      className={` absolute   top-[17rem] overflow-scroll   ${
        !startScroll
          ? "animate-moveUpHouse -z-50  "
          : "animate-moveDownHouse -z-50"
      }`}
    >
      <div className=" grid gap-x-6 ml-4 fixed-[50%] grid-cols-four-col justify-center items-center  gap-y-8  grid-flow-row">
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
