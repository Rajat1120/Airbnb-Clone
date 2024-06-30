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
import { setActiveInput, setCurrentMonth } from "../Header/Form/mainFormSlice";

export const modalContext = createContext();

let modalStye = {
  checkIn:
    " fixed top-[20%] left-[22%]  w-[53rem] bg-black bg-opacity-50 rounded-[2rem] ",
  destination:
    "fixed top-[20%] left-[22%]  w-[26rem] bg-black bg-opacity-50 rounded-[2rem] ",
  checkOut:
    "  fixed top-[20%] left-[22%]  w-[53rem] bg-black bg-opacity-50 rounded-[2rem] ",
  addGuest:
    "fixed top-[20%] left-[52%]  w-[26rem] bg-black bg-opacity-50 rounded-[2rem]",
};
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;

  const dispatch = useDispatch();

  const curInput = useSelector((store) => store.form.curSelectInput);
  const region = useSelector((store) => store.form.region);

  useEffect(() => {
    if (!curInput || region) {
      close();
      setOpenName(curInput);
    }
  }, [curInput, dispatch, region]);

  return (
    <modalContext.Provider value={{ openName, close, open }}>
      {children}
    </modalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(modalContext);

  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
}

function Window({ children, name, modalRef, resetRef }) {
  const { openName, close } = useContext(modalContext);

  const data = useSelector((store) => store.form.curSelectInput);

  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (
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
