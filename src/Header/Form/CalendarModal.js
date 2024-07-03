import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const CalendarModal = ({ isOpen, onClose, children }) => {
  const ref = useRef();

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

  useEffect(
    function () {
      function handleClick(e) {
        if (ref?.current && !ref.current?.contains(e.target)) {
          console.log("true");
          onClose();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [onClose]
  );

  if (!isOpen) return null;

  /*   const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to the overlay
  }; */

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white p-6 flex flex-col items-center justify-center rounded-md shadow-md z-50"
      >
        {children}
        <div className="flex w-full items-center justify-end">
          <p
            onClick={() => onClose()}
            className="w-28  cursor-pointer h-12 flex items-center justify-center rounded-[0.5rem] bg-black text-white"
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
