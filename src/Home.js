import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Header from "./Header/Header";
import Options from "./Main/Options";
import House from "./Main/House";
import Footer from "./Footer";
import MobileFooter from "./MobileFooter";
import { getAllRows } from "./Services/apiRooms";
import {
  setSelectedEndDate,
  setSelectedStartDate,
} from "./Header/Form/mainFormSlice";
import styles from "./input.css";

const Home = () => {
  const { startScroll, minimize, userData } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const headerRef = useRef(null);

  const setInitialDates = useCallback(() => {
    const today = new Date();
    const startDate = addDays(today, 1);
    const endDate = addDays(startDate, 5);

    dispatch(setSelectedStartDate(startDate));
    dispatch(setSelectedEndDate(endDate));
  }, [dispatch]);

  useEffect(() => {
    setInitialDates();
  }, [setInitialDates]);

  useQuery({
    queryKey: ["allRows"],
    queryFn: getAllRows,
  });

  const getHeaderClasses = () => {
    const baseClasses =
      "fixed transition-all duration-300 ease-in-out bg-white w-full flex items-start justify-center top-0";
    const zIndexClass = minimize ? "z-50" : "z-10";
    const heightClass = startScroll
      ? minimize
        ? "animate-collapse"
        : "1sm:h-[11rem]"
      : minimize
      ? "animate-expand"
      : "h-[5rem]";

    return `${baseClasses} ${zIndexClass} ${heightClass}`;
  };

  const getOptionsClasses = () => {
    const baseClasses =
      "transition-all duration-300 ease-in-out fixed z-10 w-full bg-white shadow-md 1sm:shadow-none flex-center";
    const visibilityClass = startScroll
      ? "1md:translate-y-0 1sm:translate-y-[3rem]"
      : "1sm:-translate-y-[5.9rem] !shadow-md";
    const positionClass = "1sm:top-[10.8rem] top-[5.7rem]";

    return `${baseClasses} ${visibilityClass} ${positionClass}`;
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div ref={headerRef} id="header" className={getHeaderClasses()}>
        <Header headerRef={headerRef} />
      </div>

      <div className={getOptionsClasses()}>
        <Options />
      </div>

      <div className="w-full flex justify-center items-center mt-[7rem] 2xl:mt-[14rem] 1sm:mt-[13rem]">
        <House />
      </div>

      {userData && (
        <div className="w-full hidden 1smd:flex-center bg-white border-t border-grey-light-50 fixed bottom-0 h-10">
          <Footer />
        </div>
      )}

      <MobileFooter />
      <SpeedInsights />
    </div>
  );
};

export default Home;
