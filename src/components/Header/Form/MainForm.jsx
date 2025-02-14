import React, { useEffect, useState } from "react";
import MainFormContent from "../../../hooks/MainFormContent";
import ReactDOM from "react-dom";
import searchIcon from "../../../asset/Icons_svg/search-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveInput,
  setMinimizeFormBtn,
  setOpenName,
} from "../../../redux/mainFormSlice";
import { setMinimize, setStartScroll } from "../../../redux/AppSlice";

import { useLocation } from "react-router";

// Custom hook to manage form visibility and effects
const useFormVisibility = () => {
  const minimize = useSelector((store) => store.app.minimize);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (minimize) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [minimize]);

  return isVisible;
};

// Custom hook to manage form state and scroll behavior
const useFormStateManager = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const onHouseDetailPage = location.pathname.includes("/house/");
  const sliceName = onHouseDetailPage ? "houseSlice" : "app";

  useEffect(() => {
    if (location.pathname === "/house") {
      dispatch(setStartScroll(false));
    }
  }, [dispatch, location.pathname]);

  return { onHouseDetailPage, sliceName };
};

// Custom hook to handle minimize button effects
const useMinimizeButtonEffect = (
  minimizeFormBtn,
  minimize,
  dateOption,
  dispatch
) => {
  useEffect(() => {
    if (!minimize) return;

    const buttonActions = {
      anywhere: () => {
        dispatch(setActiveInput("destination"));
        setTimeout(() => dispatch(setOpenName("destination")), 200);
      },
      week: () => {
        const inputType = dateOption === "dates" ? "checkIn" : dateOption;
        dispatch(setActiveInput(inputType));
        setTimeout(() => dispatch(setOpenName(inputType)), 200);
      },
      guest: () => {
        dispatch(setActiveInput("addGuest"));
        setTimeout(() => dispatch(setOpenName("addGuest")), 200);
      },
    };

    const action = buttonActions[minimizeFormBtn];
    if (action) action();
  }, [minimizeFormBtn, dispatch, minimize, dateOption]);
};

// Helper function to generate form classes
const getFormClasses = (minimize, startScroll, curSelectInput) => {
  const styleForBefore = `before:content-[''] ${
    !startScroll
      ? minimize && curSelectInput
        ? "before:animate-bgShadow"
        : "before:bg-white"
      : "before:bg-shadow-gray"
  } before:transition-all before:duration-[0.3s] before:rounded-full before:z-[2] ease-in-out before:h-full before:w-full before:absolute before:top-0`;

  const onScrollProperty =
    "translate-y-[-5.5rem] 1md:translate-x-0 translate-x-6 border-[3px] scale-[.5] self-center inline-block h-[5.7rem] shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)]";
  const onScrollBack = `1md:translate-y-[0.2rem] 1sm:translate-y-[3rem] border-[1.5px] scale-100 self-center 1xz:w-auto 1smd:left-auto 1smd:right-auto 1xz:left-10 1xz:right-10 1smd:w-[53rem] h-[4rem] ${
    curSelectInput ? "" : "shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)]"
  }`;

  const animateForm = minimize ? onScrollBack : onScrollProperty;

  return `transition-all ${
    !minimize ? (!startScroll ? "animate-formBlur" : "") : ""
  } ${
    minimize ? "duration-[0.2s]" : "duration-[0.3s]"
  } ease-in-out border-gray-250 flex ${
    !startScroll ? animateForm : onScrollBack
  } mb-5 rounded-full ${
    !startScroll ? "" : curSelectInput ? styleForBefore : ""
  } absolute flex-center ${minimize ? styleForBefore : ""}`;
};

function useModalClick(isCalendarModalOpen, openName, headerRef, setMinimize) {
  useEffect(() => {
    function handleClick(e) {
      if (isCalendarModalOpen) {
        return;
      } else if (
        !openName &&
        headerRef?.current &&
        !headerRef.current?.contains(e.target)
      ) {
        setMinimize(false);
      }
    }

    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
  }, [isCalendarModalOpen, openName, headerRef, setMinimize]);
}

