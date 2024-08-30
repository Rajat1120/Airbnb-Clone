import React from "react";
import DatesOption from "../Form/DatesOption";
import Calendar from "./FormFields/Calendar";
import { useDispatch, useSelector } from "react-redux";
import CircularSlider from "./CircularSlider";
import AddDays from "./AddDays";
import { format } from "date-fns";
import {
  setCurrentDot,
  setMonths,
  setOpenWhenCard,
  setOpenWhoCard,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDurationDate,
  setStayDuration,
  setTextForFlexibleInput,
} from "./mainFormSlice";
import FlexibleStayOptions from "./FlexibleStayOptions";

const MobileWhenCard = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.form.selectedStartDate);
  const endDate = useSelector((state) => state.form.selectedEndDate);
  const dateOption = useSelector((state) => state.form.dateOption);
  const currentDot = useSelector((store) => store.form.curDot);
  const startDurationDate = useSelector(
    (store) => store.form.startDurationDate
  );
  const textForFlexibleInput = useSelector(
    (store) => store.form.textForFlexibleInput
  );

  let showReset =
    startDate ||
    endDate ||
    textForFlexibleInput !== " Any week" ||
    currentDot !== 3 ||
    format(startDurationDate, "yyyy-MM-dd") !==
      format(new Date(), "yyyy-MM-dd");

  return (
    <div className="w-full relative  overflow-hidden  pt-5 h-[calc(100vh-10rem)] flex flex-col  shadow-lg border border-shadow-gray bg-white   rounded-2xl">
      <div className="flex flex-col  w-full h-full ">
        <div className="1xsss:px-6 px-6 border-b  border-grey-light-50">
          <div className="w-full">
            <h1 className="text-2xl  block pb-5 font-semibold">
              When's your trip?
            </h1>
          </div>
          <div
            className={`flex ${
              dateOption === "dates" ? "pb-0" : "pb-4"
            } justify-center`}
          >
            <DatesOption></DatesOption>
          </div>

          <div
            className={`${
              dateOption !== "dates" ? "hidden" : "py-2"
            } w-[calc(100%-2rem)] max-w-[27rem] mx-auto   flex justify-center `}
          >
            <div className="grid grid-cols-7 w-full   place-content-center place-items-stretch  ">
              <span className="text-xs  text-center  font-medium text-grey">
                Sun
              </span>
              <span className="text-xs  text-center font-medium text-grey">
                Mon
              </span>
              <span className="text-xs  text-center font-medium text-grey">
                Tue
              </span>
              <span className="text-xs  text-center font-medium text-grey">
                Wed
              </span>
              <span className="text-xs  text-center font-medium text-grey">
                Thu
              </span>
              <span className="text-xs  text-center font-medium text-grey">
                Fri
              </span>
              <span className="text-xs  text-center font-medium text-grey">
                Sat
              </span>
            </div>
          </div>
        </div>
        {dateOption === "dates" ? (
          <>
            <div
              className="flex w-full h-full overflow-y-auto flex-grow px-10 mx-auto flex-col
         items-center max-w-lg"
            >
              <Calendar></Calendar>
            </div>
            <div className="w-full  bg-white  border-t border-b  border-grey-light-50">
              <AddDays></AddDays>
            </div>
          </>
        ) : null}
        {dateOption === "month" ? <CircularSlider></CircularSlider> : null}
        {dateOption === "flexible" ? (
          <FlexibleStayOptions showHorPadding={false}></FlexibleStayOptions>
        ) : null}

        <div
          className={`w-full bg-white ${
            dateOption !== "dates" ? "border-t border-grey-light-50" : ""
          }  mt-auto`}
        >
          <div className="w-full py-3 ">
            <div
              className="flex px-5 justify-between
          items-center"
            >
              <button
                onClick={() => {
                  if (showReset) {
                    dispatch(setSelectedStartDate(null));
                    dispatch(setSelectedEndDate(null));
                    dispatch(setStartDurationDate(new Date()));
                    dispatch(setStayDuration("week"));
                    dispatch(setMonths("empty"));
                    dispatch(setCurrentDot(3));
                  } else {
                    dispatch(setOpenWhenCard(false));
                    dispatch(setOpenWhoCard(true));
                  }
                }}
                className="font-medium px-3 py-3 rounded-lg hover:bg-shadow-gray-light underline"
              >
                {showReset ? "Reset" : "Skip"}
              </button>
              <button
                onClick={() => {
                  dispatch(setOpenWhenCard(false));
                  dispatch(setOpenWhoCard(true));
                }}
                className="px-12 py-3 rounded-lg bg-black text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWhenCard;
