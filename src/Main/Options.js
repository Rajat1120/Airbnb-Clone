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
  const [uniqueFilters, setUniqueFilters] = useState([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const selectedCountry = useSelector((store) => store.app.selectedCountry);
  const city = useSelector((store) => store.app.city);
  const minimize = useSelector((store) => store.app.minimize);

  const options = optionImgs.filter((item) =>
    uniqueFilters.includes(item?.iconName)
  );

  const { isLoading, data, error } = useQuery({
    queryKey: ["country", selectedCountry],
    queryFn: () => getRooms(selectedCountry, city),
    enabled: !!selectedCountry,
  });

  useEffect(() => {
    if (data) {
      const findUniqueFilters = (data) => {
        const filters = data.map((item) => item.filter);
        const uniqueFilters = [...new Set(filters)];
        return uniqueFilters;
      };
      const uniqueFilterValues = findUniqueFilters(data);
      setUniqueFilters(uniqueFilterValues);
    }
  }, [data]);

  const dispatch = useDispatch();

  const optionsRef = useRef(null);
  const itemRefs = useRef([]);

  const handleScroll = () => {
    const container = optionsRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setIsAtStart(scrollLeft < itemRefs?.current[0]?.offsetWidth);
      setIsAtEnd(
        Math.abs(scrollWidth - clientWidth - scrollLeft) <
          itemRefs?.current[itemRefs.current.length - 1].offsetWidth
      );
    }
  };

  useEffect(() => {
    const optionRef = optionsRef?.current;
    if (optionRef) {
      optionRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (optionRef) {
        optionRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScrollBtn = (direction) => {
    const container = optionsRef.current;
    if (container) {
      const itemWidth = itemRefs.current[0]?.offsetWidth * 8 || 0;
      const scrollAmount = direction === "right" ? itemWidth : -itemWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`bg-white ${
        minimize ? "hidden" : ""
      } z-10 justify-self-center w-[calc(100%-10rem)]  mx-auto`}
    >
      <div
        className={`h-[5rem] py-6 flex w-full relative items-center justify-between space-x-10`}
      >
        <div className="w-full flex  items-center overflow-hidden rounded-lg">
          {isLoading ? (
            <div className="flex space-x-10 items-center justify-start inset-shadow w-full">
              {Array.from({ length: 9 }).map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col space-y-2 items-center justify-between "
                  >
                    <div className="h-8 w-8 imgLoader rounded-[50%] "></div>
                    <div className="h-3 w-20 imgLoader rounded-2xl"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-start inset-shadow w-full">
              <div
                id="options"
                ref={optionsRef}
                className="flex items-center space-x-10 justify-start h-24 w-full overflow-x-auto scroll-smooth"
                style={{
                  scrollBehavior: "smooth",
                }}
              >
                {options.map((item, i) => (
                  <div
                    ref={(el) => (itemRefs.current[i] = el)}
                    onClick={() => dispatch(setSelectedIcon(item.iconName))}
                    key={i}
                    className={`opacity-75 hover:opacity-100 cursor-pointer flex-center mr-0 ${
                      i === 0 ? "pl-2" : ""
                    } h-16 my-[12px] border-b-2 border-white py-[4px] hover:border-grey-light-50`}
                    style={{
                      scrollSnapAlign: "start",
                      flexShrink: 0,
                    }}
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
              {!isAtStart && (
                <>
                  <div className="absolute -left-1    w-10 h-20 bg-white">
                    <div className="absolute left-4 w-full h-full bg-white blur-right"></div>
                  </div>
                  <button
                    onClick={() => handleScrollBtn("left")}
                    className="absolute z-30 flex-center     top-[30%] left-0 h-9 w-9 bg-white hover:scale-110 hover:drop-shadow-md rounded-[50%]  border-[1px] border-grey-dim"
                  >
                    <img src={arrow_left} className="h-6" alt="Scroll left" />
                  </button>
                </>
              )}
              {!isAtEnd && (
                <>
                  <div className="absolute right-[21.7rem]  w-10 h-20 bg-white">
                    <div className="absolute -left-4 w-full h-full bg-white blur-left"></div>
                  </div>
                  <button
                    onClick={() => handleScrollBtn("right")}
                    className="absolute flex-center top-[30%] z-50 right-[22rem] h-9 w-9 border-grey-dim bg-white hover:scale-110 hover:drop-shadow-md rounded-[50%] border-[1px]"
                  >
                    <img src={arrow_right} className="h-6" alt="Scroll right" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <FilterHome />
      </div>
    </div>
  );
};

export default Options;
