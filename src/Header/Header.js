// import myIcon from "./data/airbnb-Img.svg";

import { useState } from "react";
import icon from "../data/airbnbLogo.svg";
import globe from "../data/globe.svg";
import menu from "../data/Menu-Icon.svg";
import person from "../data/person.svg";
import MainForm from "./Form/MainForm";

function Header({ startScroll }) {
  const [onHover, setonHover] = useState("first");
  // startScroll = false;
  let classForAfter = `after:content-[''] after:w-full after:z-10  ${
    !startScroll
      ? " after:animate-moveAfterUp   "
      : " after:animate-moveAfterDown  "
  }  ${
    !startScroll ? "after:bg-grey-light" : " h-[10rem]  after:bg-grey-dim"
  } after:h-[0.6px]`;

  return (
    <div
      className={` ${classForAfter} flex flex-col  relative  bg-white   after:absolute  `}
    >
      <div className="grid grid-cols-3  px-10 ">
        <div className="w-8 ">
          <a href="#">
            <div className="flex h-20 items-center">
              <img className="mr-2  h-34 scale-[1.2] " src={icon} alt="like" />
              <h1 className="text-xl  leading-8   text-pink text-start font-semibold">
                airbnb
              </h1>
            </div>
          </a>
        </div>
        <div
          className={`flex h-20 ${
            !startScroll ? "-translate-y-20 duration-300 " : ""
          } justify-center  items-center px-6`}
        >
          <button className="h-[44] w-[72.65] px-4 py-2 rounded-md font-medium ">
            Stays
          </button>

          <p className="h-[2.5rem] flex items-center justify-center hover:bg-gray-100 hover:text-slate-600 rounded-full text-center w-[8rem] text-grey font-light">
            Experiences
          </p>

          <p className="w-[12rem] h-[2.5rem] text-center hover:bg-gray-100 rounded-full  hover:text-slate-600  flex items-center justify-center  text-grey font-light ">
            Online Experiences
          </p>
        </div>
        <div className="h-20 flex items-center mr-10 justify-end ">
          <a href="#">
            <p className="text-sm h-[2.5rem] flex items-center justify-center rounded-full hover:bg-gray-100  w-[10rem] font-[450]; ">
              Airbnb your home
            </p>
          </a>
          <button className="px-[0.62rem] h-[3rem]  flex items-center justify-center rounded-full hover:bg-gray-100  w-[3rem] ">
            <img className="scale-[0.7] w-[100%]" src={globe} alt="" />
          </button>

          <div className=" py-[8px] pl-[14px] ml-[0.75rem] pr-[8px] hover:shadow-3xl transition-all rounded-3xl border-[1px] border-grey opacity-[0.7] ">
            <button className="w-[62px] flex space-x-3">
              <img src={menu} className="scale-[0.8]" alt="" />
              <img src={person} className="scale-[1.5]" alt="" />
            </button>
          </div>
        </div>
      </div>
      {<MainForm startScroll={startScroll}></MainForm>}
    </div>
  );
}

export default Header;
