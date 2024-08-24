import React from "react";
import filter from "../../data/Icons svg/filter.svg";
import { useDispatch } from "react-redux";
import { setShowMobileForm } from "../../Main/AppSlice";
import MobileFormModal from "./MobileFormModal";

const MobileForm = () => {
  const dispatch = useDispatch();
  function SearchSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          fill: "#000000",
          height: "28px",
          width: "28px",
          stroke: "black",
          strokeWidth: "2",
          overflow: "visible",
        }}
        viewBox="0 -960 960 960"
      >
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
      </svg>
    );
  }

  return (
    <div className="w-[calc(100%-3rem)]  flex items-center justify-between space-x-2 mx-auto mt-4 h-full">
      <div
        onClick={() => dispatch(setShowMobileForm(true))}
        className="w-full flex cursor-pointer items-center py-3 px-4 space-x-3 shadow-modalShadow rounded-full h-full "
      >
        <div>
          <SearchSVG />
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="text-sm font-medium">Where to?</h3>
          <div className="flex items-center space-x-1">
            <span className="text-xs leading-none text-grey font-light">
              Anywhere
            </span>
            <div className="flex items-center justify-center h-full">
              <div className="h-[3px] w-[3px] bg-grey rounded-full"></div>
            </div>
            <span className="text-xs leading-none text-grey font-light">
              Any week
            </span>
            <div className="flex items-center justify-center h-full">
              <div className="h-[3px] w-[3px] bg-grey rounded-full"></div>
            </div>
            <span className="text-xs leading-none text-grey font-light">
              Add guests
            </span>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-full border  flex-center border-grey-light bg-white">
        <img className="w-4 h-4" src={filter} alt="filter" />
      </div>
      <MobileFormModal />
    </div>
  );
};

export default MobileForm;
