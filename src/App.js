import styles from "./input.css";
import Header from "./Header/Header";
import Options from "./Main/Options";
import Toggle from "./Main/Toggle";
import House from "./Main/House";
import { useRef, useState } from "react";

export default function App() {
  const [startScroll, setStartScroll] = useState(true);

  return (
    <div className="px-[40px]">
      <div className="fixed top-0">
        <Header startScroll={startScroll}></Header>
        <Options startScroll={startScroll}></Options>
      </div>

      <div className="mt-[16rem] flex justify-center items-center ">
        <House
          startScroll={startScroll}
          setStartScroll={setStartScroll}
        ></House>
      </div>
    </div>
  );
}
