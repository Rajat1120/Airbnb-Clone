import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { setStartScroll } from "../Main/AppSlice";
import { useLocation } from "react-router";
import TopMainCont from "./TopMainCont";
import MidMainCont from "./MidMainCont";
import BottomMainCont from "./BottomMainCont";

const HouseDetail = () => {
  const minimize = useSelector((store) => store.app.minimize);
  let headerRef = useRef();

  const location = useLocation();
  let onHouseDetailPage = location.pathname === "/house";
  let sliceName = onHouseDetailPage ? "houseSlice" : "app";

  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  let animateHeaderClass1 = minimize ? "animate-expand" : "h-[5rem]";

  let animateHeaderClass2 = minimize ? "animate-collapse" : "h-[11rem]";
  return (
    <div className="">
      <div
        ref={headerRef}
        id="header"
        className={`  ${
          minimize ? "z-50" : "z-10"
        }  transition-all duration-[0.3s] ease-in-out ${
          !startScroll ? `${animateHeaderClass1}` : `${animateHeaderClass2}`
        } bg-white   w-full flex items-start justify-center  `}
      >
        <Header headerRef={headerRef}></Header>
      </div>
      <TopMainCont></TopMainCont>
      <MidMainCont></MidMainCont>
      <BottomMainCont></BottomMainCont>
    </div>
  );
};

export default HouseDetail;
