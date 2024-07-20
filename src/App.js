import styles from "./input.css";
import Header from "./Header/Header";
import Options from "./Main/Options";
import Toggle from "./Main/Toggle";
import House from "./Main/House";
import { useRef, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSelector } from "react-redux";

export default function App() {
  const startScroll = useSelector((store) => store.app.startScroll);
  const minimize = useSelector((store) => store.app.minimize);
  let headerRef = useRef();

  return (
    <div className="flex-center relative">
      <div
        ref={headerRef}
        className={` fixed ${
          minimize ? "z-50" : "z-10"
        }  transition-all duration-[0.3s] ease-in-out ${
          !startScroll ? "h-[5rem]" : "h-[11rem]"
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

      <SpeedInsights></SpeedInsights>
    </div>
  );
}
