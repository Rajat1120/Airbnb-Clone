import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMobileNavOption } from "./Main/AppSlice";

const MobileFooter = () => {
  const dispatch = useDispatch();
  const mobileNavOption = useSelector((state) => state.app.mobileNavOption);
  function HeartSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Wishlist" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Wishlist" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Wishlist" ? "1" : "0.6",
        }}
      >
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
      </svg>
    );
  }

  function LoginSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Login" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Login" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Login" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <circle cx="16" cy="16" r="14" />
          <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62" />
        </g>
      </svg>
    );
  }

  function SearchSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "24px",
          width: "24px",
          stroke: mobileNavOption === "Explore" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Explore" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Explore" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <circle cx="12" cy="12" r="10" />
          <path d="m19 19 11 11" />
        </g>
      </svg>
    );
  }

  return (
    <div className="w-full fixed bottom-0 1xz:hidden border-t border-shadow-grey flex-center bg-white  ">
      <div className="grid grid-cols-3 py-2 max-w-sm w-full">
        <button
          onClick={() => dispatch(setMobileNavOption("Explore"))}
          className="flex flex-col items-center justify-center"
        >
          <SearchSVG></SearchSVG>
          <span
            className={`text-xs ${
              mobileNavOption === "Explore" ? "text-dark-pink" : "text-grey"
            }`}
          >
            Explore
          </span>
        </button>
        <button
          onClick={() => dispatch(setMobileNavOption("Wishlist"))}
          className="flex flex-col items-center justify-center"
        >
          <HeartSVG></HeartSVG>
          <span
            className={`text-xs ${
              mobileNavOption === "Wishlist" ? "text-dark-pink" : "text-grey"
            }`}
          >
            Wishlist
          </span>
        </button>
        <button
          onClick={() => dispatch(setMobileNavOption("Login"))}
          className="flex flex-col items-center justify-center"
        >
          <LoginSVG></LoginSVG>
          <span
            className={`text-xs ${
              mobileNavOption === "Login" ? "text-dark-pink" : " text-grey"
            }`}
          >
            Log in
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileFooter;
