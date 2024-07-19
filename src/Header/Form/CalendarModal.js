import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cross from "../../data/Icons svg/cross.svg";

const CalendarModal = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => {
        setVisible(true);
      }, 50); // Small delay to ensure transition is noticeable
    } else {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false)
      }, 200)
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={ref}
        className={`bg-white ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        } transition-all fixed p-6 rounded-[2rem] duration-[0.4s] flex flex-col ease-in-out items-center justify-center shadow-md z-50`}
      >
        <div className="w-full items-center justify-center flex pb-2 mb-3 ">
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
          >
            <img src={cross} alt="" />
          </button>
          <p className="w-[100%] text-xl font-medium justify-center flex items-center">
            Choose a start date
          </p>
        </div>
        <div className="h-[24rem]">{children}</div>
        <div className="h-[2px] m-4 bg-grey-light w-full"></div>
        <div className="flex w-full items-center justify-end">
          <p
            onClick={onClose}
            className="w-28 cursor-pointer h-12 flex items-center justify-center rounded-lg bg-black text-white"
          >
            Apply
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CalendarModal;
