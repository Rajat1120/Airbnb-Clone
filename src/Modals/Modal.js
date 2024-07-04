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

export const modalContext = createContext();

let modalStye = {
  checkIn:
    " fixed top-[20%] z-10 left-[22%]  w-[53rem] bg-black bg-opacity-50 rounded-[2rem] ",
  month:
    " fixed top-[20%] z-10 left-[22%]  w-[53rem] bg-black bg-opacity-50 rounded-[2rem] ",
  flexible:
    " fixed top-[20%] z-10 left-[22%]  w-[53rem] bg-black bg-opacity-50 rounded-[2rem] ",
  destination:
    "fixed top-[20%] z-10 left-[22%]  w-[26rem] bg-black bg-opacity-50 rounded-[2rem] ",
  checkOut:
    "  fixed top-[20%] z-10 left-[22%]  w-[53rem] bg-black bg-opacity-50 rounded-[2rem] ",
  addGuest:
    "fixed top-[20%] z-10 left-[52%]  w-[26rem] bg-black bg-opacity-50 rounded-[2rem]",
};
function Modal({ children }) {
  // const [openName, setOpenName] = useState("");
  const openName = useSelector((store) => store.form.openName);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(setOpenName(""));
  };
  const open = setOpenName;

  // console.log(openName);

  const dateOption = useSelector((state) => state.form.dateOption);

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
    [close]
  );

  if (name !== openName) return null;

  return createPortal(
    <div className={`${modalStye[data]}`} ref={ref}>
      <div className="bg-white shadow-2xl rounded-[2rem]" ref={modalRef}>
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
