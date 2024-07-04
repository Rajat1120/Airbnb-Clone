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
  return (
    <div className="flex-center relative">
      <div className="fixed w-full flex-center top-0">
        <Header></Header>
      </div>

      <div
        className={`  transition-all duration-[0.3s] ease-in-out flex-center  fixed   w-full z-10 bg-white  ${
          !startScroll ? "-translate-y-[5.9rem]" : ""
        }   top-[10.6rem] -z-10 `}
      >
        <Options></Options>
      </div>

      <div className="mt-[17rem] flex justify-center items-center ">
        <House></House>
      </div>

      <SpeedInsights></SpeedInsights>
    </div>
  );
}
