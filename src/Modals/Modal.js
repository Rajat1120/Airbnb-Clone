import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
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
import AddDays from "../Header/Form/AddDays";

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
  const selectedInput = useSelector((store) => store.form.curSelectInput);
  const { openName, close } = useContext(modalContext);
  const data = useSelector((store) => store.form.curSelectInput);
  const startScroll = useSelector((store) => store.app.startScroll);
  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);
  const ref = useRef();

  const [position, setPosition] = useState(null);
  const [isRendered, setIsRendered] = useState(false);

  useLayoutEffect(() => {
    if (name !== openName) {
      setIsRendered(false);
      return;
    }

    const updatePosition = () => {
      const targetEl = document.getElementById("destination-form");
      const addGuestEl = document.getElementById("addGuest-form");
      let addGuestModal = openName === "addGuest";

      let calendarModalWidth =
        openName === "checkIn" ||
        openName === "checkOut" ||
        openName === "month" ||
        openName === "flexible";

      if (window.innerWidth <= 936 && calendarModalWidth) {
        let modalWidth = "calc(100% - 80px)";

        setPosition({
          top: "202px",
          left: "40px",
          right: "40px",
          position: "fixed",
          width: modalWidth,
        });
      } else {
        const relevantEl = addGuestModal ? addGuestEl : targetEl;
        if (relevantEl) {
          const rect = relevantEl.getBoundingClientRect();
          let addGuestPosition = addGuestModal ? 416 - rect.width : 0;

          setPosition({
            top: `${(rect.top / window.innerHeight) * 100 + 9}%`,
            left: `${
              ((rect.left - addGuestPosition) / window.innerWidth) * 100
            }%`,
            position: "fixed",
            width: null,
            paddingLeft: "auto",
            paddingRight: "auto",
          });
        }
      }

      // Set isRendered to true after position is calculated
      setTimeout(() => setIsRendered(true), 0);
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [openName, name, startScroll]);

  let modalStyle = {
    checkIn: `fixed z-10 1smd:w-[53rem]  bg-black bg-opacity-50 rounded-[2rem]`,
    month: `fixed z-10 w-[53rem] bg-black bg-opacity-50 rounded-[2rem]`,
    flexible: `fixed w-[53rem] z-10 bg-black bg-opacity-50 rounded-[2rem]`,
    destination: `z-10 bg-black bg-opacity-50 rounded-[2rem] w-[26rem]`,
    checkOut: `fixed z-10 1smd:w-[53rem] bg-black bg-opacity-50 rounded-[2rem]`,
    addGuest: `fixed z-10 w-[26rem] bg-black bg-opacity-50 rounded-[2rem]`,
  };

  useEffect(() => {
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
  }, [close, isModalOpen]);

  if (name !== openName || !position || !isRendered) return null;

  return createPortal(
    <div
      style={{
        ...position,
        opacity: isRendered ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      className={`${modalStyle[data]}`}
      id="formModal"
      ref={ref}
    >
      <div
        className="bg-white overflow-x-hidden shadow-modalShadow rounded-[2rem] z-100"
        ref={modalRef}
      >
        {cloneElement(children)}
        <div className="w-full flex justify-center items-center">
          {(selectedInput === "checkIn" || selectedInput === "checkOut") && (
            <AddDays />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

export { Open, Window };
