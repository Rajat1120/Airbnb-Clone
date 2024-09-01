import Header from "./Header/Header";
import Options from "./Main/Options";
import styles from "./input.css";

import House from "./Main/House";
import { useEffect, useRef } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { getAllRows } from "./Services/apiRooms";
import { addDays } from "date-fns";
import {
  setSelectedEndDate,
  setSelectedStartDate,
} from "./Header/Form/mainFormSlice";
import MobileFooter from "./MobileFooter";
export default function Home() {
  const startScroll = useSelector((store) => store.app.startScroll);
  const minimize = useSelector((store) => store.app.minimize);
  const userData = useSelector((store) => store.app.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const today = new Date();

    // Get tomorrow's date
    const tomorrow = addDays(today, 1);

    // Get the date that is 5 days after tomorrow
    const tomorrowPlusFive = addDays(tomorrow, 5);
    dispatch(setSelectedStartDate(tomorrow));
    dispatch(setSelectedEndDate(tomorrowPlusFive));
  }, [dispatch]);

  useQuery({
    queryKey: ["allRows"],
    queryFn: () => getAllRows(),
  });

  let headerRef = useRef();

  let animateHeaderClass1 = minimize ? "animate-expand" : "h-[5rem]";

  let animateHeaderClass2 = minimize ? "animate-collapse" : "1sm:h-[11rem]";

  return (
    <div className="flex items-center  justify-center flex-col relative">
      <div
        ref={headerRef}
        id="header"
        className={` fixed ${
          minimize ? "z-50" : "z-10"
        }  transition-all duration-[0.3s] ease-in-out ${
          !startScroll ? `${animateHeaderClass1}` : `${animateHeaderClass2}`
        } bg-white   w-full flex items-start justify-center top-0 `}
      >
        <Header headerRef={headerRef}></Header>
      </div>

      <div
        className={`  transition-all duration-[0.3s] ease-in-out flex-center  fixed z-10 w-full  bg-white shadow-md 1sm:shadow-none  ${
          !startScroll
            ? "1sm:-translate-y-[5.9rem] !shadow-md"
            : "1md:translate-y-[0rem] 1sm:translate-y-[3rem] "
        }   1sm:top-[10.8rem] top-[5.7rem]  flex-center  `}
      >
        <Options></Options>
      </div>

      <div className="1sm:mt-[12rem] mt-[7rem]  flex justify-center items-center ">
        <House></House>
      </div>
      {userData ? (
        <div className="w-full hidden  bg-white 1smd:flex-center border-t-[1px] border-grey-light-50 fixed bottom-0 h-10 ">
          <Footer></Footer>
        </div>
      ) : (
        <MobileFooter></MobileFooter>
      )}

      <SpeedInsights></SpeedInsights>
    </div>
  );
}
