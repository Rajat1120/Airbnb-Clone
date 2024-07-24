import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { setStartScroll } from "../Main/AppSlice";
import { useLocation } from "react-router";

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
      <div>
        <div className="w-[calc(100%-20rem)] flex justify-between mx-auto">
          <h1 className="pt-6 text-[27px] font-[460]">
            Alsisar Haveli - A Heritage Home
          </h1>
          <div className="pt-6 flex justify-between w-[7rem]">
            <span className="underline text-sm font-medium">Share</span>
            <span className="underline text-sm font-medium">save</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HouseDetail;
