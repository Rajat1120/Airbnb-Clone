import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { setShowLogin } from "../../redux/AppSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogout } from "../../api/apiAuthentication";
import { Link } from "react-router-dom";

const MenuItem = ({ text, to, isLink, onClick }) => {
  const cursorClass = to || onClick ? "cursor-pointer" : "cursor-default";

  const content = (
    <span
      onClick={onClick} // Handle click events if provided
      className={`text-sm font-medium flex items-center hover:bg-shadow-gray-light px-5 h-10 w-full ${cursorClass}`}
    >
      {text}
    </span>
  );

  return isLink ? <Link to={to}>{content}</Link> : content;
};

const UserDmodal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(null);
  let userData = useSelector((store) => store.app.userData);

  useEffect(() => {
    function updatePosition() {
      const userDashBoardEl = document.getElementById("user-dashboard");

      if (userDashBoardEl) {
        let rect = userDashBoardEl.getBoundingClientRect();

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
            <MenuItem text="Messages" />
            <MenuItem text="Notification" />
            <MenuItem text="Trips" to="/trips" isLink />
            <MenuItem text="Wishlist" to="/wishlist" isLink />
          </div>
          <div className="w-full py-[0.5px] my-2 z-30 bg-grey-light-50"></div>
          <div>
            <MenuItem text="Manage Listings"></MenuItem>
            <MenuItem text="Refer a host"></MenuItem>
            <MenuItem text="Account"></MenuItem>
          </div>
          <div className="w-full py-[0.5px] my-2 z-30 bg-grey-light-50"></div>
          <div className="mb-2">
            <MenuItem text="Help center"></MenuItem>
            <MenuItem text="Log out" onClick={getUserLogout} />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex mt-2 flex-col justify-between">
            <MenuItem
              text="Sign up"
              onClick={() => dispatch(setShowLogin(true))}
            ></MenuItem>
            <MenuItem
              text="Log in"
              onClick={() => dispatch(setShowLogin(true))}
            ></MenuItem>
          </div>
          <div className="w-full py-[0.5px] z-30 bg-grey-light-50"></div>
          <div className="w-full flex mb-2 mt-2 flex-col justify-between">
            <MenuItem text="Airbnb your home"></MenuItem>
            <MenuItem text="Help center"></MenuItem>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default UserDmodal;
