import React, { useEffect, useRef, useState } from "react";

import star from "../../src/data/Icons svg/star.svg";
import room from "../../src/data/Icons svg/roomIcon.svg";
import sharedSpace from "../../src/data/Icons svg/commonSpace.svg";
import bathroom from "../../src/data/Icons svg/bathroom.svg";
import furryFriend from "../../src/data/Icons svg/furryFriends.svg";
import person from "../data/person.svg";
import { format } from "date-fns";
import HouseDescription from "./HouseDescription";
import SleepBed from "./SleepBedDetail";
import arrowUp from "../data/Icons svg/arrowUpword.svg";
import { useDispatch, useSelector } from "react-redux";
import { differenceInDays } from "date-fns";
import { setIsVisible } from "./HouseDetailSlice";

const MidMainCont = () => {
  const [formatStartDate, setFormatStartDate] = useState(null);
  const [formatEndDate, setFormatEndDate] = useState(null);

  const isLoading = useSelector((store) => store.houseDetail.isLoading);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  const startDate = useSelector((store) => store.form.selectedStartDate);

  const guestPlural = useSelector((store) => store.form.guestPlural);
  const petPlural = useSelector((store) => store.form.petPlural);

  const adultCount = useSelector((store) => store.form.adultCount);
  const childCount = useSelector((store) => store.form.childCount);
  const infantCount = useSelector((store) => store.form.infantCount);
  const petCount = useSelector((store) => store.form.petsCount);

  const endDate = useSelector((store) => store.form.selectedEndDate);

  let numOfDays = differenceInDays(startDate, endDate);

  const [houseInfoDetails, setHouseInfoDetails] = useState([]);
  const dispatch = useDispatch();

  const elementRef = useRef(null);

  useEffect(() => {
    if (startDate) {
      setFormatStartDate(format(startDate, "MM/dd/yyyy"));
    }
    if (endDate) {
      setFormatEndDate(format(endDate, "MM/dd/yyyy"));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatch(setIsVisible(entry.isIntersecting));
      },
      {
        root: null,
        rootMargin: "-90px",
        threshold: 0,
      }
    );

    const handleScroll = () => {
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial call to handleScroll to start observing
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [dispatch]);

  function cleanString(input) {
    // Replace "About" with an empty string
    let result = input.replace(/About/g, "");

    // Trim any leading or trailing spaces and remove extra spaces between words
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }

  useEffect(() => {
    // Initialize an empty array to store the counts
    const counts = [];

    // Regular expression to match non-alphanumeric characters except spaces
    const cleanString = (str) => str?.replace(/[^a-zA-Z0-9\s]/g, "").trim();

    // Clean and check guest_count
    if (houseInfo?.guest_count !== null) {
      const cleanedGuestCount = cleanString(houseInfo?.guest_count);
      if (cleanedGuestCount) {
        counts.push(cleanedGuestCount);
      }
    }

    // Clean and check bedroom_count
    if (houseInfo?.bedroom_count !== null) {
      const cleanedBedroomCount = cleanString(houseInfo?.bedroom_count);
      if (cleanedBedroomCount) {
        counts.push(cleanedBedroomCount);
      }
    }

    // Clean and check bed_count
    if (houseInfo?.bed_count !== null) {
      const cleanedBedCount = cleanString(houseInfo?.bed_count);
      if (cleanedBedCount) {
        counts.push(cleanedBedCount);
      }
    }

    // Clean and check bathroom_count
    if (houseInfo?.bathroom_count !== null) {
      const cleanedBathroomCount = cleanString(houseInfo?.bathroom_count);
      if (cleanedBathroomCount) {
        counts.push(cleanedBathroomCount);
      }
    }

    setHouseInfoDetails(counts);
  }, [houseInfo]);

  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="w-[calc(100%-10rem)] mx-auto flex justify-between px-[5rem] max-h-[198.59rem] relative after:content-[''] after:absolute after:bottom-0  after:w-[calc(100%-10rem)]  after:h-[1px]  after:bg-grey-dim ">
      <div className="w-[40.83rem]">
        <div className={`py-8  `}>
          <>
            {isLoading ? (
              <div className="w-[26rem] h-8 imgLoader"></div>
            ) : (
              <h1 className=" text-[25px]   font-[460]">
                {houseInfo?.title_2}
              </h1>
            )}
          </>
          <div className="flex items-center">
            {isLoading ? (
              <div className="w-80 h-5 mt-2 imgLoader"></div>
            ) : (
              <div className="flex items-center">
                {houseInfoDetails.length > 0 &&
                  houseInfoDetails.map((item, i) => {
                    return (
                      <div className="flex items-center" key={i}>
                        <span className="font-light">{item}</span>
                        {/* Add the separator, but only if it's not the last item */}
                        {i < houseInfoDetails.length - 1 && (
                          <span className="flex h-full mx-1 items-center justify-center">
                            <span className="w-[3px] h-[3px] bg-current rounded-full"></span>
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="flex gap-1 items-center leading-8">
            {isLoading ? (
              <div className="w-4 h-4"></div>
            ) : (
              <>
                <span>
                  <img className="w-4 h-4" src={star} alt="" />
                </span>
                <span className="underline">{houseInfo?.rating_count}</span>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="h-20"></div>
        ) : (
          <div className="">
            <div className="h-[1px] bg-grey-dim"></div>
            <div>
              <div className="py-6 gap-8 items-center flex">
                <img
                  className="h-10 w-10 object-cover  rounded-full"
                  src={houseInfo?.host_image ? houseInfo?.host_image : person}
                  alt="host-image"
                />
                <div className="flex flex-col">
                  <span className="font-medium">
                    Hosted by{" "}
                    {houseInfo?.host_name
                      ? cleanString(houseInfo?.host_name)
                      : "Carl"}
                  </span>
                  <span className="font-extralight text-grey text-sm">
                    {" "}
                    6 years hosting
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-grey-dim"></div>
          </div>
        )}
        <div>
          <div className="py-8 flex flex-col gap-y-5 h-[19.5rem]">
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={room} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Room in a villa</span>
                <span className="leading-8 text-sm text-grey">
                  Your own room in a home, plus access to shared spaces.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={sharedSpace} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Shared common spaces</span>
                <span className="leading-8 text-sm text-grey">
                  You’ll share parts of the home.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={bathroom} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Shared bathroom</span>
                <span className="leading-8 text-sm text-grey">
                  You’ll share the bathroom with others.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <div className="flex items-start">
                <img className="w-6 h-6" src={furryFriend} alt="" />
              </div>
              <div className="flex flex-col justify-start">
                <span className="leading-4">Furry friends welcome</span>
                <span className="leading-8 text-sm text-grey">
                  Bring your pets along for the stay.
                </span>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-grey-dim"></div>
        </div>
        <HouseDescription></HouseDescription>
        <SleepBed></SleepBed>
      </div>
      <div className="w-[26.32rem] ">
        {isLoading ? (
          <div className="">
            <div className="w-40 mt-8 ml-20 h-10 imgLoader"></div>
            <div className="w-80 mt-4 ml-20 h-10 imgLoader"></div>
          </div>
        ) : (
          <div className="pt-8 mb-20 flex justify-end sticky top-20">
            {!startDate || !endDate ? (
              <div className=" rounded-xl border-[1px]  border-grey-dim h-[17.12rem] p-6 w-[23.14rem]">
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl font-light">
                      Add dates for prices
                    </h1>
                  </div>
                  <div className="mb-4 cursor-pointer border-[1px] border-border-color rounded-lg h-28">
                    <div className="w-full h-1/2 flex   border-b-[1px] border-border-color">
                      <div
                        onClick={scrollToSection("calendar")}
                        className="w-1/2 h-full border-r-[1px] border-border-color flex justify-center flex-col "
                      >
                        <div className="flex items-start justify-center flex-col pl-3">
                          <span className="text-[10px] font-semibold">
                            CHECK-IN
                          </span>
                          <span className="text-sm text-grey font-normal">
                            {startDate ? formatStartDate : "Add date"}
                          </span>
                        </div>
                      </div>
                      <div
                        onClick={scrollToSection("calendar")}
                        className="w-1/2 h-full flex items-center "
                      >
                        <div className="flex items-start justify-center flex-col pl-3">
                          <span className="text-[10px] font-semibold">
                            CHECKOUT
                          </span>
                          <span className="text-sm font-light">
                            {endDate ? formatEndDate : "Add date"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex  w-full h-1/2 items-center">
                      <div className="flex px-3 w-full items-center justify-between">
                        <div
                          onClick={scrollToSection("header")}
                          className="flex items-start justify-center flex-col"
                        >
                          <span className="text-[10px] font-semibold">
                            GUESTS
                          </span>
                          <span className="text-sm font-light">
                            {adultCount + childCount > 0
                              ? `${
                                  adultCount + childCount
                                } guest${guestPlural} ${
                                  infantCount
                                    ? `${infantCount} infant${
                                        infantCount > 1 ? "s" : ""
                                      }${petCount > 1 ? "," : ""}`
                                    : ""
                                } ${
                                  petCount ? `${petCount} pet${petPlural}` : ""
                                }`
                              : "Add guest"}
                          </span>
                        </div>
                        <div className="h-4 w-4">
                          <img className="h-full w-full" src={arrowUp} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled
                    className="w-full rounded-lg flex-center bg-dark-pink h-12"
                  >
                    <span className="text-white">Check availability</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-[23.14rem] shadow-priceCardShadow border-[1px] p-6 rounded-xl border-grey-dim h-[29.70rem]">
                <div className="">
                  <span className="mb-6 flex items-end gap-2 text-2xl">
                    ${houseInfo?.price}
                    <span className="text-base font-light flex items-end">
                      night
                    </span>
                  </span>
                  <div className="mb-4 cursor-pointer border-[1px] border-border-color rounded-lg h-28">
                    <div className="w-full h-1/2 flex   border-b-[1px] border-border-color">
                      <div
                        onClick={scrollToSection("airConditioner")}
                        className="w-1/2 h-full border-r-[1px] border-border-color flex justify-center flex-col "
                      >
                        <div className="flex items-start justify-center flex-col pl-3">
                          <span className="text-[10px] font-semibold">
                            CHECK-IN
                          </span>
                          <span className="text-sm font-light">
                            {startDate && formatStartDate}
                          </span>
                        </div>
                      </div>
                      <div
                        onClick={scrollToSection("airConditioner")}
                        className="w-1/2 h-full flex items-center "
                      >
                        <div className="flex items-start justify-center flex-col pl-3">
                          <span className="text-[10px] font-semibold">
                            CHECKOUT
                          </span>
                          <span className="text-sm font-light">
                            {endDate && formatEndDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex  w-full h-1/2 items-center">
                      <div className="flex px-3 w-full items-center justify-between">
                        <div
                          onClick={scrollToSection("header")}
                          className="flex items-start justify-center flex-col"
                        >
                          <span className="text-[10px] font-semibold">
                            GUESTS
                          </span>
                          <span className="text-sm font-light">
                            {adultCount + childCount > 0
                              ? `${
                                  adultCount + childCount
                                } guest${guestPlural} ${
                                  infantCount
                                    ? `${infantCount} infant${
                                        infantCount > 1 ? "s" : ""
                                      }${petCount > 1 ? "," : ""}`
                                    : ""
                                } ${
                                  petCount ? `${petCount} pet${petPlural}` : ""
                                }`
                              : "Add guest"}
                          </span>
                        </div>
                        <div className="h-4 w-4">
                          <img className="h-full w-full" src={arrowUp} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    ref={elementRef}
                    className="w-full rounded-lg flex-center bg-dark-pink h-12"
                  >
                    <span className="text-white">Reserve</span>
                  </button>
                </div>
                <div className="w-full flex-center mt-2">
                  <span className="text-sm pt-2 font-light">
                    You won't be charged yet
                  </span>
                </div>
                <div className="w-full mt-6">
                  <div className="flex h-[20px] w-full justify-between">
                    <span className="font-light">{`$${
                      houseInfo?.price
                    } x ${Math.abs(numOfDays)}`}</span>
                    <span className="font-light">
                      ${Math.ceil(houseInfo?.price * Math.abs(numOfDays))}{" "}
                    </span>
                  </div>
                  <div className="flex pt-4 justify-between">
                    <span className="font-light">Airbnb service fee</span>
                    <span className="font-light">
                      $
                      {Math.floor(
                        0.11 * Math.ceil(houseInfo?.price * Math.abs(numOfDays))
                      )}
                    </span>
                  </div>
                  <div className="h-11 pt-6 flex justify-between items-center mt-6 border-t-[1px]  border-grey-dim">
                    <span className="font-medium">Total before taxes</span>
                    <span className="font-medium">
                      $
                      {Math.ceil(houseInfo?.price * Math.abs(numOfDays)) +
                        Math.floor(
                          0.1 *
                            Math.ceil(houseInfo?.price * Math.abs(numOfDays))
                        )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MidMainCont;
