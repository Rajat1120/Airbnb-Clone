import React from "react";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import Destination from "../../data/destination";

const MobileWhereCard = () => {
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
          className="border px-4 py-4 gap-x-3  items-center  rounded-lg border-grey-light flex w-full h-full"
          htmlFor="destination"
        >
          <SearchSVG />
          <input
            type="text"
            id="destination"
            className="outline-none placeholder:text-sm  placeholder:font-light placeholder:text-grey"
            placeholder="Search destination"
          />
        </label>
      </div>
      <div className="flex w-full overflow-x-scroll gap-x-4 ">
        {Destination.map((item, i) => (
          <div
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
