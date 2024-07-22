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
  const [minimizeForm, setMinimizeForm] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [button, setButton] = useState("");
  const data = useSelector((store) => store.form.curSelectInput);
  const dateOption = useSelector((store) => store.form.dateOption);
  const minimize = useSelector((store) => store.app.minimize);
  const openName = useSelector((store) => store.form.openName);
  const isCalendarModalOpen = useSelector(
    (store) => store.form.isCalendarModalOpen
  );

  let ref = useRef();

  useEffect(() => {
    if (minimize) {
      setTimeout(() => {
        setMinimizeForm(true);
      }, 200);
    } else {
      setTimeout(() => {
        setMinimizeForm(false);
      }, 200);
    }
  }, [minimize]);

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
      if (minimize) {
        setTimeout(() => {
          dispatch(setActiveInput("destination"));
          dispatch(setOpenName("destination"));
        }, 0);
      }
    } else if (button === "week") {
      if (minimize) {
        setTimeout(() => {
          if (dateOption === "dates") {
            dispatch(setActiveInput("checkIn"));
            dispatch(setOpenName("checkIn"));
          } else {
            dispatch(setActiveInput(dateOption));
            dispatch(setOpenName(dateOption));
          }
        }, 0);
      }
    } else if (button === "guest") {
      if (minimize) {
        setTimeout(() => {
          dispatch(setActiveInput("addGuest"));
          dispatch(setOpenName("addGuest"));
        }, 0);
      }
    }
  }, [button, dispatch, minimize, isVisible, dateOption]);

  function checkOpenModal(e) {
    const modalElement = document.getElementById("formModal");
    const calendarElement = document.getElementById("calendar");
    if (openName && isCalendarModalOpen) {
      return !calendarElement?.contains(e.target);
    } else if (openName) {
      return !modalElement?.contains(e.target);
    } else {
      return true;
    }
  }

  const Modal = () => {
    useEffect(() => {
      function handleClick(e) {
        if (isCalendarModalOpen) {
          return;
        } else if (
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

  const styleForBefore = `before:content-[''] ${
    !startScroll
      ? minimize
        ? "before:animate-bgShadow"
        : "before:bg-white"
      : "before:bg-shadow-gray"
  }   before:transition-all before:duration-[0.3s] before:rounded-full before:z-[2] ease-in-out  before:h-full before:w-full before:absolute before:top-0`;

  let onScrollProperty =
    "translate-y-[-5.5rem]  border-[3px]  scale-[.5] self-center  w-[42.5rem] h-[5.7rem] shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)]  ";

  let onScrollBack = `translate-y-[0.2rem]  border-[1.5px] scale-100 self-center  w-[53rem] h-[4rem]
    ${data ? "" : "shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)]"}
   `;

  let animateForm = minimize ? onScrollBack : onScrollProperty;

  let classForForm = ` transition-all ${
    minimize ? "duration-[0.2s] " : "duration-[0.3s] "
  } ease-in-out border-gray-250 flex ${
    !startScroll ? `${animateForm}` : onScrollBack
  }  mb-5   rounded-full ${
    !startScroll ? "" : data ? styleForBefore : ""
  }  absolute  flex-center ${minimize ? styleForBefore : ""} `;
  return (
    <div className="flex items-center   flex-col">
      <div className={classForForm}>
        {!startScroll && !minimizeForm ? (
          <div
            className={`w-[58rem] ${
              startScroll ? "hidden" : ""
            } flex-center  h-[6rem] `}
          >
            <span
              className={` flex-center  duration-[0.2s] ease-in-out  ${
                minimize ? "opacity-50 w-[58rem]" : "w-[50rem]"
              }  transition-all  `}
            >
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  setButton("anywhere");
                }}
                className="text-[1.8rem] h-[6rem] px-8 flex-center  font-normal "
              >
                Anywhere
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  setButton("week");
                }}
                className="text-[1.8rem] px-8 h-[6rem] font-normal "
              >
                Any week
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  setButton("guest");
                }}
                className={` text-3xl w-[20rem]  px-10 mr-[-2rem]  flex-center  gap-8 h-[6rem] `}
              >
                <p className="text-gray-400 font-light">Add guest</p>
                <div
                  className={` w-[4rem] ${
                    minimize ? "scale-90" : ""
                  } flex items-center justify-center bg-pink justify-self-end transition-all duration-[0.2s]   rounded-full h-[4rem] `}
                >
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
