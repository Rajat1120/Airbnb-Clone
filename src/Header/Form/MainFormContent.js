import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format, addDays, subDays } from "date-fns";

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

import Month from "./Month";
import Flexible from "./Flexible";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { useMinimizeFormOnOutsideClick } from "./MinimizeFormHook";
import DestinationForm from "./DestinationForm";

import CheckInDateForm from "./CheckInDateForm";
import CheckOutDateForm from "./CheckOutDateForm";
import AddGuestForm from "./AddGuestForm";

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
    curSelectInput,

    petPlural,

    startDateToShow,
    hoverInput,
    EndDateToShow,
    selectedStartDate,
    selectedEndDate,

    region,
    adultCount,

    childCount,
    infantCount,
    petsCount: petCount,
    dateOption,
    isCalendarModalOpen,
  } = useSelector((store) => store.form);

  const { minimize, startScroll } = useSelector((store) => store.app);

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
  useAutoFocus(inputRef, region, curSelectInput);

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
  useGuestInputText(curSelectInput);

  useEffect(() => {
    if (!curSelectInput) {
      dispatch(setOpenName(""));
    }
  }, [curSelectInput, dispatch]);

  function handleInputField(target, input) {
    dispatch(setMinimizeFormBtn(""));
    if (curSelectInput === input) {
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
            curSelectInput
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
          curSelectInput === "destination" ||
          curSelectInput === "checkIn" ||
          curSelectInput === "month" ||
          curSelectInput === "flexible"
            ? "hidden"
            : ""
        }
        `}
        ></div>
        {(dateOption === "dates" || dateOption === "") && (
          <CheckInDateForm
            onlyOneTime={onlyOneTime}
            checkInRef={checkInRef}
            checkInResetRef={checkInResetRef}
            modalRef={modalRef}
            curSelectInput={curSelectInput}
            startDateToShow={startDateToShow}
            handleInputField={handleInputField}
          ></CheckInDateForm>
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
              curSelectInput
                ? hoverInput === "checkOut" || hoverInput === "checkIn"
                  ? "bg-shadow-gray"
                  : " bg-gray-300"
                : hoverInput === "checkOut" || hoverInput === "checkIn"
                ? "bg-white"
                : " bg-gray-300"
            }
          
          h-[2rem]
          ${
            curSelectInput === "checkOut" || curSelectInput === "checkIn"
              ? "hidden"
              : ""
          }
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
          <CheckOutDateForm
            onlyOneTime={onlyOneTime}
            checkOutResetRef={checkOutResetRef}
            checkOutRef={checkOutRef}
            modalRef={modalRef}
            curSelectInput={curSelectInput}
            EndDateToShow={EndDateToShow}
            handleInputField={handleInputField}
          ></CheckOutDateForm>
        )}
        <div
          className={`min-w-[0.05rem] ${
            curSelectInput
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
          curSelectInput === "checkOut" ||
          curSelectInput === "addGuest" ||
          curSelectInput === "month" ||
          curSelectInput === "flexible"
            ? "hidden"
            : ""
        }
        
        `}
        ></div>
      </div>

      <AddGuestForm
        onlyOneTime={onlyOneTime}
        handleInputField={handleInputField}
        addGuestRef={addGuestRef}
        addGuestResetRef={addGuestResetRef}
        modalRef={modalRef}
      ></AddGuestForm>
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
