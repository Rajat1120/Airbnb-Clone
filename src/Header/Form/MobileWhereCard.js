import React, { useEffect, useState } from "react";

import Destination from "../../data/destination";
import {
  setDestinationInputVal,
  setOpenWhenCard,
  setOpenWhereCard,
  setRegion,
} from "./mainFormSlice";
import { useDispatch, useSelector } from "react-redux";

const MobileWhereCard = () => {
  const [defaultDestination, setDefaultDestination] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const dispatch = useDispatch();
  const region = useSelector((state) => state.form.region);
  const destinationInputVal = useSelector(
    (state) => state.form.destinationInputVal
  );

  useEffect(() => {
    if (destinationInputVal) {
      setDefaultDestination(destinationInputVal);
    } else if (region !== "all") {
      setDefaultDestination(region);
    } else {
      setDefaultDestination("");
    }
  }, [region, destinationInputVal]);

  function SearchSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          fill: "#000000",
          height: "24px",
          width: "24px",
          stroke: "black",
          strokeWidth: "2",
          overflow: "visible",
        }}
        viewBox="0 -960 960 960"
      >
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
      </svg>
    );
  }
  return (
    <div className="  w-full py-5 h-full border border-shadow-gray shadow-lg bg-white   rounded-2xl">
      <div className="px-6 pb-4">
        <h1 className="text-[1.6rem]  block pb-5 font-semibold">Where to?</h1>
        <label
          className={`border px-4 ${
            showNextButton ? "py-2" : "py-4"
          } gap-x-3  items-center  rounded-lg border-grey-light flex w-full h-full`}
          htmlFor="destination"
        >
          <SearchSVG />
          <input
            onChange={(e) => {
              if (e.target.value) {
                setShowNextButton(true);
              } else {
                setShowNextButton(false);
              }
              dispatch(setDestinationInputVal(e.target.value));
            }}
            type="text"
            id="destination"
            className="outline-none placeholder:text-sm block w-full placeholder:font-light placeholder:text-grey"
            placeholder="Search destination"
            defaultValue={defaultDestination}
          />
          {showNextButton && (
            <button
              onClick={() => {
                dispatch(setOpenWhereCard(false));
                dispatch(setOpenWhenCard(true));
                dispatch(setRegion("all"));
              }}
              className="bg-black text-sm text-white px-4 py-2 rounded-full"
            >
              Next
            </button>
          )}
        </label>
      </div>
      <div className="flex w-full overflow-y-hidden hide-scrollbar overflow-x-scroll gap-x-4 ">
        {Destination.map((item, i) => (
          <div
            onClick={() => {
              dispatch(setRegion(item.iconName));
              dispatch(setOpenWhereCard(false));
              dispatch(setOpenWhenCard(true));
              dispatch(setDestinationInputVal(""));
            }}
            key={item.iconName}
            className={`flex-none ${i === 0 ? "ml-6" : ""} ${
              i === Destination.length - 1 ? "mr-6" : ""
            } w-32`}
          >
            <img
              src={item.link}
              alt={item.iconName}
              className="w-full h-32 border hover:border-black border-grey-light-50 object-cover rounded-lg"
            />
            <p className="text-sm font-light mt-2">{item.iconName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileWhereCard;
