import React, { useEffect, useRef, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Modal from "../../Modals/Modal";

import cross from "../../data/Icons svg/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setAdultCount,
  setChildCount,
  setCurrentMonth,
  setDestinationInputVal,
  setDisplayGuestInput,
  setDisplaySearch,
  setDisplaySearchWeek,
  setEndDateToShow,
  setHoverInput,
  setInfantCount,
  setMinimizeFormBtn,
  setOpenName,
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
import {
  setCity,
  setInputSearchIds,
  setMinimize,
  setSelectedCountry,
  setSelectedIcon,
} from "../../Main/AppSlice";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

const MainFormContent = () => {
  const [guestPlural, setGuestPlural] = useState("");
  const [petPlural, setPetPlural] = useState("");
  const [extraGuest, setExtraGuest] = useState("");

  const data = useSelector((store) => store.form.curSelectInput);
  const destinationInputVal = useSelector(
    (store) => store.form.destinationInputVal
  );
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

  const minimize = useSelector((store) => store.app.minimize);
  const startScroll = useSelector((store) => store.app.startScroll);
  const region = useSelector((store) => store.form.region);
  const adultCount = useSelector((store) => store.form.adultCount);
  const textForInputDuration = useSelector(
    (store) => store.form.textForInputDuration
  );
  const childCount = useSelector((store) => store.form.childCount);
  const infantCount = useSelector((store) => store.form.infantCount);
  const petCount = useSelector((store) => store.form.petsCount);

  const dateOption = useSelector((state) => state.form.dateOption);

  useEffect(() => {
    if (childCount + adultCount === 1 && petCount + infantCount === 0) {
      setGuestPlural("");
    } else if (childCount + adultCount > 1 && petCount + infantCount === 0) {
      setGuestPlural("s");
    } else if (childCount + adultCount > 1 && petCount + infantCount > 0) {
      setGuestPlural("s,");
    } else if (childCount + adultCount === 1 && petCount + infantCount > 0) {
      setGuestPlural(",");
    }
    if (petCount > 1) {
      setPetPlural("s");
    } else if (petCount <= 1) {
      setPetPlural("");
    }

    if (infantCount > 0) {
      setExtraGuest(`${infantCount} infant`);
    }

    if (petCount > 0 && infantCount === 0) {
      setExtraGuest(`${petCount} pet${petPlural}`);
    }
  }, [adultCount, childCount, infantCount, petCount, petPlural]);

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

  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
      inputRef.current.focus();
    }

    if (data !== "destination") {
      inputRef.current.blur();
    }
  }, [region, data]);

  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);

  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMM")
    : "";
  const formattedEndDate = endDate ? format(new Date(endDate), "dd MMM") : "";

  useEffect(() => {
    dispatch(setStartDateToShow(formattedStartDate));
    dispatch(setEndDateToShow(formattedEndDate));
  }, [formattedStartDate, dispatch, formattedEndDate, startDate, endDate]);

  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);

  // to minimize the form input fields, on clicking outside of the form
  useEffect(
    function () {
      function handleClick(e) {
        // if user click outside the form and open modal, minimize the active input field

        if (isModalOpen) {
          return;
        } else if (
          !modalRef.current?.contains(e.target) &&
          !buttonRef.current?.contains(e.target) &&
          !checkInRef.current?.contains(e.target) &&
          !checkOutRef.current?.contains(e.target) &&
          !addGuestRef.current?.contains(e.target) &&
          !monthRef.current?.contains(e.target) &&
          !flexibleRef.current?.contains(e.target)
        ) {
          dispatch(setActiveInput(""));
          dispatch(setOpenName(""));
          dispatch(setHoverInput(null));
        }

        // if user has selected the interval (both start and end date, do not reset the current month)

        if (startDate && endDate) {
          return;
        } else if (
          checkInRef?.current &&
          !checkInRef.current?.contains(e.target) &&
          checkOutRef?.current &&
          !checkOutRef.current?.contains(e.target) &&
          addGuestRef?.current &&
          modalRef?.current &&
          !modalRef.current?.contains(e.target)
        ) {
          dispatch(setCurrentMonth(new Date()));
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [dispatch, startDate, isModalOpen, endDate]
  );

  function handleCrossClick(e, inputField) {
    e.stopPropagation();

    // dispatch(setActiveInput(""));
    if (inputField === "destination") {
      dispatch(setRegion("all"));
      dispatch(setDestinationInputVal(null));
    }
    if (inputField === "checkIn" || inputField === "checkOut") {
      dispatch(setSelectedStartDate(null));
      dispatch(setSelectedEndDate(null));
    }

    if (inputField === "guest") {
      dispatch(setAdultCount(0));
      dispatch(setChildCount(0));
      dispatch(setInfantCount(0));
      dispatch(setPetsCount(0));
    }
  }

  useEffect(() => {
    if (!data) {
      dispatch(setOpenName(""));
    }
  }, [data, dispatch]);

  function handleInputField(target, input) {
    dispatch(setMinimizeFormBtn(""));
    if (data === input) {
      dispatch(setActiveInput(""));
      // dispatch(setOpenName(""));
    } else {
      dispatch(setActiveInput(input));
    }
  }

  function handleDestinationField(input) {
    if (input === "destination") {
      dispatch(setActiveInput("destination"));
    }
  }

  useEffect(() => {
    let textForGuestInput = `${
      adultCount + childCount > 0 && data
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
    extraGuest,
    guestPlural,
  ]);

  function handleSearch() {
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

  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ["allRows"] });
  const [cachedData, setCachedData] = useState(null);
  const [combinedString, setCombinedString] = useState([]);

  useEffect(() => {
    const data = queryClient.getQueryData(["allRows"]);
    setCachedData(data); // Should log data if it has been cached
  }, [queryClient, isFetching]);

  useEffect(() => {
    let resultArray = [];

    // Loop over each item in the input array
    cachedData?.forEach((item) => {
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
    setCombinedString(resultArray);
    // Return the result array
  }, [cachedData]);

  function findMatchingKeys(inputString, arr) {
    // Helper function to remove spaces, punctuation, and convert to lowercase
    const sanitizeString = (str) => str.replace(/[^a-zA-Z]/g, "").toLowerCase();

    // Sanitize the input string
    const sanitizedInput = sanitizeString(inputString);

    // Function to calculate character frequency in a string
    const charFrequency = (str) => {
      return [...str].reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {});
    };

    // Calculate character frequency of sanitized input
    const inputFrequency = charFrequency(sanitizedInput);

    // Function to check if two objects have at least 90% matching character frequencies
    const isNinetyPercentMatch = (inputFreq, targetFreq) => {
      let matchCount = 0;
      let totalChars = 0;

      for (let char in inputFreq) {
        if (targetFreq[char]) {
          matchCount += Math.min(inputFreq[char], targetFreq[char]);
        }
        totalChars += inputFreq[char];
      }

      return matchCount / totalChars >= 0.9;
    };

    const result = [];

    // Loop over the array
    arr.forEach((item) => {
      for (let key in item) {
        // Sanitize the value and calculate its frequency
        const sanitizedValue = sanitizeString(item[key]);
        const valueFrequency = charFrequency(sanitizedValue);

        // Check if the value is a 90% match
        if (isNinetyPercentMatch(inputFrequency, valueFrequency)) {
          result.push(key);
        }
      }
    });

    return result;
  }

  function handleSearchInput() {
    let result;
    if (region !== "all") {
      result = findMatchingKeys(region, combinedString);
    } else {
      result = findMatchingKeys(destinationInputVal, combinedString);
    }

    dispatch(setInputSearchIds(result));
    dispatch(setSelectedCountry(""));
    dispatch(setCity(""));
    dispatch(setSelectedIcon(""));
  }

  return (
    <div
      className={`flex z-20  justify-center ${
        !minimize && !startScroll
          ? "scale-[0.6] opacity-50"
          : "scale-100 opacity-1"
      }  items-center transition-all duration-[0.4s]`}
    >
      <div>
        <Modal>
          <Modal.Open opens="destination">
            <div
              ref={buttonRef}
              onMouseEnter={() => {
                if (data !== "destination")
                  dispatch(setHoverInput("destination"));
              }}
              onMouseLeave={() => {
                if (data !== "destination") dispatch(setHoverInput(null));
              }}
              className={`flex ${
                data === "destination"
                  ? "shadow-destinationShadow rounded-full"
                  : ""
              } justify-center  items-center`}
            >
              <label
                onClick={() => handleDestinationField("destination")}
                htmlFor="destination"
                className={`w-[17.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-0 before:rounded-full

                
                ${data === "destination" ? "rounded-full bg-white" : ""} 

                 ${
                   data === "destination"
                     ? ""
                     : "before:hover:bg-grey-light-50 "
                 }
                
                before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium">Where</div>
                    <input
                      ref={inputRef}
                      onChange={(e) => {
                        dispatch(setRegion("all"));
                        dispatch(setDestinationInputVal(e.target.value));
                      }}
                      type="text"
                      className={`w-[10.62rem] 4 text-sm font-medium"
                      outline-none focus:outline-none h[2rem] placeholder:text-sm ${
                        data && data !== "destination" ? "bg-shadow-gray" : ""
                      } placeholder:font-extralight placeholder:text-black`}
                      id="destination"
                      placeholder="Search Destinations"
                      value={
                        data
                          ? destinationInputVal
                            ? destinationInputVal
                            : region !== "all"
                            ? region
                            : ""
                          : ""
                      }
                    />
                  </div>
                  {(region !== "all" || destinationInputVal) &&
                  data === "destination" ? (
                    <div
                      onClick={(e) => handleCrossClick(e, "destination")}
                      className="w-[1.5rem] mr-[-1rem] self-center justify- flex justify-center  items-center z-50 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                    >
                      <img className="h-4 w-4" src={cross} alt="" />
                    </div>
                  ) : null}
                </div>
              </label>
            </div>
          </Modal.Open>
          <Modal.Window modalRef={modalRef} name="destination">
            <Destination></Destination>
          </Modal.Window>
        </Modal>
      </div>

      <div
        className={`w-[0.05rem] ${
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

      <div className="flex justify-center items-center">
        {(dateOption === "dates" || dateOption === "") && (
          <Modal>
            <Modal.Open opens="checkIn">
              <div
                ref={checkInRef}
                onMouseEnter={() => dispatch(setHoverInput("checkIn"))}
                onMouseLeave={() => dispatch(setHoverInput(null))}
                className={`flex ${
                  data === "checkIn" ? "shadow-checkInShadow rounded-full" : ""
                } justify-center  items-center`}
              >
                <div
                  onClick={(e) => handleInputField(e.target, "checkIn")}
                  className={`w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[17.67rem] before:rounded-full 

                   ${
                     data === "checkIn"
                       ? "rounded-full bg-white"
                       : "before:hover:bg-grey-light-50 "
                   }
                  
                  before:hover:opacity-40 
                flex-col flex justify-center items-center 
               h-[3.85rem] cursor-pointer`}
                >
                  <div
                    className={`w-[5.62rem] outline-none flex justify-between items-center focus:outline-none h[2rem] placeholder:text-sm ${
                      data && data !== "checkIn" ? "bg-shadow-gray" : ""
                    } placeholder:font-extralight placeholder:text-black`}
                  >
                    <div
                      className={` flex flex-col justify-center items-start ${
                        startDateToShow && data === "checkIn"
                          ? "ml-[-0.5rem]"
                          : ""
                      }`}
                    >
                      <p className="text-xs  font-medium">Check in</p>
                      <p
                        className={`${
                          startDateToShow === "" || !data
                            ? "font-extralight text-[0.9rem]"
                            : "text-sm font-medium"
                        }`}
                      >
                        {startDateToShow && data
                          ? startDateToShow
                          : "Add dates"}
                      </p>
                    </div>
                    {startDateToShow !== "" && data === "checkIn" && (
                      <div
                        ref={checkInResetRef}
                        onClick={(e) => handleCrossClick(e, "checkIn")}
                        className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                      >
                        <img className="h-4 w-4" src={cross} alt="" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Open>
            <Modal.Window
              resetRef={checkInResetRef}
              modalRef={modalRef}
              name="checkIn"
            >
              <div className="flex  flex-col justify-center items-center ">
                <CheckInOption></CheckInOption>
                <Calendar></Calendar>
              </div>
            </Modal.Window>
          </Modal>
        )}
        {dateOption === "month" && (
          <Month
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
            flexibleRef={flexibleRef}
            handleInputField={handleInputField}
            modalRef={modalRef}
          ></Flexible>
        )}
        {(dateOption === "dates" || dateOption === "") && (
          <Modal>
            <Modal.Open opens="checkOut">
              <div
                ref={checkOutRef}
                onMouseEnter={() => dispatch(setHoverInput("checkOut"))}
                onMouseLeave={() => dispatch(setHoverInput(null))}
                className={`flex ${
                  data === "checkOut"
                    ? "shadow-checkOutShadow rounded-full"
                    : ""
                } justify-center  items-center`}
              >
                <div
                  onClick={(e) => {
                    handleInputField(e.target, "checkOut");
                  }}
                  className={`w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[26.34rem] before:rounded-full 
                   ${
                     data === "checkOut" ? "" : "before:hover:bg-grey-light-50 "
                   }
                  before:hover:opacity-40 
               ${data === "checkOut" ? "rounded-full bg-white" : ""}
               h-[3.85rem] flex-col flex justify-center items-center  cursor-pointer`}
                >
                  <div
                    className={`w-[5.62rem] items-center   flex justify-between outline-none focus:outline-none h[2rem] placeholder:text-sm ${
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
      </div>

      <div
        className={`w-[0.05rem] ${
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

      <Modal>
        <div
          ref={addGuestRef}
          onMouseEnter={() => {
            if (data !== "addGuest") dispatch(setHoverInput("addGuest"));
          }}
          onMouseLeave={() => {
            if (data !== "addGuest") dispatch(setHoverInput(null));
          }}
          className={`flex w-[17.7rem] ${
            data === "addGuest"
              ? "rounded-full bg-white shadow-AddGuestShadow "
              : ""
          } justify-center items-center`}
        >
          <Modal.Open opens="addGuest">
            <div className="flex justify-center  items-center">
              <div
                htmlFor="addGuest"
                onClick={(e) => handleInputField(e.target, "addGuest")}
                className={`${
                  data
                    ? "w-[12.2rem] flex items-center before:z-10 "
                    : "w-[14.2rem]"
                } hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
                  ${data === "addGuest" ? "" : "before:hover:bg-grey-light-50 "}
              justify-between
               before:left-[35.20rem] before:rounded-full before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[1.5rem] cursor-pointer`}
              >
                <div className="flex flex-col justify-center items-start">
                  <div className="text-xs font-medium">Who</div>
                  <div
                    className={`w-[6.62rem] flex justify-between items-center outline-none focus:outline-none h[2rem] 
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
                handleSearch();
                handleSearchInput();
                dispatch(setMinimize(false));
              }}
              className={`hover:bg-dark-pink  ${
                data ? "w-[8rem] z-50" : "w-[3rem] z-50 "
              } hover:cursor-pointer flex items-center justify-${
                data ? "start" : "center"
              } duration-200 ease-out ${
                data ? "bg-dark-pink ml-[-1.6rem] mr-2" : "bg-pink ml-[-0.5rem]"
              } rounded-full h-[3rem]`}
            >
              <img
                className={` ${data ? "pl-2 pr-1" : ""} `}
                src={searchIcon}
                alt=""
              />
              {data ? <p className=" text-center   text-white ">Search</p> : ""}
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
