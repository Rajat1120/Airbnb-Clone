import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { setStartScroll } from "../Main/AppSlice";
import { useLocation } from "react-router";

const HouseDetail = () => {
  const startScroll = useSelector((store) => store.app.startScroll);

  const minimize = useSelector((store) => store.app.minimize);
  let headerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStartScroll(false));
  }, [dispatch]);

  let animateHeaderClass1 = minimize ? "animate-expand" : "h-[5rem]";

  let animateHeaderClass2 = minimize ? "animate-collapse" : "h-[11rem]";
  return (
    <div className="flex-center relative">
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
    </div>
  );
};

export default HouseDetail;
