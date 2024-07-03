import styles from "./input.css";
import Header from "./Header/Header";
import Options from "./Main/Options";
import Toggle from "./Main/Toggle";
import House from "./Main/House";
import { useRef, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <div className="px-[40px]">
      <div className="fixed top-0">
        <Header></Header>
      </div>
      <div className="fixed top-[10rem]">
        <Options></Options>
      </div>

      <div className="mt-[16rem] flex justify-center items-center ">
        <House></House>
      </div>
      <SpeedInsights></SpeedInsights>
    </div>
  );
}
