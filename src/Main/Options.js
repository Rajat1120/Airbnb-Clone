import React, { useEffect, useRef, useState } from "react";
import FilterHome from "./buttons/FilterHome";
import arrow_left from "./../data/Icons svg/arrow-left.svg";
import arrow_right from "./../data/Icons svg/arrow-right.svg";

// import options from "../data/Options-Svg";

const Options = ({ startScroll }) => {
  // startScroll = false;
  function importAll(r) {
    return r.keys().map((item) => {
      return { key: item.slice(1, -4), svg: r(item) };
    });
  }

  const optionsRef = useRef(null);
  const rightScrollBtnRef = useRef(null);
  const leftScrollBtnRef = useRef();

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (optionsRef.current) {
        setScrollPosition(optionsRef.current.scrollLeft);
      }
    };

    if (optionsRef.current) {
      optionsRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (optionsRef.current) {
        optionsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // scroll btn right

  useEffect(() => {
    function handleScrollRightBtn() {
      const newPosition = scrollPosition + 750;
      optionsRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }

    if (rightScrollBtnRef.current) {
      rightScrollBtnRef.current.addEventListener("click", handleScrollRightBtn);
    }

    return () => {
      if (rightScrollBtnRef.current) {
        rightScrollBtnRef.current.removeEventListener(
          "click",
          handleScrollRightBtn
        );
      }
    };
  }, [scrollPosition]);

  // scroll btn left

  useEffect(() => {
    function handleScrollLeftBtn() {
      const newPosition = scrollPosition - 750;
      optionsRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }

    if (leftScrollBtnRef.current) {
      leftScrollBtnRef.current.addEventListener("click", handleScrollLeftBtn);
    }

    return () => {
      if (leftScrollBtnRef.current) {
        leftScrollBtnRef.current.removeEventListener(
          "click",
          handleScrollLeftBtn
        );
      }
    };
  }, [scrollPosition]);

  let btnLeftClassName = ` absolute  ${
    scrollPosition === 0 ? "hidden" : ""
  }  top-[25%] left-1 z-50 bg-white hover:scale-110 hover:drop-shadow-md rounded-[50%] border-2`;

  let btnRightClassName = `absolute ${
    scrollPosition === 1543.5 ? "hidden" : ""
  } top-[25%] z-100 right-0 bg-white hover:scale-110 hover:drop-shadow-md   rounded-[50%] border-2`;

  const options = importAll(
    require.context("../data/Options-Svg", false, /\.svg$/)
  );

  //${!startScroll ? "animate-moveUp" : ""}

  console.log(startScroll);
  return (
    <div
      className={` bg-white  ${
        !startScroll
          ? " animate-moveUp absolute top-[10rem] "
          : "animate-moveDown absolute top-[5rem] "
      }     justify-self-center `}
    >
      <div
        className={`h-[80px] ${
          startScroll ? "mt-4 mb-1" : "mt-0 mb-0"
        } flex     `}
      >
        <div
          className={
            "w-[920px] flex relative ml-[2rem]   items-center  rounded-lg overflow-hidden"
          }
        >
          <div
            ref={optionsRef}
            className="flex inset-shadow   overflow-scroll w-[970px] justify-evenly "
          >
            <button ref={leftScrollBtnRef} className={btnLeftClassName}>
              <img src={arrow_left} className="h-6 " alt="" />
            </button>
            {options.map((item) => {
              return (
                <div
                  key={item.key}
                  className="opacity-60 hover:opacity-100 cursor-pointer  flex px-4 space-y-2 h-[48px] my-[12px] py-[4px]  flex-col justify-center "
                >
                  <img src={item.svg} className="h-6 cursor-pointer " alt="" />
                  <p className="text-xs cursor-pointer  ">Trending</p>
                </div>
              );
            })}
            <button ref={rightScrollBtnRef} className={btnRightClassName}>
              <img src={arrow_right} className="h-6 " alt="" />
            </button>
          </div>
        </div>
        <FilterHome></FilterHome>
      </div>
    </div>
  );
};

export default Options;
