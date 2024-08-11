import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import arrowLeft from "../data/Icons svg/arrow-left.svg";
import { useSelector } from "react-redux";
const LocationDescriptionModal = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef();
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
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
      }, 150);
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

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white flex justify-center  z-50">
      <div
        id="calendar"
        ref={ref}
        className={`bg-white ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16  opacity-0"
        } fixed top-0   transition-all    duration-[0.2s] flex flex-col ease-in-out items-center  justify-center w-full h-full shadow-md z-50`}
      >
        <div className="w-full h-full items-start flex-col  flex  justify-between  ">
          <div className="w-full flex items-center pl-6 h-16">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
            >
              <img className="w-full h-full" src={arrowLeft} alt="" />
            </button>
          </div>
          <div className="pl-8 pr-8 h-full w-full pb-8">
            <div className="h-full flex w-full">
              <div className="h-full pr-8 w-[25rem] ">
                <span className="text-[32px] leading-9 block font-semibold  mb-8 w-full  mt-4">
                  Where you’ll be
                </span>
                <div className="w-full h-20 pb-10">
                  <span className="block mb-4 font-medium">
                    {houseInfo?.house_location}
                  </span>
                  <span className="block max-h-96 overflow-scroll whitespace-pre-wrap font-light">
                    {children}
                  </span>
                </div>
              </div>
              <div className="h-full min-w-[19rem] max-w-[61rem] ">
                leaf let map
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LocationDescriptionModal;
