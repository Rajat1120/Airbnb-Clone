import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import DatesOption from "./DatesOption";
import Calendar from "./FormFields/Calendar";
import CircularSlider from "./CircularSlider";
import AddDays from "./AddDays";
import FlexibleStayOptions from "./FlexibleStayOptions";
import {
  setCurrentDot,
  setMonths,
  setOpenWhenCard,
  setOpenWhoCard,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDurationDate,
  setStayDuration,
} from "../../../redux/mainFormSlice";

// Custom hook to handle date-related logic
const useDateManagement = () => {
  const startDate = useSelector((state) => state.form.selectedStartDate);
  const endDate = useSelector((state) => state.form.selectedEndDate);
  const currentDot = useSelector((store) => store.form.curDot);
  const startDurationDate = useSelector(
    (store) => store.form.startDurationDate
  );
  const textForFlexibleInput = useSelector(
    (store) => store.form.textForFlexibleInput
  );

  const showReset =
    startDate ||
    endDate ||
    textForFlexibleInput !== " Any week" ||
    currentDot !== 3 ||
    format(startDurationDate, "yyyy-MM-dd") !==
      format(new Date(), "yyyy-MM-dd");

  return {
    startDate,
    endDate,
    showReset,
    startDurationDate,
  };
};

// Component for the header section
const Header = () => (
  <div className="1xsss:px-6 px-6 border-b border-grey-light-50">
    <div className="w-full">
      <h1 className="text-2xl block pb-5 font-semibold">When's your trip?</h1>
    </div>
  </div>
);

// Component for weekday labels
const WeekdayLabels = () => (
  <div className="grid grid-cols-7 w-full px-6 1xsss:px-6  1xs:px-px place-content-center place-items-stretch">
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <span key={day} className="text-xs text-center font-medium text-grey">
        {day}
      </span>
    ))}
  </div>
);

// Component for the footer buttons
const FooterButtons = ({ showReset, onReset, onNext }) => (
  <div className="w-full py-3">
    <div className="flex px-5 justify-between items-center">
      <button
        onClick={showReset ? onReset : onNext}
        className="font-medium px-3 py-3 rounded-lg hover:bg-shadow-gray-light underline"
      >
        {showReset ? "Reset" : "Skip"}
      </button>
      <button
        onClick={onNext}
        className="px-12 py-3 rounded-lg bg-black text-white"
      >
        Next
      </button>
    </div>
  </div>
);

// Component for the main content based on dateOption
const DateContent = ({ dateOption }) => {
  if (dateOption === "dates") {
    return (
      <>
        <div className="flex w-full h-full overflow-y-auto flex-grow px-10 mx-auto flex-col items-center max-w-lg">
          <Calendar />
        </div>
        <div className="w-full bg-white border-t border-b border-grey-light-50">
          <AddDays />
        </div>
      </>
    );
  }

  if (dateOption === "month") {
    return <CircularSlider />;
  }

  if (dateOption === "flexible") {
    return <FlexibleStayOptions showHorPadding={false} />;
  }

  return null;
};

// Main component
const MobileWhenCard = () => {
  const dispatch = useDispatch();
  const dateOption = useSelector((state) => state.form.dateOption);
  const { showReset } = useDateManagement();

  const handleReset = () => {
    dispatch(setSelectedStartDate(null));
    dispatch(setSelectedEndDate(null));
    dispatch(setStartDurationDate(new Date()));
    dispatch(setStayDuration("week"));
    dispatch(setMonths("empty"));
    dispatch(setCurrentDot(3));
  };

  const handleNext = () => {
    dispatch(setOpenWhenCard(false));
    dispatch(setOpenWhoCard(true));
  };

  return (
    <div className="w-full relative overflow-hidden pt-5 h-[calc(100vh-10rem)] flex flex-col shadow-lg border border-shadow-gray bg-white rounded-2xl">
      <div className="flex flex-col w-full h-full">
        <Header />

        <div
          className={`flex w-[calc(100%-5rem)] m-auto mt-2  ${
            dateOption === "dates" ? "pb-0" : "pb-4"
          } justify-center`}
        >
          <DatesOption />
        </div>

        {dateOption === "dates" && (
          <div className="w-[calc(100%-2rem)] max-w-[27rem] mx-auto py-2 flex justify-center">
            <WeekdayLabels />
          </div>
        )}

        <DateContent dateOption={dateOption} />

        <div
          className={`w-full bg-white ${
            dateOption !== "dates" ? "border-t border-grey-light-50" : ""
          } mt-auto`}
        >
          <FooterButtons
            showReset={showReset}
            onReset={handleReset}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileWhenCard;
