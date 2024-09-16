import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHitSearch, setShowMobileForm } from "../../Main/AppSlice";
import crossIcon from "../../data/Icons svg/cross.svg";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { handleSearchInput } from "./HandleSearch";
import MobileWhereCard from "./MobileWhereCard";
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
} from "./mainFormSlice";
import MobileWhenCard from "./MobileWhenCard";
import MobileWhoCard from "./MobileWhoCard";
import { handleSearch } from "./MainFormContent";

const MobileFormModal = () => {
  const dispatch = useDispatch();
  const showMobileForm = useSelector((state) => state.app.showMobileForm);
  const openWhereCard = useSelector((state) => state.form.openWhereCard);
  const openWhenCard = useSelector((state) => state.form.openWhenCard);
  const openWhoCard = useSelector((state) => state.form.openWhoCard);
  const adultCount = useSelector((state) => state.form.adultCount);
  const childCount = useSelector((state) => state.form.childCount);
  const guestPlural = useSelector((state) => state.form.guestPlural);
  const petCount = useSelector((state) => state.form.petsCount);
  const petPlural = useSelector((state) => state.form.petPlural);
  const infantCount = useSelector((state) => state.form.infantCount);
  const region = useSelector((state) => state.form.region);
  const durationDate = useSelector((state) => state.form.durationDate);
  const combinedString = useSelector((store) => store.form.combinedString);
  const data = useSelector((store) => store.form.curSelectInput);
  const dateOption = useSelector((state) => state.form.dateOption);
  const startDateToShow = useSelector((store) => store.form.startDateToShow);
  const hoverInput = useSelector((store) => store.form.hoverInput);
  const EndDateToShow = useSelector((store) => store.form.EndDateToShow);
  const selectedStartDate = useSelector(
    (store) => store.form.selectedStartDate
  );
  const selectedEndDate = useSelector((store) => store.form.selectedEndDate);

  const textForGuestInput = useSelector(
    (store) => store.form.textForGuestInput
  );
  const textForFlexibleInput = useSelector(
    (store) => store.form.textForFlexibleInput
  );
  const textForInputDuration = useSelector(
    (store) => store.form.textForInputDuration
  );

  const hitSearch = useSelector((state) => state.app.hitSearch);
  const destinationInputVal = useSelector(
    (state) => state.form.destinationInputVal
  );
  const startDate = useSelector((state) => state.form.selectedStartDate);
  const endDate = useSelector((state) => state.form.selectedEndDate);
  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMM")
    : "";
  const formattedEndDate = endDate ? format(new Date(endDate), "dd MMM") : "";

  useEffect(() => {
    dispatch(setStartDateToShow(formattedStartDate));
    dispatch(setEndDateToShow(formattedEndDate));
  }, [formattedStartDate, dispatch, formattedEndDate, startDate, endDate]);

  useEffect(() => {
    let textForGuestInput = `${
      adultCount + childCount > 0
        ? `${adultCount + childCount} guest${
            adultCount + childCount >= 2 ? "s" : ""
          }`
        : "Add guest"
    }`;

    dispatch(setTextForGuestInput(textForGuestInput));
  }, [
    adultCount,
    dispatch,
    childCount,
    data,
    infantCount,
    petCount,
    petPlural,
    guestPlural,
  ]);

  let dateInput =
    startDate || endDate
      ? `${startDate ? format(startDate, "d MMM") : ""} ${
          startDate && endDate ? "-" : ""
        } ${endDate ? format(endDate, "d MMM") : ""}`
      : "Add dates";

  function whenToShowInput(dateOption) {
    switch (dateOption) {
      case "flexible":
        return textForFlexibleInput === " Any week"
          ? "Any week"
          : textForFlexibleInput;

      case "month":
        return durationDate;

      case "dates":
        return startDate || endDate ? dateInput : "Add dates";

      default:
        return "Add dates";
    }
  }

  function SearchSVG() {
    return (
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
  }

  function whereToShowInput() {
    if (destinationInputVal) {
      return destinationInputVal;
    }

    if (region && region !== "all") {
      return region;
    }

    return "I'm flexible";
  }

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  function clearAll() {
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
  }

  useEffect(() => {
    if (showMobileForm) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      // Enable scrolling
      document.body.style.overflow = "";
      document.body.style.height = "";

      dispatch(setOpenWhereCard(true));
      dispatch(setOpenWhenCard(false));
      dispatch(setOpenWhoCard(false));
    }

    return () => {
      // Cleanup: re-enable scrolling
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [showMobileForm, dispatch]);

  if (!showMobileForm) return null;
  return createPortal(
    <div
      className="fixed 
     top-0 left-0 w-full h-full bg-shadow-gray-light z-50"
    >
      <motion.div
        initial={{ y: "-10rem", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: [0.25, 1, 0.7, 0.9],
        }}
        className=" grid grid-cols-3 px-4 py-4"
      >
        <div>
          <div
            onClick={() => dispatch(setShowMobileForm(false))}
            className=" rounded-full cursor-pointer hover:bg-white hover:border-grey-light-50 hover:shadow-md transition-all duration-200 w-9 h-9 border flex-center border-grey-light"
          >
            <img src={crossIcon} className="w-3 h-3" alt="cross" />
          </div>
        </div>
        <div className="flex  gap-x-4">
          <span className="text font-medium decoration-2  underline underline-offset-8">
            Stays
          </span>
          <span className="text-grey font-medium">Experiences</span>
        </div>
        <div></div>
      </motion.div>
      <div className="flex-center flex-col gap-y-4">
        <motion.div
          initial={{ y: "-10rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.25, 1, 0.7, 0.9],
          }}
          className={`  w-[calc(100%-40px)] `}
        >
          {openWhereCard ? (
            <MobileWhereCard />
          ) : (
            <div
              onClick={() => {
                dispatch(setOpenWhereCard(true));
                dispatch(setOpenWhenCard(false));
                dispatch(setOpenWhoCard(false));
              }}
              className=" px-4 w-full py-5 h-full cursor-pointer shadow-md bg-white  flex justify-between rounded-2xl"
            >
              <span className="text-grey text-sm font-medium">Where</span>
              <span className=" text-sm font-medium">{whereToShowInput()}</span>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ y: "-5rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.25, 1, 0.7, 0.9],
            delay: 0.1,
          }}
          className="w-[calc(100%-40px)] h-full"
        >
          {openWhenCard ? (
            <MobileWhenCard />
          ) : (
            <div
              onClick={() => {
                dispatch(setOpenWhenCard(true));
                dispatch(setOpenWhereCard(false));
                dispatch(setOpenWhoCard(false));
              }}
              className=" px-4 py-5 h-full shadow-md cursor-pointer bg-white  flex justify-between rounded-2xl"
            >
              <span className="text-grey text-sm font-medium">When</span>
              <span className=" text-sm font-medium">
                {whenToShowInput(dateOption)}
              </span>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ y: "-4rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.25, 1, 0.7, 0.9],
            delay: 0.2,
          }}
          className="w-[calc(100%-40px)] "
        >
          {openWhoCard ? (
            <MobileWhoCard />
          ) : (
            <div
              onClick={() => {
                dispatch(setOpenWhoCard(true));
                dispatch(setOpenWhereCard(false));
                dispatch(setOpenWhenCard(false));
              }}
              className="px-4 py-5 h-full cursor-pointer shadow-md bg-white  flex justify-between rounded-2xl"
            >
              <span className="text-grey text-sm font-medium">Who</span>
              <span className=" text-sm font-medium">
                <p className={`text-sm mt-[2px] font-medium text-black `}>
                  {adultCount + childCount > 0
                    ? `${adultCount + childCount} guest${guestPlural} ${
                        infantCount
                          ? `${infantCount} infant${
                              infantCount > 1
                                ? "s, "
                                : `${petCount ? ", " : ""}`
                            }`
                          : ""
                      }${petCount ? `${petCount} pet` : ""}${petPlural}`
                    : "Add guest"}
                </p>
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ y: "10rem", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: [0.25, 1, 0.7, 0.9],
        }}
        className={`w-full ${
          openWhenCard ? "hidden" : "block"
        } py-3 absolute bg-[#fffefe]   bottom-0`}
      >
        <div
          className="flex px-5 justify-between
          items-center"
        >
          <button
            onClick={() => clearAll()}
            className="font-medium px-2 py-2 hover:bg-shadow-gray-light rounded-lg underline"
          >
            Clear all
          </button>
          <button
            onClick={() => {
              dispatch(setShowMobileForm(false));
              dispatch(setIsSearch(true));
              dispatch(setHitSearch(hitSearch + 1));
              handleSearchInput(
                region,
                destinationInputVal,
                combinedString,
                dispatch
              );
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
            }}
            className="px-6 py-3 gap-x-2 rounded-lg bg-dark-pink flex text-white"
          >
            <SearchSVG />
            <span>Search</span>
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default MobileFormModal;
