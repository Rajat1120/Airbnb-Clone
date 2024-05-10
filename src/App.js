import styles from "./input.css";
import Header from "./Header/Header";
import Options from "./Main/Options";
import Toggle from "./Main/Toggle";
import House from "./Main/House";
import { useRef, useState } from "react";

export default function App() {
  const [startScroll, setStartScroll] = useState(false);

  return (
    <div className="px-[40px]">
      <div className="fixed top-0">
        <Header startScroll={startScroll}></Header>
        <Options startScroll={startScroll}></Options>
      </div>

      <div className="mt-[16rem]">
        <House setStartScroll={setStartScroll}></House>
      </div>
    </div>
  );
}
