import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMobileNavOption } from "../../redux/AppSlice";
import { useLocation, useNavigate } from "react-router";

const MobileFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const mobileNavOption = useSelector((state) => state.app.mobileNavOption);
  const userData = useSelector((state) => state.app.userData);

  useEffect(() => {
    if (location.pathname.includes("wishlist")) {
      dispatch(setMobileNavOption("Wishlist"));
    } else if (location.pathname.includes("account-settings")) {
      dispatch(setMobileNavOption("Profile"));
    }
  }, [dispatch, location.pathname]);

  function handleNavOption(option) {
    dispatch(setMobileNavOption(option));
    if (!userData) {
      if (
        option === "Login" &&
        // if the user is already on the login page, don't navigate to it
        !location.pathname.includes("/login")
      ) {
        navigate("/login");
      } else if (
        option === "Wishlist" &&
        // if the user is already on the wishlist page, don't navigate to it
        !location.pathname.includes("/wishlist")
      ) {
        navigate("/wishlist");
      } else if (
        option === "Explore" &&
        // if the user is already on the home page, don't navigate to it
        location.pathname !== "/"
      ) {
        navigate("/");
      }
    } else {
      if (
        option === "Explore" &&
        // if the user is already on the home page, don't navigate to it
        location.pathname !== "/"
      ) {
        navigate("/");
      } else if (
        option === "Wishlist" &&
        // if the user is already on the wishlist page, don't navigate to it
        !location.pathname.includes("/wishlist")
      ) {
        navigate("/wishlist");
      } else if (option === "Trips" && !location.pathname.includes("/trips")) {
        navigate("/trips");
      } else if (
        option === "Profile" &&
        // if the user is already on the profile page, don't navigate to it
        !location.pathname.includes("/account-settings")
      ) {
        navigate("/account-settings");
      }
    }
  }

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

  function ProfileSVG() {
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
          stroke: mobileNavOption === "Profile" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Profile" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Profile" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <circle cx="16" cy="16" r="14" />
          <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62" />
        </g>
      </svg>
    );
  }

  function TripsSVG() {
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
          stroke: mobileNavOption === "Trips" ? "#e63253" : "currentColor",
          strokeWidth: mobileNavOption === "Trips" ? "3" : "2",
          overflow: "visible",
          opacity: mobileNavOption === "Trips" ? "1" : "0.6",
        }}
      >
        <g fill="none">
          <path d="M16.67 24.94c-2.35 3.15-4.7 4.73-7.07 4.73-3.62 0-5.17-2.38-5.53-4.21-.32-1.63.5-3.82.8-4.54l1.75-3.85A205.3 205.3 0 0 1 11.7 6.6L12.6 5l.23-.41c.4-.68 1.5-2.25 3.84-2.25a4.16 4.16 0 0 1 3.78 2.16l.29.5.76 1.37.4.73c1.22 2.3 2.75 5.52 4.02 8.25l2.51 5.5c.27.61 1.16 2.92.83 4.62-.36 1.83-1.9 4.2-5.53 4.2-2.42 0-4.77-1.57-7.06-4.72z" />
          <path d="M16.67 24.94c2.1-2.8 3.34-5.09 3.7-6.84.52-2.63-1.06-4.83-3.7-4.83s-4.23 2.2-3.7 4.83c.35 1.75 1.59 4.03 3.7 6.84z" />
        </g>
      </svg>
    );
  }

  function MessageSVG() {
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
          stroke: "currentColor",
          strokeWidth: "2",
          overflow: "visible",
          opacity: "0.6",
        }}
      >
        <path
          fill="none"
          d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
        />
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
      {userData ? (
        <div className="grid grid-cols-5 py-2 w-full max-w-lg">
          <button
            onClick={() => handleNavOption("Explore")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <SearchSVG></SearchSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Explore" ? "text-dark-pink" : "text-grey"
              }`}
            >
              Explore
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Wishlist")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <HeartSVG></HeartSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Wishlist" ? "text-dark-pink" : "text-grey"
              }`}
            >
              Wishlist
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Trips")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <TripsSVG></TripsSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Trips" ? "text-dark-pink" : "text-grey"
              }`}
            >
              Trips
            </span>
          </button>

          <button className="flex flex-col space-y-1 cursor-auto items-center justify-center">
            <MessageSVG></MessageSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Login" ? "text-dark-pink" : " text-grey"
              }`}
            >
              Messages
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Profile")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <ProfileSVG></ProfileSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Profile" ? "text-dark-pink" : " text-grey"
              }`}
            >
              Profile
            </span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 py-2 max-w-sm w-full">
          <button
            onClick={() => handleNavOption("Explore")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <SearchSVG></SearchSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Explore" ? "text-dark-pink" : "text-grey"
              }`}
            >
              Explore
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Wishlist")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <HeartSVG></HeartSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Wishlist" ? "text-dark-pink" : "text-grey"
              }`}
            >
              Wishlist
            </span>
          </button>
          <button
            onClick={() => handleNavOption("Login")}
            className="flex flex-col space-y-1 items-center justify-center"
          >
            <LoginSVG></LoginSVG>
            <span
              className={`text-[10px] ${
                mobileNavOption === "Login" ? "text-dark-pink" : " text-grey"
              }`}
            >
              Log in
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileFooter;
