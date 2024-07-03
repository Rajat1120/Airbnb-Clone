import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Modal from "../../Modals/Modal";

import cross from "../../data/Icons svg/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveElement,
  setActiveInput,
  setAdultCount,
  setChildCount,
  setCurrentMonth,
  setInfantCount,
  setOpenName,
  setPetsCount,
  setRegion,
  setSearchEl,
  setSelectedEndDate,
  setSelectedStartDate,
} from "./mainFormSlice";
import Calendar from "../../Header/Form/FormFields/Calendar";
import CheckInOption from "./DatesOption";
import { format } from "date-fns";
import { current } from "@reduxjs/toolkit";
import { da } from "date-fns/locale";
import AddGuest from "./FormFields/AddGuest";
import Destination from "./FormFields/Destination";
import CircularSlider from "./CircularSlider";
import Month from "./Month";
import Flexible from "./Flexible";

const MainFormContent = () => {
  const [hoverInput, setHoverInput] = useState(null);
  const [startDateToShow, setStartDateToShow] = useState(null);
  const [EndDateToShow, setEndDateToShow] = useState(null);
  const [destination, setDestination] = useState(null);
  const [guestPlural, setGuestPlural] = useState("");
  const [petPlural, setPetPlural] = useState("");
  const [extraGuest, setExtraGuest] = useState("");

  const data = useSelector((store) => store.form.curSelectInput);

  const region = useSelector((store) => store.form.region);
  const adultCount = useSelector((store) => store.form.adultCount);
  const childCount = useSelector((store) => store.form.childCount);
  const infantCount = useSelector((store) => store.form.infantCount);
  const petCount = useSelector((store) => store.form.petsCount);

  const dateOption = useSelector((state) => state.form.dateOption);

  useEffect(() => {
    console.log(petPlural);
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
    setStartDateToShow(formattedStartDate);
    setEndDateToShow(formattedEndDate);
  }, [formattedStartDate, formattedEndDate, startDate, endDate]);

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
          setHoverInput(null);
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
      setDestination(null);
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

  return (
    <div className="flex z-20  justify-center  items-center">
      <div>
        <Modal>
          <Modal.Open opens="destination">
            <div
              ref={buttonRef}
              onMouseEnter={() => {
                if (data !== "destination") setHoverInput("destination");
              }}
              onMouseLeave={() => {
                if (data !== "destination") setHoverInput(null);
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

                 ${data === "destination" ? "" : "before:hover:bg-gray-300 "}
                
                before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium">Where</div>
                    <input
                      ref={inputRef}
                      onChange={(e) => {
                        dispatch(setRegion("all"));
                        setDestination(e.target.value);
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
                          ? destination
                            ? destination
                            : region !== "all"
                            ? region
                            : ""
                          : ""
                      }
                    />
                  </div>
                  {(region !== "all" || destination) &&
                  data === "destination" ? (
                    <div
                      onClick={(e) => handleCrossClick(e, "destination")}
                      className="w-[1.5rem] mr-[-1rem] self-center justify- flex justify-center  items-center z-50 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                    >
                      <img src={cross} alt="" />
                    </div>
                  ) : null}
                </div>
              </label>
            </div>
          </Modal.Open>
          <Modal.Window modalRef={modalRef} name="destination">
            <Destination setDestination={setDestination}></Destination>
          </Modal.Window>
        </Modal>
      </div>

      <div
        className={`w-[0.05rem] ${
          data
            ? hoverInput === "destination" || hoverInput === "checkIn"
              ? "bg-shadow-gray"
              : "bg-gray-300"
            : hoverInput === "destination" || hoverInput === "checkIn"
            ? "bg-white"
            : "bg-gray-300"
        } h-[2rem] 
        ${data === "destination" || data === "checkIn" ? "hidden" : ""}
        `}
      ></div>

      <div className="flex justify-center items-center">
        {(dateOption === "dates" || dateOption === "") && (
          <Modal>
            <Modal.Open opens="checkIn">
              <div
                ref={checkInRef}
                onMouseEnter={() => setHoverInput("checkIn")}
                onMouseLeave={() => setHoverInput(null)}
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
                       : "before:hover:bg-gray-300 "
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
                        <img src={cross} alt="" />
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
              <div className="flex flex-col justify-center items-center ">
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
                onMouseEnter={() => setHoverInput("checkOut")}
                onMouseLeave={() => setHoverInput(null)}
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
                   ${data === "checkOut" ? "" : "before:hover:bg-gray-300 "}
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
                        <img src={cross} alt="" />
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
            ? hoverInput === "checkOut" || hoverInput === "addGuest"
              ? "bg-shadow-gray"
              : " bg-gray-300"
            : hoverInput === "checkOut" || hoverInput === "addGuest"
            ? "bg-white"
            : " bg-gray-300"
        } h-[2rem]
        ${data === "checkOut" || data === "addGuest" ? "hidden" : ""}
        
        `}
      ></div>

      <Modal>
        <div
          ref={addGuestRef}
          onMouseEnter={() => {
            if (data !== "addGuest") setHoverInput("addGuest");
          }}
          onMouseLeave={() => {
            if (data !== "addGuest") setHoverInput(null);
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
                  ${data === "addGuest" ? "" : "before:hover:bg-gray-300 "}
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
                    <img src={cross} alt="" />
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
