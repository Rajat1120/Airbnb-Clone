import React, { useState } from "react";

const CheckInOption = () => {
  const [dateOption, setDateOption] = useState("dates");
  return (
    <div className="flex gap-3 bg-shadow-gray rounded-full my-7 h-11 justify-center items-center w-[20rem]  ">
      <span
        onClick={() => setDateOption("dates")}
        className={`rounded-full text-sm font-medium  flex  text-zinc-700  justify-center items-center h-9 w-[6rem] ${
          dateOption === "dates"
            ? "bg-white"
            : "cursor-pointer hover:bg-grey-dim"
        }`}
      >
        Dates
      </span>
      <span
        onClick={() => setDateOption("months")}
        className={`rounded-full text-zinc-700 flex text-sm font-medium justify-center items-center h-9 w-[6rem] ${
          dateOption === "months"
            ? "bg-white   "
            : "cursor-pointer hover:bg-grey-dim"
        }`}
      >
        {" "}
        Months
      </span>
      <span
        onClick={() => setDateOption("flexible")}
        className={`rounded-full  text-zinc-700  text-sm font-medium flex justify-center items-center h-9 w-[6rem] ${
          dateOption === "flexible"
            ? "bg-white"
            : "cursor-pointer hover:bg-grey-dim"
        }`}
      >
        {" "}
        Flexible
      </span>
    </div>
  );
};

export default CheckInOption;
