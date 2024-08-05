import React, { useEffect, useRef, useState } from "react";
import star from "../data/Icons svg/star.svg";

import { houses } from "../data/JsonData/HouseDetail";
import { useDispatch, useSelector } from "react-redux";
import { setMinimize, setStartScroll } from "./AppSlice";
import { setActiveInput } from "../Header/Form/mainFormSlice";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../Services/apiRooms";
import arrow_right from "../data/Icons svg/arrow-right.svg";
import arrow_left from "../data/Icons svg/arrow-left.svg";

const House = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerScrollWidth, setContainerScrollWidth] = useState({});
  const rightScrollBtnRef = useRef(null);
  let imageWidth = 301.91;
  const leftScrollBtnRef = useRef(null);
  const { isLoading, data, error } = useQuery({
    queryKey: ["room"],
    queryFn: getRooms,
  });

  const houseImagesRef = useRef(null);

  useEffect(() => {
    if (houseImagesRef?.current && data) {
      setContainerScrollWidth((curData) => {
        const newData = { ...curData };
        for (let i = 0; i < data.length; i++) {
          newData[data[i]?.id] = Math.abs(
            imageWidth * (data[i]?.images?.length || 0)
          );
        }
        return newData;
      });
    }
  }, [data, imageWidth]);

  console.log(containerScrollWidth);

  useEffect(() => {
    const houseImgRef = houseImagesRef?.current;

    const handleScroll = () => {
      if (houseImgRef) {
        setScrollPosition(houseImgRef.scrollLeft);
      }
    };

    if (houseImgRef) {
      houseImgRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (houseImgRef) {
        houseImgRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScrollBtn = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    const newPosition =
      direction === "right"
        ? scrollPosition + imageWidth
        : scrollPosition - imageWidth;
    houseImagesRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
    console.log(scrollPosition);
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
        {isLoading
          ? houses.map((item, i) => {
              return (
                <div
                  key={i}
                  className="loader w-full  h-[24.5rem] flex-center"
                ></div>
              );
            })
          : data?.map((item, i) => (
              <a key={item.id} href="/house" target="_blank">
                <div className="w-full relative   h-[24.5rem] flex gap-y-4 items-center justify-center flex-col ">
                  <div
                    ref={houseImagesRef}
                    className="w-full  flex items-center justify-start overflow-x-auto  h-full"
                  >
                    <button
                      ref={leftScrollBtnRef}
                      onClick={(e) => handleScrollBtn(e, "left")}
                      className=" z-100 bg-white hover:scale-105 w-8 h-8 hover:bg-opacity-100 bg-opacity-80 absolute hover:drop-shadow-md flex-center  rounded-[50%] border-[1px] left-2 border-grey-dim"
                    >
                      <img src={arrow_left} alt="" />
                    </button>
                    <button
                      ref={rightScrollBtnRef}
                      onClick={(e) => handleScrollBtn(e, "right")}
                      className=" z-100 bg-white hover:scale-105 w-8 flex-center hover:bg-opacity-100 bg-opacity-80 h-8 absolute hover:drop-shadow-md right-2  rounded-[50%] border-[1px] border-grey-dim"
                    >
                      <img src={arrow_right} alt="" />
                    </button>
                    {item.images?.map((img, i) => (
                      <img
                        className="rounded-[20px] flex-center w-full h-full object-cover "
                        src={img}
                        key={i}
                        alt=""
                      />
                    ))}
                  </div>
                  <div className="flex w-full justify-between  items-start ">
                    <div className="w-full">
                      <p className="  text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-[90%]  font-medium">
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
                        <span className="font-light  text-[15px]"> night</span>
                      </p>
                    </div>
                    <p className="flex gap-x-1  justify-between items-center">
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
