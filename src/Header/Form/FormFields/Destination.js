import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveInput, setOpenName, setRegion } from "../mainFormSlice";
import Europe from "../../../data/Continents/europe.jpg";
import MiddleEast from "../../../data/Continents/Middle-East.jpg";
import world from "../../../data/Continents/world.jpg";
import UnitedArabEmirates from "../../../data/Continents/UAE.jpg";
import Thiland from "../../../data/Continents/thisland.jpg";
import SouthEastAsia from "../../../data/Continents/southEash.jpg";

const Destination = ({ setDestination }) => {
  const dispatch = useDispatch();

  const region = useSelector((store) => store.form.region);
  const dateOption = useSelector((store) => store.form.dateOption);
  function handleRegion(region) {
    dispatch(setRegion(region));
    setDestination("");
    dispatch(setActiveInput("checkIn"));
    if (dateOption === "dates") {
      dispatch(setOpenName("checkIn"));
    } else if (dateOption === "month") {
      dispatch(setOpenName("month"));
    } else {
      dispatch(setOpenName("flexible"));
    }
  }

  return (
    <div className="h-full pt-[2rem] px-[1.5rem] shadow-2xl rounded-[2rem] justify-center  z-50 w-full  pb-[1.5rem] bg-white">
      <div className="flex flex-col justify-center items-center">
        <p className="flex mb-3  text-sm font-medium ml-[1rem] w-full justify-self-start items-center ">
          Search by region
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div
            onClick={() => handleRegion("all")}
            className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
          >
            <img
              className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
              src={world}
              alt=""
            />

            <p className="text-[0.85rem] w-[6.9rem] self-start  font-[300] mt-2 ml-4">
              I'm flexible
            </p>
          </div>
          <div
            onClick={() => handleRegion("Europe")}
            className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
          >
            <img
              className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
              src={Europe}
              alt=""
            />
            <p
              className={` text-[0.85rem] ${
                region === "Europe" ? "font-medium" : ""
              } w-[6.9rem] self-start  font-[300] mt-2 ml-4`}
            >
              Europe
            </p>
          </div>
          <div
            onClick={() => handleRegion("Thiland")}
            className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
          >
            <img
              className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
              src={Thiland}
              alt=""
            />
            <p
              className={` text-[0.85rem] ${
                region === "Thiland" ? "font-medium" : ""
              } w-[6.9rem] self-start  font-[300] mt-2 ml-4 `}
            >
              Thailand
            </p>
          </div>
          <div
            onClick={() => handleRegion("Southeast Asia")}
            className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
          >
            <img
              className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
              src={SouthEastAsia}
              alt=""
            />
            <p
              className={`text-[0.85rem] w-[6.9rem]   font-[300] mt-2 ml-4" ${
                region === "SouthAsia" ? "font-medium" : ""
              }`}
            >
              Southeast Asia
            </p>
          </div>
          <div
            onClick={() => handleRegion("United Arab Emirates")}
            className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
          >
            <img
              className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
              src={UnitedArabEmirates}
              alt=""
            />
            <p
              className={` ${
                region === "United Arab Emirates" ? "font-medium" : ""
              } text-[0.85rem] w-[6.9rem] self-start truncate font-[300] mt-2 ml-4`}
            >
              United Arab Emirates
            </p>
          </div>
          <div
            onClick={() => handleRegion("MiddleEast")}
            className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray  h-[9.5rem] "
          >
            <img
              className="rounded-[1rem] hover:cursor-pointer mt-2  max-w-[6.8rem]  border-[0.1rem]"
              src={MiddleEast}
              alt=""
            />
            <p
              className={` text-[0.85rem] ${
                region === "MiddleEast" ? "font-medium" : ""
              } w-[6.9rem] self-start  font-[300] mt-2 ml-4 `}
            >
              Middle East
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
