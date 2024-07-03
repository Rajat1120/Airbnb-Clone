import React, { useEffect } from "react";
import MainFormContent from "./MainFormContent";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { setActiveInput, setOpenName } from "./mainFormSlice";

const MainForm = ({ startScroll }) => {
  const data = useSelector((store) => store.form.curSelectInput);

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

  const styleForBefore = `before:content-['']  before:bg-shadow-gray before:rounded-full before:z-[2] before:h-full before:w-full before:absolute before:top-0`;

  let onScrollProperty =
    "translate-y-[-5.5rem] backface-hidden border-[3px]  scale-50 self-center  w-[45rem] h-[5.7rem] shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)]  ";

  let onScrollBack = `translate-y-[0.2rem] backface-hidden border-[1.5px] scale-100 self-center  w-[53rem] h-[4rem]
    ${data ? "" : "shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)]"}
   `;

  let classForForm = ` transition-transform duration-[0.3s] ease-in-out border-gray-250 flex ${
    !startScroll ? onScrollProperty : onScrollBack
  }  mb-5   rounded-full ${
    !startScroll ? "" : data ? styleForBefore : ""
  }  absolute    `;
  return (
    <div className="flex items-center  flex-col">
      <div className={classForForm}>
        {!startScroll ? (
          <div
            className={`w-[48rem] ${
              startScroll ? "hidden" : ""
            } flex items-center justify-center h-[6rem] px-[3rem]`}
          >
            <span className="flex w-[58rem] items-center mb-3 self-center  justify-around">
              <button className="text-[1.8rem] h-[6rem]  font-normal ">
                Anywhere
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button className="text-[1.8rem] h-[6rem] font-normal ">
                Any week
              </button>
              <div className="w-[0.2rem] h-[3rem] bg-gray-200"></div>
              <button className="text-3xl w-[18rem] gap-10 flex items-center  justify-center h-[6rem]">
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
    </div>
  );
};

export default MainForm;
