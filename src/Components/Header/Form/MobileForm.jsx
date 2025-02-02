import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowMobileForm } from "../../../redux/AppSlice";
import { setIsSearch } from "../../../redux/mainFormSlice";
import MobileFormModal from "./MobileFormModal";
import FilterIcon from "../../../asset/Icons_svg/filter.svg";
import WestArrowIcon from "../../../asset/Icons_svg/westArrow.svg";

const MobileForm = () => {
  const dispatch = useDispatch();
  const { isSearch, displayGuestInput, displaySearch, displaySearchWeek } =
    useSelector((store) => store.form);

  const handleMobileFormClick = () => dispatch(setShowMobileForm(true));
  const handleBackClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setIsSearch(false));
  };

  return (
    <div className="w-[calc(100%-3rem)] flex items-center justify-between space-x-2 mx-auto mt-4 h-full">
      <div
        onClick={handleMobileFormClick}
        className="w-full flex cursor-pointer items-center py-3 px-4 space-x-3 shadow-modalShadow rounded-full h-full"
      >
        {isSearch ? (
          <SearchView
            displaySearch={displaySearch}
            displaySearchWeek={displaySearchWeek}
            displayGuestInput={displayGuestInput}
            onBackClick={handleBackClick}
          />
        ) : (
          <DefaultView
            displaySearch={displaySearch}
            displaySearchWeek={displaySearchWeek}
            displayGuestInput={displayGuestInput}
          />
        )}
      </div>
      <FilterButton />
      <MobileFormModal />
    </div>
  );
};

// Subcomponents
const SearchView = ({
  displaySearch,
  displaySearchWeek,
  displayGuestInput,
  onBackClick,
}) => (
  <div className="flex flex-col space-y-1">
    <div className="flex space-x-2 items-center px-2">
      <button
        className="h-8 w-8 flex-center rounded-full hover:bg-shadow-gray active:bg-shadow-gray"
        onClick={onBackClick}
      >
        <img src={WestArrowIcon} className="h-4 w-4" alt="Back" />
      </button>
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {displaySearch || "Anywhere"}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-grey font-medium">
            {displaySearchWeek || "Any week"}
          </span>
          <Dot />
          <span className="text-xs text-grey">
            {displayGuestInput || "Add guests"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const DefaultView = () => (
  <>
    <SearchSVG />
    <div className="flex flex-col">
      <h3 className="text-sm font-medium">Where to?</h3>
      <div className="flex items-center space-x-1">
        <LocationOption text="Anywhere" />
        <LocationOption text="Any week" />
        <LocationOption text="Add guests" isLast={true} />
      </div>
    </div>
  </>
);

const LocationOption = ({ text, isLast = false }) => (
  <div className="flex items-center justify-between space-x-1 flex-1">
    <span className="text-xs truncate min-w-2 w-full text-ellipsis leading-none text-grey font-light">
      {text}
    </span>
    {!isLast && <Dot />}
  </div>
);

const Dot = () => (
  <div className="flex items-center justify-center h-full">
    <div className="h-[3px] w-[3px] bg-grey rounded-full"></div>
  </div>
);

const FilterButton = () => (
  <div className="p-3 rounded-full border flex-center border-grey-light bg-white">
    <img className="w-4 h-4" src={FilterIcon} alt="filter" />
  </div>
);

// SVG components
const SearchSVG = () => (
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

export default MobileForm;
