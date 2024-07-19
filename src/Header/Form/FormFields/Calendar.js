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
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true);
   const scrollContainerRef = useRef(null);

const [currentIndex, setCurrentIndex] = useState(0);
  const monthWidth = 440; // Width of each month component
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

const renderHeader = (
    currentMonth,
   
  ) => {
    const dateFormat = "MMMM yyyy";
  

  

    return (
      <div className="flex mb-5 justify-center items-center py-2">
        
        <div className={` flex items-center justify-center flex-grow text-base font-medium `} >
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
          if (isModalOpen) {
            onCalendarModalDateClick(cloneDay + 1);
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
          }else if (!isSameMonth(day, monthStart)) {
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
       rowCount++;
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

   const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const maxIndex = 20; // Assuming 12 months are rendered

    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };
   



  // Prevent default scroll behavior
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    const container = scrollContainerRef.current;
    
    container.addEventListener('wheel', preventDefault, { passive: false });
    container.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventDefault);
      container.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  console.log(currentIndex);

  useEffect(() => {
   
    if(currentIndex >= 0 && currentIndex <= 20){

      setScrollPosition( monthWidth * currentIndex)
    }
  
  }, [currentIndex])




 return (
    <div className="flex w-full flex-col justify-center relative">
      <div className="absolute top-[3.2rem] left-[2.2rem]" >
         {renderDays()}
      </div>
      <div  className="absolute right-[2.2rem] top-[3.2rem]" >
         {renderDays()}
      </div>
      <button 
       disabled = {currentIndex === 0}
        className={` absolute ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"} left-8 top-2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full  `}
        onClick={() => handleScroll('left')}
      >
       <img src={arrowLeft} alt="" />
      </button>
      <button 
      disabled = {currentIndex === 20}
        className={` absolute ${currentIndex === 20 ? "opacity-30 cursor-not-allowed" : " hover:bg-gray-100"} right-8 top-2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full `}
        onClick={() => handleScroll('right')}
      >
       <img src={arrowRight} alt="" />
      </button>
      <div 
        ref={scrollContainerRef}
        className="overflow-x-hidden w-full scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
        style={{ 
            transition: `transform ${scrollSpeed}ms ease-out`,
            transform: `translateX(-${ scrollPosition }px)`
          }}
        className="inline-flex gap-x-8">
          {Array.from({ length: 23 }, (_, index) => (
            <div
              key={`${index}-current`}
              className="max-w-md  flex-shrink-0  justify-center items-center w-[25rem] mx-1 rounded-lg"
            >
              {renderHeader(addMonths(currentMonth, index))}
             
              <div className="mt-10" >{renderCells(addMonths(currentMonth, index))}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-start items-center">
        {(selectedInput === "checkIn" || selectedInput === "checkOut") && <AddDays />}
      </div>
    </div>
  );
};

export default Calendar;
