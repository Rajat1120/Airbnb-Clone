import React, { useEffect, useRef, useState } from "react";
import FilterHome from "./buttons/FilterHome";
import arrow_left from "./../data/Icons svg/arrow-left.svg";
import arrow_right from "./../data/Icons svg/arrow-right.svg";
import { useDispatch, useSelector } from "react-redux";
import optionImgs from "../OptionsImgs";

import { setSelectedIcon } from "./AppSlice";
import { getRooms } from "../Services/apiRooms";
import { useQuery } from "@tanstack/react-query";

const Options = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [uniqueFilters, setUniqueFilters] = useState([]);
  const [containerScrollWidth, setContainerScrollWidth] = useState(0);
  const selectedCountry = useSelector((store) => store.app.selectedCountry);
  const city = useSelector((store) => store.app.city);
  const minimize = useSelector((store) => store.app.minimize);

  const options = optionImgs.filter((item) =>
    uniqueFilters.includes(item?.iconName)
  );

  const { isLoading, data, error } = useQuery({
    queryKey: ["country", selectedCountry],
    queryFn: () => getRooms(selectedCountry, city),
    enabled: !!selectedCountry, // This makes sure the query only runs when selectedIcon is set
  });

  useEffect(() => {
    if (data) {
      // Function to find unique filter values
      const findUniqueFilters = (data) => {
        const filters = data.map((item) => item.filter);
        const uniqueFilters = [...new Set(filters)];
        return uniqueFilters;
      };

      // Update the state with unique filters
      const uniqueFilterValues = findUniqueFilters(data);
      setUniqueFilters(uniqueFilterValues);
    }
  }, [data]);

  const dispatch = useDispatch();

  const optionsRef = useRef(null);
  const rightScrollBtnRef = useRef(null);
  const leftScrollBtnRef = useRef(null);
  const totalScrollWidth = optionsRef?.current?.scrollWidth - 935;

  useEffect(() => {
    if (optionsRef?.current) {
      setContainerScrollWidth(Math.abs(optionsRef?.current?.scrollWidth / 8));
    }
  }, []);

  useEffect(() => {
    const optionRef = optionsRef?.current;

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

  let btnLeftClassName = `absolute z-30 ${
    scrollPosition < 65 ? "hidden" : "flex-center"
  } top-[30%] left-1 h-9 hidden w-9 z-100 bg-white hover:scale-110 hover:drop-shadow-md rounded-[50%] border-[1px] border-grey-dim`;

  let btnRightClassName = `absolute ${
    scrollPosition > totalScrollWidth ? "hidden" : "flex-center"
  } top-[30%] z-50 right-4 h-9 w-9 border-grey-dim bg-white hover:scale-110 hover:drop-shadow-md rounded-[50%] border-[1px]`;

  return (
    <div
      className={`bg-white ${
        minimize ? "hidden" : ""
      } z-10 justify-self-center w-[calc(100%-10rem)] mx-auto`}
    >
      <div className={`h-[5rem] py-6 flex w-full items-center justify-between`}>
        <div
          className={
            "w-full flex relative items-center overflow-scroll rounded-lg"
          }
        >
          <div className="flex items-center justify-start inset-shadow w-full">
            <div
              id="options"
              ref={optionsRef}
              className="flex items-center space-x-9 justify-start h-24 w-[56rem] overflow-x-auto"
            >
              {options.map((item, i) => (
                <div
                  onClick={() => dispatch(setSelectedIcon(item.iconName))}
                  key={i}
                  className={`opacity-75 hover:opacity-100 cursor-pointer flex-center mr-0 ${
                    i === 0 ? "pl-2" : ""
                  } h-16 my-[12px] border-b-2 border-white py-[4px] hover:border-grey-light-50 w-full`}
                >
                  <div className="flex-col space-y-2 h-full items-center justify-center flex">
                    <img
                      src={item.link}
                      className="h-6 w-6 cursor-pointer"
                      alt=""
                    />
                    <span className="text-xs text-black opacity-80 hover:opacity-100 font-medium text-center block cursor-pointer whitespace-nowrap">
                      {item.iconName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button ref={leftScrollBtnRef} className={btnLeftClassName}>
              <img src={arrow_left} className="h-6" alt="" />
            </button>
            {scrollPosition > 65 && (
              <div className="w-12 h-20 absolute z-10 left-0 bg-white border-r-[0.8rem] border-white"></div>
            )}
            <button ref={rightScrollBtnRef} className={btnRightClassName}>
              <img src={arrow_right} className="h-6" alt="" />
            </button>
            {scrollPosition < totalScrollWidth && (
              <div className="w-12 h-16 absolute z-10 right-0 bg-white border-r-[0.8rem] border-white"></div>
            )}
          </div>
        </div>
        <FilterHome />
      </div>
    </div>
  );
};

export default Options;
