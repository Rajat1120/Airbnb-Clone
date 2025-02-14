import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import star from "../../asset/Icons_svg/star.svg";
import Header from "../Header/Header";
import { setMinimize, setShowLogin } from "../../redux/AppSlice";
import { useLocation, useParams } from "react-router";
import TopMainCont from "./TopMainCont";
import MidMainCont from "./MidMainCont";
import BottomMainCont from "./BottomMainCont";

import NavBar from "./NavBar";
import { getRoomInfo } from "../../api/apiRooms";
import { useQuery } from "@tanstack/react-query";
import { setHouseInfo, setIsLoading } from "../../redux/HouseDetailSlice";
import LongFooter from "./LongFooter";
import { Link } from "react-router-dom";
import { differenceInDays, format, isSameMonth } from "date-fns";
import { updateBookingDates } from "../../payment/CheckoutForm";

// custom hook
const useFormattedDateRange = (startDate, endDate) => {
  const [tripDurationDate, setTripDurationDate] = useState(null);

  useEffect(() => {
    const formatDateRange = (start, end) => {
      const startD = new Date(start);
      const endD = new Date(end);

      if (start && end) {
        if (isSameMonth(startD, endD)) {
          return `${format(startD, "dd")} - ${format(endD, "dd MMM")}`;
        } else {
          return `${format(startD, "dd MMM")} - ${format(endD, "dd MMM")}`;
        }
      }
      return null;
    };

    setTripDurationDate(formatDateRange(startDate, endDate));
  }, [startDate, endDate]);

  return tripDurationDate;
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const PriceDetails = ({
  dateSelected,
  allHouseInfo,
  numOfDays,
  tripDurationDate,
}) => {
  const calculatePrice = () => {
    if (!dateSelected) return null;
    const basePrice = Math.ceil(allHouseInfo?.price * Math.abs(numOfDays));
    const totalPrice = basePrice + Math.floor(0.1 * basePrice);
    return totalPrice;
  };

  if (!dateSelected) return null;

  return (
    <div className="flex  flex-col">
      {dateSelected && (
        <span className="text-normal font-medium">
          ${calculatePrice()} <span className="font-light text-sm">night</span>
        </span>
      )}
      {dateSelected ? (
        <span className="text-sm font-medium underline">
          {tripDurationDate}
        </span>
      ) : null}
    </div>
  );
};

const RatingDisplay = ({ houseInfo }) => (
  <div className="flex items-center gap-1">
    <img src={star} className="h-3 w-3" alt="star rating" />
    <span className="font-medium text-xs">{houseInfo?.house_rating}</span>
  </div>
);

const ActionButton = ({
  userData,
  dateSelected,
  houseInfo,
  scrollToSection,
  dispatch,
}) => {
  const handleClick = (e) => {
    if (!dateSelected) {
      scrollToSection("calendar");
    } else {
      if (!userData) {
        dispatch(setShowLogin(true)); // Show login modal
      }
    }
  };

  return (
    <Link
      to={userData && dateSelected ? `/${houseInfo?.id}/book` : "#"}
      onClick={handleClick}
    >
      <button
        className={`${
          dateSelected ? "px-10" : "px-6"
        } rounded-lg flex-center bg-dark-pink h-12`}
      >
        <span className="text-white text-nowrap">
          {dateSelected ? "Reserve" : "Check availability"}
        </span>
      </button>
    </Link>
  );
};

const FooterComponent = ({
  dateSelected,
  allHouseInfo,
  numOfDays,
  tripDurationDate,
  houseInfo,
  userData,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full z-50 border-t border-grey-dim py-4 bg-white fixed bottom-0 justify-between px-5 flex 1xz:hidden">
      <PriceDetails
        dateSelected={dateSelected}
        allHouseInfo={allHouseInfo}
        numOfDays={numOfDays}
        tripDurationDate={tripDurationDate}
      />
      {!dateSelected && <RatingDisplay houseInfo={houseInfo} />}
      <ActionButton
        userData={userData}
        dateSelected={dateSelected}
        houseInfo={houseInfo}
        scrollToSection={scrollToSection}
        dispatch={dispatch}
      />
    </div>
  );
};

// Custom hook for handling scroll behavior
const useScrollBehavior = (dispatch) => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > 18) {
        setTimeout(() => {
          dispatch(setMinimize(false));
        }, 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);
};

