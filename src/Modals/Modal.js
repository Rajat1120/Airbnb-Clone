import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import {
  setActiveInput,
  setCurrentMonth,
  setOpenName,
} from "../Header/Form/mainFormSlice";
import { setMinimize } from "../Main/AppSlice";

export const modalContext = createContext();

function Modal({ children }) {
  const openName = useSelector((store) => store.form.openName);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(setOpenName(""));
  };
  const open = setOpenName;

  return (
    <modalContext.Provider value={{ openName, close, open }}>
      {children}
    </modalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const dispatch = useDispatch();

  return cloneElement(children, {
    onClick: () => {
      dispatch(setOpenName(opensWindowName));
    },
  });
}

function Window({ children, name, modalRef, resetRef }) {
  let modalStye = {
    checkIn: ` fixed top-[20.5%] z-10 left-[21%] transition-all duration-[0.2s] w-[53rem]   bg-black bg-opacity-50 rounded-[2rem] `,
    month: `   fixed top-[20.5%] z-10 left-[21%] transition-all duration-[0.2s] w-[53rem]   bg-black bg-opacity-50 rounded-[2rem]  `,
    flexible: `   fixed top-[20.5%] w-[53rem]  z-10 left-[21%] transition-all duration-[0.2s]  bg-black bg-opacity-50 rounded-[2rem]  `,
    destination: `  fixed top-[20.5%] z-10 left-[21%] transition-all duration-[0.2s]  bg-black bg-opacity-50 rounded-[2rem]  w-[26rem] `,
    checkOut: `    fixed top-[20.5%]  z-10 w-[53rem] left-[21%] transition-all duration-[0.2s]  bg-black bg-opacity-50 rounded-[2rem]  `,
    addGuest: `  fixed top-[20.5%]  z-10 left-[52%] transition-all duration-[0s] w-[26rem]  bg-black bg-opacity-50 rounded-[2rem] `,
  };

  const { openName, close } = useContext(modalContext);

  const data = useSelector((store) => store.form.curSelectInput);
  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (isModalOpen) {
          return;
        } else if (
          ref?.current &&
          !ref.current?.contains(e.target) &&
          (!resetRef?.current || !resetRef.current?.contains(e.target))
        ) {
          close();
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [close, isModalOpen]
  );

  if (name !== openName) return null;

  return createPortal(
    <div className={`${modalStye[data]}`} id="formModal" ref={ref}>
      <div
        className="bg-white shadow-priceCardShadow  rounded-[2rem]  z-50 "
        ref={modalRef}
      >
        {cloneElement(children)}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

export { Open, Window };
