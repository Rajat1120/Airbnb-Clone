import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMonths, format } from "date-fns";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import FlexibleStayOptions from "./FlexibleStayOptions";
import { setHoverInput, setTextForFlexibleInput } from "./mainFormSlice";

// Helper function to get next 12 months
const getNext12Months = () => {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const nextMonthDate = addMonths(currentDate, i);
    months.push({
      month: format(nextMonthDate, "MMMM"),
      year: format(nextMonthDate, "yyyy"),
    });
  }

  return months;
};

const Flexible = ({ modalRef, handleInputField, flexibleRef }) => {
  const dispatch = useDispatch();

  const {
    curSelectInput: currentInput,
    months: selectedMonths,
    stayDuration,
  } = useSelector((store) => store.form);

  const next12Months = useMemo(() => getNext12Months(), []);

  const selectedMonthsInfo = useMemo(
    () => selectedMonths.map((index) => next12Months[index]).filter(Boolean),
    [selectedMonths, next12Months]
  );

  useEffect(() => {
    const capitalizedStayDuration =
      stayDuration.charAt(0).toUpperCase() + stayDuration.slice(1);
    let inputText = "Any time";

    if (selectedMonths.length > 0) {
      const monthsText =
        selectedMonthsInfo.length === 1
          ? selectedMonthsInfo[0].month
          : selectedMonthsInfo
              .map((item) => item.month.substring(0, 3))
              .join(", ");
      inputText = `${capitalizedStayDuration} in ${monthsText}`;
    } else if (stayDuration) {
      inputText = `Any ${stayDuration}`;
    }

    dispatch(setTextForFlexibleInput(inputText));
  }, [selectedMonths, selectedMonthsInfo, stayDuration, dispatch]);

  const handleMouseEnter = () => dispatch(setHoverInput("month"));
  const handleMouseLeave = () => dispatch(setHoverInput(null));

  const renderFlexibleContent = () => {
    if (currentInput !== "flexible") {
      return <span className="text-sm font-thin">Any time</span>;
    }

    if (selectedMonthsInfo.length > 0) {
      const monthsText =
        selectedMonthsInfo.length === 1
          ? selectedMonthsInfo[0].month
          : selectedMonthsInfo
              .map((item) => item.month.substring(0, 3))
              .join(", ");
      return `${
        stayDuration.charAt(0).toUpperCase() + stayDuration.slice(1)
      } in ${monthsText}`;
    }

    return `Any ${stayDuration}`;
  };

  return (
    <Modal>
      <Modal.Open opens="flexible">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={flexibleRef}
          className={`flex 1xz:relative 1smd:static 1smd:justify-center 1xz:justify-start 1xz:w-full 1xz:px-6 1smd:px-0 items-center ${
            currentInput === "flexible"
              ? "shadow-checkInShadow bg-white rounded-full"
              : ""
          }`}
        >
          <div
            className={`1smd:w-[17.3rem] h-[3.85rem] 1xz:before:w-full 1xz:before:left-0 hover:before:content-[''] 1smd:before:w-[17.3rem] before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[17.67rem] before:rounded-full ${
              currentInput === "flexible"
                ? "rounded-full bg-white"
                : "before:hover:bg-[#c0c0c0] "
            } before:hover:opacity-40 flex items-center justify-center`}
            onClick={(e) => handleInputField(e.target, "flexible")}
          >
            <div className="flex text-sm font-medium items-start justify-center 1smd:w-[15rem] flex-col ">
              <span className="text-xs font-medium">When</span>
              <span className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap 1smd:w-[15rem]">
                {renderFlexibleContent()}
              </span>
            </div>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="flexible">
        <div className="flex relative flex-col w-full justify-center items-center">
          <CheckInOption />
          <FlexibleStayOptions />
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Flexible;
