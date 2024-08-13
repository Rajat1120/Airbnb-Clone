import Header from "./Header/Header";
import Options from "./Main/Options";
import styles from "./input.css";

import House from "./Main/House";
import { useRef } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { getAllRows } from "./Services/apiRooms";

export default function Home() {
  const startScroll = useSelector((store) => store.app.startScroll);
  const minimize = useSelector((store) => store.app.minimize);

  useQuery({
    queryKey: ["allRows"],
    queryFn: () => getAllRows(),
  });

  let headerRef = useRef();

  let animateHeaderClass1 = minimize ? "animate-expand" : "h-[5rem]";

  let animateHeaderClass2 = minimize ? "animate-collapse" : "h-[11rem]";

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
        className={`  transition-all duration-[0.3s] ease-in-out flex-center  fixed z-10 w-full  bg-white  ${
          !startScroll ? "-translate-y-[5.9rem] shadow-md" : ""
        }   top-[10.5rem]  flex-center  `}
      >
        <Options></Options>
      </div>

      <div className="mt-[12rem]   flex justify-center items-center ">
        <House></House>
      </div>
      <div className="w-full flex-center border-t-[1px] border-grey-light-50 fixed bottom-0 h-10 ">
        <Footer></Footer>
      </div>

      <SpeedInsights></SpeedInsights>
    </div>
  );
}
