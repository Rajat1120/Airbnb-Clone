import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowMobileForm } from "../../Main/AppSlice";
import crossIcon from "../../data/Icons svg/cross.svg";
import { motion } from "framer-motion";
import MobileWhereCard from "./MobileWhereCard";
import {
  setOpenWhenCard,
  setOpenWhereCard,
  setOpenWhoCard,
} from "./mainFormSlice";
import MobileWhenCard from "./MobileWhenCard";

const MobileFormModal = () => {
  const showMobileForm = useSelector((state) => state.app.showMobileForm);
  const openWhereCard = useSelector((state) => state.form.openWhereCard);
  const openWhenCard = useSelector((state) => state.form.openWhenCard);
  const openWhoCard = useSelector((state) => state.form.openWhoCard);
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

  useEffect(() => {
    if (showMobileForm) {
      document.body.style.overflow = "hidden";
    } else {
      dispatch(setOpenWhereCard(true));
      dispatch(setOpenWhenCard(false));
      dispatch(setOpenWhoCard(false));
      document.body.style.overflow = "auto";
    }
  }, [showMobileForm, dispatch]);

  if (!showMobileForm) return null;
  return createPortal(
    <div className="fixed  top-0 left-0 w-full h-full bg-shadow-gray-light z-50">
      <motion.div
        initial={{ y: "-10rem", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: [0.25, 1, 0.7, 0.9],
        }}
        className=" grid grid-cols-3 px-4 py-4"
      >
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
      </motion.div>
      <div className="flex-center flex-col gap-y-4">
        <motion.div
          initial={{ y: "-10rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.25, 1, 0.7, 0.9],
          }}
          className={`  w-[calc(100%-40px)] `}
        >
          {openWhereCard ? (
            <MobileWhereCard />
          ) : (
            <div
              onClick={() => {
                dispatch(setOpenWhereCard(true));
                dispatch(setOpenWhenCard(false));
                dispatch(setOpenWhoCard(false));
              }}
              className=" px-4 w-full py-5 h-full cursor-pointer shadow-md bg-white  flex justify-between rounded-2xl"
            >
              <span className="text-grey text-sm font-medium">Where</span>
              <span className=" text-sm font-medium">I'm flexible</span>{" "}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ y: "-5rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.25, 1, 0.7, 0.9],
            delay: 0.1,
          }}
          className="w-[calc(100%-40px)] h-full"
        >
          {openWhenCard ? (
            <MobileWhenCard />
          ) : (
            <div
              onClick={() => {
                dispatch(setOpenWhenCard(true));
                dispatch(setOpenWhereCard(false));
                dispatch(setOpenWhoCard(false));
              }}
              className=" px-4 py-5 h-full shadow-md cursor-pointer bg-white  flex justify-between rounded-2xl"
            >
              <span className="text-grey text-sm font-medium">When</span>
              <span className=" text-sm font-medium">Add dates</span>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ y: "-4rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.25, 1, 0.7, 0.9],
            delay: 0.2,
          }}
          className="w-[calc(100%-40px)] "
        >
          <div
            onClick={() => {
              dispatch(setOpenWhoCard(true));
              dispatch(setOpenWhereCard(false));
              dispatch(setOpenWhenCard(false));
            }}
            className="px-4 py-5 h-full cursor-pointer shadow-md bg-white  flex justify-between rounded-2xl"
          >
            <span className="text-grey text-sm font-medium">Who</span>
            <span className=" text-sm font-medium">Add guests</span>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  );
};

export default MobileFormModal;
