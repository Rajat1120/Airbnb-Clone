import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHitSearch, setShowMobileForm } from "../../../redux/AppSlice";
import crossIcon from "../../../asset/Icons_svg/cross.svg";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { handleSearchInput } from "./HandleSearch";
import MobileWhereCard from "./MobileWhereCard";
import MobileWhenCard from "./MobileWhenCard";
import MobileWhoCard from "./MobileWhoCard";
import { handleSearch } from "../../../hooks/MainFormContent";
import {
  setAdultCount,
  setChildCount,
  setCurrentDot,
  setDateOption,
  setEndDateToShow,
  setInfantCount,
  setIsSearch,
  setMonths,
  setOpenName,
  setOpenWhenCard,
  setOpenWhereCard,
  setOpenWhoCard,
  setPetsCount,
  setRegion,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDateToShow,
  setStartDurationDate,
  setStayDuration,
  setTextForGuestInput,
} from "../../../redux/mainFormSlice";

// Custom hooks
const useScrollLock = (showMobileForm) => {
  useEffect(() => {
    if (showMobileForm) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [showMobileForm]);
};

const useResponsiveLayout = (dispatch) => {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 751) {
        dispatch(setShowMobileForm(false));
      } else {
        dispatch(setOpenName(""));
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
};

const useDateFormatting = (selectedStartDate, selectedEndDate, dispatch) => {
  useEffect(() => {
    const formattedStartDate = selectedStartDate
      ? format(new Date(selectedStartDate), "dd MMM")
      : "";
    const formattedEndDate = selectedEndDate
      ? format(new Date(selectedEndDate), "dd MMM")
      : "";

    dispatch(setStartDateToShow(formattedStartDate));
    dispatch(setEndDateToShow(formattedEndDate));
  }, [selectedStartDate, selectedEndDate, dispatch]);
};

const useGuestInputText = (adultCount, childCount, dispatch) => {
  useEffect(() => {
    const textForGuestInput = `${
      adultCount + childCount > 0
        ? `${adultCount + childCount} guest${
            adultCount + childCount >= 2 ? "s" : ""
          }`
        : "Add guest"
    }`;
    dispatch(setTextForGuestInput(textForGuestInput));
  }, [adultCount, childCount, dispatch]);
};

// Subcomponents
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: "block",
      fill: "#ffffff",
      height: "24px",
      width: "24px",
      stroke: "black",
      strokeWidth: "2",
      overflow: "visible",
    }}
    viewBox="0 -960 960 960"
  >
    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </svg>
);

const Header = ({ onClose }) => (
  <motion.div
    initial={{ y: "-10rem", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "tween",
      duration: 0.3,
      ease: [0.25, 1, 0.7, 0.9],
    }}
    className="grid grid-cols-3 px-4 py-4"
  >
    <div>
      <div
        onClick={onClose}
        className="rounded-full cursor-pointer hover:bg-white hover:border-grey-light-50 hover:shadow-md transition-all duration-200 w-9 h-9 border flex-center border-grey-light"
      >
        <img src={crossIcon} className="w-3 h-3" alt="cross" />
      </div>
    </div>
    <div className="flex gap-x-4">
      <span className="text font-medium decoration-2 underline underline-offset-8">
        Stays
      </span>
      <span className="text-grey font-medium">Experiences</span>
    </div>
    <div></div>
  </motion.div>
);

