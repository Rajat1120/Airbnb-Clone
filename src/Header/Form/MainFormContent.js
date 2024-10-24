import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format, addDays, subDays } from "date-fns";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Modal from "../../Modals/Modal";

import cross from "../../data/Icons svg/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setAdultCount,
  setChildCount,
  setCombinedString,
  setDestinationInputVal,
  setDisplayGuestInput,
  setDisplaySearch,
  setDisplaySearchWeek,
  setEndDateToShow,
  setExtraGuest,
  setGuestPlural,
  setHoverInput,
  setInfantCount,
  setMinimizeFormBtn,
  setOpenName,
  setPetPlural,
  setPetsCount,
  setRegion,
  setSelectedEndDate,
  setSelectedStartDate,
  setStartDateToShow,
  setTextForGuestInput,
} from "./mainFormSlice";
import Calendar from "../../Header/Form/FormFields/Calendar";
import CheckInOption from "./DatesOption";

import AddGuest from "./FormFields/AddGuest";
import Destination from "./FormFields/Destination";

import Month from "./Month";
import Flexible from "./Flexible";
import { setHitSearch, setMinimize } from "../../Main/AppSlice";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { handleSearchInput } from "./HandleSearch";
import { useMinimizeFormOnOutsideClick } from "./MinimizeFormHook";
import DestinationForm from "./DestinationForm";
import DatesForm from "./DatesForm";

const useGuestCount = ({
  adultCount,
  childCount,
  petCount,
  infantCount,
  petPlural,
  dispatch,
  setGuestPlural,
  setPetPlural,
  setExtraGuest,
}) => {
  useEffect(() => {
    // Calculate total primary guests (adults + children)
    const primaryGuestCount = childCount + adultCount;
    // Calculate total secondary guests (pets + infants)
    const secondaryGuestCount = petCount + infantCount;

    // Handle guest plural suffix
    if (primaryGuestCount === 1 && secondaryGuestCount === 0) {
      dispatch(setGuestPlural(""));
    } else if (primaryGuestCount > 1 && secondaryGuestCount === 0) {
      dispatch(setGuestPlural("s"));
    } else if (primaryGuestCount > 1 && secondaryGuestCount > 0) {
      dispatch(setGuestPlural("s,"));
    } else if (primaryGuestCount === 1 && secondaryGuestCount > 0) {
      dispatch(setGuestPlural(","));
    }

    // Handle pet plural suffix
    dispatch(setPetPlural(petCount > 1 ? "s" : ""));

    // Handle extra guest text
    if (infantCount > 0) {
      dispatch(setExtraGuest(`${infantCount} infant`));
    } else if (petCount > 0) {
      dispatch(setExtraGuest(`${petCount} pet${petPlural}`));
    }
  }, [
    adultCount,
    childCount,
    petCount,
    infantCount,
    petPlural,
    dispatch,
    setGuestPlural,
    setPetPlural,
    setExtraGuest,
  ]);
};

// Custom hook to handle focus, cursor position, and blur logic on an input element
const useAutoFocus = (inputRef, region, selectedInput) => {
  useEffect(() => {
    // Ensure the inputRef is attached to a valid element
    if (inputRef.current) {
      // Get the current length of the input's value
      const length = inputRef.current.value.length;

      // Set the cursor position to the end of the input's value
      inputRef.current.setSelectionRange(length, length);

      // Focus the input element
      inputRef.current.focus();
    }

    // If the data is not "destination", blur the input element
    if (selectedInput !== "destination") {
      inputRef.current.blur();
    }
  }, [region, inputRef, selectedInput]);
};

// Custom hook to handle the cross button click actions for different input fields (e.g., destination, checkIn, guest).
export const useHandleCrossClick = () => {
  const dispatch = useDispatch();

  const handleCrossClick = useCallback(
    (e, inputField) => {
      e.stopPropagation();

      switch (inputField) {
        case "destination":
          // Reset destination related state
          dispatch(setRegion("all"));
          dispatch(setDestinationInputVal(null));
          break;

        case "checkIn":
        case "checkOut":
          // Reset date selection and activate checkIn field
          dispatch(setSelectedStartDate(null));
          dispatch(setSelectedEndDate(null));
          dispatch(setActiveInput("checkIn"));
          dispatch(setOpenName("checkIn"));
          break;

        case "guest":
          // Reset guest-related state
          dispatch(setAdultCount(0));
          dispatch(setChildCount(0));
          dispatch(setInfantCount(0));
          dispatch(setPetsCount(0));
          break;

        default:
          break;
      }
    },
    [dispatch]
  );

  return handleCrossClick;
};

