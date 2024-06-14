import React, { useState } from "react";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Modal from "../../Modals/Modal";
import Europe from "../../data/Continents/europe.jpg";
import MiddleEast from "../../data/Continents/Middle-East.jpg";
import world from "../../data/Continents/world.jpg";
import UnitedArabEmirates from "../../data/Continents/UAE.jpg";
import Thiland from "../../data/Continents/thisland.jpg";
import SouthEastAsia from "../../data/Continents/southEash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setActiveInput } from "./mainFormSlice";

const MainFormContent = () => {
  const [hoverInput, setHoverInput] = useState(null);
  const data = useSelector((store) => store.form.curSelectInput);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center  items-center">
      <div>
        <Modal>
          <Modal.Open opens="destination">
            <div
              onMouseEnter={() => setHoverInput("destination")}
              onMouseLeave={() => setHoverInput(null)}
              className={`flex justify-center  items-center`}
            >
              <label
                htmlFor="destination"
                className={`w-[17.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-0 before:rounded-full

                
                ${
                  data === "destination" ? "rounded-full bg-white" : ""
                } before:hover:bg-gray-300 
                
                before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
              >
                <div className={` ${data ? "" : ""} `}>
                  <div className="text-xs font-medium">Where</div>
                  <input
                    type="text"
                    onFocus={() => dispatch(setActiveInput("destination"))}
                    onBlur={() => dispatch(setActiveInput(""))}
                    className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                    id="destination"
                    placeholder="Search destinations"
                  />
                </div>
              </label>
            </div>
          </Modal.Open>
          <Modal.Window name="destination">
            <div className="h-full pt-[2rem] px-[1.5rem] shadow-2xl rounded-[2rem] justify-center  w-full  pb-[1.5rem] bg-white">
              <div className="flex flex-col justify-center items-center">
                <p className="flex mb-3  text-sm font-medium ml-[1rem] w-full justify-self-start items-center ">
                  Search by region
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] ">
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={world}
                      alt=""
                    />

                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      I'm flexible
                    </p>
                  </div>
                  <div className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] ">
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={Europe}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Europe
                    </p>
                  </div>
                  <div className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] ">
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={Thiland}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Thailand
                    </p>
                  </div>
                  <div className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] ">
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={SouthEastAsia}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Southeast Asia
                    </p>
                  </div>
                  <div className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] ">
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={UnitedArabEmirates}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start truncate font-[300] mt-2 ml-4">
                      United Arab Emirates
                    </p>
                  </div>
                  <div className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] ">
                    <img
                      className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
                      src={MiddleEast}
                      alt=""
                    />
                    <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
                      Middle East
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Window>
        </Modal>
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
            className={`w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[17.67rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40 
               ${data === "checkIn" ? "rounded-full bg-white" : ""} 
              py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
          >
            <div className="0">
              <div className="text-xs font-medium">Check in</div>
              <input
                type="text"
                onFocus={() => dispatch(setActiveInput("checkIn"))}
                onBlur={() => dispatch(setActiveInput(""))}
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
            className={`w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[26.34rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40 
               ${data === "checkOut" ? "rounded-full bg-white" : ""}
              py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
          >
            <div className="0">
              <div className="text-xs font-medium">Check out</div>
              <input
                type="text"
                onFocus={() => dispatch(setActiveInput("checkOut"))}
                onBlur={() => dispatch(setActiveInput(""))}
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
        className={`flex  ${
          data === "guest" ? "rounded-full bg-white" : ""
        } justify-center items-center`}
      >
        <div className="flex justify-center  items-center">
          <label
            htmlFor="addGuest"
            className={`w-[13.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
              
              before:left-[35.20rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
          >
            <div className="0">
              <div className="text-xs font-medium">Who</div>
              <input
                type="text"
                onFocus={() => dispatch(setActiveInput("guest"))}
                onBlur={() => dispatch(setActiveInput(""))}
                className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                id="addGuest"
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
