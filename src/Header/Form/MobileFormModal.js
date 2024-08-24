import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowMobileForm } from "../../Main/AppSlice";
import crossIcon from "../../data/Icons svg/cross.svg";

const MobileFormModal = () => {
  const showMobileForm = useSelector((state) => state.app.showMobileForm);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 751) {
        dispatch(setShowMobileForm(false));
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  if (!showMobileForm) return null;
  return createPortal(
    <div className="fixed  top-0 left-0 w-full h-full bg-shadow-gray-light z-50">
      <div className=" grid grid-cols-3 px-4 py-4">
        <div>
          <div
            onClick={() => dispatch(setShowMobileForm(false))}
            className=" rounded-full cursor-pointer hover:bg-white hover:border-grey-light-50 hover:shadow-md transition-all duration-200 w-9 h-9 border flex-center border-grey-light"
          >
            <img src={crossIcon} className="w-3 h-3" alt="cross" />
          </div>
        </div>
        <div className="flex  gap-x-4">
          <span className="text font-medium decoration-2  underline underline-offset-8">
            Stays
          </span>
          <span className="text-grey font-medium">Experiences</span>
        </div>
        <div></div>
      </div>
      <div className="flex-center flex-col gap-y-4">
        <div className="w-[calc(100%-40px)] px-4 py-5 h-full shadow-md bg-white  flex justify-between rounded-2xl">
          <span className="text-grey text-sm font-medium">Where</span>
          <span className=" text-sm font-medium">I'm flexible</span>
        </div>
        <div className="w-[calc(100%-40px)] px-4 py-5 h-full shadow-md bg-white  flex justify-between rounded-2xl">
          <span className="text-grey text-sm font-medium">When</span>
          <span className=" text-sm font-medium">Add dates</span>
        </div>
        <div className="w-[calc(100%-40px)] px-4 py-5 h-full shadow-md bg-white  flex justify-between rounded-2xl">
          <span className="text-grey text-sm font-medium">Who</span>
          <span className=" text-sm font-medium">Add guests</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileFormModal;
