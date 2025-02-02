import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMonths, format } from "date-fns";
import {
  setMonths,
  setStayDuration,
  setTextForFlexibleInput,
} from "../../../redux/mainFormSlice";
import monthSvg from "../../../asset/Icons_svg/month.svg";
import monthSelected from "../../../asset/Icons_svg/month-checked.svg";
import arrow_left from "../../../asset/Icons_svg/arrowLeftDark.svg";
import arrow_right from "../../../asset/Icons_svg/arrowRightDark.svg";

// Constants
const SCROLL_DISTANCE = 760;
const MONTHS_TO_DISPLAY = 12;
const SMALL_SCREEN_BREAKPOINT = "(max-width: 743px)";
const STAY_DURATIONS = ["weekend", "week", "month"];

// Helper functions
const getNext12Months = () => {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < MONTHS_TO_DISPLAY; i++) {
    const nextMonthDate = addMonths(currentDate, i);
    months.push({
      month: format(nextMonthDate, "MMMM"),
      year: format(nextMonthDate, "yyyy"),
    });
  }

  return months;
};

// Custom hook for scroll functionality
const useMonthScroll = (monthRef, leftScrollBtnRef, rightScrollBtnRef) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const month = monthRef.current;
    const leftScrollButton = leftScrollBtnRef.current;
    const rightScrollButton = rightScrollBtnRef.current;

    const handleScroll = () => {
      if (month) {
        setScrollPosition(month.scrollLeft);
      }
    };

    const handleScrollLeftBtn = () => {
      const newPosition = scrollPosition - SCROLL_DISTANCE;
      month?.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    };

    const handleScrollRightBtn = () => {
      const newPosition = scrollPosition + SCROLL_DISTANCE;
      month?.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    };

    month?.addEventListener("scroll", handleScroll);
    leftScrollButton?.addEventListener("click", handleScrollLeftBtn);
    rightScrollButton?.addEventListener("click", handleScrollRightBtn);

    return () => {
      month?.removeEventListener("scroll", handleScroll);
      leftScrollButton?.removeEventListener("click", handleScrollLeftBtn);
      rightScrollButton?.removeEventListener("click", handleScrollRightBtn);
    };
  }, [scrollPosition, monthRef, leftScrollBtnRef, rightScrollBtnRef]);

  return scrollPosition;
};

// Custom hook for responsive design
const useResponsiveDesign = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SMALL_SCREEN_BREAKPOINT);
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => setIsSmallScreen(event.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return isSmallScreen;
};

// Custom hook for flexible text input
const useFlexibleTextInput = (
  selectedMonths,
  selectedMonthsName,
  stayDuration
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const formatStayDuration = (duration) => {
      return duration
        ? duration.charAt(0).toUpperCase() + duration.slice(1)
        : "";
    };

    const getFormattedMonths = (months) => {
      if (!months || months.length === 0) return "";
      return months.length === 1
        ? months[0]?.month
        : months.map((item) => item.month?.substring(0, 3)).join(", ");
    };

    const inputText =
      selectedMonths?.length > 0
        ? `${formatStayDuration(stayDuration)} in ${getFormattedMonths(
            selectedMonthsName
          )}`
        : `Any ${stayDuration}`;

    dispatch(setTextForFlexibleInput(inputText));
  }, [dispatch, selectedMonths, selectedMonthsName, stayDuration]);
};

// StayDurationButton component
const StayDurationButton = ({ duration, currentDuration, onClick }) => (
  <span
    onClick={() => onClick(duration)}
    className={`py-2 text-sm ${
      currentDuration === duration
        ? "border-[2px] border-black"
        : "border-[1px] border-grey-light"
    } transform transition-transform duration-100 active:scale-95 font-extralight px-4 hover:border-black rounded-full`}
  >
    {duration.charAt(0).toUpperCase() + duration.slice(1)}
  </span>
);

// MonthCard component
const MonthCard = ({
  month,
  year,
  index,
  isSelected,
  onClick,
  showHovrPadding,
}) => (
  <div
    onClick={() => onClick(index)}
    className={`flex-shrink-0 ${
      isSelected
        ? "border-black bg-shadow-gray-light border-[2px]"
        : "border-grey-dim border-[1px]"
    } rounded-2xl flex-center flex-col ${
      index === 0 && showHovrPadding ? "1xz:ml-10 ml-2" : ""
    } ${
      index === 11 && showHovrPadding ? "1xz:mr-10 mr-2" : ""
    } w-[7.5rem] hover:border-black h-[8.5rem]`}
  >
    <div>
      <img
        className={`w-8 h-8 ${isSelected ? "" : "opacity-60"}`}
        src={isSelected ? monthSelected : monthSvg}
        alt=""
      />
    </div>
    <span className="text-sm font-medium">{month}</span>
    <span className="text-xs font-extralight">{year}</span>
  </div>
);

