import React, { useEffect, useState } from "react";
import star from "../data/Icons svg/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../Main/AppSlice";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  const isVisible = useSelector((store) => store.houseDetail.isVisible);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  const dispatch = useDispatch();
  let houseRating = Boolean(houseInfo?.house_rating > 2);
  let reviewsCount = Boolean(houseInfo?.rating_count);
  let userData = useSelector((store) => store.app.userData);
  function formatSingleDigit(number) {
    // Convert the number to a string
    let numStr = number.toString();

    // Split the number into the integer and decimal parts
    let [integerPart, decimalPart] = numStr.split(".");

    // Check if the integer part is a single digit and decimal part is undefined
    if (integerPart.length === 1 && !decimalPart) {
      // Append ".0" to the single-digit number
      numStr = integerPart + ".0";
    }

    return numStr;
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 566) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div
      className={`w-full px-20 h-20 bg-white fixed top-0  z-50 ${
        showNav ? "" : "hidden"
      } border-b-[1px] border-b-grey-dim`}
    >
      <nav className="h-full mx-20 flex items-center justify-between ">
        <div className="h-full gap-x-6 w-[20rem] flex items-center ">
          <a
            onClick={scrollToSection("header")}
            href="#home"
            className=" text-black text-sm font-medium h-full flex-center border-b-4 border-white hover:border-black"
          >
            Photos
          </a>
          <a
            onClick={scrollToSection("Amenities")}
            href="#about"
            className=" text-black text-sm font-medium h-full flex-center border-b-4 border-white hover:border-black"
          >
            Amenities
          </a>
          <a
            onClick={scrollToSection("Reviews")}
            href="#services"
            className=" text-black text-sm font-medium h-full flex-center border-b-4 border-white hover:border-black"
          >
            Reviews
          </a>
          <a
            onClick={scrollToSection("Location")}
            href="#contact"
            className=" text-black text-sm font-medium h-full flex-center border-b-4 border-white hover:border-black"
          >
            Location
          </a>
        </div>
        {!isVisible && (
          <div className="h-full gap-5 flex items-center">
            <div className="flex flex-col justify-center gap-y-1">
              <div className="flex items-end gap-x-1">
                <span className="font-medium text-base">
                  ${houseInfo?.price}
                </span>
                <span className="text-sm font-light">night</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <img src={star} className="h-3 w-3" alt="" />
                <span className="text-xs font-medium">
                  {houseRating && formatSingleDigit(houseInfo?.house_rating)}
                </span>
                <span className=" flex items-center justify-center">
                  <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
                </span>
                <span className="text-xs font-extralight">
                  {reviewsCount && houseInfo?.rating_count}
                </span>
              </div>
            </div>
            <Link
              to={userData ? `/${houseInfo.id}/book` : "#"}
              onClick={(e) => {
                if (!userData) {
                  e.preventDefault();
                  dispatch(setShowLogin(true));
                }
              }}
            >
              <button className="rounded-lg flex-center bg-dark-pink w-[9.5rem] h-12">
                <span className="text-white">Reserve</span>
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
