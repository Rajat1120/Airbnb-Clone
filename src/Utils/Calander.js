// Calendar.js
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
} from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center py-2">
        <div className="text-left">
          <button onClick={prevMonth} className="text-lg font-semibold">
            &#9664;
          </button>
        </div>
        <div className="text-center text-lg font-semibold">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="text-right">
          <button onClick={nextMonth} className="text-lg font-semibold">
            &#9654;
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eeee";
    const days = [];
    console.log(days);

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex-1 text-center py-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`flex-1 h-16 flex items-center justify-center border p-2 cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-200 text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="flex">
      <div className="max-w-md w-[30rem]  mx-auto p-4 border rounded-lg shadow-lg">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div className="max-w-md  mx-auto p-4 border rounded-lg shadow-lg">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
