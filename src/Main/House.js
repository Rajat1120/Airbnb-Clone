import React, { useEffect, useRef, useState } from "react";
import star from "../data/Icons svg/star.svg";
import arrow_right from "../data/Icons svg/arrow-right.svg";
import arrow_left from "../data/Icons svg/arrow-left.svg";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../Services/apiRooms";
import { useDispatch, useSelector } from "react-redux";
import { setMinimize, setStartScroll } from "./AppSlice";
import { setActiveInput } from "../Header/Form/mainFormSlice";
import { houses } from "../data/JsonData/HouseDetail";
import { Link } from "react-router-dom";

const House = () => {
  const imageWidth = 301.91;
  const houseImagesRefs = useRef({});

  const { isLoading, data, error } = useQuery({
    queryKey: ["room"],
    queryFn: getRooms,
  });

  const handleScrollBtn = (e, direction, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    const container = houseImagesRefs.current[itemId];
    if (container) {
      const scrollAmount = direction === "right" ? imageWidth : -imageWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
        dispatch(setStartScroll(false));
      } else if (currentScrollPosition < 22) {
        dispatch(setStartScroll(true));
      }

      lastScrollPosition.current = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startScroll, dispatch]);

  return (
    <div
      className={`absolute flex-center transition-transform duration-[0.3s] ease-in-out w-full px-20 top-[17rem] overflow-scroll ${
        !startScroll ? "-translate-y-[6rem] -z-30" : ""
      }`}
    >
      <div className="grid gap-x-5 fixed-[50%] grid-cols-four-col justify-center items-center gap-y-8 grid-flow-row">
        {isLoading
          ? houses.map((item, i) => (
              <div
                key={i}
                className="loader w-full h-[24.5rem] flex-center"
              ></div>
            ))
          : data?.map((item) => (
              <a
                key={item.id}
                href={`/house/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full relative h-[24.5rem] flex gap-y-4 items-center justify-center flex-col">
                  <div
                    ref={(el) => (houseImagesRefs.current[item.id] = el)}
                    className="w-full flex items-center justify-start overflow-x-auto h-full scroll-smooth"
                    style={{
                      scrollSnapType: "x mandatory",
                      scrollBehavior: "smooth",
                    }}
                  >
                    <button
                      onClick={(e) => handleScrollBtn(e, "left", item.id)}
                      className="z-100 bg-white hover:scale-105 w-8 h-8 hover:bg-opacity-100 bg-opacity-80 absolute hover:drop-shadow-md flex-center rounded-[50%] border-[1px] left-2 border-grey-dim"
                    >
                      <img src={arrow_left} alt="Scroll left" />
                    </button>
                    <button
                      onClick={(e) => handleScrollBtn(e, "right", item.id)}
                      className="z-100 bg-white hover:scale-105 w-8 flex-center hover:bg-opacity-100 bg-opacity-80 h-8 absolute hover:drop-shadow-md right-2 rounded-[50%] border-[1px] border-grey-dim"
                    >
                      <img src={arrow_right} alt="Scroll right" />
                    </button>
                    {item.images?.map((img, i) => (
                      <img
                        className="rounded-[20px] flex-center w-full  h-full object-cover scroll-snap-align-start"
                        src={img}
                        key={i}
                        alt=""
                        style={{
                          scrollSnapAlign: "start",
                          flexShrink: 0,
                          width: `${imageWidth}px`,
                        }}
                      />
                    ))}
                  </div>
                  <div className={`flex w-full justify-between items-start`}>
                    <div className="w-[80%]">
                      <p className="text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-[90%] font-medium">
                        {item["house-title"]}
                      </p>
                      <p className="font-light text-grey text-[15px]">
                        {Math.floor(Math.random() * 20 + 200)} kilometers away
                      </p>
                      <p className="font-light text-grey text-[15px]">
                        16-21 May
                      </p>
                      <p className="text-[15px] font-medium">
                        ${item.price}
                        <span className="font-light text-[15px]"> night</span>
                      </p>
                    </div>
                    <p className="flex gap-x-1 w-[20%] justify-end items-center">
                      <img src={star} className="w-[15px] h-[15px]" alt="" />
                      <span className="font-light text-[15px]">4.75</span>
                    </p>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
};

export default House;
