import React, { useState, useRef, useEffect } from "react";
import menu from "../data/Menu-Icon.svg";
import person from "../data/person.svg";
import UserDmodal from "./UserDmodal";
import { getUserData } from "../Services/apiAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Main/AppSlice";

const UserDashboard = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const buttonRef = useRef(null);

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsUserModalOpen(!isUserModalOpen);
  };
  let userData = useSelector((store) => store.app.userData);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setIsUserModalOpen(false);
      }
    }

    function handleBlur() {
      setIsUserModalOpen(false);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        isUserModalOpen
      ) {
        setIsUserModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserModalOpen]);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={toggleModal}
        className={`py-[7px] pl-[14px] ml-[0.75rem] pr-[8px] hover:shadow-3xl transition-all rounded-3xl border-[1px] border-grey-light ${
          userData ? "" : "opacity-95"
        } `}
      >
        <button className="w-[3.8rem] items-center flex justify-between">
          <img src={menu} className="h-4 w-4" alt="" />
          {!userData ? (
            <img src={person} className="h-8 opacity-50 w-8" alt="" />
          ) : (
            <span className="h-8 w-8 rounded-full text-white text-center flex items-center justify-center bg-black text-[9.5px]">
              {userData?.user_metadata?.name.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      </div>
      <UserDmodal isOpen={isUserModalOpen} />
    </>
  );
};

export default UserDashboard;
