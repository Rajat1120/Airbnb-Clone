import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cross from "../../../asset/Icons_svg/cross.svg";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedEndDate,
  setSelectedStartDate,
} from "../../../redux/mainFormSlice";

// Custom hook for modal visibility logic
const useModalVisibility = (isOpen, transitionDuration) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), transitionDuration);
    }
  }, [isOpen, transitionDuration]);

  return { isVisible, shouldRender };
};

// Custom hook for body scroll lock
const useScrollLock = (isOpen) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

// Custom hook for click outside handling
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handler, ref]);
};

// Header Component
const ModalHeader = ({ onClose, onCheckOutPage }) => (
  <div className="w-full px-6 items-center justify-center border-b border-grey-dim 1xz:border-0 flex pb-5">
    <button
      onClick={onClose}
      className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
    >
      <img className="h-4 w-4" src={cross} alt="" />
    </button>
    <p className="w-[100%] text-xl font-medium justify-center flex items-center">
      {onCheckOutPage ? "" : " Choose a start date"}
    </p>
  </div>
);

// Footer Component
const ModalFooter = ({
  onClose,
  clearDates,
  dateNotSelect,
  onCheckOutPage,
}) => (
  <div className="flex w-full items-center px-6 border-t border-grey-dim py-3 space-x-3 justify-end">
    <button onClick={clearDates} className="text-sm underline font-medium">
      Clear dates
    </button>
    <button
      onClick={onClose}
      disabled={dateNotSelect}
      className={`${
        dateNotSelect ? "cursor-not-allowed opacity-30" : "cursor-pointer"
      } ${
        !onCheckOutPage ? "w-28 h-12" : "w-16 h-9 text-sm"
      } flex items-center justify-center rounded-lg bg-black text-white`}
    >
      {onCheckOutPage ? "Save" : "Apply"}
    </button>
  </div>
);

const TRANSITION_DURATION = 200;
const CalendarModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const { selectedStartDate: startDate, selectedEndDate: endDate } =
    useSelector((store) => store.form);

  const onCheckOutPage = location.pathname?.includes("/book");
  const dateNotSelect = onCheckOutPage && (!startDate || !endDate);

  // Use custom hooks
  const { isVisible, shouldRender } = useModalVisibility(
    isOpen,
    TRANSITION_DURATION
  );
  useScrollLock(isOpen);
  useClickOutside(modalRef, onClose);

  const clearDates = () => {
    dispatch(setSelectedEndDate(null));
    dispatch(setSelectedStartDate(null));
  };

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end 1xz:items-center justify-center z-50">
      <div
        id="calendar"
        ref={modalRef}
        className={`bg-white overflow-x-hidden ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        } transition-all fixed pt-6 ${
          onCheckOutPage ? "rounded-xl" : "rounded-t-3xl 1xz:rounded-3xl"
        } duration-[0.4s] w-full 1xz:w-auto 1md:w-auto flex flex-col ease-in-out items-center justify-center shadow-md z-50`}
      >
        <ModalHeader onClose={onClose} onCheckOutPage={onCheckOutPage} />

        <div className="w-full px-10 1md:px-0 overflow-x-hidden 1xz:max-w-max max-w-[26rem]">
          {children}
        </div>

        <ModalFooter
          onClose={onClose}
          clearDates={clearDates}
          dateNotSelect={dateNotSelect}
          onCheckOutPage={onCheckOutPage}
        />
      </div>
    </div>,
    document.body
  );
};

export default CalendarModal;
