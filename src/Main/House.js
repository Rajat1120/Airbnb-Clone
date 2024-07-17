import React, { useEffect, useRef, useState } from "react";

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
      className={` absolute flex-center  transition-transform  duration-[0.3s] ease-in-out w-full   top-[17rem] overflow-scroll   ${
        !startScroll ? "-translate-y-[6rem] -z-30" : ""
      } `}
    >
      <div className=" grid gap-x-10   fixed-[50%] grid-cols-four-col justify-center items-center  gap-y-8  grid-flow-row">
        {houses.map((item) => (
          <div
            key={item.id}
            className="w-[290px] ml-2 h-[408px] flex gap-y-4 items-center justify-center flex-col "
          >
            <div className="w-[321px] flex-center  h-[330px]">
              <img
                className="rounded-[20px] flex-center w-full h-full object-fill "
                src={
                  "https://a0.muscache.com/im/pictures/miso/Hosting-549210539001854746/original/91024f9e-6497-4c36-80e1-d859cab61034.jpeg?im_w=1200"
                }
                alt=""
              />
            </div>
            <div className="flex w-[320px] justify-between  items-start ">
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