const FormSection = ({ type, isOpen, content, onClick, label, value }) => (
  <motion.div
    initial={{ y: "-10rem", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "tween",
      duration: 0.3,
      ease: [0.25, 1, 0.7, 0.9],
    }}
    className="w-[calc(100%-40px)]"
  >
    {isOpen ? (
      content
    ) : (
      <div
        onClick={onClick}
        className="px-4 w-full py-5 h-full cursor-pointer shadow-md bg-white flex justify-between rounded-2xl"
      >
        <span className="text-grey text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    )}
  </motion.div>
);

const SearchFooter = ({ onClear, onSearch, isHidden }) => (
  <motion.div
    initial={{ y: "10rem", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      type: "tween",
      duration: 0.3,
      ease: [0.25, 1, 0.7, 0.9],
    }}
    className={`w-full ${
      isHidden ? "hidden" : "block"
    } py-3 absolute bg-[#fffefe] bottom-0`}
  >
    <div className="flex px-5 justify-between items-center">
      <button
        onClick={onClear}
        className="font-medium px-2 py-2 hover:bg-shadow-gray-light rounded-lg underline"
      >
        Clear all
      </button>
      <button
        onClick={onSearch}
        className="px-6 py-3 gap-x-2 rounded-lg bg-dark-pink flex text-white"
      >
        <SearchIcon />
        <span>Search</span>
      </button>
    </div>
  </motion.div>
);

const MobileFormModal = () => {
  const dispatch = useDispatch();
  const {
    openWhereCard,
    openWhenCard,
    openWhoCard,
    adultCount,
    childCount,
    guestPlural,
    petsCount: petCount,
    petPlural,
    infantCount,
    region,
    durationDate,
    combinedString,
    dateOption,
    startDateToShow,
    EndDateToShow,
    selectedStartDate,
    selectedEndDate,
    textForGuestInput,
    textForFlexibleInput,
    textForInputDuration,
    destinationInputVal,
  } = useSelector((state) => state.form);

  const { hitSearch, showMobileForm } = useSelector((state) => state.app);

  useScrollLock(showMobileForm);
  useResponsiveLayout(dispatch);
  useDateFormatting(selectedStartDate, selectedEndDate, dispatch);
  useGuestInputText(adultCount, childCount, dispatch);

  const handleClearAll = () => {
    dispatch(setAdultCount(0));
    dispatch(setChildCount(0));
    dispatch(setInfantCount(0));
    dispatch(setPetsCount(0));
    dispatch(setRegion("all"));
    dispatch(setSelectedStartDate(null));
    dispatch(setSelectedEndDate(null));
    dispatch(setStartDurationDate(new Date()));
    dispatch(setCurrentDot(3));
    dispatch(setMonths("empty"));
    dispatch(setDateOption("dates"));
    dispatch(setStayDuration("week"));
  };

  const handleSearchClick = () => {
    dispatch(setShowMobileForm(false));
    dispatch(setIsSearch(true));
    dispatch(setHitSearch(hitSearch + 1));
    handleSearchInput(region, destinationInputVal, combinedString, dispatch);
    handleSearch({
      region,
      dispatch,
      dateOption,
      startDateToShow,
      EndDateToShow,
      selectedStartDate,
      selectedEndDate,
      destinationInputVal,
      textForInputDuration,
      textForFlexibleInput,
      textForGuestInput,
    });
  };

  const getDateInput = () => {
    if (!selectedStartDate && !selectedEndDate) return "Add dates";
    return `${selectedStartDate ? format(selectedStartDate, "d MMM") : ""} ${
      selectedStartDate && selectedEndDate ? "-" : ""
    } ${selectedEndDate ? format(selectedEndDate, "d MMM") : ""}`;
  };

  const getWhenInput = (dateOption) => {
    switch (dateOption) {
      case "flexible":
        return textForFlexibleInput === " Any week"
          ? "Any week"
          : textForFlexibleInput;
      case "month":
        return durationDate;
      case "dates":
        return getDateInput();
      default:
        return "Add dates";
    }
  };

  const getWhereInput = () => {
    if (destinationInputVal) return destinationInputVal;
    if (region && region !== "all") return region;
    return "I'm flexible";
  };

  const getGuestInput = () => {
    return (
      <p className="text-sm mt-[2px] font-medium text-black">
        {adultCount + childCount > 0
          ? `${adultCount + childCount} guest${guestPlural} ${
              infantCount
                ? `${infantCount} infant${
                    infantCount > 1 ? "s, " : `${petCount ? ", " : ""}`
                  }`
                : ""
            }${petCount ? `${petCount} pet` : ""}${petPlural}`
          : "Add guest"}
      </p>
    );
  };

  if (!showMobileForm) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-shadow-gray-light z-50">
      <Header onClose={() => dispatch(setShowMobileForm(false))} />

      <div className="flex-center flex-col gap-y-4">
        <FormSection
          type="where"
          isOpen={openWhereCard}
          content={<MobileWhereCard />}
          onClick={() => {
            dispatch(setOpenWhereCard(true));
            dispatch(setOpenWhenCard(false));
            dispatch(setOpenWhoCard(false));
          }}
          label="Where"
          value={getWhereInput()}
        />

        <FormSection
          type="when"
          isOpen={openWhenCard}
          content={<MobileWhenCard />}
          onClick={() => {
            dispatch(setOpenWhenCard(true));
            dispatch(setOpenWhereCard(false));
            dispatch(setOpenWhoCard(false));
          }}
          label="When"
          value={getWhenInput(dateOption)}
        />

        <FormSection
          type="who"
          isOpen={openWhoCard}
          content={<MobileWhoCard />}
          onClick={() => {
            dispatch(setOpenWhoCard(true));
            dispatch(setOpenWhereCard(false));
            dispatch(setOpenWhenCard(false));
          }}
          label="Who"
          value={getGuestInput()}
        />
      </div>

      <SearchFooter
        onClear={handleClearAll}
        onSearch={handleSearchClick}
        isHidden={openWhenCard}
      />
    </div>,
    document.body
  );
};

export default MobileFormModal;