const BackGroundModal = ({
  isCalendarModalOpen,
  openName,
  headerRef,
  setMinimize,
  onHouseDetailPage,
  minimize,
}) => {
  // Use the custom hook for handling the click events
  useModalClick(isCalendarModalOpen, openName, headerRef, setMinimize);

  return ReactDOM.createPortal(
    <>
      <div
        className={`${
          onHouseDetailPage ? "absolute" : "fixed top-0"
        } opacity-40 w-full h-${minimize ? "full" : "0"} bg-black`}
      ></div>
    </>,
    document.body
  );
};

const SearchButton = ({
  label,
  content,
  onClick,
  extraClasses = "",
  width = "w-full",
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-[1.8rem] h-[6rem] flex-center px-4 font-normal ${extraClasses}`}
    >
      <span
        className={`${width} text-ellipsis overflow-hidden whitespace-nowrap`}
      >
        {content ? content : label}
      </span>
    </button>
  );
};

const Divider = () => <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>;

const GuestButton = ({ content, onClick }) => {
  return (
    <button className="text-3xl flex-center pr-3 h-[6rem]">
      <p
        onClick={onClick}
        className={`${
          content ? "text-black font-normal" : "text-gray-400 font-light"
        } flex-center h-[6rem] w-[11rem]`}
      >
        {content ? content : "Add guests"}
      </p>
      <div
        onClick={onClick}
        className="w-[4rem] flex items-center justify-center bg-pink rounded-full h-[4rem] transition-all duration-[0.2s]"
      >
        <img className="scale-150" src={searchIcon} alt="search icon" />
      </div>
    </button>
  );
};

const SearchForm = ({ minimize }) => {
  const dispatch = useDispatch();
  const { displaySearch, displayGuestInput, displaySearchWeek } = useSelector(
    (store) => store.form
  );

  const handleMinimize = (type) => {
    dispatch(setMinimize(true));
    dispatch(setMinimizeFormBtn(type));
  };

  return (
    <div
      className={`flex-center h-[6rem] ${
        minimize ? "opacity-50" : "opacity-100"
      } transition-all duration-[0.2s] ease-in-out`}
    >
      <SearchButton
        label="Anywhere"
        content={displaySearch}
        onClick={() => handleMinimize("anywhere")}
        extraClasses="text-center max-w-[30rem] min-w-[10rem]"
      />
      <Divider />
      <SearchButton
        label="Any week"
        content={displaySearchWeek}
        onClick={() => handleMinimize("week")}
        width="max-w-[22rem] min-w-[9rem]"
      />
      <Divider />
      <GuestButton
        content={displayGuestInput}
        onClick={() => handleMinimize("guest")}
      />
    </div>
  );
};

const MainComponent = ({ startScroll, minimize }) => {
  return (
    <div className={` ${startScroll ? "hidden" : ""}`}>
      <SearchForm minimize={minimize} />
    </div>
  );
};

// Main
const MainForm = ({ headerRef }) => {
  const {
    curSelectInput,
    minimizeFormBtn,
    dateOption,
    openName,
    isCalendarModalOpen,
  } = useSelector((store) => store.form);
  const dispatch = useDispatch();

  const { onHouseDetailPage, sliceName } = useFormStateManager();
  const isVisible = useFormVisibility();
  useMinimizeButtonEffect(minimizeFormBtn, isVisible, dateOption, dispatch);
  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  const minimize = useSelector((store) => store.app.minimize);
  const formClass = getFormClasses(minimize, startScroll, curSelectInput);

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

  return (
    <div className="flex items-center   flex-col">
      <div className={formClass}>
        {!startScroll && !minimize ? (
          <MainComponent
            startScroll={startScroll}
            minimize={minimize}
          ></MainComponent>
        ) : (
          <MainFormContent></MainFormContent>
        )}
      </div>
      {isVisible && (
        <BackGroundModal
          isCalendarModalOpen={isCalendarModalOpen}
          openName={openName}
          headerRef={headerRef}
          dispatch={dispatch}
          setMinimize={(val) => dispatch(setMinimize(val))}
          onHouseDetailPage={onHouseDetailPage}
          minimize={minimize}
        />
      )}
    </div>
  );
};

export default MainForm;
