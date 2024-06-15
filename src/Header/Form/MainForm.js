import React from "react";
import MainFormContent from "./MainFormContent";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import { useSelector } from "react-redux";

const MainForm = ({ startScroll }) => {
  const data = useSelector((store) => store.form.curSelectInput);

  let onScrollProperty =
    "translate-y-[-5.5rem] backface-hidden border-[3px]  duration-300 scale-50 self-center  w-[45rem] h-[5.7rem] shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)]  ";

  let onScrollBack =
    "translate-y-[0.2rem] backface-hidden border-[1.5px] duration-300 scale-100 self-center  w-[53rem] h-[4rem] shadow-[0_3px_8px_0px_rgba(0,0,0,0.1)] ";

  let classForForm = ` border-gray-250 flex ${
    !startScroll ? onScrollProperty : onScrollBack
  }  mb-5   rounded-full ${data ? "bg-shadow-gray" : ""}  absolute    `;
  return (
    <div className="flex   flex-col">
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
