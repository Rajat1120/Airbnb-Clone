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
import arrowRight from "../../../../asset/Icons_svg/arrow-right.svg";
import arrowLeft from "../../../../asset/Icons_svg/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDurationDate,
} from "../../../../redux/mainFormSlice";

import { useLocation } from "react-router";

const Calendar = () => {
  const selectedInput = useSelector((store) => store.form.curSelectInput);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [monthWidth, setmonthWidth] = useState(0);
  const scrollContainerRef = useRef(null);
  const minimize = useSelector((store) => store.app.minimize);
  const location = useLocation();
  let onHouseDetailPage = location.pathname.includes("/house/");
  let onCheckOutPage = location.pathname.includes("/book");
  let onHomePage = location.pathname === "/";

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function findMonthWidth() {
      let width =
        onHouseDetailPage && !minimize
          ? 375
          : window.innerWidth <= 956
          ? 384
          : 440; // Width of each month component

      if (onHouseDetailPage && !minimize && window.innerWidth <= 1280) {
        width = 496;
      }
      if (onHouseDetailPage && window.innerWidth <= 936) {
        width = 384;
      }
      if (onHouseDetailPage && window.innerWidth <= 744) {
        width = 496;
      }
      if (onHouseDetailPage && window.innerWidth <= 550) {
        width = 384;
      }

      if (onCheckOutPage) {
        width = 333;
      }

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

  const dispatch = useDispatch();

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
          className={` flex ${onCheckOutPage ? "!w-[2.63rem]" : ""} ${
            onHouseDetailPage && !minimize
              ? "1xlx:w-[2.62rem] w-12 1xs:w-16 1xz:w-[3rem] 1smd:w-[4rem]"
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
            onCalendarModalDateClick(cloneDay);
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
              onCheckOutPage ? "!h-[2.62rem]   !w-[2.62rem]" : ""
            } ${
              onHouseDetailPage && !minimize
                ? "1xlx:h-[2.62rem] w-[3rem] h-[3rem] 1xs:w-[4rem] 1xs:h-[4rem] 1xlx:w-[2.62rem] aspect-square 1xz:h-[3rem] 1xz:w-[3rem] 1smd:h-[4rem] 1smd:w-[4rem] "
                : " w-full 1xz:h-[3rem] 1xz:w-[3rem] h-full aspect-square   "
            }  flex items-center justify-center `}
          >
            <div
              className={`${
                onCheckOutPage ? "!h-[2.62rem]   !w-[2.62rem]" : ""
              } ${
                onHouseDetailPage && !minimize
                  ? "1xlx:h-[2.62rem] w-[3rem] h-[3rem] 1xlx:w-[2.62rem] aspect-square  1xz:h-[3rem]  1xs:w-[4rem] 1xs:h-[4rem] 1xz:w-[3rem] 1smd:h-[4rem] 1smd:w-[4rem] "
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
          className={` flex items-center justify-center w-full ${
            (onHouseDetailPage && !minimize) || onCheckOutPage
              ? ""
              : "mb-[2px] "
          } place-items-stretch`}
          key={day.toString()}
        >
          {days}
        </div>
      );

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
          container?.addEventListener("wheel", preventDefault, {
            passive: false,
          });
          container?.addEventListener("touchmove", preventDefault, {
            passive: false,
          });
        }
      } else {
        // Remove event listeners for smaller screens to allow scrolling
        container?.removeEventListener("wheel", preventDefault);
        container?.removeEventListener("touchmove", preventDefault);
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
    <div
      className={`flex w-full ${
        !onCheckOutPage && "1xz:w-96"
      } 1md:w-full h-full 
      
       flex-col justify-center  relative`}
    >
      <div
        className={` ${
          onHomePage || onHouseDetailPage ? "absolute" : ""
        }  top-[3.6rem] ${
          onCheckOutPage &&
          "1xz:!left-[1.2rem]  1xz:!top-[3.6rem] !-top-5  left-2 1xz:absolute  mx-auto !block"
        } ${
          onHouseDetailPage && !minimize
            ? "left-0 1md:left-1 hidden 1xlx:block absolute "
            : "left-[2.2rem]  hidden  1md:block "
        }`}
      >
        {renderDays()}
      </div>
      <div
        className={`absolute   ${
          onCheckOutPage && "!right-[0.8rem] !translate-x-0"
        }  ${
          onHouseDetailPage && !minimize
            ? "1xlx:right-0 mx-auto w-full  1xlx:w-auto top-[4rem] 1xz:top-[3.6rem] "
            : "1md:right-[2.2rem] hidden   1xz:block top-[3.6rem] right-[50%] pl-4 1md:translate-x-0 1xz:translate-x-1/2"
        }`}
      >
        {renderDays()}
      </div>
      <button
        disabled={currentIndex === 0}
        className={` ${
          onCheckOutPage ? "hidden 1xz:block !left-8" : ""
        } absolute ${
          currentIndex === 0
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-gray-100"
        } ${
          onHouseDetailPage && !minimize
            ? "left-0"
            : "1md:left-8 left-0 hidden 1xz:block"
        } top-[1.2rem] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full  `}
        onClick={() => handleScroll("left")}
      >
        <img className="h-4 w-4 " src={arrowLeft} alt="" />
      </button>
      <button
        disabled={currentIndex === 20}
        className={`  absolute ${
          currentIndex === 20
            ? "opacity-30 cursor-not-allowed"
            : " hover:bg-gray-100"
        } ${
          onHouseDetailPage && !minimize
            ? "right-0"
            : "1md:right-8 right-0 hidden 1xz:block"
        } ${
          onCheckOutPage ? "hidden 1xz:block !right-8" : ""
        } top-[1.2rem]  transform -translate-y-1/2 z-10 bg-white p-2 rounded-full `}
        onClick={() => handleScroll("right")}
      >
        <img className="h-4 w-4 " src={arrowRight} alt="" />
      </button>
      <div
        ref={scrollContainerRef}
        className={` h-full overflow-x-hidden  ${
          onCheckOutPage && "!w-full"
        }  ${
          onHouseDetailPage && !minimize
            ? "1smd:w-[30rem] w-[22rem] 1xs:w-[30rem] 1xz:w-[23rem] 1xlx:w-full mx-auto overflow-x-hidden"
            : "1xz:w-[23rem] w-full mx-auto 1md:w-auto 1xz:overflow-x-hidden 1md:block"
        }   flex 1xz:block justify-center overflow-y-auto  1xz:overflow-y-clip scrollbar-hide`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          style={{
            transition: `transform ${scrollSpeed}ms ease-out`,
            transform: `translateX(-${scrollPosition}px)`,
          }}
          className={`inline-flex ${onCheckOutPage ? "!gap-x-8" : ""}  w-full ${
            onHouseDetailPage
              ? "  1xlx:w-full  1xlx:overflow-visible "
              : "w-full"
          }  h-[calc(100vh-15rem)]  1xz:h-auto ${
            onHouseDetailPage && !minimize
              ? "1xlx:gap-x-0 gap-x-10 flex-row h-full"
              : "1md:gap-x-8 gap-x-0 flex-col 1xz:flex-row"
          }`}
        >
          {Array.from({ length: 23 }, (_, index) => (
            <div
              key={`${index}-current`}
              className={`   justify-center w-80 ${
                onCheckOutPage
                  ? `${index <= 0 ? "1xz:!pl-4" : "!pl-0"} !mx-1 `
                  : ""
              }  items-center ${
                onHouseDetailPage && !minimize
                  ? `w-full flex !mx-1  flex-col 
                   h-full  ${
                     index <= 0
                       ? "1xlx:pl-0 1xs:pl-3 pl-1 "
                       : "1xlx:pl-[4.6rem] "
                   }`
                  : ` w-full flex  flex-col  ${
                      index <= 0 ? "1md:pl-8 " : "1md:pl-16 "
                    } justify-between h-full ${
                      onHouseDetailPage && minimize
                        ? "1xz:gap-y-0"
                        : "1xz:gap-y-10"
                    } gap-y-6  `
              } 1xz:mx-6 1md:mx-1 w-full rounded-lg`}
            >
              <div
                className={`flex w-full ${
                  onHouseDetailPage
                    ? "justify-center"
                    : "1xz:justify-center justify-start"
                } `}
              >
                {renderHeader(addMonths(currentMonth, index))}
              </div>

              <div
                className={`w-full ${
                  onHouseDetailPage ? "1xz:mt-10 mt-10" : ""
                } 1md:w-auto`}
              >
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
