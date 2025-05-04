import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import arrowUp from "../../asset/Icons_svg/arrowUpword.svg";
import { setShowLogin } from "../../redux/AppSlice";
import { setIsVisible } from "../../redux/HouseDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { differenceInDays, format } from "date-fns";

// Custom components
const LoadingPlaceholder = () => (
  <div>
    <div className="w-40 mt-8 ml-20 h-10 bg-gray-200 animate-pulse"></div>
    <div className="w-80 mt-4 ml-20 h-10 bg-gray-200 animate-pulse"></div>
  </div>
);

const DateSelection = ({
  scrollToSection,

  formatStartDate,
  formatEndDate,
}) => {
  const {
    guestPlural,
    petPlural,
    adultCount,
    childCount,
    infantCount,
    petsCount: petCount,
    selectedStartDate: startDate,
    selectedEndDate: endDate,
  } = useSelector((store) => store.form);
  return (
    <div className="cursor-pointer border my-4 border-border-color rounded-lg h-28">
      <div className="w-full h-1/2  flex border-b border-border-color">
        <div
          onClick={scrollToSection("calendar")}
          className="w-1/2 h-full border-r-[1px] border-border-color flex justify-center flex-col px-3"
        >
          <span className="text-[10px] whitespace-nowrap font-semibold">
            CHECK-IN
          </span>
          <span className="text-sm whitespace-nowrap text-grey font-normal">
            {startDate ? formatStartDate : "Add date"}
          </span>
        </div>
        <div
          onClick={scrollToSection("calendar")}
          className="w-1/2 h-full flex justify-center flex-col px-3"
        >
          <span className="text-[10px] font-semibold">CHECKOUT</span>
          <span className="text-sm text-grey whitespace-nowrap font-normal">
            {endDate ? formatEndDate : "Add date"}
          </span>
        </div>
      </div>
      <GuestInfo
        scrollToSection={scrollToSection}
        guestDetails={
          adultCount + childCount > 0
            ? `${adultCount + childCount} guest${guestPlural} ${
                infantCount
                  ? `${infantCount} infant${infantCount > 1 ? "s" : ""}${
                      petCount ? "," : ""
                    }`
                  : ""
              } ${petCount ? `${petCount} pet${petPlural}` : ""}`
            : "Add guest"
        }
      />
    </div>
  );
};

const GuestInfo = ({ scrollToSection, guestDetails }) => (
  <div className="flex h-1/2 items-center px-3 w-full justify-between cursor-pointer">
    <div onClick={scrollToSection("header")} className="flex flex-col">
      <span className="text-[10px] font-semibold">GUESTS</span>
      <span className="text-sm font-light">{guestDetails}</span>
    </div>
    <img className="h-4 w-4" src={arrowUp} alt="arrow up" />
  </div>
);

const PricingDetails = ({ price, numOfDays }) => {
  let serviceFee = Math.ceil(price * Math.abs(numOfDays)) * 0.1;

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between">
        <span className="font-light">{`$${price} x ${Math.abs(
          numOfDays
        )}`}</span>
        <span className="font-light">
          ${Math.ceil(price * Math.abs(numOfDays))}
        </span>
      </div>
      <div className="flex py-4 border-b border-grey-dim justify-between">
        <span className="font-light">Service fee</span>
        <span className="font-light">${Math.ceil(serviceFee)}</span>
      </div>
      <div className="flex justify-between  border-grey-dim pt-6">
        <span className="font-medium">Total before taxes</span>
        <span className="font-medium">
          ${Math.ceil(Math.ceil(price * Math.abs(numOfDays)) + serviceFee)}
        </span>
      </div>
    </div>
  );
};

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

const BookingForm = () => {
  const [formatStartDate, setFormatStartDate] = useState(null);
  const [formatEndDate, setFormatEndDate] = useState(null);
  const { isLoading, houseInfo } = useSelector((store) => store.houseDetail);
  const location = useLocation();
  const { userData } = useSelector((store) => store.app);
  const onHouseDetailPage = location.pathname.includes("/house");
  const dispatch = useDispatch();

  const elementRef = useRef(null);
  const { selectedStartDate: startDate, selectedEndDate: endDate } =
    useSelector((store) => store.form);
  let numOfDays = differenceInDays(startDate, endDate);

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
      if (elementRef?.current) {
        observer.observe(elementRef?.current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial call to handleScroll to start observing
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (elementRef?.current) {
        observer.unobserve(elementRef?.current);
      }
    };
  }, [dispatch]);

  return (
    <div className="max-w-[26.32rem] 1smd:ml-20 ml-10 w-full">
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div
          className={`pt-8 mb-20 ${
            onHouseDetailPage ? "hidden 1xz:flex" : "flex"
          } justify-end sticky top-20`}
        >
          {!startDate || !endDate ? (
            <div className="rounded-xl  border-[1px] w-full border-grey-dim p-6 max-w-[23.14rem]">
              <h1 className="text-2xl font-light mb-6">Add dates for prices</h1>
              <DateSelection
                scrollToSection={scrollToSection}
                startDate={startDate}
                endDate={endDate}
                formatStartDate={formatStartDate}
                formatEndDate={formatEndDate}
              />

              <button
                disabled
                className="w-full rounded-lg flex-center bg-dark-pink h-12"
              >
                <span className="text-white text-nowrap">
                  Check availability
                </span>
              </button>
            </div>
          ) : (
            <div className="max-w-[23.14rem] min-w-64 w-full shadow-priceCardShadow border-[1px] p-6 rounded-xl border-grey-dim ">
              <span className="text-2xl font-light">
                ${houseInfo?.price} <span className="text-base">night</span>
              </span>
              <DateSelection
                scrollToSection={scrollToSection}
                startDate={startDate}
                endDate={endDate}
                formatStartDate={formatStartDate}
                formatEndDate={formatEndDate}
              />

              <Link
                to={userData ? `/${houseInfo.id}/book` : "#"}
                onClick={(e) => !userData && dispatch(setShowLogin(true))}
              >
                <button
                  ref={elementRef}
                  className="w-full rounded-lg flex-center bg-dark-pink h-12"
                >
                  <span className="text-white">Reserve</span>
                </button>
              </Link>
              <div className="w-full flex-center mt-2">
                <span className="text-sm pt-2 font-light">
                  You won't be charged yet
                </span>
              </div>
              <PricingDetails price={houseInfo?.price} numOfDays={numOfDays} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
