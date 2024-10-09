import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { setShowLogin } from "../Main/AppSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogout } from "../Services/apiAuthentication";
import { Link } from "react-router-dom";

const UserDmodal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);
  let userData = useSelector((store) => store.app.userData);

  useEffect(() => {
    function updatePosition() {
      const userDashBoardEl = document.getElementById("user-dashboard");

      if (userDashBoardEl) {
        let rect = userDashBoardEl.getBoundingClientRect();
        console.log(rect);

        setPosition({
          right: `${
            ((window.innerWidth - rect.right) / window.innerWidth) * 100
          }%`,
          top: `${(rect.bottom / window.innerHeight) * 100}%`,
        });
      }
    }
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      style={position}
      className="fixed mt-2 hidden 1xz:flex flex-col shadow-2xl justify-between rounded-xl w-60 z-50  bg-white "
    >
      {userData ? (
        <div>
          <div className="w-full flex mt-2 flex-col justify-between">
            <span className="text-sm  w-full flex items-center font-medium hover:bg-shadow-gray-light h-10 px-5">
              Messages
            </span>
            <span className="text-sm font-medium  flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
              Notification
            </span>
            <Link to={"/trips"}>
              <span className="text-sm font-medium cursor-pointer flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
                Trips
              </span>
            </Link>
            <Link to={"/wishlist"}>
              <span className="text-sm font-medium cursor-pointer flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
                Wishlist
              </span>
            </Link>
          </div>
          <div className="w-full py-[0.5px] my-2 z-30 bg-grey-light-50"></div>
          <div>
            <span className="text-sm  flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
              Manage Listings
            </span>
            <span className="text-sm  flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
              Refer a host
            </span>
            <span className="text-sm  flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
              Account
            </span>
          </div>
          <div className="w-full py-[0.5px] my-2 z-30 bg-grey-light-50"></div>
          <div>
            <span className="text-sm  flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full">
              Help center
            </span>
            <span
              onClick={() => getUserLogout()}
              className="text-sm mb-2 cursor-pointer  flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full"
            >
              Log out
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex mt-2 flex-col justify-between">
            <span
              onClick={() => dispatch(setShowLogin(true))}
              className="text-sm cursor-pointer w-full flex items-center font-medium hover:bg-shadow-gray-light h-10 px-5"
            >
              Sign up
            </span>
            <span
              onClick={() => dispatch(setShowLogin(true))}
              className="text-sm cursor-pointer flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full"
            >
              Log in
            </span>
          </div>
          <div className="w-full py-[0.5px] z-30 bg-grey-light-50"></div>
          <div className="w-full flex mb-2 mt-2 flex-col justify-between">
            <span className="text-sm hover:bg-shadow-gray-light px-5 flex items-center h-10 w-full">
              Airbnb your home
            </span>
            <span className="text-sm hover:bg-shadow-gray-light px-5 h-10 flex items-center w-full">
              Help center
            </span>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default UserDmodal;
