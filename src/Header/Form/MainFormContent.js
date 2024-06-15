import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Modal from "../../Modals/Modal";
import Europe from "../../data/Continents/europe.jpg";
import MiddleEast from "../../data/Continents/Middle-East.jpg";
import world from "../../data/Continents/world.jpg";
import UnitedArabEmirates from "../../data/Continents/UAE.jpg";
import Thiland from "../../data/Continents/thisland.jpg";
import SouthEastAsia from "../../data/Continents/southEash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setActiveElement, setActiveInput, setSearchEl } from "./mainFormSlice";

const MainFormContent = () => {
  const [hoverInput, setHoverInput] = useState(null);
  const data = useSelector((store) => store.form.curSelectInput);
  const dispatch = useDispatch();

  const searchIconRef = useRef();

  function handleAddGuestField(target) {
    dispatch(setActiveInput("guest"));
    dispatch(setSearchEl(true));
  }

  console.log(data);

  return (
    <div className="flex  justify-center  items-center">
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
        <Modal>
          <Modal.Open opens="checkIn">
            <div
              onMouseEnter={() => setHoverInput("checkIn")}
              onMouseLeave={() => setHoverInput(null)}
              className="flex justify-center  items-center"
            >
              <label
                htmlFor="checkIn"
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
                    id="checkIn"
                    placeholder="Add dates"
                  />
                </div>
              </label>
            </div>
          </Modal.Open>
          <Modal.Window name="checkIn">
            <p>check In</p>
          </Modal.Window>
        </Modal>
        <div
          className={`w-[0.05rem] ${
            hoverInput === "checkOut" || hoverInput === "checkIn"
              ? "bg-white"
              : " bg-gray-300"
          } h-[2rem] `}
        ></div>
        <Modal>
          <Modal.Open opens="checkOut">
            <div
              onMouseEnter={() => setHoverInput("checkOut")}
              onMouseLeave={() => setHoverInput(null)}
              className="flex justify-center  items-center"
            >
              <label
                htmlFor="checkOut"
                className={`w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[26.34rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40 
               ${data === "checkOut" ? "rounded-full bg-white" : ""}
              py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
              >
                <>
                  <div className="text-xs font-medium">Check out</div>
                  <input
                    type="text"
                    onFocus={() => dispatch(setActiveInput("checkOut"))}
                    onBlur={() => dispatch(setActiveInput(""))}
                    className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                    id="checkOut"
                    placeholder="Add dates"
                  />
                </>
              </label>
            </div>
          </Modal.Open>
          <Modal.Window name="checkOut">
            <p>checkOut</p>
          </Modal.Window>
        </Modal>
      </div>

      <div
        className={`w-[0.05rem] ${
          hoverInput === "checkOut" || hoverInput === "addGuest"
            ? "bg-white"
            : " bg-gray-300"
        } h-[2rem] `}
      ></div>
      <Modal>
        <div
          onMouseEnter={() => {
            if (data !== "guest") setHoverInput("addGuest");
          }}
          onMouseLeave={() => {
            if (data !== "guest") setHoverInput(null);
          }}
          className={`flex w-[17.7rem] ${
            data === "guest" ? "rounded-full bg-white shadow-inputShadow " : ""
          } justify-center items-center`}
        >
          <Modal.Open opens="addGuest">
            <div className="flex justify-center  items-center">
              <label
                htmlFor="addGuest"
                className={`${
                  data === "guest" ? "w-[12.2rem]" : "w-[14.2rem]"
                } hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
                  ${data === "guest" ? "" : "before:hover:bg-gray-300 "}
              
               before:left-[35.20rem] before:rounded-full before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer`}
              >
                <div className="0">
                  <div className="text-xs font-medium">Who</div>
                  <input
                    type="text"
                    onFocus={(e) => handleAddGuestField(e.target)}
                    onBlur={() => {
                      dispatch(setActiveInput(""));
                      dispatch(setSearchEl(false));
                    }}
                    className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                    id="addGuest"
                    placeholder="Add guests"
                  />
                </div>
              </label>
            </div>
          </Modal.Open>
          {
            <div
              ref={searchIconRef}
              className={`${
                data === "guest" ? "w-[8rem] z-50" : "w-[3rem]"
              } hover:cursor-pointer  flex items-center ${
                data === "guest" ? "justify-start " : "justify-center"
              } duration-200 ease-out ${
                data === "guest" ? "bg-dark-pink" : " bg-pink"
              } ${
                data === "guest" ? "ml-[-1.6rem] mr-2" : " ml-[-0.5rem] "
              } rounded-full h-[3rem]`}
            >
              <img
                className={` ${data === "guest" ? "pl-2 pr-1" : ""} `}
                src={searchIcon}
                alt=""
              />
              {data === "guest" ? (
                <p className="text-center   text-white">Search</p>
              ) : (
                ""
              )}
            </div>
          }
        </div>
        <Modal.Window name="addGuest">
          <p>add guest</p>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default MainFormContent;
