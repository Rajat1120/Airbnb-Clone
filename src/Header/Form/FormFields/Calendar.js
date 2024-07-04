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
import arrowRight from "../../../data/Icons svg/arrow-right.svg";
import arrowLeft from "../../../data/Icons svg/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setCurrentMonth,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDurationDate,
} from "../../Form/mainFormSlice";
import AddDays from "../AddDays";

const Calendar = () => {
  const selectedInput = useSelector((store) => store.form.curSelectInput);
  const [animationDirection, setAnimationDirection] = useState("");
  const [uniqueKey, setUniqueKey] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);

  const currentMonth = useSelector((store) => store.form.currentMonth);
  const selectedStartDate = useSelector(
    (store) => store.form.selectedStartDate
  );
  const selectedEndDate = useSelector((store) => store.form.selectedEndDate);
  const startDurationDate = useSelector(
    (store) => store.form.startDurationDate
  );

  const addDaysToStartDate = (daysToAdd) => {
    if (!startDurationDate) {
      return "No start date selected";
    }

    const newDate = addMonths(startDurationDate, daysToAdd);
    return format(newDate, "MMM d");
  };

  // console.log(addDaysToStartDate(3));

  const dispatch = useDispatch();

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
      const day = addDays(startDate, i);
      days.push(
        <div
          className="flex w-[3rem] justify-center text-xs text-center "
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
          if (isModalOpen) {
            onCalendarModalDateClick(cloneDay);
          } else {
            onDateClick(isPastDate ? undefined : cloneDay);
          }
        };

        if (isModalOpen) {
          if (
            isSameDay(day, startDurationDate) &&
            isSameMonth(day, monthStart)
          ) {
            cellClass = "bg-black text-white rounded-full";
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
                "  halfRightColor  text-white  before:bg-black before:content-[''] before:w-full before:h-full before:rounded-full before:border-[1.5px] before:border-black before:absolute top-0 before:left-0 hove:before:right-0 hove:before:bottom-0   "; // Start date
            } else if (
              isSameDay(day, selectedEndDate) &&
              isSameMonth(day, monthStart)
            ) {
              cellClass =
                "halfLeftColor  text-white  before:bg-black before:content-[''] before:w-full before:h-full before:rounded-full before:border-[1.5px] before:border-black before:absolute top-0 before:left-0 hove:before:right-0 hove:before:bottom-0  "; // End date
            } else if (!isSameMonth(day, monthStart)) {
              cellClass = "bg-white cursor-pointer text-white";
              onClickHandler = null; // Disable onClick for dates outside the current month
            } else {
              cellClass =
                "bg-shadow-gray-light  text-black  hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:rounded-full hover:before:border-[1.5px] hover:before:border-black hover:before:absolute hover:top-0 hover:before:left-0 hove:before:right-0 hove:before:bottom-0  ";
            }
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
            cellClass = "bg-white text-white";
            onClickHandler = null; // Disable onClick for dates outside the current month
          } else if (isPastDate) {
            cellClass = "bg-white text-gray-300"; // Apply a faded style for past dates
          } else {
            cellClass =
              "bg-white text-black hover:rounded-full hover:border-[1.5px] hover:border-black";
          }
        }
        days.push(
          <div
            key={day.toString()}
            className="relative h-[3rem]   w-[3rem] flex items-center justify-center"
          >
            <div
              className={`h-[3rem]  w-[3rem] flex items-center justify-center ${
                isPastDate ? "" : "cursor-pointer"
              } ${cellClass}`}
              key={day.toString()}
              onClick={onClickHandler}
            >
              <span className="text-sm z-20 font-medium">{formattedDate}</span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="flex mb-[2px] items-center justify-center"
          key={day.toString()}
        >
          {days}
        </div>
      );
      days = [];
    }
    return <div className="">{rows}</div>;
  };

  const onCalendarModalDateClick = (day) => {
    dispatch(setStartDurationDate(day));
  };

  const onDateClick = (day) => {
    if (
      selectedInput === "checkOut" &&
      !selectedEndDate &&
      !selectedStartDate
    ) {
      // If the input is "checkOut", and there is not start and end date, set the end date.
      dispatch(setSelectedEndDate(day));
      dispatch(setActiveInput("checkIn"));
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

  const nextMonth = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInRight");
      dispatch(setCurrentMonth(addMonths(addMonths(currentMonth, 1))));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  const prevMonth = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInLeft");
      dispatch(setCurrentMonth(subMonths(currentMonth, 1)));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  const nextMonthRight = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInRight");
      dispatch(setCurrentMonth(addMonths(currentMonth, 1)));
      setUniqueKey((prevKey) => prevKey + 1);
    }, 0);
  };

  const prevMonthLeft = () => {
    setAnimationDirection(""); // Reset animation
    setTimeout(() => {
      setAnimationDirection("slideInLeft");
      dispatch(setCurrentMonth(subMonths(currentMonth, 1)));
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
      <div className="w-full flex justify-start items-center">
        <AddDays></AddDays>
      </div>
    </div>
  );
};

export default Calendar;