const useFormattedDates = () => {
  const dispatch = useDispatch();
  const { selectedStartDate, selectedEndDate } = useSelector(
    (store) => store.form
  );

  // Format the dates using useMemo to avoid re-computation on every render
  const formattedStartDate = useMemo(
    () =>
      selectedStartDate ? format(new Date(selectedStartDate), "dd MMM") : "",
    [selectedStartDate]
  );

  const formattedEndDate = useMemo(
    () => (selectedEndDate ? format(new Date(selectedEndDate), "dd MMM") : ""),
    [selectedEndDate]
  );

  // Dispatch the formatted dates to the Redux store whenever they change
  useEffect(() => {
    dispatch(setStartDateToShow(formattedStartDate));
    dispatch(setEndDateToShow(formattedEndDate));
  }, [dispatch, formattedStartDate, formattedEndDate]);
};

const useProcessCombinedString = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ["allRows"] });

  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const data = queryClient.getQueryData(["allRows"]);
    setCachedData(data);
  }, [queryClient, isFetching]);

  useEffect(() => {
    let resultArray = [];

    // Check if cachedData exists before processing
    if (cachedData) {
      // Loop over each item in the input array
      cachedData.forEach((item) => {
        // Combine city, country, and house-title into a single string
        let combinedString = `${item.city}${item.country}${item["house-title"]}`;

        // Remove all spaces and non-alphanumeric characters from the combined string
        combinedString = combinedString.replace(/[^a-zA-Z0-9]/g, "");

        // Create a new object with id as the key and combinedString as the value
        const newObj = {
          [item.id]: combinedString,
        };

        // Push the new object to the resultArray
        resultArray.push(newObj);
      });

      // Dispatch the combined result array to Redux state
      dispatch(setCombinedString(resultArray));
    }
  }, [cachedData, dispatch]);
};

