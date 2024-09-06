import React, { useEffect, useRef, useState } from "react";
import MainFormContent from "./MainFormContent";
import ReactDOM from "react-dom";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveInput,
  setMinimizeFormBtn,
  setOpenName,
} from "./mainFormSlice";
import { setMinimize, setStartScroll } from "../../Main/AppSlice";

import { useLocation } from "react-router";

const MainForm = ({ headerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [button, setButton] = useState("");
  const data = useSelector((store) => store.form.curSelectInput);
  const minimizeFormBtn = useSelector((store) => store.form.minimizeFormBtn);
  const dateOption = useSelector((store) => store.form.dateOption);
  const location = useLocation();
  let onHouseDetailPage = location.pathname.includes("/house/");

  let sliceName = onHouseDetailPage ? "houseSlice" : "app";
  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  const displaySearch = useSelector((store) => store.form.displaySearch);
  const displayGuestInput = useSelector(
    (store) => store.form.displayGuestInput
  );
  const dispatch = useDispatch();
  const displaySearchWeek = useSelector(
    (store) => store.form.displaySearchWeek
  );
  const curSelectInput = useSelector((store) => store.form.curSelectInput);
  const minimize = useSelector((store) => store.app.minimize);
  const openName = useSelector((store) => store.form.openName);
  const isCalendarModalOpen = useSelector(
    (store) => store.form.isCalendarModalOpen
  );

  useEffect(() => {
    if (location.pathname === "/house") {
      dispatch(setStartScroll(false));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (minimize) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [minimize]);

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
    if (minimizeFormBtn === "anywhere") {
      if (minimize) {
        dispatch(setActiveInput("destination"));
        setTimeout(() => {
          dispatch(setOpenName("destination"));
        }, 200);
      }
    } else if (minimizeFormBtn === "week") {
      if (minimize) {
        if (dateOption === "dates") {
          dispatch(setActiveInput("checkIn"));
          setTimeout(() => {
            dispatch(setOpenName("checkIn"));
          }, 200);
        } else {
          dispatch(setActiveInput(dateOption));
          setTimeout(() => {
            dispatch(setOpenName(dateOption));
          }, 200);
        }
      }
    } else if (minimizeFormBtn === "guest") {
      if (minimize) {
        dispatch(setActiveInput("addGuest"));
        setTimeout(() => {
          dispatch(setOpenName("addGuest"));
        }, 200);
      }
    }
  }, [minimizeFormBtn, dispatch, minimize, isVisible, dateOption]);

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
          className={`${
            onHouseDetailPage ? "absolute" : "fixed top-0"
          }  opacity-40  w-full h-${minimize ? "full" : "0"} bg-black`}
        ></div>
      </>,
      document.body
    );
  };

  const styleForBefore = `before:content-[''] ${
    !startScroll
      ? minimize && curSelectInput
        ? "before:animate-bgShadow"
        : "before:bg-white"
      : "before:bg-shadow-gray"
  }   before:transition-all before:duration-[0.3s] before:rounded-full before:z-[2] ease-in-out  before:h-full before:w-full before:absolute before:top-0`;

  let onScrollProperty =
    "translate-y-[-5.5rem] 1md:translate-x-0 translate-x-6 border-[3px]    scale-[.5] self-center inline-block h-[5.7rem] shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)]  ";

  let onScrollBack = `1md:translate-y-[0.2rem] 1sm:translate-y-[3rem] border-[1.5px] scale-100 self-center 1xz:w-auto 1smd:left-auto 1smd:right-auto 1xz:left-10 1xz:right-10  1smd:w-[53rem] h-[4rem]
    ${data ? "" : "shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)]"}
   `;

  let animateForm = minimize ? onScrollBack : onScrollProperty;

  let classForForm = ` transition-all ${
    !minimize ? (!startScroll ? "animate-formBlur" : "") : ""
  } ${
    minimize ? "duration-[0.2s] " : "duration-[0.3s] "
  } ease-in-out border-gray-250 flex ${
    !startScroll ? `${animateForm} ` : onScrollBack
  }  mb-5   rounded-full ${
    !startScroll ? "" : data ? styleForBefore : ""
  }  absolute ${!startScroll ? "" : ""} flex-center ${
    minimize ? styleForBefore : ""
  } `;
  return (
    <div className="flex items-center   flex-col">
      <div className={classForForm}>
        {!startScroll && !minimize ? (
          <div
            className={` ${startScroll ? "hidden" : ""} flex-center  h-[6rem] `}
          >
            <span
              className={` flex-center p-4 gap-x-2 duration-[0.2s] ease-in-out  ${
                minimize ? "opacity-50 " : "opacity-100"
              }  transition-all  `}
            >
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  dispatch(setMinimizeFormBtn("anywhere"));
                }}
                className="text-[1.8rem] h-[6rem]  flex-center text-center px-2  max-w-[30rem] min-w-[10rem] font-normal "
              >
                <span className="w-full text-nowrap">
                  {displaySearch ? displaySearch : "Anywhere"}
                </span>
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button
                onClick={() => {
                  dispatch(setMinimize(true));
                  dispatch(setMinimizeFormBtn("week"));
                }}
                className="text-[1.8rem] flex-center px-4 h-[6rem]   "
              >
                <span className="max-w-[22rem] min-w-[9rem] text-ellipsis   font-normal overflow-hidden whitespace-nowrap ">
                  {displaySearchWeek ? displaySearchWeek : "Any week"}
                </span>
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button
                onClick={() => {}}
                className={` text-3xl    flex-center   h-[6rem] `}
              >
                <p
                  onClick={() => {
                    dispatch(setMinimize(true));
                    dispatch(setMinimizeFormBtn("guest"));
                  }}
                  className={` ${
                    displayGuestInput
                      ? "text-black font-normal"
                      : "text-gray-400 font-light"
                  }  flex-center h-[6rem] w-[11rem] `}
                >
                  {displayGuestInput ? displayGuestInput : "Add guests"}
                </p>
                <div
                  onClick={() => {
                    dispatch(setMinimize(true));
                    setButton("");
                  }}
                  className={` w-[4rem]  flex items-center justify-center bg-pink justify-self-end transition-all duration-[0.2s]   rounded-full h-[4rem] `}
                >
                  <img className="scale-150" src={searchIcon} alt="" />
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
