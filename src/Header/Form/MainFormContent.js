import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Modal from "../../Modals/Modal";
import Europe from "../../data/Continents/europe.jpg";
import MiddleEast from "../../data/Continents/Middle-East.jpg";
import world from "../../data/Continents/world.jpg";
import UnitedArabEmirates from "../../data/Continents/UAE.jpg";
import Thiland from "../../data/Continents/thisland.jpg";
import SouthEastAsia from "../../data/Continents/southEash.jpg";
import cross from "../../data/Icons svg/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveElement,
  setActiveInput,
  setAdultCount,
  setChildCount,
  setCurrentMonth,
  setInfantCount,
  setPetsCount,
  setRegion,
  setSearchEl,
  setSelectedEndDate,
  setSelectedStartDate,
} from "./mainFormSlice";
import Calendar from "../../Utils/Calendar";
import CheckInOption from "./DatesOption";
import { format } from "date-fns";
import { current } from "@reduxjs/toolkit";

const MainFormContent = () => {
  const [hoverInput, setHoverInput] = useState(null);
  const [startDateToShow, setStartDateToShow] = useState(null);
  const [EndDateToShow, setEndDateToShow] = useState(null);

  const data = useSelector((store) => store.form.curSelectInput);

  const region = useSelector((store) => store.form.region);
  const adultCount = useSelector((store) => store.form.adultCount);
  const childCount = useSelector((store) => store.form.childCount);
  const infantCount = useSelector((store) => store.form.infantCount);
  const petCount = useSelector((store) => store.form.petsCount);

  const dateOption = useSelector((state) => state.form.dateOption);

  console.log("adultCount", adultCount);
  const dispatch = useDispatch();

  const modalRef = useRef();
  const buttonRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const addGuestRef = useRef();

  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);

  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMM")
    : "Add dates";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MMM")
    : "Add dates";

  useEffect(() => {
    setStartDateToShow(formattedStartDate);
    setEndDateToShow(formattedEndDate);
  }, [formattedStartDate, formattedEndDate, startDate, endDate]);

  // to minimize the form input fields, on clicking outside of the form
  useEffect(
    function () {
      function handleClick(e) {
        // if user click outside the form and open modal minimize the active input field
        if (
          modalRef?.current &&
          !modalRef.current?.contains(e.target) &&
          buttonRef?.current &&
          !buttonRef.current?.contains(e.target) &&
          checkInRef?.current &&
          !checkInRef.current?.contains(e.target) &&
          checkOutRef?.current &&
          !checkOutRef.current?.contains(e.target) &&
          addGuestRef?.current &&
          !addGuestRef.current?.contains(e.target)
        ) {
          dispatch(setActiveInput(""));
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
    [dispatch, startDate, endDate]
  );

  /*  useEffect(() => {
    function handleClick(e) {
      console.log("Click detected on:", e.target);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []); */

  function handleCrossClick(e) {
    e.stopPropagation();
    console.log("run");
    dispatch(setActiveInput(""));
    dispatch(setSelectedStartDate(null));
    dispatch(setSelectedEndDate(null));
  }

  function handleInputField(target, input) {
    if (data === input) {
      dispatch(setActiveInput(""));
    } else {
      dispatch(setActiveInput(input));
    }
  }

  function handleRegion(region) {
    dispatch(setRegion(region));
    dispatch(setActiveInput("checkIn"));
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
                <div className="">
                  <div className="text-xs font-medium">Where</div>
                  <input
                    type="text"
                    className={`w-[10.62rem] 4 ${
                      region === "all" ? "" : "placeholder:font-medium"
                    }  outline-none focus:outline-none h[2rem] placeholder:text-sm ${
                      data && data !== "destination" ? "bg-shadow-gray" : ""
                    } placeholder:font-extralight placeholder:text-black`}
                    id="destination"
                    placeholder={
                      region === "all" ? "Search Destinations" : region
                    }
                  />
                </div>
              </label>
            </div>
          </Modal.Open>
          <Modal.Window modalRef={modalRef} name="destination">
            <div className="h-full pt-[2rem] px-[1.5rem] shadow-2xl rounded-[2rem] justify-center  w-full  pb-[1.5rem] bg-white">
              <div className="flex flex-col justify-center items-center">
                <p className="flex mb-3  text-sm font-medium ml-[1rem] w-full justify-self-start items-center ">
                  Search by region
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    onClick={() => handleRegion("all")}
                    className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
                  >
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={world}
                      alt=""
                    />

                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      I'm flexible
                    </p>
                  </div>
                  <div
                    onClick={() => handleRegion("Europe")}
                    className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
                  >
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={Europe}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Europe
                    </p>
                  </div>
                  <div
                    onClick={() => handleRegion("Thiland")}
                    className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
                  >
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={Thiland}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Thailand
                    </p>
                  </div>
                  <div
                    onClick={() => handleRegion("SouthAsia")}
                    className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
                  >
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={SouthEastAsia}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Southeast Asia
                    </p>
                  </div>
                  <div
                    onClick={() => handleRegion("UAE")}
                    className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
                  >
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={UnitedArabEmirates}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start truncate font-[300] mt-2 ml-4">
                      United Arab Emirates
                    </p>
                  </div>
                  <div
                    onClick={() => handleRegion("MiddleEast")}
                    className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
                  >
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={MiddleEast}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Middle East
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

                   ${data === "checkIn" ? "" : "before:hover:bg-gray-300 "}
                  
                  before:hover:opacity-40 
               ${
                 data === "checkIn" ? "rounded-full bg-white" : ""
               } flex-col flex justify-center items-center 
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
                        startDateToShow === "Add dates"
                          ? "font-extralight text-sm"
                          : "text-sm font-medium"
                      }`}
                    >
                      {startDateToShow}
                    </p>
                  </div>
                  {startDateToShow !== "Add dates" && data === "checkIn" && (
                    <div
                      onClick={(e) => handleCrossClick(e)}
                      className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                    >
                      <img src={cross} alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Open>
          <Modal.Window modalRef={modalRef} name="checkIn">
            <div className="flex flex-col justify-center items-center ">
              <CheckInOption></CheckInOption>
              <Calendar></Calendar>
            </div>
          </Modal.Window>
        </Modal>
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
        <Modal>
          <Modal.Open opens="checkOut">
            <div
              ref={checkOutRef}
              onMouseEnter={() => setHoverInput("checkOut")}
              onMouseLeave={() => setHoverInput(null)}
              className={`flex ${
                data === "checkOut" ? "shadow-checkOutShadow rounded-full" : ""
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
                      EndDateToShow && data === "checkOut" ? "ml-[-0.5rem]" : ""
                    }`}
                  >
                    <p className="text-xs  font-medium">Check out</p>
                    <p
                      className={`${
                        EndDateToShow === "Add dates"
                          ? "font-extralight text-sm"
                          : "text-sm font-medium"
                      }`}
                    >
                      {EndDateToShow}
                    </p>
                  </div>
                  {EndDateToShow !== "Add dates" && data === "checkOut" && (
                    <div
                      onClick={(e) => handleCrossClick(e)}
                      className="w-[1.5rem] flex justify-center items-center z-50 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                    >
                      <img src={cross} alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Open>
          <Modal.Window modalRef={modalRef} name="checkOut">
            <div className="flex flex-col justify-center items-center ">
              <CheckInOption></CheckInOption>
              <Calendar></Calendar>
            </div>
          </Modal.Window>
        </Modal>
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
                  data ? "w-[12.2rem] before:z-10 " : "w-[14.2rem]"
                } hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
                  ${data === "addGuest" ? "" : "before:hover:bg-gray-300 "}
              
               before:left-[35.20rem] before:rounded-full before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
              >
                <div className="text-xs font-medium">Who</div>
                <div
                  className={`w-[5.62rem] outline-none focus:outline-none h[2rem] 
                      ${data && data !== "addGuest" ? "bg-shadow-gray" : ""}
                   `}
                >
                  <p className="text-sm mt-[2px] font-extralight text-black ">
                    Add guest
                  </p>
                </div>
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
        <Modal.Window modalRef={modalRef} name="addGuest">
          <div className="w-[26rem]  flex-center h-[25rem]">
            <div className="py-6 flex-center flex-col ">
              <div className="flex w-[22rem] flex-center flex-col">
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <p>Adults</p>
                    <p className="text-sm text-grey"> Age 13 or above</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      disabled={adultCount === 0}
                      onClick={() => {
                        let count = adultCount - 1;
                        dispatch(setAdultCount(count));
                      }}
                      className={`w-8 h-8  m-4 items-center justify-center ${
                        adultCount === 0 ? "cursor-disable" : ""
                      } rounded-full bg-white border-[1px] border-grey`}
                    >
                      -
                    </button>
                    <p className="w-3 flex-center font-light">
                      {adultCount}
                      <p className="text-sm ">
                        {adultCount === 16 ? "+" : ""}
                      </p>{" "}
                    </p>
                    <button
                      disabled={adultCount + childCount === 16}
                      onClick={() => {
                        let count = adultCount + 1;
                        dispatch(setAdultCount(count));
                      }}
                      className={`w-8 h-8 flex ${
                        adultCount + childCount === 16 ? "cursor-disable" : ""
                      }   m-4 items-center  justify-center rounded-full bg-white border-[1px] border-grey`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-full mt-4 h-[1px] bg-shadow-gray"></div>
              </div>
              <div className="flex w-[22rem] flex-center flex-col">
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <p>Children</p>
                    <p className="text-sm text-grey"> Ages 2-12</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      disabled={childCount === 0}
                      onClick={() => {
                        let count = childCount - 1;
                        dispatch(setChildCount(count));
                      }}
                      className={` w-8 h-8  m-4 
                        ${childCount === 0 ? "cursor-disable" : ""} 
                        items-center justify-center rounded-full bg-white border-[1px] border-grey `}
                    >
                      -
                    </button>
                    <p className="w-3 flex-center font-light">{childCount}</p>
                    <button
                      disabled={childCount + adultCount === 16}
                      onClick={() => {
                        let count = childCount + 1;
                        dispatch(setChildCount(count));
                      }}
                      className={`w-8 h-8 flex  m-4 items-center ${
                        childCount + adultCount === 16 ? "cursor-disable" : ""
                      } justify-center rounded-full bg-white border-[1px] border-grey`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-full mt-4 h-[1px] bg-shadow-gray"></div>
              </div>
              <div className="flex w-[22rem] flex-center flex-col">
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <p>Infants</p>
                    <p className="text-sm text-grey"> Under 2</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      disabled={infantCount === 0}
                      onClick={() => {
                        let count = infantCount - 1;
                        dispatch(setInfantCount(count));
                      }}
                      className={` w-8 h-8 ${
                        infantCount === 0 ? "cursor-disable" : ""
                      }  m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey`}
                    >
                      -
                    </button>
                    <p className="w-3 flex-center font-light">{infantCount}</p>
                    <button
                      disabled={infantCount === 5}
                      onClick={() => {
                        let count = infantCount + 1;
                        dispatch(setInfantCount(count));
                      }}
                      className={`w-8 ${
                        infantCount === 5 ? "cursor-disable" : ""
                      }  h-8 flex  m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey `}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-full mt-4 h-[1px] bg-shadow-gray"></div>
              </div>
              <div className="flex w-[22rem] flex-center flex-col">
                <div className="w-full justify-between flex items-center">
                  <div className="">
                    <p>Pets</p>
                    <p className="text-sm hover:cursor-pointer  font-medium text-grey">
                      <u>Bringing a service animal ?</u>
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      disabled={petCount === 0}
                      onClick={() => {
                        let count = petCount - 1;
                        dispatch(setPetsCount(count));
                      }}
                      className={` w-8 h-8  m-4 items-center justify-center 
                    ${petCount === 0 ? "cursor-disable" : ""}
                    rounded-full bg-white border-[1px] border-grey `}
                    >
                      -
                    </button>
                    <p className="w-3 flex-center font-light">{petCount}</p>
                    <button
                      disabled={petCount === 5}
                      onClick={() => {
                        let count = petCount + 1;
                        dispatch(setPetsCount(count));
                      }}
                      className={` w-8 h-8 flex
                        ${
                          petCount === 5 ? "cursor-disable" : ""
                        }  m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey `}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default MainFormContent;
