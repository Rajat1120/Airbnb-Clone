import Header from "./Header/Header";
import Options from "./Main/Options";
import House from "./Main/House";
import Footer from "./Footer";
import MobileFooter from "./MobileFooter";
import { useEffect, useRef } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllRows } from "./Services/apiRooms";
import { addDays } from "date-fns";
import {
  setSelectedEndDate,
  setSelectedStartDate,
} from "./Header/Form/mainFormSlice";

import styles from "./input.css";

export default function Home() {
  const startScroll = useSelector((state) => state.app.startScroll);
  const minimize = useSelector((state) => state.app.minimize);
  const userData = useSelector((state) => state.app.userData);
  const dispatch = useDispatch();
  const headerRef = useRef(null);

  // Function to calculate and dispatch start and end dates
  const setInitialDates = () => {
    const today = new Date();
    const startDate = addDays(today, 1); // Tomorrow's date
    const endDate = addDays(startDate, 5); // 5 days after tomorrow

    dispatch(setSelectedStartDate(startDate));
    dispatch(setSelectedEndDate(endDate));
  };

  // Trigger date setting on component mount
  useEffect(() => {
    setInitialDates();
  }, []);

  // Fetch all rows from the backend
  useQuery({
    queryKey: ["allRows"],
    queryFn: getAllRows,
  });

  // Define dynamic class names based on conditions
  const minimizedHeaderClass = minimize ? "animate-expand" : "h-[5rem]";
  const expandedHeaderClass = minimize ? "animate-collapse" : "1sm:h-[11rem]";
  const headerVisibilityClass = startScroll
    ? "1md:translate-y-0 1sm:translate-y-[3rem]"
    : "1sm:-translate-y-[5.9rem] !shadow-md";

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Header Section */}
      <div
        ref={headerRef}
        id="header"
        className={`fixed ${minimize ? "z-50" : "z-10"} 
        transition-all duration-300 ease-in-out 
        ${startScroll ? expandedHeaderClass : minimizedHeaderClass} 
        bg-white w-full flex items-start justify-center top-0`}
      >
        <Header headerRef={headerRef} />
      </div>

      {/* Options Section */}
      <div
        className={`transition-all duration-300 ease-in-out fixed z-10 w-full 
        bg-white shadow-md 1sm:shadow-none ${headerVisibilityClass} 
        1sm:top-[10.8rem] top-[5.7rem] flex-center`}
      >
        <Options />
      </div>

      {/* Main Content (House Component) */}
      <div className="w-full flex justify-center items-center mt-[7rem] 1sm:mt-[12rem]">
        <House />
      </div>

      {/* Footer (Visible for logged-in users) */}
      {userData && (
        <div className="w-full hidden 1smd:flex-center bg-white border-t border-grey-light-50 fixed bottom-0 h-10">
          <Footer />
        </div>
      )}

      {/* Mobile Footer */}
      <MobileFooter />

      {/* Performance Insights (Vercel) */}
      <SpeedInsights />
    </div>
  );
}
