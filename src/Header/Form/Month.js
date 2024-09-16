import React, { useEffect } from "react";
import Modal from "../../Modals/Modal";
import CheckInOption from "./DatesOption";
import CircularSlider from "./CircularSlider";
import { useDispatch, useSelector } from "react-redux";
import { format, addMonths } from "date-fns";
import { setHoverInput, setTextForInputDuration } from "./mainFormSlice";

const Month = ({ modalRef, handleInputField, monthRef }) => {
  const startDurationDate = useSelector(
    (store) => store.form.startDurationDate
  );

  const dispatch = useDispatch();
  const curSelectedInput = useSelector((store) => store.form.curSelectInput);

  const currentDot = useSelector((store) => store.form.curDot);

  const formattedStartDate = startDurationDate
    ? format(startDurationDate, "MMM d")
    : "";

  let endDate = startDurationDate
    ? addMonths(startDurationDate, currentDot)
    : null;

  // Then format the new date
  const formatEndDate = endDate ? format(endDate, "MMM d") : "";

  useEffect(() => {
    let textToDisplay =
      formattedStartDate && formatEndDate
        ? `${formattedStartDate} - ${formatEndDate}`
        : "Any time";

    dispatch(setTextForInputDuration(textToDisplay));
  }, [formatEndDate, dispatch, formattedStartDate]);

  const handleClick = (e) => {
    handleInputField(e.target, "month");
  };

  const curInput = useSelector((store) => store.form.curSelectInput);

  return (
    <Modal>
      <Modal.Open opens="month">
        <div
          onMouseEnter={() => dispatch(setHoverInput("month"))}
          onMouseLeave={() => dispatch(setHoverInput(null))}
          className={`flex 1xz:relative 1smd:static  1smd:justify-center 1xz:justify-start 1xz:w-full  1smd:px-0 1xz:px-6 items-center ${
            curInput === "month"
              ? "shadow-checkInShadow  bg-white rounded-full"
              : ""
          } `}
          ref={monthRef}
        >
          <div
            className={`1smd:w-[17.3rem] 1xz:before:left-0 1xz:before:w-full h-[3.85rem] hover:before:content-[''] 1smd:before:w-[17.3rem] before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[17.67rem] before:rounded-full  ${
              curInput === "month"
                ? "rounded-full bg-white"
                : "before:hover:bg-[#c0c0c0] "
            }  before:hover:opacity-40  flex items-center justify-center`}
            onClick={handleClick}
          >
            <div className="flex flex-col 1smd:w-[14.8rem] items-start justify-center">
              <p className="text-xs font-medium">When</p>
              {curSelectedInput ? (
                <p className="text-sm font-medium ">
                  {formattedStartDate} - {formatEndDate}
                </p>
              ) : (
                <span className="text-sm font-thin">Any time</span>
              )}
            </div>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window modalRef={modalRef} name="month">
        <div className="flex flex-col justify-center items-center">
          <CheckInOption></CheckInOption>
          <CircularSlider></CircularSlider>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default Month;
