import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, addMonths } from "date-fns";
import CalendarModal from "./CalendarModal";
import Calendar from "./FormFields/Calendar";
import {
  setCalendarModalOpen,
  setCurrentDot,
  setDurationDate,
} from "../../../redux/mainFormSlice";

const TOTAL_DOTS = 12;
const SMALL_SCREEN_BREAKPOINT = "(max-width: 743px)";

const CircularSlider = () => {
  const dispatch = useDispatch();
  const [hoveredDot, setHoveredDot] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const {
    isCalendarModalOpen,
    curDot: currentDot,
    startDurationDate,
  } = useSelector((store) => store.form);

  // Calculate end date based on current dot
  const endDurationDate = useMemo(
    () =>
      addMonths(startDurationDate, currentDot === 0 ? TOTAL_DOTS : currentDot),
    [startDurationDate, currentDot]
  );

  // Format dates for display
  const formattedStartDate = format(startDurationDate, "MMM d, yyyy");
  const formattedEndDate = format(endDurationDate, "MMM d, yyyy");

  useEffect(() => {
    const formattedDuration = `${format(
      startDurationDate,
      "MMM d"
    )} to ${format(endDurationDate, "MMM d")}`;
    dispatch(setDurationDate(formattedDuration));
  }, [startDurationDate, endDurationDate, dispatch]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SMALL_SCREEN_BREAKPOINT);
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => setIsSmallScreen(event.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleDotClick = (index) => dispatch(setCurrentDot(index));
  const handleEditClick = () => dispatch(setCalendarModalOpen(true));
  const handleCloseModal = () => dispatch(setCalendarModalOpen(false));

  const renderDots = () => {
    return [...Array(TOTAL_DOTS)].map((_, index) => (
      <Dot
        key={index}
        index={index}
        currentDot={currentDot}
        isHovered={hoveredDot === index}
        onClick={handleDotClick}
        onHover={setHoveredDot}
        isSmallScreen={isSmallScreen}
      />
    ));
  };

  return (
    <div className="flex h-full 1xz:gap-y-10 pt-5 1xz:pt-0 flex-col items-center justify-between">
      <p>When's your trip?</p>
      <div className="relative flex items-center justify-center">
        <CircularSliderBase isSmallScreen={isSmallScreen}>
          {renderDots()}
          <ActiveDot currentDot={currentDot} isSmallScreen={isSmallScreen} />
          <CenterDisplay currentDot={currentDot} />
        </CircularSliderBase>
      </div>
      <DateDisplay
        startDate={formattedStartDate}
        endDate={formattedEndDate}
        onEditClick={handleEditClick}
      />
      <CalendarModal isOpen={isCalendarModalOpen} onClose={handleCloseModal}>
        <div className="overflow-x-hidden flex-center max-w-[53rem]">
          <Calendar />
        </div>
      </CalendarModal>
    </div>
  );
};

// Subcomponents
const CircularSliderBase = ({ children, isSmallScreen }) => (
  <div
    className={`${
      isSmallScreen ? "h-[16.12rem] w-[16.12rem]" : "h-[18.12rem] w-[18.12rem]"
    } flex items-center justify-center bg-[#E6E6E6] bg-clip-border rounded-[50%] shadow-sliderShadow relative`}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      {children}
    </div>
  </div>
);

const Dot = ({
  index,
  currentDot,
  isHovered,
  onClick,
  onHover,
  isSmallScreen,
}) => (
  <div
    className="absolute flex items-center justify-center bg-transparent rounded-full cursor-pointer"
    style={{
      width: "5rem",
      height: "5rem",
      transform: `rotate(${index * (360 / TOTAL_DOTS)}deg) translate(0, ${
        isSmallScreen ? "-6rem" : "-7rem"
      })`,
    }}
    onClick={() => onClick(index)}
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(null)}
  >
    <div
      className={`h-2 w-2 rounded-full ${
        isHovered
          ? "bg-black scale-150"
          : currentDot === 0
          ? "bg-dark-pink"
          : index > 0 && index <= currentDot - 1
          ? "bg-dark-pink"
          : "bg-[#4d4d4d]"
      }`}
    ></div>
  </div>
);

const ActiveDot = ({ currentDot, isSmallScreen }) => (
  <div
    className="absolute bg-pink rounded-full"
    style={{
      width: "36px",
      height: "36px",
      transition: "transform 0.2s ease",
      transform: `rotate(${
        currentDot === 0 ? 360 : currentDot * (360 / TOTAL_DOTS)
      }deg) translate(0, ${isSmallScreen ? "-6rem" : "-7rem"})`,
    }}
  ></div>
);

const CenterDisplay = ({ currentDot }) => (
  <div className="1xz:h-[10.62rem] h-[8.62rem] flex items-center justify-center bg-white rounded-[50%] shadow-sliderShadow2 1xz:w-[10.62rem] w-[8.62rem]">
    <span className="flex flex-col items-center justify-center">
      <p className="1xz:text-[6rem] text-[5rem] 1xz:h-[7rem] h-[5.5rem] mb-2 font-bold p-0 m-0">
        {currentDot === 0 ? 12 : currentDot}
      </p>
      <p className="mb-6 font-bold text-lg">
        month{currentDot === 1 ? "" : "s"}
      </p>
    </span>
  </div>
);

const DateDisplay = ({ startDate, endDate, onEditClick }) => (
  <div className="mb-6">
    <p>
      <span
        onClick={onEditClick}
        className="font-medium cursor-pointer underline underline-offset-4"
      >
        {startDate}
      </span>
      <span className="mx-2 font-[350]">to</span>
      <span
        onClick={onEditClick}
        className="font-medium cursor-pointer underline underline-offset-4"
      >
        {endDate}
      </span>
    </p>
  </div>
);

export default CircularSlider;