const useGuestInputText = (curSelectInput) => {
  const dispatch = useDispatch();
  const {
    adultCount,
    childCount,
    petCount,
    infantCount,
    petPlural,
    extraGuest,
    guestPlural,
  } = useSelector((store) => store.form);
  useEffect(() => {
    // Create the guest input text based on the adult and child counts
    let textForGuestInput = `${
      adultCount + childCount > 0 && curSelectInput
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
    curSelectInput,
    infantCount,
    petCount,
    petPlural,
    extraGuest,
    guestPlural,
  ]);
};

const MainFormContent = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const checkInResetRef = useRef();
  const checkOutResetRef = useRef();
  const addGuestResetRef = useRef();
  const buttonRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const addGuestRef = useRef();
  const flexibleRef = useRef();
  const monthRef = useRef();
  const inputRef = useRef(null);
  let onlyOneTime = useRef(true);

  const {
    curSelectInput: data,
    guestPlural,
    petPlural,
    extraGuest,
    destinationInputVal,
    startDateToShow,
    hoverInput,
    EndDateToShow,
    selectedStartDate,
    selectedEndDate,
    textForGuestInput,
    textForFlexibleInput,
    region,
    adultCount,
    textForInputDuration,
    childCount,
    infantCount,
    petsCount: petCount,
    dateOption,
    isCalendarModalOpen,
    combinedString,
  } = useSelector((store) => store.form);

  const { hitSearch, minimize, startScroll } = useSelector(
    (store) => store.app
  );

  useGuestCount({
    adultCount,
    childCount,
    petCount,
    infantCount,
    petPlural,
    dispatch,
    setGuestPlural,
    setPetPlural,
    setExtraGuest,
  });

  // custom hook for autofocus and blur behavior
  useAutoFocus(inputRef, region, data);

  // custom hook for formatting dates
  useFormattedDates();

  //custom hook to minimize the form input fields, on clicking outside of the form
  useMinimizeFormOnOutsideClick(
    {
      modalRef,
      buttonRef,
      checkInRef,
      checkOutRef,
      addGuestRef,
      monthRef,
      flexibleRef,
    },
    isCalendarModalOpen,
    selectedStartDate,
    selectedEndDate
  );

  // custom hook

  useProcessCombinedString();

  // custom hook for guest text input
  useGuestInputText(data);

  const handleCrossClick = useHandleCrossClick();

  useEffect(() => {
    if (!data) {
      dispatch(setOpenName(""));
    }
  }, [data, dispatch]);

  function handleInputField(target, input) {
    dispatch(setMinimizeFormBtn(""));
    if (data === input) {
      dispatch(setActiveInput(""));
    } else {
      dispatch(setActiveInput(input));
    }
  }

  return (
    <div
      className={`1smd:flex w-full 1xz:grid 1xz:grid-cols-3  z-20   justify-center ${
        !minimize && !startScroll
          ? "scale-[0.6] opacity-50"
          : "scale-100 opacity-1"
      }  items-center transition-all duration-[0.4s]`}
    >
      <DestinationForm
        onlyOneTime={onlyOneTime}
        buttonRef={buttonRef}
        inputRef={inputRef}
        modalRef={modalRef}
      ></DestinationForm>

      <div className="flex 1smd:justify-center 1xz:justify-between items-center">
        <div
          className={`min-w-[0.05rem] ${
            data
              ? hoverInput === "destination" ||
                hoverInput === "checkIn" ||
                hoverInput === "month" ||
                hoverInput === "flexible"
                ? "bg-shadow-gray"
                : "bg-gray-300"
              : hoverInput === "destination" ||
                hoverInput === "checkIn" ||
                hoverInput === "month" ||
                hoverInput === "flexible"
              ? "bg-white"
              : "bg-gray-300"
          } h-[2rem] 
        ${
          data === "destination" ||
          data === "checkIn" ||
          data === "month" ||
          data === "flexible"
            ? "hidden"
            : ""
        }
        `}
        ></div>
        {(dateOption === "dates" || dateOption === "") && (
          <DatesForm
            onlyOneTime={onlyOneTime}
            checkInRef={checkInRef}
            checkInResetRef={checkInResetRef}
            modalRef={modalRef}
            curSelectInput={data}
            startDateToShow={startDateToShow}
            handleInputField={handleInputField}
          ></DatesForm>
        )}
        {dateOption === "month" && (
          <Month
            onlyOneTime={onlyOneTime}
            monthRef={monthRef}
            modalRef={modalRef}
            handleInputField={handleInputField}
          ></Month>
        )}
        {(dateOption === "dates" || dateOption === "") && (
          <div
            className={`w-[0.05rem] ${
              data
                ? hoverInput === "checkOut" || hoverInput === "checkIn"
                  ? "bg-shadow-gray"
                  : " bg-gray-300"
                : hoverInput === "checkOut" || hoverInput === "checkIn"
                ? "bg-white"
                : " bg-gray-300"
            }
          
          h-[2rem]
          ${data === "checkOut" || data === "checkIn" ? "hidden" : ""}
          `}
          ></div>
        )}
        {dateOption === "flexible" && (
          <Flexible
            onlyOneTime={onlyOneTime}
            flexibleRef={flexibleRef}
            handleInputField={handleInputField}
            modalRef={modalRef}
          ></Flexible>
        )}
        {(dateOption === "dates" || dateOption === "") && (
          <Modal onlyOneTime={onlyOneTime}>
            <Modal.Open opens="checkOut">
              <div
                ref={checkOutRef}
                onMouseEnter={() => dispatch(setHoverInput("checkOut"))}
                onMouseLeave={() => dispatch(setHoverInput(null))}
                className={`flex 1xz:w-full 1xz:relative 1smd:static ${
                  data === "checkOut"
                    ? "shadow-checkOutShadow rounded-full"
                    : ""
                } justify-center  items-center`}
              >
                <div
                  onClick={(e) => {
                    handleInputField(e.target, "checkOut");
                  }}
                  className={`1smd:w-[8.67rem] hover:before:content-[''] 1smd:before:w-[8.67rem] 1xz:before:w-full before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[26.34rem] before:rounded-full 
                   ${
                     data === "checkOut" ? "" : "before:hover:bg-grey-light-50 "
                   }
                  before:hover:opacity-40 
               ${data === "checkOut" ? "rounded-full w-full bg-white" : ""}
               h-[3.85rem] flex-col flex justify-center items-center  cursor-pointer`}
                >
                  <div
                    className={`1smd:w-[5.62rem] items-center 1smd:pl-0 1smd:pr-0 1xz:pl-6 1xz:pr-3  1xz:w-full flex justify-between outline-none focus:outline-none h[2rem] placeholder:text-sm ${
                      data && data !== "checkOut" ? "bg-shadow-gray" : ""
                    } placeholder:font-extralight placeholder:text-black`}
                  >
                    <div
                      className={` flex flex-col justify-center items-start ${
                        EndDateToShow && data === "checkOut"
                          ? "ml-[-0.5rem]"
                          : ""
                      }`}
                    >
                      <p className="text-xs  font-medium">Check out</p>
                      <p
                        className={`${
                          EndDateToShow === "" || !data
                            ? "font-extralight text-[0.9rem]"
                            : "text-sm font-medium"
                        }`}
                      >
                        {EndDateToShow && data ? EndDateToShow : "Add dates"}
                      </p>
                    </div>
                    {EndDateToShow !== "" && data === "checkOut" && (
                      <div
                        ref={checkOutResetRef}
                        onClick={(e) => handleCrossClick(e, "checkOut")}
                        className="w-[1.5rem] flex justify-center items-center z-50 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                      >
                        <img className="h-4 w-4" src={cross} alt="" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Open>
            <Modal.Window
              resetRef={checkOutResetRef}
              modalRef={modalRef}
              name="checkOut"
            >
              <div className="flex flex-col justify-center items-center ">
                <CheckInOption></CheckInOption>
                <Calendar></Calendar>
              </div>
            </Modal.Window>
          </Modal>
        )}
        <div
          className={`min-w-[0.05rem] ${
            data
              ? hoverInput === "checkOut" ||
                hoverInput === "addGuest" ||
                hoverInput === "month" ||
                hoverInput === "flexible"
                ? "bg-shadow-gray"
                : "bg-grey-light-50 "
              : hoverInput === "checkOut" ||
                hoverInput === "addGuest" ||
                hoverInput === "month" ||
                hoverInput === "flexible"
              ? "bg-white"
              : "bg-grey-light-50 "
          } h-[2rem]
        ${
          data === "checkOut" ||
          data === "addGuest" ||
          data === "month" ||
          data === "flexible"
            ? "hidden"
            : ""
        }
        
        `}
        ></div>
      </div>

      <Modal onlyOneTime={onlyOneTime}>
        <div
          id="addGuest-form"
          ref={addGuestRef}
          onMouseEnter={() => {
            if (data !== "addGuest") dispatch(setHoverInput("addGuest"));
          }}
          onMouseLeave={() => {
            if (data !== "addGuest") dispatch(setHoverInput(null));
          }}
          className={`flex 1xz:relative 1smd:static 1smd:w-[17.7rem]  ${
            data === "addGuest"
              ? "rounded-full bg-white shadow-AddGuestShadow "
              : ""
          } 1xz:justify-between 1smd:justify-center items-center`}
        >
          <Modal.Open opens="addGuest">
            <div className="flex justify-center  items-center">
              <div
                htmlFor="addGuest"
                onClick={(e) => handleInputField(e.target, "addGuest")}
                className={`${
                  data
                    ? "1smd:w-[12.2rem] flex items-center before:z-10 "
                    : "1smd:w-[14.2rem]"
                } hover:before:content-['']  1xz:before:w-full 1smd:before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
                  ${data === "addGuest" ? "" : "before:hover:bg-grey-light-50 "}
              justify-between
               1smd:before:left-[35.20rem] before:rounded-full before:hover:opacity-40    py-[0.8rem]  h-[3.85rem] 1smd:px-[1.5rem] cursor-pointer`}
              >
                <div className="flex flex-col 1xz:pl-6 1smd:pl-0 justify-center items-start">
                  <div className="text-xs font-medium">Who</div>
                  <div
                    className={`1smd:w-[6.62rem] flex justify-between items-center outline-none focus:outline-none  
                    ${data && data !== "addGuest" ? "bg-shadow-gray" : ""}
                    `}
                  >
                    <p
                      className={`text-sm mt-[2px] truncate ${
                        adultCount + childCount > 0 && data
                          ? "font-medium"
                          : "font-extralight"
                      } font-extralight text-black `}
                    >
                      {adultCount + childCount > 0 && data
                        ? `${adultCount + childCount} guest${guestPlural} ${
                            petCount + infantCount > 0 ? extraGuest : ""
                          }`
                        : "Add guest"}
                    </p>
                  </div>
                </div>
                {(adultCount || childCount || infantCount || petCount) &&
                data === "addGuest" ? (
                  <div
                    ref={addGuestResetRef}
                    onClick={(e) => handleCrossClick(e, "guest")}
                    className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                  >
                    <img className="h-4 w-4" src={cross} alt="" />
                  </div>
                ) : null}
                <div />
              </div>
            </div>
          </Modal.Open>
          {
            <div
              onClick={() => {
                data && dispatch(setActiveInput(""));
                dispatch(setHitSearch(hitSearch + 1));
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
                handleSearchInput(
                  region,
                  destinationInputVal,
                  combinedString,
                  dispatch
                );
                dispatch(setMinimize(false));
              }}
              className={`hover:bg-dark-pink 1xz:mr-2  ${
                data
                  ? "1smd:w-[8rem] 1xz:w-[3rem]  z-50"
                  : "w-[3rem] 1smd:mr-0 z-50 "
              } hover:cursor-pointer flex items-center ${
                data
                  ? "1xz:justify-center 1smd:justify-start"
                  : "justify-center"
              } duration-200 ease-out ${
                data ? "bg-dark-pink ml-[-1.6rem] mr-2" : "bg-pink ml-[-0.5rem]"
              } rounded-full h-[3rem]`}
            >
              <img
                className={` ${data ? "1smd:pl-2 1smd:pr-1" : ""} `}
                src={searchIcon}
                alt=""
              />
              {data ? (
                <p className=" text-center 1xz:hidden 1smd:block text-white ">
                  Search
                </p>
              ) : (
                ""
              )}
            </div>
          }
        </div>
        <Modal.Window
          resetRef={addGuestResetRef}
          modalRef={modalRef}
          name="addGuest"
        >
          <AddGuest></AddGuest>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default MainFormContent;

export function handleSearch({
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
}) {
  if (region !== "all") {
    dispatch(setDisplaySearch(region));
  } else {
    dispatch(setDisplaySearch(destinationInputVal));
  }

  if (dateOption === "dates") {
    if (startDateToShow && !EndDateToShow) {
      let endDate = addDays(selectedStartDate, 1);
      dispatch(setSelectedEndDate(endDate));

      let inputText = `${startDateToShow} - ${format(endDate, "dd MMM")}`;
      dispatch(setDisplaySearchWeek(inputText));
    } else if (!startDateToShow && EndDateToShow) {
      let startDate = subDays(selectedEndDate, 1);
      dispatch(setSelectedStartDate(startDate));

      let inputText = `${format(startDate, "dd MMM")} - ${EndDateToShow}`;
      dispatch(setDisplaySearchWeek(inputText));
    } else if (startDateToShow && EndDateToShow) {
      let inputText = `${startDateToShow} - ${EndDateToShow}`;
      dispatch(setDisplaySearchWeek(inputText));
    } else {
      dispatch(setDisplaySearchWeek(""));
    }
  } else if (dateOption === "month") {
    if (textForInputDuration) {
      dispatch(setDisplaySearchWeek(textForInputDuration));
    } else {
      dispatch(setDisplaySearchWeek(""));
    }
  } else if (dateOption === "flexible") {
    if (textForFlexibleInput) {
      dispatch(setDisplaySearchWeek(textForFlexibleInput));
    } else {
      dispatch(setDisplaySearchWeek(""));
    }
  }

  if (textForGuestInput) {
    dispatch(setDisplayGuestInput(textForGuestInput));
  }
}
