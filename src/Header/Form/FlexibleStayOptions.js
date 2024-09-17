import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMonths, format } from "date-fns";
import {
  setMonths,
  setStayDuration,
  setTextForFlexibleInput,
} from "./mainFormSlice";
import monthSvg from "../../data/Icons svg/month.svg";
import monthSelected from "../../data/Icons svg/month-checked.svg";
import arrow_left from "../../data/Icons svg/arrowLeftDark.svg";
import arrow_right from "../../data/Icons svg/arrowRightDark.svg";

const SCROLL_DISTANCE = 760;
const MONTHS_TO_DISPLAY = 12;
const SMALL_SCREEN_BREAKPOINT = "(max-width: 743px)";

function getNext12Months() {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < MONTHS_TO_DISPLAY; i++) {
    const nextMonthDate = addMonths(currentDate, i);
    const formattedMonth = format(nextMonthDate, "MMMM");
    const formattedYear = format(nextMonthDate, "yyyy");
    months.push({ month: formattedMonth, year: formattedYear });
  }

  return months;
}

const FlexibleStayOptions = ({ showHovrPadding = true }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const {
    months: curSelectedMonths,
    curSelectInput: curSelectedInput,
    stayDuration,
  } = useSelector((store) => store.form);

  const dispatch = useDispatch();
  let monthRef = useRef();
  let rightScrollBtnRef = useRef();
  let leftScrollBtnRef = useRef();

  const months = useMemo(() => getNext12Months(), []);

  let selectedMonthsName = curSelectedMonths
    .map((index) => months[index])
    .filter(Boolean);

  useEffect(() => {
    const month = monthRef.current;
    const leftScrollButton = leftScrollBtnRef.current;
    const rightScrollButton = rightScrollBtnRef.current;

    const handleScroll = () => {
      if (month) {
        setScrollPosition(month.scrollLeft);
      }
    };

    const handleScrollLeftBtn = () => {
      const newPosition = scrollPosition - SCROLL_DISTANCE;
      month.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    };

    const handleScrollRightBtn = () => {
      const newPosition = scrollPosition + SCROLL_DISTANCE;
      month.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    };

    // Attach event listeners
    if (month) {
      month.addEventListener("scroll", handleScroll);
    }
    if (leftScrollButton) {
      leftScrollButton.addEventListener("click", handleScrollLeftBtn);
    }
    if (rightScrollButton) {
      rightScrollButton.addEventListener("click", handleScrollRightBtn);
    }

    // Clean up event listeners on unmount
    return () => {
      if (month) {
        month.removeEventListener("scroll", handleScroll);
      }
      if (leftScrollButton) {
        leftScrollButton.removeEventListener("click", handleScrollLeftBtn);
      }
      if (rightScrollButton) {
        rightScrollButton.removeEventListener("click", handleScrollRightBtn);
      }
    };
  }, [scrollPosition]);

  useEffect(() => {
    // Function to format the stay duration
    const formatStayDuration = (duration) => {
      return duration
        ? duration.charAt(0).toUpperCase() + duration.slice(1)
        : "";
    };

    // Function to get the formatted months
    const getFormattedMonths = (months) => {
      if (!months || months.length === 0) return "";
      return months.length === 1
        ? months[0]?.month
        : months.map((item) => item.month?.substring(0, 3)).join(", ");
    };

    // Construct the input text
    const inputText =
      curSelectedMonths?.length > 0
        ? `${formatStayDuration(stayDuration)} in ${getFormattedMonths(
            selectedMonthsName
          )}`
        : `Any ${stayDuration}`;

    dispatch(setTextForFlexibleInput(inputText));
  }, [
    curSelectedInput,
    dispatch,
    curSelectedMonths,
    selectedMonthsName,
    stayDuration,
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SMALL_SCREEN_BREAKPOINT);
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => setIsSmallScreen(event.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  let btnLeftClassName = `absolute ${
    scrollPosition < 1 || isSmallScreen ? "hidden" : "flex-center"
  } top-[65%] left-5 h-8 w-8  bg-white z-30 rounded-[50%] hover:scale-110 hidden hover:drop-shadow-md border-[1px] border-grey-dim-light `;

  let btnRightClassName = `absolute  ${
    scrollPosition > 758 || isSmallScreen ? "hidden" : "flex-center"
  } top-[65%] right-5 h-8 w-8  bg-white z-30 rounded-[50%] hover:scale-110 hover:drop-shadow-md border-[1px] border-grey-dim-light `;

  return (
    <div className="flex relative flex-col w-full  justify-center items-center">
      <div
        className={`w-full mt-4  flex-col flex ${
          !showHovrPadding ? "border-b border-grey-light-50" : ""
        }  items-center`}
      >
        <span className="text-lg font-medium">
          How long would you like to stay?
        </span>
        <div className="flex items-center my-5 gap-x-2">
          <span
            onClick={() => dispatch(setStayDuration("weekend"))}
            className={` py-2 text-sm ${
              stayDuration === "weekend"
                ? "border-[2px] border-black"
                : "border-[1px]  border-grey-light"
            } transform transition-transform duration-100 active:scale-95 font-extralight px-4  hover:border-black rounded-full `}
          >
            Weekend
          </span>
          <span
            onClick={() => dispatch(setStayDuration("week"))}
            className={` py-2 text-sm ${
              stayDuration === "week"
                ? "border-[2px] border-black"
                : "border-[1px]  border-grey-light"
            } transform transition-transform duration-100 active:scale-95 font-extralight px-4 border-[1px] hover:border-black rounded-full `}
          >
            Week
          </span>
          <span
            onClick={() => dispatch(setStayDuration("month"))}
            className={` py-2 text-sm ${
              stayDuration === "month"
                ? "border-[2px] border-black"
                : "border-[1px]  border-grey-light"
            } transform transition-transform duration-100 active:scale-95 font-extralight px-4 border-[1px] hover:border-black rounded-full `}
          >
            Month
          </span>
        </div>
      </div>
      <div className="w-full  max-w-[65rem] mb-5 1xz:mb-10 max-h-full flex flex-col items-center">
        <span className="text-lg font-medium flex items-center 1xz:mt-2 1xz:mb-10  my-6">
          When do you want to go?
        </span>
        <div
          ref={monthRef}
          className={`w-full h-full hide-scrollbar overflow-x-auto ${
            !showHovrPadding ? "px-5" : ""
          }`}
        >
          <div className="inline-flex h-full items-center gap-x-2 pb-4">
            {months.map((item, index) => (
              <div
                onClick={() => dispatch(setMonths(index))}
                key={index}
                className={`flex-shrink-0 ${
                  curSelectedMonths.includes(index)
                    ? " border-black bg-shadow-gray-light border-[2px]"
                    : "border-grey-dim border-[1px] "
                } rounded-2xl flex-center flex-col ${
                  index === 0 && showHovrPadding ? "1xz:ml-10 ml-2" : ""
                } ${
                  index === 11 && showHovrPadding ? "1xz:mr-10 mr-2" : ""
                }  w-[7.5rem]   hover:border-black h-[8.5rem]`}
              >
                <div className="">
                  <img
                    className={`w-8 h-8 ${
                      curSelectedMonths.includes(index) ? "" : "opacity-60"
                    } `}
                    src={
                      curSelectedMonths.includes(index)
                        ? monthSelected
                        : monthSvg
                    }
                    alt=""
                  />
                </div>
                <span className="text-sm font-medium">{item?.month}</span>
                <span className="text-xs font-extralight">{item?.year}</span>
              </div>
            ))}
          </div>
          {showHovrPadding && (
            <button ref={leftScrollBtnRef} className={btnLeftClassName}>
              <img src={arrow_left} className="h-3 w-3 " alt="" />
            </button>
          )}
          {scrollPosition > 0 && showHovrPadding && !isSmallScreen && (
            <div className="w-12 h-40 absolute  hidden 1xz:block top-[50%] left-0 bg-white border-r-[0.8rem] border-white "></div>
          )}
          {showHovrPadding && (
            <button ref={rightScrollBtnRef} className={btnRightClassName}>
              <img src={arrow_right} className="h-3 w-3 " alt="" />
            </button>
          )}
          {scrollPosition < 758 && showHovrPadding && !isSmallScreen && (
            <div className="w-12 h-40 absolute hidden 1xz:block  top-[50%] right-0 bg-white border-r-[0.8rem] border-white "></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlexibleStayOptions;
