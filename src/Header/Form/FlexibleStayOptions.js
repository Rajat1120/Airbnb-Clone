import React, { useEffect, useRef, useState } from "react";
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

const FlexibleStayOptions = ({ showHorPadding = true }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const curSelectedMonths = useSelector((store) => store.form.months);
  const curSelectedInput = useSelector((store) => store.form.curSelectInput);
  const stayDuration = useSelector((store) => store.form.stayDuration);
  const dispatch = useDispatch();
  let monthRef = useRef();
  let rightScrollBtnRef = useRef();
  let leftScrollBtnRef = useRef();

  function getNext12Months() {
    const months = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const nextMonthDate = addMonths(currentDate, i);
      const formattedMonth = format(nextMonthDate, "MMMM");
      const formattedYear = format(nextMonthDate, "yyyy");
      months.push({ month: formattedMonth, year: formattedYear });
    }

    return months;
  }

  let result = getNext12Months();

  let selectedMonthsName = curSelectedMonths
    .map((index) => result[index])
    .filter(Boolean);

  useEffect(() => {
    const month = monthRef.current;
    const handleScroll = () => {
      if (month) {
        setScrollPosition(month.scrollLeft);
      }
    };

    if (month) {
      month.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (month) {
        month.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    let leftScrollButtonRef = leftScrollBtnRef.current;
    function handleScrollLeftBtn() {
      const newPosition = scrollPosition - 760;
      monthRef.current.scrollTo({
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

  useEffect(() => {
    let rightScrollBtn = rightScrollBtnRef.current;
    function handleScrollRightBtn() {
      const newPosition = scrollPosition + 760;
      monthRef.current.scrollTo({
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

  useEffect(() => {
    let inputText = `${
      curSelectedMonths?.length > 0
        ? `${
            stayDuration?.charAt(0).toUpperCase() + stayDuration?.slice(1)
          } in ${
            selectedMonthsName?.length === 1
              ? selectedMonthsName[0]?.month
              : selectedMonthsName
                  .map((item) => item.month?.substring(0, 3))
                  .join(", ")
          }`
        : ` Any ${stayDuration}`
    }`;

    dispatch(setTextForFlexibleInput(inputText));
  }, [
    curSelectedInput,
    dispatch,
    curSelectedMonths,
    selectedMonthsName,
    stayDuration,
  ]);

  let btnLeftClassName = `absolute ${
    scrollPosition < 1 ? "hidden" : "flex-center"
  } top-[65%] left-5 h-8 w-8  bg-white z-30 rounded-[50%] hover:scale-110 hidden hover:drop-shadow-md border-[1px] border-grey-dim-light `;

  let btnRightClassName = `absolute  ${
    scrollPosition > 758 ? "hidden" : "flex-center"
  } top-[65%] right-5 h-8 w-8  bg-white z-30 rounded-[50%] hover:scale-110 hover:drop-shadow-md border-[1px] border-grey-dim-light `;

  return (
    <div className="flex relative flex-col w-full  justify-center items-center">
      <div
        className={`w-full mt-4  flex-col flex ${
          !showHorPadding ? "border-b border-grey-light-50" : ""
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
          className={`w-full h-full overflow-x-auto ${
            !showHorPadding ? "px-5" : ""
          }`}
        >
          <div className="inline-flex h-full items-center gap-x-2 pb-4">
            {result.map((item, index) => (
              <div
                onClick={() => dispatch(setMonths(index))}
                key={index}
                className={`flex-shrink-0 ${
                  curSelectedMonths.includes(index)
                    ? " border-black bg-shadow-gray-light border-[2px]"
                    : "border-grey-dim border-[1px] "
                } rounded-2xl flex-center flex-col ${
                  index === 0 && showHorPadding ? "ml-10" : ""
                } ${
                  index === 11 && showHorPadding ? "mr-10" : ""
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
          {showHorPadding && (
            <button ref={leftScrollBtnRef} className={btnLeftClassName}>
              <img src={arrow_left} className="h-3 w-3 " alt="" />
            </button>
          )}
          {scrollPosition > 0 && showHorPadding && (
            <div className="w-12 h-40 absolute   top-[50%] left-0 bg-white border-r-[0.8rem] border-white "></div>
          )}
          {showHorPadding && (
            <button ref={rightScrollBtnRef} className={btnRightClassName}>
              <img src={arrow_right} className="h-3 w-3 " alt="" />
            </button>
          )}
          {scrollPosition < 758 && showHorPadding && (
            <div className="w-12 h-40 absolute   top-[50%] right-0 bg-white border-r-[0.8rem] border-white "></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlexibleStayOptions;