// ScrollButtons component
const ScrollButtons = ({
  scrollPosition,
  isSmallScreen,
  showHovrPadding,
  leftRef,
  rightRef,
}) => {
  if (!showHovrPadding) return null;

  return (
    <>
      <button
        ref={leftRef}
        className={`absolute ${
          scrollPosition < 1 || isSmallScreen ? "hidden" : "flex-center"
        } top-[65%] left-5 h-8 w-8 bg-white z-30 rounded-[50%] hover:scale-110 hidden hover:drop-shadow-md border-[1px] border-grey-dim-light`}
      >
        <img src={arrow_left} className="h-3 w-3" alt="" />
      </button>
      <button
        ref={rightRef}
        className={`absolute ${
          scrollPosition > 758 || isSmallScreen ? "hidden" : "flex-center"
        } top-[65%] right-5 h-8 w-8 bg-white z-30 rounded-[50%] hover:scale-110 hover:drop-shadow-md border-[1px] border-grey-dim-light`}
      >
        <img src={arrow_right} className="h-3 w-3" alt="" />
      </button>
    </>
  );
};

// Main component
const FlexibleStayOptions = ({ showHovrPadding = true }) => {
  const dispatch = useDispatch();
  const monthRef = useRef();
  const rightScrollBtnRef = useRef();
  const leftScrollBtnRef = useRef();

  const { months: curSelectedMonths, stayDuration } = useSelector(
    (store) => store.form
  );

  const months = useMemo(() => getNext12Months(), []);
  const selectedMonthsName = curSelectedMonths
    .map((index) => months[index])
    .filter(Boolean);

  const scrollPosition = useMonthScroll(
    monthRef,
    leftScrollBtnRef,
    rightScrollBtnRef
  );
  const isSmallScreen = useResponsiveDesign();

  useFlexibleTextInput(curSelectedMonths, selectedMonthsName, stayDuration);

  return (
    <div className="flex relative flex-col w-full justify-center items-center">
      <div
        className={`w-full mt-4 flex-col flex ${
          !showHovrPadding ? "border-b border-grey-light-50" : ""
        } items-center`}
      >
        <span className="text-lg font-medium">
          How long would you like to stay?
        </span>
        <div className="flex items-center my-5 gap-x-2">
          {STAY_DURATIONS.map((duration) => (
            <StayDurationButton
              key={duration}
              duration={duration}
              currentDuration={stayDuration}
              onClick={(d) => dispatch(setStayDuration(d))}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[65rem] mb-5 1xz:mb-10 max-h-full flex flex-col items-center">
        <span className="text-lg font-medium flex items-center 1xz:mt-2 1xz:mb-10 my-6">
          When do you want to go?
        </span>
        <div
          ref={monthRef}
          className={`w-full h-full hide-scrollbar overflow-x-auto ${
            !showHovrPadding ? "px-5" : ""
          }`}
        >
          <div className="inline-flex h-full items-center gap-x-2 pb-4">
            {months.map((item, index) => (
              <MonthCard
                key={index}
                {...item}
                index={index}
                isSelected={curSelectedMonths.includes(index)}
                onClick={(idx) => dispatch(setMonths(idx))}
                showHovrPadding={showHovrPadding}
              />
            ))}
          </div>
        </div>

        <ScrollButtons
          scrollPosition={scrollPosition}
          isSmallScreen={isSmallScreen}
          showHovrPadding={showHovrPadding}
          leftRef={leftScrollBtnRef}
          rightRef={rightScrollBtnRef}
        />

        {scrollPosition > 0 && showHovrPadding && !isSmallScreen && (
          <div className="w-12 h-40 absolute hidden 1xz:block top-[50%] left-0 bg-white border-r-[0.8rem] border-white" />
        )}
        {scrollPosition < 758 && showHovrPadding && !isSmallScreen && (
          <div className="w-12 h-40 absolute hidden 1xz:block top-[50%] right-0 bg-white border-r-[0.8rem] border-white" />
        )}
      </div>
    </div>
  );
};

export default FlexibleStayOptions;
