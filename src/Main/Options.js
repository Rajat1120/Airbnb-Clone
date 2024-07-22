import React, { useEffect, useRef, useState } from "react";
import FilterHome from "./buttons/FilterHome";
import arrow_left from "./../data/Icons svg/arrow-left.svg";
import arrow_right from "./../data/Icons svg/arrow-right.svg";
import { useSelector } from "react-redux";

// import options from "../data/Options-Svg";

const Options = () => {
  // startScroll = false;
  function importAll(r) {
    return r.keys().map((item) => {
      return { key: item.slice(1, -4), svg: r(item) };
    });
  }

  const options = importAll(
    require.context("../data/Options-Svg", false, /\.svg$/)
  );

  const optionsRef = useRef(null);
  const rightScrollBtnRef = useRef(null);
  const leftScrollBtnRef = useRef();

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const optionRef = optionsRef.current;
    const handleScroll = () => {
      if (optionRef) {
        setScrollPosition(optionRef.scrollLeft);
      }
    };

    if (optionRef) {
      optionRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (optionRef) {
        optionRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [options]);

  // scroll btn right

  useEffect(() => {
    let rightScrollBtn = rightScrollBtnRef.current;
    function handleScrollRightBtn() {
      const newPosition = scrollPosition + 750;
      optionsRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }

    if (rightScrollBtn) {
      rightScrollBtn.addEventListener("click", handleScrollRightBtn);
    }

    return () => {
      if (rightScrollBtn) {
        rightScrollBtn.removeEventListener("click", handleScrollRightBtn);
      }
    };
  }, [scrollPosition]);

  // scroll btn left

  useEffect(() => {
    let leftScrollButtonRef = leftScrollBtnRef.current;
    function handleScrollLeftBtn() {
      const newPosition = scrollPosition - 750;
      optionsRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }

    if (leftScrollButtonRef) {
      leftScrollButtonRef.addEventListener("click", handleScrollLeftBtn);
    }

    return () => {
      if (leftScrollButtonRef) {
        leftScrollButtonRef.removeEventListener("click", handleScrollLeftBtn);
      }
    };
  }, [scrollPosition]);

  let btnLeftClassName = ` absolute z-30  ${
    scrollPosition < 65 ? "hidden" : "flex-center"
  }  top-[25%] left-0 h-9  hidden  w-9  z-100 bg-white hover:scale-110 hover:drop-shadow-md  rounded-[50%] border-[1px] border-grey-dim`;

  let btnRightClassName = `absolute ${
    scrollPosition > 1770.5 ? "hidden" : "flex-center"
  } top-[25%] z-30 right-2 h-9  w-9 border-grey-dim bg-white hover:scale-110 hover:drop-shadow-md   rounded-[50%] border-[1px]`;

  return (
    <div className={` bg-white    justify-self-center `}>
      <div
        className={`h-[5rem] justify-center py-6 flex w-full items-center gap-2 `}
      >
        <div
          className={
            "w-[63.5rem] flex relative    items-center overflow-scroll  rounded-lg "
          }
        >
          <div className="flex-center inset-shadow  w-full   ">
            <div
              ref={optionsRef}
              className=" flex items-center  w-[60rem]  overflow-scroll "
            >
              {options.map((item, i) => {
                return (
                  <div
                    key={item.key}
                    className={`opacity-60 hover:opacity-100 cursor-pointer  flex ${
                      i === 0 ? "pr-6" : "px-6"
                    } space-y-2 h-[48px] my-[12px] py-[4px]  flex-col justify-center `}
                  >
                    <img
                      src={item.svg}
                      className="h-6 cursor-pointer "
                      alt=""
                    />
                    <p className="text-xs cursor-pointer  ">Trending </p>
                  </div>
                );
              })}
            </div>
            <button ref={leftScrollBtnRef} className={btnLeftClassName}>
              <img src={arrow_left} className="h-6 " alt="" />
            </button>
            {scrollPosition > 65 && (
              <div className="w-12 h-16 absolute z-10 left-0 bg-white border-r-[0.8rem] border-white "></div>
            )}
            <button ref={rightScrollBtnRef} className={btnRightClassName}>
              <img src={arrow_right} className="h-6 " alt="" />
            </button>
            {scrollPosition < 1770.5 && (
              <div className="w-12 h-16 absolute z-10 right-0 bg-white border-r-[0.8rem] border-white "></div>
            )}
          </div>
        </div>
        <FilterHome></FilterHome>
      </div>
    </div>
  );
};

export default Options;
