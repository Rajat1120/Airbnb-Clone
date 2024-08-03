import React, { useEffect, useRef, useState } from "react";
import star from "../data/Icons svg/star.svg";

import { houses } from "../data/JsonData/HouseDetail";
import { useDispatch, useSelector } from "react-redux";
import { setMinimize, setStartScroll } from "./AppSlice";
import { setActiveInput } from "../Header/Form/mainFormSlice";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../Services/apiRooms";
const House = () => {
  const [roomImages, setRoomImages] = useState([]);

  console.log(roomImages);

  const { isLoading, data, error } = useQuery({
    queryKey: ["room"],
    queryFn: getRooms,
  });

  useEffect(() => {
    if (data)
      if (Array.isArray(data)) {
        // Filter out empty strings and clean up each URL
        const cleanedArray = data[0].images
          .filter((url) => url.trim() !== "")
          .map((url) => url.trim().replace(/^{|}$/g, ""));

        setRoomImages(cleanedArray);
      } else {
        console.error("Data is not an array:", data);
      }
  }, [data]);

  let lastScrollPosition = useRef(window.scrollY);

  const startScroll = useSelector((store) => store.app.startScroll);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      setTimeout(() => {
        dispatch(setMinimize(false));
        dispatch(setActiveInput(""));
      }, 350);

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
      className={` absolute flex-center  transition-transform  duration-[0.3s] ease-in-out w-full px-20   top-[17rem] overflow-scroll   ${
        !startScroll ? "-translate-y-[6rem] -z-30" : ""
      } `}
    >
      <div className=" grid gap-x-5  fixed-[50%] grid-cols-four-col justify-center items-center  gap-y-8  grid-flow-row">
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          houses.map((item, i) => (
            <a key={i} href="/house" target="_blank">
              <div className="w-full   h-[24.5rem] flex gap-y-4 items-center justify-center flex-col ">
                <div className="w-full flex items-center justify-start overflow-x-auto  h-full">
                  {roomImages?.map((img, i) => (
                    <img
                      className="rounded-[20px] flex-center w-full h-full object-cover "
                      src={roomImages[i]}
                      alt=""
                    />
                  ))}
                </div>
                <div className="flex w-full justify-between  items-start ">
                  <div className="">
                    <p className="  text-ellipsis overflow-hidden text-[15px]  font-medium">
                      {item.location}
                    </p>
                    <p className="font-light text-grey text-[15px]">
                      {Math.floor(Math.random() * 20 + 200)} kilometers away
                    </p>
                    <p className="font-light text-grey text-[15px]">
                      16-21 May
                    </p>
                    <p className="text-[15px] font-medium">
                      ${item.price_per_night}{" "}
                      <span className="font-light  text-[15px]"> night</span>
                    </p>
                  </div>
                  <p className="flex gap-x-1  justify-between items-center">
                    <img src={star} className="w-[15px] h-[15px]" alt="" />{" "}
                    <span className="font-light text-[15px]">4.75</span>
                  </p>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default House;
