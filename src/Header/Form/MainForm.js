import React, { useEffect, useRef, useState } from "react";
import MainFormContent from "./MainFormContent";
import ReactDOM from "react-dom";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { setActiveInput, setOpenName } from "./mainFormSlice";
import { setMinimize } from "../../Main/AppSlice";
import Header from "../Header";
import { useModalRef } from "../../Modals/Modal";

const MainForm = ({ startScroll, headerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [button, setButton] = useState("");
  const data = useSelector((store) => store.form.curSelectInput);

  let ref = useRef();

  useEffect(() => {
    if (startScroll) {
      setTimeout(() => {
        setIsScrolling(true);
      }, 700);
    } else {
      setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    }
  }, [startScroll]);

  const minimize = useSelector((store) => store.app.minimize);
  const openName = useSelector((store) => store.form.openName);

  useEffect(() => {
    if (minimize) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [minimize]);

  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!startScroll) {
        dispatch(setActiveInput(""));
      } else {
        dispatch(setOpenName(""));
      }
    },
    [startScroll, dispatch]
  );

  useEffect(() => {
    if (!openName) {
      // dispatch(dispatch(setMinimize(false)));
    }
  }, [openName, dispatch]);

  useEffect(() => {
    if (button === "anywhere") {
      if (isVisible) {
        setTimeout(() => {
          dispatch(setActiveInput("destination"));
          dispatch(setOpenName("destination"));
        }, 200);
      }
    } else if (button === "week") {
      if (isVisible) {
        setTimeout(() => {
          dispatch(setActiveInput("checkIn"));
          dispatch(setOpenName("checkIn"));
        }, 200);
      }
    } else if (button === "guest") {
      if (isVisible) {
        setTimeout(() => {
          dispatch(setActiveInput("addGuest"));
          dispatch(setOpenName("addGuest"));
        }, 200);
      }
    }
  }, [button, dispatch, isVisible]);

  function checkOpenModal(e) {
    const modalElement = document.getElementById("formModal");
    if (openName) {
      return !modalElement?.contains(e.target);
    } else {
      return true;
    }
  }

  const Modal = () => {
    useEffect(() => {
      function handleClick(e) {
        if (
          !openName &&
          headerRef?.current &&
          !headerRef.current?.contains(e.target)
        ) {
          dispatch(setMinimize(false));
        }
      }

      document.addEventListener("click", handleClick, false);
      return () => document.removeEventListener("click", handleClick, false);
    }, []);

    useEffect(() => {
      function handleClick(e) {
        console.log(checkOpenModal(e));
        if (
          headerRef?.current &&
          !headerRef.current?.contains(e.target) &&
          checkOpenModal(e)
        ) {
          dispatch(setMinimize(false));
        }
      }

      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    }, []);

    return ReactDOM.createPortal(
      <>
        <div
          className={`fixed top-0 -z-10 opacity-40  w-full h-${
            minimize ? "full" : "0"
          } bg-black`}
        ></div>
        {/*    <div
          ref={ref}
          className={` bg-white ${
            minimize ? "animate-expand" : "animate-collapse "
          } overflow-hidden fixed z-50 top-[4.7rem] w-full `}
        >
          <div className="p-4">Content here</div>
        </div> */}
      </>,
      document.body
    );
  };

  const styleForBefore = `before:content-['']  before:bg-shadow-gray before:rounded-full before:z-[2] before:h-full before:w-full before:absolute before:top-0`;

  let onScrollProperty =
    "translate-y-[-5.5rem]  border-[3px]  scale-50 self-center  w-[42.5rem] h-[5.7rem] shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)]  ";

  let onScrollBack = `translate-y-[0.2rem]  border-[1.5px] scale-100 self-center  w-[53rem] h-[4rem]
    ${data ? "" : "shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)]"}
   `;

  let animateForm = minimize ? onScrollBack : onScrollProperty;

  let classForForm = ` transition-transform duration-[0.3s] ease-in-out border-gray-250 flex ${
    !startScroll ? `${animateForm}` : onScrollBack
  }  mb-5   rounded-full ${
    !startScroll ? "" : data ? styleForBefore : ""
  }  absolute    `;
  return (
    <div className="flex items-center   flex-col">
      <div className={classForForm}>
        {!startScroll && !minimize ? (
          <div
            className={`w-[48rem] ${
              startScroll ? "hidden" : ""
            } flex items-center justify-center h-[6rem] px-[3rem]`}
          >
            <span className="flex w-[50rem] gap-8 items-center mb-3 self-center  justify-center">
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  setButton("anywhere");
                }}
                className="text-[1.8rem] h-[6rem]  font-normal "
              >
                Anywhere
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  setButton("week");
                }}
                className="text-[1.8rem] h-[6rem] font-normal "
              >
                Any week
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  setButton("guest");
                }}
                className="text-3xl w-[18rem]  gap-6 flex items-center  justify-start h-[6rem]"
              >
                <p className="text-gray-400 font-light">Add guest</p>
                <div className="w-[4rem] flex items-center justify-center bg-pink justify-self-end ml-3 rounded-full h-[4rem]">
                  <img className="scale-125" src={searchIcon} alt="" />
                </div>
              </button>
            </span>
          </div>
        ) : (
          <MainFormContent></MainFormContent>
        )}
      </div>
      {isVisible && <Modal></Modal>}
    </div>
  );
};

export default MainForm;
