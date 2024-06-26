// import myIcon from "./data/airbnb-Img.svg";

import { useState } from "react";
import icon from "../data/airbnbLogo.svg";
import globe from "../data/globe.svg";
import menu from "../data/Menu-Icon.svg";
import person from "../data/person.svg";
import MainForm from "./Form/MainForm";
import { useSelector } from "react-redux";

function Header() {
  const startScroll = useSelector((store) => store.app.startScroll);

  let classForAfter = `after:content-[''] ${
    !startScroll ? " after:-translate-y-[5.9rem]" : ""
  } after:transition-transform after:duration-[0.3s] after:ease-in-out after:w-full after:z-10 after:bg-grey-dim after:fixed after:top-[10rem]  after:h-[1px]`;

  return (
    <div
      className={` ${classForAfter} after:mt-2 flex flex-col items-center  relative  bg-white   after:absolute  `}
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
          className={`flex h-20 transition-transform duration-[0.3s] ease-in-out ${
            !startScroll ? "-translate-y-20 " : ""
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
            <p className="text-sm h-[2.5rem] mr-[-0.4rem] flex items-center justify-center rounded-full hover:bg-gray-100  w-[10rem] font-[450]; ">
              Airbnb your home
            </p>
          </a>
          <button className=" h-[3rem] mr-[-0.3rem]  flex items-center justify-center rounded-full hover:bg-gray-100  w-[3rem] ">
            <img className="scale-[0.4] w-[100%]" src={globe} alt="" />
          </button>

          <div className=" py-[8px] pl-[14px] ml-[0.75rem] pr-[8px] hover:shadow-3xl transition-all rounded-3xl border-[1px] border-grey-light opacity-[0.7] ">
            <button className="w-[56px] flex space-x-3">
              <img src={menu} className=" ml-[-0.4rem] scale-[0.8]" alt="" />
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
