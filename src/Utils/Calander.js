import React, { useEffect, useState } from "react";
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
  subMonths,
  isWithinInterval,
} from "date-fns";
import arrowRight from "../data/Icons svg/arrow-right.svg";
import arrowLeft from "../data/Icons svg/arrow-left.svg";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [animationDirection, setAnimationDirection] = useState("");
  const [uniqueKey, setUniqueKey] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Disable the initial render animation
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const renderHeader = (
    currentMonth,
    nextMonth,
    prevMonth,
    showLeftButton,
    showRightButton
  ) => {
    const dateFormat = "MMMM yyyy";
    let today = new Date();

    const isCurrentMonth =
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth();

    return (
      <div className="flex mb-5 justify-center items-center py-2">
        {showLeftButton ? (
          <div
            className={`flex items-center cursor-pointer justify-center hover:rounded-full h-[2rem] ${
              isCurrentMonth ? "cursor-not-allowed opacity-20" : ""
            } w-[2rem] hover:bg-shadow-gray-light`}
            onClick={!isCurrentMonth ? prevMonth : undefined}
          >
            <img
              src={arrowLeft}
              alt="Previous Month"
              className="text-lg font-semibold"
            />
          </div>
        ) : (
          <div className="h-[2rem] w-[2rem]"></div>
        )}
        <div className="flex items-center justify-center flex-grow text-base font-medium">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        {showRightButton ? (
          <div
            className="flex items-center h-[2rem] w-[2rem] hover:rounded-full hover:bg-shadow-gray-light justify-center"
            onClick={nextMonth}
          >
            <img
              src={arrowRight}
              alt="Next Month"
              className="text-lg font-semibold"
            />
          </div>
        ) : (
          <div className="h-[2rem] w-[2rem]"></div>
        )}
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className="flex w-[3rem] justify-center text-xs text-center "
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
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

        let onClickHandler = () =>
          onDateClick(isPastDate ? undefined : cloneDay);
        if (
          selectedStartDate &&
          selectedEndDate &&
          isWithinInterval(day, {
            start: selectedStartDate,
            end: selectedEndDate,
          })
        ) {
          cellClass = "bg-shadow-gray-light text-black";
        } else if (isSameDay(day, selectedStartDate)) {
          cellClass = "bg-black text-white"; // Start date
        } else if (isSameDay(day, selectedEndDate)) {
          cellClass = "bg-black text-white"; // End date
        } else if (!isSameMonth(day, monthStart)) {
          cellClass = "bg-white text-white";
          onClickHandler = null; // Disable onClick for dates outside the current month
        } else if (isPastDate) {
          cellClass = "bg-white text-gray-300"; // Apply a faded style for past dates
        } else {
          cellClass =
            "bg-white text-black hover:rounded-full hover:border-[1.5px] hover:border-black";
        }

        days.push(
          <div
            className={`h-[3rem] w-[3rem] flex items-center justify-center ${
              isPastDate ? "" : "cursor-pointer"
            } ${cellClass}`}
            key={cloneDay}
            onClick={onClickHandler}
          >
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex mb-[2px] items-center justify-center" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const onDateClick = (day) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    } else if (
      selectedStartDate &&
      !selectedEndDate &&
      day >= selectedStartDate
    ) {
      setSelectedEndDate(day);
    } else {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    }
  };

  const nextMonth = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInRight");
      setCurrentMonth(addMonths(currentMonth, 1));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  const prevMonth = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInLeft");
      setCurrentMonth(subMonths(currentMonth, 1));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  const nextMonthRight = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInRight");
      setCurrentMonth(addMonths(currentMonth, 1));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  const prevMonthLeft = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInLeft");
      setCurrentMonth(subMonths(currentMonth, 1));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-self-center">
        <div
          key={`${uniqueKey}-current`} // Add unique key to force re-render
          className={`max-w-md justify-center items-center w-[25rem] mx-1 rounded-lg ${
            !isFirstRender && animationDirection === "slideInLeft"
              ? "animate-slideInLeft"
              : !isFirstRender && animationDirection === "slideInRight"
              ? "animate-slideInRight"
              : ""
          }`}
        >
          {renderHeader(currentMonth, nextMonth, prevMonth, true, false)}
          {renderDays()}
          <div>{renderCells(currentMonth)}</div>
        </div>
        <div
          key={`${uniqueKey}-next`} // Add unique key to force re-render
          className={`max-w-md w-[25rem] mx-1 rounded-lg ${
            !isFirstRender && animationDirection === "slideInLeft"
              ? "animate-slideInLeft"
              : !isFirstRender && animationDirection === "slideInRight"
              ? "animate-slideInRight"
              : ""
          } `}
        >
          {renderHeader(
            addMonths(currentMonth, 1),
            nextMonthRight,
            prevMonthLeft,
            false,
            true
          )}
          {renderDays()}
          <div>{renderCells(addMonths(currentMonth, 1))}</div>
        </div>
      </div>
      <div className="h-[5rem] flex ml-10 justify-self-start w-[30rem]">
        <button>button1</button>
        <button>button2</button>
        <button>button3</button>
        <button>button4</button>
        <button>button5</button>
      </div>
    </div>
  );
};

export default Calendar;
