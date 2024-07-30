import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { setMinimize, setStartScroll } from "../Main/AppSlice";
import { useLocation } from "react-router";
import TopMainCont from "./TopMainCont";
import MidMainCont from "./MidMainCont";
import BottomMainCont from "./BottomMainCont";
import Footer from "./Footer";
import NavBar from "./NavBar";

const HouseDetail = () => {
  const location = useLocation();
  let onHouseDetailPage = location.pathname === "/house";
  const minimize = useSelector((store) => store.app.minimize);
  let headerRef = useRef();

  let sliceName = onHouseDetailPage ? "houseSlice" : "app";

  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  let animateHeaderClass1 = minimize ? "animate-expand" : "h-[5rem]";

  let animateHeaderClass2 = minimize ? "animate-collapse" : "h-[11rem]";
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition < 18) {
        // Scrolling up
        setTimeout(() => {
          dispatch(setMinimize(false));
        }, 200);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <div className="relative">
      <div
        ref={headerRef}
        id="header"
        className={`   ${
          minimize ? "z-50" : "z-10"
        }  transition-all duration-[0.3s] ease-in-out ${
          !startScroll ? `${animateHeaderClass1}` : `${animateHeaderClass2}`
        } bg-white   w-full flex items-start justify-center  `}
      >
        <Header headerRef={headerRef}></Header>
      </div>
      <NavBar></NavBar>

      <div className={` ${minimize ? " absolute top-20 -z-10" : ""}  w-full`}>
        <TopMainCont></TopMainCont>
        <MidMainCont></MidMainCont>
        <BottomMainCont></BottomMainCont>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default HouseDetail;
