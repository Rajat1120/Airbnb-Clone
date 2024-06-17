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

const modalContext = createContext();

let modalStye = {
  checkIn:
    " fixed top-[20%] left-[22%] h-[35rem] w-[52rem] bg-black bg-opacity-50 rounded-[2rem] ",
  destination:
    "fixed top-[20%] left-[22%] h-[25rem] w-[26rem] bg-black bg-opacity-50 rounded-[2rem] ",
  checkOut:
    "  fixed top-[20%] left-[22%] h-[35rem] w-[52rem] bg-black bg-opacity-50 rounded-[2rem] ",
  guest:
    "fixed top-[20%] left-[52%] h-[25rem] w-[26rem] bg-black bg-opacity-50 rounded-[2rem]",
};
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const dispatch = useDispatch();

  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;

  const curInput = useSelector((store) => store.form.curSelectInput);

  useEffect(() => {
    if (!curInput) close();
  }, [curInput]);

  return (
    <modalContext.Provider value={{ openName, close, open }}>
      {children}
    </modalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(modalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, formRef }) {
  const { openName, close } = useContext(modalContext);
  const data = useSelector((store) => store.form.curSelectInput);

  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref?.current && !ref.current?.contains(e.target)) {
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
      <div ref={formRef}>{cloneElement(children)}</div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
