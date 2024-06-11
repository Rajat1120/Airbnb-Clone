import React, { useState } from "react";
import searchIcon from "../../data/Icons svg/search-icon.svg";

const MainFormContent = () => {
  const [hoverInput, setHoverInput] = useState(null);

  return (
    <div className="flex justify-center items-center">
      <div>
        <div
          onMouseEnter={() => setHoverInput("destination")}
          onMouseLeave={() => setHoverInput(null)}
          className={`flex justify-center  items-center`}
        >
          <label
            htmlFor="destination"
            className="w-[17.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-0 before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
          >
            <div className="0">
              <div className="text-xs font-medium">Where</div>
              <input
                type="text"
                className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                id="destination"
                placeholder="Search destinations"
              />
            </div>
          </label>
        </div>
        <div className=":map"></div>
      </div>
      <div
        className={`w-[0.05rem] ${
          hoverInput === "destination" || hoverInput === "checkIn"
            ? "bg-white"
            : " bg-gray-300"
        } h-[2rem] `}
      ></div>
      <div className="flex justify-center items-center">
        <div
          onMouseEnter={() => setHoverInput("checkIn")}
          onMouseLeave={() => setHoverInput(null)}
          className="flex justify-center  items-center"
        >
          <label
            htmlFor="dates"
            className="w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[17.67rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
          >
            <div className="0">
              <div className="text-xs font-medium">Check in</div>
              <input
                type="text"
                className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                id="dates"
                placeholder="Add dates"
              />
            </div>
          </label>
        </div>
        <div
          className={`w-[0.05rem] ${
            hoverInput === "checkOut" || hoverInput === "checkIn"
              ? "bg-white"
              : " bg-gray-300"
          } h-[2rem] `}
        ></div>
        <div
          onMouseEnter={() => setHoverInput("checkOut")}
          onMouseLeave={() => setHoverInput(null)}
          className="flex justify-center  items-center"
        >
          <label
            htmlFor="dates"
            className="w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[26.34rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
          >
            <div className="0">
              <div className="text-xs font-medium">Check out</div>
              <input
                type="text"
                className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                id="dates"
                placeholder="Add dates"
              />
            </div>
          </label>
        </div>
      </div>
      <div
        className={`w-[0.05rem] ${
          hoverInput === "checkOut" || hoverInput === "addGuest"
            ? "bg-white"
            : " bg-gray-300"
        } h-[2rem] `}
      ></div>
      <div
        onMouseEnter={() => setHoverInput("addGuest")}
        onMouseLeave={() => setHoverInput(null)}
        className="flex justify-center items-center"
      >
        <div className="flex justify-center  items-center">
          <label
            htmlFor="destination"
            className="w-[13.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[35.20rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
          >
            <div className="0">
              <div className="text-xs font-medium">Who</div>
              <input
                type="text"
                className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                id="destination"
                placeholder="Add guests"
              />
            </div>
          </label>
        </div>
        <div className="w-[3rem]  flex items-center justify-center bg-pink justify-self-end ml-2 rounded-full h-[3rem]">
          <img src={searchIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainFormContent;
