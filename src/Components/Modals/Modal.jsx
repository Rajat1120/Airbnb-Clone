import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { setOpenName } from "../../redux/mainFormSlice";
import AddDays from "../Header/Form/AddDays";

export const modalContext = createContext();

function Modal({ children, onlyOneTime }) {
  const openName = useSelector((store) => store.form.openName);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(setOpenName(""));
  };
  const open = setOpenName;

  return (
    <modalContext.Provider value={{ openName, close, open, onlyOneTime }}>
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
  const {
    curSelectInput: selectedInput,
    isCalendarModalOpen: isModalOpen,
    dateOption,
  } = useSelector((store) => store.form);
  const { startScroll } = useSelector((store) => store.app);
  const { openName, close, onlyOneTime } = useContext(modalContext);

  const ref = useRef();

  const [position, setPosition] = useState(null);
  const [isRendered, setIsRendered] = useState(false);

  const updatePosition = useCallback(() => {
    if (name !== openName) {
      setIsRendered(false);
      return;
    }

    const targetEl = document.getElementById("destination-form");
    const addGuestEl = document.getElementById("addGuest-form");
    let addGuestModal = openName === "addGuest";

    let calendarModalWidth = [
      "checkIn",
      "checkOut",
      "month",
      "flexible",
    ].includes(openName);

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
          top: `${(rect.bottom / window.innerHeight) * 100}%`,
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
    if (!onlyOneTime?.current) {
      setIsRendered(true);
    }
  }, [openName, onlyOneTime, name]);

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  useLayoutEffect(() => {
    let animationFrameId;

    const runUpdatePosition = () => {
      updatePosition();
      animationFrameId = requestAnimationFrame(runUpdatePosition);
    };

    if (name === openName) {
      runUpdatePosition();
    }

    setTimeout(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (onlyOneTime?.current) {
        onlyOneTime.current = false;
        setIsRendered(true);
      }
    }, 300);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updatePosition, name, onlyOneTime, openName, startScroll]);

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
  }, [close, resetRef, isModalOpen]);

  if (name !== openName || !position || !isRendered) return null;

  return createPortal(
    <div
      style={{
        ...position,
        opacity: isRendered ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      className={`${modalStyle[selectedInput]} mt-2`}
      id="formModal"
      ref={ref}
    >
      <div
        className="bg-white overflow-x-hidden shadow-modalShadow rounded-[2rem] z-100"
        ref={modalRef}
      >
        {cloneElement(children)}
        <div className="w-full flex justify-center items-center">
          {(selectedInput === "checkIn" || selectedInput === "checkOut") &&
            dateOption === "dates" && <AddDays />}
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
