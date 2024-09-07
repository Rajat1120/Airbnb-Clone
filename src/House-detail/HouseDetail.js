import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { setMinimize, setShowLogin, setStartScroll } from "../Main/AppSlice";
import { useLocation, useParams } from "react-router";
import TopMainCont from "./TopMainCont";
import MidMainCont from "./MidMainCont";
import BottomMainCont from "./BottomMainCont";
import star from "../data/Icons svg/star.svg";

import NavBar from "./NavBar";
import { getRoomInfo } from "../Services/apiRooms";
import { useQuery } from "@tanstack/react-query";
import { setHouseInfo, setIsLoading } from "./HouseDetailSlice";
import LongFooter from "./LongFooter";
import { Link } from "react-router-dom";
import { differenceInDays, format, isSameMonth } from "date-fns";

const HouseDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  let onHouseDetailPage = location.pathname.includes("/house/");

  const dispatch = useDispatch();
  const minimize = useSelector((store) => store.app.minimize);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);
  const houseInfoDetails = useSelector((store) => store.houseDetail.houseInfo);

  const userData = useSelector((store) => store.app.userData);
  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);
  const [tripDurationDate, setTripDurationDate] = useState(null);
  let numOfDays = differenceInDays(startDate, endDate);
  let dateSelected = startDate && endDate;
  let headerRef = useRef();

  useEffect(() => {
    const formatDateRange = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (start && end)
        if (isSameMonth(startDate, endDate)) {
          return `${format(startDate, "dd")} - ${format(endDate, "dd MMM")}`;
        } else {
          return `${format(startDate, "dd MMM")} - ${format(
            endDate,
            "dd MMM"
          )}`;
        }
    };
    setTripDurationDate(formatDateRange(startDate, endDate));
  }, [startDate, endDate]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["roomInfo", id],
    queryFn: () => getRoomInfo(id),
  });

  useEffect(() => {
    if (data) {
      dispatch(setHouseInfo({ ...houseInfo, [id]: data }));
      dispatch(setIsLoading(false));
    }
  }, [data, houseInfo, dispatch, isLoading, id]);

  let sliceName = onHouseDetailPage ? "houseSlice" : "app";

  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  let animateHeaderClass1 = minimize ? "animate-expand" : "max-h-[5rem] h-full";
  let animateHeaderClass2 = minimize
    ? "animate-collapse"
    : "max-h-[11rem] h-full";

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition < 18) {
        // Scrolling up
        setTimeout(() => {
          dispatch(setMinimize(false));
        }, 200);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  // Prevent scroll restoration and ensure top scroll on mount/reload
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative pb-20 1xz:pb-0  overflow-x-hidden 1xz:overflow-x-visible">
      <div
        ref={headerRef}
        id="header"
        className={` bg-white hidden  ${
          minimize ? "z-50" : "z-10"
        }  transition-all  duration-[0.3s] ease-in-out ${
          !startScroll ? `${animateHeaderClass1}` : `${animateHeaderClass2}`
        }    w-full 1xz:flex items-start justify-center  `}
      >
        <Header headerRef={headerRef}></Header>
      </div>
      <div className="w-full hidden 1xz:block">
        <NavBar></NavBar>
      </div>
      <div className={` ${minimize ? " absolute top-20 -z-10" : ""}   w-full`}>
        <TopMainCont></TopMainCont>
        <div className="w-full flex  justify-center">
          <MidMainCont></MidMainCont>
        </div>
        <div className="w-full flex justify-center">
          <BottomMainCont></BottomMainCont>
        </div>
        <LongFooter></LongFooter>
      </div>
      <div className="w-full z-50 border-t border-grey-dim py-4 bg-white fixed bottom-0  justify-between px-5 flex 1xz:hidden">
        <div className="flex flex-col">
          {dateSelected && (
            <span className="text-normal font-medium ">
              $
              {Math.ceil(houseInfoDetails?.price * Math.abs(numOfDays)) +
                Math.floor(
                  0.1 * Math.ceil(houseInfoDetails?.price * Math.abs(numOfDays))
                )}{" "}
              <span className="font-light text-sm">night</span>
            </span>
          )}
          {dateSelected ? (
            <span className="text-sm font-medium underline">
              {tripDurationDate}
            </span>
          ) : (
            <div className="flex flex-col">
              <span className="font-light">Add dates for prices</span>
              <div className="flex items-center gap-1">
                <img src={star} className="h-3 w-3" alt="" />
                <span className="font-medium text-xs">
                  {houseInfo?.house_rating}
                </span>
              </div>
            </div>
          )}
        </div>
        <div>
          <Link
            to={userData && dateSelected ? `/${houseInfo?.id}/book` : "#"}
            onClick={(e) => {
              if (!dateSelected) {
                scrollToSection("calendar");
              } else {
                if (!userData) {
                  dispatch(setShowLogin(true)); // Show login modal
                }
              }
            }}
          >
            <button
              className={`${
                dateSelected ? "px-10" : "px-6"
              } rounded-lg flex-center bg-dark-pink h-12`}
            >
              <span className="text-white">
                {dateSelected ? "Reserve" : "Check availability"}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
