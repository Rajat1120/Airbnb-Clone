import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import AddGuest from "../Header/Form/FormFields/AddGuest";
import cross from "../data/Icons svg/cross.svg";
import { setCancelGuestUpdate } from "../Main/AppSlice";

const AddGuestModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setVisible(true);
      }, 50); // Small delay to ensure transition is noticeable
    } else {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup on component unmount
    };
  }, [isOpen]);

  const location = useLocation();
  let onCheckOutPage = location.pathname?.includes("/book");

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [onClose]);

  if (!shouldRender) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        id="calendar"
        ref={ref}
        className={`bg-white ${
          visible ? "translate-y-0  opacity-100" : "translate-y-16 opacity-0"
        } transition-all fixed  ${
          onCheckOutPage ? "rounded-xl" : "rounded-3xl"
        } duration-[0.4s] flex flex-col ease-in-out items-center justify-center shadow-md z-50`}
      >
        <div className="p-5">
          <div className="w-full space-y-4 flex flex-col  ">
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
            >
              <img className="h-4 w-4" src={cross} alt="" />
            </button>
            <h3 className="text-2xl font-medium">Guests</h3>
            <AddGuest></AddGuest>
          </div>
        </div>
        <div className="w-full p-5 flex justify-between border-t border-shadow-gray">
          <button
            onClick={() => {
              onClose();

              dispatch(setCancelGuestUpdate(true));
            }}
            className="font-medium underline"
          >
            Cancel
          </button>
          <button
            onClick={() => onClose()}
            className="bg-black text-white w-28  h-12 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGuestModal;
