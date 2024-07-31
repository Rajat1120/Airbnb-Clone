import React, { useEffect, useRef, useState } from "react";
import FilterHome from "./buttons/FilterHome";
import arrow_left from "./../data/Icons svg/arrow-left.svg";
import arrow_right from "./../data/Icons svg/arrow-right.svg";
import { useSelector } from "react-redux";
import optionImgs from "../OptionsImgs";
// import options from "../data/Options-Svg";

const Options = () => {
  // startScroll = false;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerScrollWidth, setContainerScrollWidth] = useState(0);

  const minimize = useSelector((store) => store.app.minimize);

  const options = optionImgs;

  const optionsRef = useRef(null);
  const rightScrollBtnRef = useRef(null);
  const leftScrollBtnRef = useRef();

  useEffect(() => {
    if (optionsRef?.current) {
      setContainerScrollWidth(Math.abs(optionsRef?.current?.scrollWidth / 4));
    }
  }, []);

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
      const newPosition = scrollPosition + containerScrollWidth;
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
  }, [scrollPosition, containerScrollWidth]);

  // scroll btn left

  useEffect(() => {
    let leftScrollButtonRef = leftScrollBtnRef.current;
    function handleScrollLeftBtn() {
      const newPosition = scrollPosition - containerScrollWidth;
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
  }, [scrollPosition, containerScrollWidth]);

  let btnLeftClassName = ` absolute z-30  ${
    scrollPosition < 65 ? "hidden" : "flex-center"
  }  top-[30%] left-1 h-9  hidden  w-9  z-100 bg-white hover:scale-110 hover:drop-shadow-md  rounded-[50%] border-[1px] border-grey-dim`;

  let btnRightClassName = `absolute ${
    scrollPosition > 2290 ? "hidden" : "flex-center"
  } top-[30%] z-50 right-4 h-9  w-9 border-grey-dim bg-white hover:scale-110 hover:drop-shadow-md   rounded-[50%] border-[1px]`;

  return (
    <div
      className={` bg-white ${
        minimize ? "hidden" : ""
      } z-10  justify-self-center w-[calc(100%-10rem)] mx-auto `}
    >
      <div
        className={`h-[5rem] justify-center py-6 flex w-full items-center   `}
      >
        <div
          className={
            "w-[63.5rem] flex relative    items-center overflow-scroll  rounded-lg "
          }
        >
          <div className="flex-center inset-shadow  w-full   ">
            <div
              id="options"
              ref={optionsRef}
              className=" flex items-center space-x-9 justify-center h-24  w-[60rem]  overflow-scroll "
            >
              {options.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`opacity-75 hover:opacity-100 cursor-pointer flex-center mr-0   ${
                      i === 0 ? "pr-9" : ""
                    }  h-16 my-[12px] border-b-2 border-white py-[4px]  hover:border-grey-light-50  `}
                  >
                    <div className="flex-col space-y-2 h-full items-center justify-center flex">
                      <img
                        src={item.link}
                        className="h-6 w-6 cursor-pointer "
                        alt=""
                      />
                      <span className="text-xs text-black opacity-80 hover:opacity-100 font-medium text-center block cursor-pointer whitespace-nowrap ">
                        {item.iconName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button ref={leftScrollBtnRef} className={btnLeftClassName}>
              <img src={arrow_left} className="h-6 " alt="" />
            </button>
            {scrollPosition > 65 && (
              <div className="w-12 h-20 absolute z-10 left-0 bg-white border-r-[0.8rem] border-white "></div>
            )}
            <button ref={rightScrollBtnRef} className={btnRightClassName}>
              <img src={arrow_right} className="h-6 " alt="" />
            </button>
            {scrollPosition < 2400.5 && (
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
