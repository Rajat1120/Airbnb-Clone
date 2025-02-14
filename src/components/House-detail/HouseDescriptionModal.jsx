import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import cross from "../../asset/Icons_svg/cross.svg";

// Custom hook for locking body scroll when modal is open
const useBodyOverflowLock = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "unset"; // Enable scrolling when modal is closed
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

// Custom hook for handling click outside modal
const useClickOutside = (ref, onClose) => {
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
  }, [onClose, ref]);
};

// Custom hook for modal visibility logic
const useModalVisibility = (isOpen) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setVisible(true);
      }, 30); // Small delay to ensure transition is noticeable
    } else {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 150); // Delay matches transition duration
    }
  }, [isOpen]);

  return { visible, shouldRender };
};

// Separate modal header for better organization
const ModalHeader = ({ onClose }) => (
  <div className="w-full h-24 items-start flex-col flex pb-2 justify-between mb-3">
    <button
      onClick={onClose}
      className="w-6 h-6 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
    >
      <img className="h-4 w-4" src={cross} alt="Close" />
    </button>
    <p className="w-[100%] text-3xl font-semibold justify-start flex items-center">
      About this place
    </p>
  </div>
);

// Main Component
const HouseDescriptionModal = ({ isOpen, onClose, children }) => {
  const ref = useRef();

  // Use the custom hooks
  useBodyOverflowLock(isOpen);
  useClickOutside(ref, onClose);
  const { visible, shouldRender } = useModalVisibility(isOpen);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
      <div
        id="calendar"
        ref={ref}
        className={`bg-white ${
          visible ? "translate-y-20 opacity-100" : "translate-y-32 opacity-0"
        } transition-all fixed p-6 rounded-[1rem] duration-[0.2s] flex flex-col ease-in-out items-center justify-center w-[calc(100%-5rem)] 1smd:w-auto shadow-md z-50`}
      >
        <ModalHeader onClose={onClose} />
        <div className="max-h-[28rem] pt-4 overflow-scroll min-h-[10rem]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default HouseDescriptionModal;