// Custom hook for handling house data
const useHouseData = (id, houseInfo) => {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["roomInfo", id],
    queryFn: () => getRoomInfo(id),
  });

  useEffect(() => {
    if (data) {
      dispatch(setHouseInfo({ ...houseInfo, [id]: data }));
      dispatch(setIsLoading(false));
    }
  }, [data, houseInfo, dispatch, isLoading, id]);

  return { isLoading, data };
};

// Layout component for the main content
const MainContent = ({ minimize }) => (
  <div className={`${minimize ? "absolute top-20 -z-10" : ""} w-full`}>
    <TopMainCont />
    <div className="w-full flex justify-center">
      <MidMainCont />
    </div>
    <div className="w-full flex justify-center">
      <BottomMainCont />
    </div>
    <LongFooter />
  </div>
);

// Header wrapper component
const HeaderWrapper = ({
  headerRef,
  minimize,
  startScroll,
  animateHeaderClass1,
  animateHeaderClass2,
}) => (
  <div
    ref={headerRef}
    id="header"
    className={`bg-white hidden ${
      minimize ? "z-50" : "z-10"
    } transition-all duration-[0.3s] ease-in-out ${
      !startScroll ? animateHeaderClass1 : animateHeaderClass2
    } w-full 1xz:flex items-start justify-center`}
  >
    <Header headerRef={headerRef} />
  </div>
);

// Main HouseDetail component
const HouseDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const headerRef = useRef();

  const onHouseDetailPage = location.pathname.includes("/house/");
  const sliceName = onHouseDetailPage ? "houseSlice" : "app";

  // Redux selectors
  const { minimize, userData } = useSelector((store) => store.app);
  const { houseInfo: allHouseInfo } = useSelector((store) => store.houseDetail);
  const { selectedStartDate: startDate, selectedEndDate: endDate } =
    useSelector((store) => store.form);
  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  const houseInfo = allHouseInfo[id];
  const tripDurationDate = useFormattedDateRange(startDate, endDate);
  const numOfDays = differenceInDays(startDate, endDate);
  const dateSelected = startDate && endDate;

  // Custom hooks
  useScrollBehavior(dispatch);
  useHouseData(id, houseInfo);

  useEffect(() => {
    updateBookingDates(id);
  }, [id]);

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem(id));

    if (startDate && endDate) {
      const formattedStartDate = format(startDate, "eee MMM dd, yyyy");

      const formattedEndDate = format(endDate, "eee MMM dd, yyyy");

      let newData = {
        ...localData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      if (localData) {
        localStorage.setItem(id, JSON.stringify(newData));
      }
    }
  }, [id, endDate, startDate]);

  // Animation classes
  const animateHeaderClass1 = minimize
    ? "animate-expand"
    : "max-h-[5rem] h-full";
  const animateHeaderClass2 = minimize
    ? "animate-collapse"
    : "max-h-[11rem] h-full";

  // Prevent scroll restoration
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative pb-20 1xz:pb-0 overflow-x-clip">
      <HeaderWrapper
        headerRef={headerRef}
        minimize={minimize}
        startScroll={startScroll}
        animateHeaderClass1={animateHeaderClass1}
        animateHeaderClass2={animateHeaderClass2}
      />

      <div className="w-full hidden 1xz:block">
        <NavBar />
      </div>

      <MainContent minimize={minimize} />

      <FooterComponent
        dateSelected={dateSelected}
        allHouseInfo={allHouseInfo}
        numOfDays={numOfDays}
        tripDurationDate={tripDurationDate}
        houseInfo={houseInfo}
        userData={userData}
      />
    </div>
  );
};

export default HouseDetail;
