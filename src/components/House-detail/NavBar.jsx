import React, { useEffect, useState } from "react";
import star from "../../asset/Icons_svg/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../../redux/AppSlice";
import { Link } from "react-router-dom";

// A reusable component for navigation links
const NavLink = ({ onClick, href, label }) => (
  <a
    onClick={onClick}
    href={href}
    className="text-black text-sm font-medium h-full flex-center border-b-4 border-white hover:border-black"
  >
    {label}
  </a>
);

// Component for showing the price and reviews section
const PriceAndReviews = ({ houseInfo, houseRating, reviewsCount }) => (
  <div className="h-full gap-5 flex items-center">
    <div className="flex flex-col justify-center gap-y-1">
      <div className="flex items-end gap-x-1">
        <span className="font-medium text-base">${houseInfo?.price}</span>
        <span className="text-sm font-light">night</span>
      </div>
      <div className="flex gap-x-1 items-center">
        <img src={star} className="h-3 w-3" alt="Rating" />
        <span className="text-xs font-medium">
          {houseRating && formatSingleDigit(houseInfo?.house_rating)}
        </span>
        <span className="flex items-center justify-center">
          <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
        </span>
        <span className="text-xs font-extralight">
          {reviewsCount && houseInfo?.rating_count}
        </span>
      </div>
    </div>
    <ReserveButton houseInfo={houseInfo} />
  </div>
);

// Component for the Reserve button
const ReserveButton = ({ houseInfo }) => {
  const dispatch = useDispatch();
  let userData = useSelector((store) => store.app.userData);
  const handleClick = (e) => {
    if (!userData) {
      e.preventDefault();
      dispatch(setShowLogin(true));
    }
  };

  return (
    <Link to={userData ? `/${houseInfo.id}/book` : "#"} onClick={handleClick}>
      <button className="rounded-lg flex-center bg-dark-pink w-[9.5rem] h-12">
        <span className="text-white">Reserve</span>
      </button>
    </Link>
  );
};

const NavbarChild = ({ isVisible, houseInfo }) => {
  let houseRating = Boolean(houseInfo?.house_rating > 2);
  let reviewsCount = Boolean(houseInfo?.rating_count);
  return (
    <nav className="h-full max-w-7xl 1lg:px-20 px-10 w-full flex items-center justify-between">
      <div className="h-full gap-x-6 w-[20rem] flex items-center">
        {/* Reusable navigation links */}
        <NavLink
          onClick={scrollToSection("header")}
          href="#home"
          label="Photos"
        />
        <NavLink
          onClick={scrollToSection("Amenities")}
          href="#about"
          label="Amenities"
        />
        <NavLink
          onClick={scrollToSection("Reviews")}
          href="#services"
          label="Reviews"
        />
        <NavLink
          onClick={scrollToSection("Location")}
          href="#contact"
          label="Location"
        />
      </div>

      {/* Show price and reviews only when isVisible is false */}
      {!isVisible && (
        <PriceAndReviews
          houseInfo={houseInfo}
          houseRating={houseRating}
          reviewsCount={reviewsCount}
        />
      )}
    </nav>
  );
};

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

// Main Component

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  const { isVisible, houseInfo } = useSelector((store) => store.houseDetail);

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

  return (
    <div
      className={`w-full   h-20 bg-white fixed top-0  z-50 ${
        showNav ? "flex-center" : "hidden"
      } border-b-[1px] border-b-grey-dim`}
    >
      <NavbarChild isVisible={isVisible} houseInfo={houseInfo}></NavbarChild>
    </div>
  );
};

export default NavBar;
