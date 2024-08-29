import React from "react";
import DatesOption from "../Form/DatesOption";
import Calendar from "./FormFields/Calendar";
import { useDispatch } from "react-redux";
import AddDays from "./AddDays";
import { setOpenWhenCard, setOpenWhoCard } from "./mainFormSlice";

const MobileWhenCard = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full overflow-hidden  py-5 h-[calc(100vh-10rem)] flex flex-col  shadow-lg border border-shadow-gray bg-white   rounded-2xl">
      <div className="w-full ">
        <div className="1xsss:px-6 px-6 border-b  border-grey-light-50">
          <div className="w-full">
            <h1 className="text-2xl  block pb-5 font-semibold">
              When's your trip?
            </h1>
          </div>
          <div className="flex justify-center">
            <DatesOption></DatesOption>
          </div>
          <div className="w-[calc(100%-2rem)] max-w-[27rem] mx-auto   flex justify-center my-2">
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
        <div
          className="   flex flex-grow px-10 mx-auto flex-col
         items-center max-w-lg"
        >
          <Calendar></Calendar>
        </div>
        <div className="w-full bg-white -translate-y-28 mt-auto">
          <div className="w-full   border-t border-b border-grey-light-50">
            <AddDays></AddDays>
          </div>
          <div className="w-full py-3 ">
            <div
              className="flex px-5 justify-between
          items-center"
            >
              <button
                onClick={() => {
                  dispatch(setOpenWhenCard(false));
                  dispatch(setOpenWhoCard(true));
                }}
                className="font-medium underline"
              >
                Skip
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
