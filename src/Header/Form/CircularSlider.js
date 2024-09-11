import React, { useEffect, useState } from "react";
import CalendarModal from "./CalendarModal";
import Calendar from "./FormFields/Calendar";
import { useDispatch, useSelector } from "react-redux";
import {
  setCalendarModalOpen,
  setCurrentDot,
  setDurationDate,
} from "./mainFormSlice";
import { format, addMonths } from "date-fns";
const CircularSlider = () => {
  const [onHover, setOnHover] = useState(false);

  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);
  const currentDot = useSelector((store) => store.form.curDot);
  const dispatch = useDispatch();
  const startDurationDate = useSelector(
    (store) => store.form.startDurationDate
  );
  const formatDate = format(startDurationDate, "MMM d, yyyy");

  let NumOfMonths = currentDot;

  let endDurationDate = addMonths(startDurationDate, NumOfMonths);
  const formatEndDate = format(endDurationDate, "MMM d, yyyy");

  useEffect(() => {
    let formattedDate =
      format(startDurationDate, "MMM d") +
      " to " +
      format(endDurationDate, "MMM d");
    dispatch(setDurationDate(formattedDate));
  }, [startDurationDate, dispatch, endDurationDate, currentDot]);

  const dotCount = 12;

  const handleClick = (index) => {
    dispatch(setCurrentDot(index));
  };

  const handleEditClick = () => {
    dispatch(setCalendarModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setCalendarModalOpen(false));
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 743px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className=" flex h-full 1xz:gap-y-10  pt-5 1xz:pt-0 flex-col items-center justify-between">
      <p>When's your trip?</p>
      <div className=" relative flex items-center justify-center ">
        <div className="1xz:h-[18.12rem] h-[16.12rem] flex items-center justify-center bg-[#E6E6E6] bg-clip-border rounded-[50%] 1xz:w-[18.12rem] w-[16.12rem] shadow-sliderShadow relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dots */}
            {[...Array(dotCount)].map((_, index) => (
              <div
                key={index}
                onMouseEnter={() => setOnHover(index)}
                onMouseLeave={() => setOnHover("")}
                className="absolute flex items-center justify-center bg-transparent rounded-full cursor-pointer"
                style={{
                  width: "5rem",
                  height: "5rem",
                  transform: `rotate(${
                    index * (360 / dotCount)
                  }deg) translate(0, ${isSmallScreen ? "-6rem" : "-7rem"})`,
                }}
                onClick={() => handleClick(index)}
              >
                <div
                  className={`h-2 w-2 ${
                    onHover === index ? "bg-black scale-150" : "bg-[#4d4d4d]"
                  } ${
                    currentDot === 0
                      ? "bg-dark-pink"
                      : index > 0 && index <= currentDot - 1 && "bg-dark-pink"
                  }  rounded-full`}
                ></div>
              </div>
            ))}
          </div>

          <div
            className="absolute bg-pink rounded-full"
            style={{
              width: "36px",
              height: "36px",
              transition: "transform 0.2s ease",
              transform: `rotate(${
                currentDot === 0 ? 360 : currentDot * (360 / dotCount)
              }deg) translate(0, ${isSmallScreen ? "-6rem" : "-7rem"})`,
            }}
          ></div>
          <div className="1xz:h-[10.62rem] h-[8.62rem] flex items-center justify-center bg-white rounded-[50%] shadow-sliderShadow2 1xz:w-[10.62rem] w-[8.62rem]">
            <span className="flex  flex-col items-center justify-center">
              <p className="1xz:text-[6rem] text-[5rem] 1xz:h-[7rem] h-[5.5rem] mb-2 font-bold p-0 m-0">
                {currentDot === 0 ? 12 : NumOfMonths}
              </p>{" "}
              <p className="mb-6 font-bold text-lg">
                month{currentDot === 1 ? "" : "s"}
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="mb-6 ">
        <p>
          <span
            onClick={handleEditClick}
            className="font-medium cursor-pointer underline underline-offset-4"
          >
            {formatDate}
          </span>
          <span className="mx-2 font-[350]">to</span>
          <span
            onClick={handleEditClick}
            className="font-medium cursor-pointer underline underline-offset-4"
          >
            {formatEndDate}
          </span>
        </p>
        <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="  overflow-x-hidden flex-center max-w-[53rem]">
            <Calendar />
          </div>
        </CalendarModal>
      </div>
    </div>
  );
};

export default CircularSlider;
