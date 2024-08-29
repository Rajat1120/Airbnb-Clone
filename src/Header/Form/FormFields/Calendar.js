import React, { useEffect, useRef, useState } from "react";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  isWithinInterval,
  isBefore,
} from "date-fns";
import arrowRight from "../../../data/Icons svg/arrow-right.svg";
import arrowLeft from "../../../data/Icons svg/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDurationDate,
} from "../../Form/mainFormSlice";

import { useLocation } from "react-router";

const Calendar = () => {
  const selectedInput = useSelector((store) => store.form.curSelectInput);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [monthWidth, setmonthWidth] = useState(0);
  const scrollContainerRef = useRef(null);
  const minimize = useSelector((store) => store.app.minimize);
  const location = useLocation();
  let onHouseDetailPage = location.pathname.includes("/house/");
  let onCheckOutPage = location.pathname.includes("/book");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function findMonthWidth() {
      let width =
        (onHouseDetailPage || onCheckOutPage) && !minimize
          ? 340
          : window.innerWidth <= 956
          ? 384
          : 440; // Width of each month component

      setmonthWidth(width);
    }

    findMonthWidth();

    window.addEventListener("resize", findMonthWidth);

    return () => {
      window.removeEventListener("resize", findMonthWidth);
    };
  }, [minimize, onHouseDetailPage, onCheckOutPage]);

  const scrollSpeed = 200;
  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);

  const currentMonth = useSelector((store) => store.form.currentMonth);
  const selectedStartDate = useSelector(
    (store) => store.form.selectedStartDate
  );
  const selectedEndDate = useSelector((store) => store.form.selectedEndDate);
  const startDurationDate = useSelector(
    (store) => store.form.startDurationDate
  );

  // console.log(addDaysToStartDate(3));

  const dispatch = useDispatch();

  useEffect(() => {
    // Disable the initial render animation
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const renderHeader = (currentMonth) => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex pb-4 justify-center items-center py-2">
        <div
          className={` flex items-center justify-center flex-grow text-base font-medium `}
        >
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      days.push(
        <div
          className={` flex ${
            (onHouseDetailPage && !minimize) || onCheckOutPage
              ? "w-[2.62rem]"
              : "w-[3rem]"
          } justify-center text-xs text-center `}
          key={format(day, "yyyy-MM-dd")}
        >
          {format(day, dateFormat)}
        </div>
      );
    }

    return <div className="flex justify-center  items-center">{days}</div>;
  };

  const renderCells = (currentMonth) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();
    let rowCount = 0;

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        let cellClass = "";

        // Determine if the day is in the past and within the current month
        const isPastDate =
          isSameMonth(day, monthStart) && day < today.setHours(0, 0, 0, 0);

        let onClickHandler = () => {
          if (isModalOpen && onCheckOutPage) {
            onCheckoutDateClick(isPastDate ? undefined : cloneDay);
          } else if (isModalOpen) {
            onCalendarModalDateClick(cloneDay + 1);
          } else {
            onDateClick(isPastDate ? undefined : cloneDay);
          }
        };

        if (isModalOpen && !onCheckOutPage) {
          if (
            isSameDay(day, startDurationDate) &&
            isSameMonth(day, monthStart)
          ) {
            cellClass = "bg-black text-white rounded-full";
          } else if (!isSameMonth(day, monthStart)) {
            cellClass = "bg-white cursor-pointer text-white";
            onClickHandler = null; // Disable onClick for dates outside the current month
          } else {
            cellClass =
              "bg-white text-black hover:rounded-full hover:border-[1.5px] hover:border-black";
          }
        } else {
          if (
            selectedStartDate &&
            selectedEndDate &&
            isWithinInterval(day, {
              start: selectedStartDate,
              end: selectedEndDate,
            })
          ) {
            if (
              isSameDay(day, selectedStartDate) &&
              isSameMonth(day, monthStart)
            ) {
              cellClass =
                "  halfRightColor  text-white  before:bg-black before:content-[''] before:w-full before:h-full before:rounded-full before:border-[1.5px] before:border-black before:absolute top-0 before:left-0 hover:before:right-0 hover:before:bottom-0   "; // Start date
            } else if (
              isSameDay(day, selectedEndDate) &&
              isSameMonth(day, monthStart)
            ) {
              cellClass =
                "halfLeftColor  text-white  before:bg-black before:content-[''] before:w-full before:h-full before:rounded-full before:border-[1.5px] before:border-black before:absolute top-0 before:left-0 hover:before:right-0 hover:before:bottom-0  "; // End date
            } else if (!isSameMonth(day, monthStart)) {
              cellClass = "bg-white text-white hidden cursor-default";
              onClickHandler = null; // Disable onClick for dates outside the current month
            } else {
              cellClass =
                "bg-shadow-gray-light  text-black  hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:rounded-full hover:before:border-[1.5px] hover:before:border-black hover:before:absolute hover:top-0 hover:before:left-0 hove:before:right-0 hove:before:bottom-0  ";
            }
          } else if (
            (selectedStartDate &&
              !selectedEndDate &&
              onHouseDetailPage &&
              !minimize &&
              isBefore(day, selectedStartDate)) ||
            (selectedStartDate &&
              !selectedEndDate &&
              onCheckOutPage &&
              !minimize &&
              isBefore(day, selectedStartDate))
          ) {
            cellClass = "bg-white text-gray-400 line-through !cursor-default"; // Disable selection of dates before
            onClickHandler = null;
          } else if (
            isSameDay(day, selectedStartDate) &&
            isSameMonth(day, monthStart)
          ) {
            cellClass = "bg-black text-white rounded-full"; // Start date
          } else if (
            isSameDay(day, selectedEndDate) &&
            isSameMonth(day, monthStart)
          ) {
            cellClass = "bg-black text-white rounded-full"; // End date
          } else if (!isSameMonth(day, monthStart)) {
            cellClass = "bg-white text-white hidden cursor-default";
            onClickHandler = null; // Disable onClick for dates outside the current month
          } else if (isPastDate) {
            cellClass = "bg-white text-gray-300 cursor-default"; // Apply a faded style for past dates
            onClickHandler = null;
          } else {
            cellClass =
              "bg-white text-black  hover:rounded-full hover:border-[1.5px] hover:border-black";
          }
        }
        days.push(
          <div
            key={day.toString()}
            className={`  relative ${
              (onHouseDetailPage && !minimize) || onCheckOutPage
                ? "h-[2.62rem]   w-[2.62rem]"
                : " w-full 1xz:h-[3rem] 1xz:w-[3rem] h-full aspect-square   "
            }  flex items-center justify-center `}
          >
            <div
              className={`${
                (onHouseDetailPage && !minimize) || onCheckOutPage
                  ? "h-[2.62rem]  w-[2.62rem]"
                  : " w-full  1xz:h-[3rem] 1xz:w-[3rem] aspect-square h-full"
              } flex items-center justify-center ${
                isPastDate ? "" : "cursor-pointer"
              } ${cellClass}`}
              key={day.toString()}
              onClick={onClickHandler}
            >
              <span className="text-sm w-full 1xz:w-auto text-center z-20 font-medium">
                {formattedDate}
              </span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className={`grid grid-cols-7 1xz:flex 1xz:items-center 1xz:justify-center w-full ${
            (onHouseDetailPage && !minimize) || onCheckOutPage ? "" : "mb-[2px]"
          } place-items-stretch`}
          key={day.toString()}
        >
          {days}
        </div>
      );
      rowCount++;
      days = [];
    }
    return (
      <div className="flex flex-col w-full justify-between items-stretch">
        {rows}
      </div>
    );
  };

  const onCalendarModalDateClick = (day) => {
    dispatch(setStartDurationDate(day));
  };

  const onCheckoutDateClick = (day) => {
    if (!selectedEndDate && !selectedStartDate) {
      dispatch(setSelectedStartDate(day));
    } else if (selectedStartDate && !selectedEndDate) {
      dispatch(setSelectedEndDate(day));
    } else {
      dispatch(setSelectedStartDate(day));
      dispatch(setSelectedEndDate(null));
    }
  };

  const onDateClick = (day) => {
    if (
      selectedInput === "checkOut" &&
      !selectedEndDate &&
      !selectedStartDate
    ) {
      // If the input is "checkOut", and there is not start and end date, set the end date.
      if (onHouseDetailPage && !minimize) {
        dispatch(setSelectedStartDate(day));
      } else {
        dispatch(setSelectedEndDate(day));
        dispatch(setActiveInput("checkIn"));
      }
    } else if (
      // if end date is true and input is checkOut , set the start date
      selectedEndDate &&
      selectedInput === "checkIn" &&
      !selectedStartDate &&
      day < selectedEndDate
    ) {
      dispatch(setSelectedStartDate(day));
      dispatch(setActiveInput("checkOut"));
    } else if (!selectedStartDate) {
      // If no start date is selected, set the start date and clear the end date.
      dispatch(setSelectedStartDate(day));
      dispatch(setSelectedEndDate(null));
      dispatch(setActiveInput("checkOut"));
    } else if (day < selectedStartDate) {
      // If a start date is selected and the new date is before it, reset the start date.
      dispatch(setSelectedStartDate(day));
      dispatch(setSelectedEndDate(null));
      dispatch(setActiveInput("checkIn"));
    } else if (!selectedEndDate) {
      // If a start date is selected but no end date, set the end date.
      dispatch(setSelectedEndDate(day));
      dispatch(setActiveInput("checkOut"));
    } else if (selectedInput === "checkIn") {
      // If both dates are selected and input is "checkIn", reset the dates.
      dispatch(setSelectedStartDate(day));
      dispatch(setSelectedEndDate(null));
      dispatch(setActiveInput("checkOut"));
    } else if (day > selectedEndDate) {
      // If the new date is after the end date, set it as the new end date.
      dispatch(setSelectedEndDate(day));
      dispatch(setActiveInput("checkOut"));
    } else if (
      isWithinInterval(day, { start: selectedStartDate, end: selectedEndDate })
    ) {
      // If the new date is within the selected interval, set it as the end date.
      dispatch(setSelectedEndDate(day));
      dispatch(setActiveInput("checkOut"));
    } else if (isSameDay(day, selectedStartDate)) {
      // If the new date is the same as the start date, set the end date to the start date.
      dispatch(setSelectedEndDate(selectedStartDate));
      dispatch(setActiveInput("checkOut"));
    }
  };

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const maxIndex = 20; // Assuming 12 months are rendered

    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (direction === "right" && currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    function helperFunction() {
      let preventDefault = (e) => e.preventDefault();
      const container = scrollContainerRef.current;
      if (window.innerWidth >= 744) {
        if ((!onHouseDetailPage && !minimize) || onCheckOutPage) {
          container.addEventListener("wheel", preventDefault, {
            passive: false,
          });
          container.addEventListener("touchmove", preventDefault, {
            passive: false,
          });
        }
      } else {
        // Remove event listeners for smaller screens to allow scrolling
        container.removeEventListener("wheel", preventDefault);
        container.removeEventListener("touchmove", preventDefault);
      }
      // ...
    }
    helperFunction();
    window.addEventListener("resize", helperFunction);
    return () => {
      window.removeEventListener("resize", helperFunction);
    };
  }, [onHouseDetailPage, onCheckOutPage, minimize]);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex <= 20) {
      setScrollPosition(monthWidth * currentIndex);
    }
  }, [currentIndex, monthWidth]);

  return (
    <div className="flex w-full   h-full 1md:w-full 1xz:w-96 flex-col justify-center relative">
      <div
        className={`absolute hidden 1md:block  top-[3.6rem] ${
          onCheckOutPage && "!left-[1.1rem]"
        } ${
          (onHouseDetailPage && !minimize) || onCheckOutPage
            ? "left-[1rem]"
            : "left-[2.2rem]"
        }`}
      >
        {renderDays()}
      </div>
      <div
        className={`absolute hidden  1xz:block top-[3.6rem] ${
          onCheckOutPage && "!right-[0.6rem]"
        }  ${
          onHouseDetailPage && !minimize
            ? "right-[0.1rem]"
            : "1md:right-[2.2rem] right-[50%] 1md:translate-x-0 1xz:translate-x-1/2"
        }`}
      >
        {renderDays()}
      </div>
      <button
        disabled={currentIndex === 0}
        className={` hidden 1xz:block absolute ${
          currentIndex === 0
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-gray-100"
        } ${
          (onHouseDetailPage && !minimize) || onCheckOutPage
            ? "left-2"
            : "1md:left-8 left-0"
        } top-[1.2rem] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full  `}
        onClick={() => handleScroll("left")}
      >
        <img className="h-4 w-4 " src={arrowLeft} alt="" />
      </button>
      <button
        disabled={currentIndex === 20}
        className={` hidden 1xz:block absolute ${
          currentIndex === 20
            ? "opacity-30 cursor-not-allowed"
            : " hover:bg-gray-100"
        } ${
          (onHouseDetailPage && !minimize) || onCheckOutPage
            ? "right-0"
            : "1md:right-8 right-0"
        } top-[1.2rem] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full `}
        onClick={() => handleScroll("right")}
      >
        <img className="h-4 w-4 " src={arrowRight} alt="" />
      </button>
      <div
        ref={scrollContainerRef}
        className="1xz:overflow-x-hidden h-full 1md:w-auto 1md:block w-full flex 1xz:block justify-center overflow-y-auto  1xz:overflow-y-clip scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          style={{
            transition: `transform ${scrollSpeed}ms ease-out`,
            transform: `translateX(-${scrollPosition}px)`,
          }}
          className={`inline-flex  w-full  h-[calc(100vh-20rem)] 1xz:h-auto flex-col 1xz:flex-row ${
            (onHouseDetailPage && !minimize) || onCheckOutPage
              ? "gap-x-3"
              : "1md:gap-x-8 gap-x-0"
          }`}
        >
          {Array.from({ length: 23 }, (_, index) => (
            <div
              key={`1md:max-w-md ${index}-current`}
              className={` ${
                index === 22 ? "pb-28 1xz:pb-0" : ""
              }  justify-center items-center ${
                (onHouseDetailPage && !minimize) || onCheckOutPage
                  ? "w-[20rem] h-[20.5rem]"
                  : ` w-full flex  flex-col ${
                      index <= 0 ? "1md:pl-8 " : "1md:pl-16 "
                    } justify-between h-full 1xz:gap-y-10 gap-y-6  `
              } 1xz:mx-6 1md:mx-1 w-full rounded-lg`}
            >
              <div className="flex w-full 1xz:justify-center justify-start">
                {renderHeader(addMonths(currentMonth, index))}
              </div>

              <div className="w-full 1md:w-auto">
                {renderCells(addMonths(currentMonth, index))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
