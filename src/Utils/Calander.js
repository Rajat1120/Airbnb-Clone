import React, { useState } from "react";
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

  const renderHeader = (
    currentMonth,
    nextMonth,
    prevMonth,
    showLeftButton,
    showRightButton
  ) => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center py-2">
        <div className="">
          {showLeftButton && (
            <button
              onClick={prevMonth}
              className="text-lg ml-[2rem] font-light"
            >
              <img src={arrowLeft} alt="" />
            </button>
          )}
        </div>
        <div className="text-center text-base font-medium">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="">
          {showRightButton && (
            <button
              onClick={nextMonth}
              className="text-lg ml-[-5rem] font-semibold"
            >
              <img src={arrowRight} alt="" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex text-xs px-4 text-center py-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex justify-center items-center">{days}</div>;
  };

  const renderCells = (currentMonth) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        let cellClass = "";
        let onClickHandler = () => onDateClick(cloneDay);

        if (
          selectedStartDate &&
          selectedEndDate &&
          isWithinInterval(day, {
            start: selectedStartDate,
            end: selectedEndDate,
          })
        ) {
          cellClass = "bg-shadow-gray-light text-black";
        } else if (
          isSameDay(day, selectedStartDate) ||
          isSameDay(day, selectedEndDate)
        ) {
          cellClass = "bg-blue-500 text-white";
        } else if (!isSameMonth(day, monthStart)) {
          cellClass = "bg-white text-white";
          onClickHandler = null; // Disable onClick for dates outside the current month
        } else {
          cellClass = "bg-white text-black hover:rounded-full hover:border";
        }

        days.push(
          <div
            className={`h-[3rem] w-[3rem] flex items-center justify-center cursor-pointer ${cellClass}`}
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
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonthRight = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonthLeft = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-self-center">
        <div className="max-w-md w-[25rem] mx-2 rounded-lg">
          {renderHeader(currentMonth, nextMonth, prevMonth, true, false)}
          {renderDays()}
          <div>{renderCells(currentMonth)}</div>
        </div>
        <div className="max-w-md w-[25rem] mx-2 rounded-lg">
          {renderHeader(
            addMonths(currentMonth, 1),
            nextMonthRight,
            prevMonthLeft,
            false,
            true
          )}
          {renderDays()}
          <div className="ml-8">{renderCells(addMonths(currentMonth, 1))}</div>
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