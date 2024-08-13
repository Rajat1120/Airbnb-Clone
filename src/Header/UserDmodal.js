import React from "react";
import ReactDOM from "react-dom";

import { setShowLogin } from "../Main/AppSlice";
import { useDispatch } from "react-redux";

const UserDmodal = ({ isOpen }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed top-[4.5rem] flex flex-col shadow-2xl justify-between rounded-xl w-60 z-50 h-48 bg-white right-20">
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
    </div>,
    document.body
  );
};

export default UserDmodal;
