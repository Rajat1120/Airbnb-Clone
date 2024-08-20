import React from "react";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";

const Trips = () => {
  return (
    <div className="relative">
      <div
        id="header"
        className={`  z-50 bg-white fixed top-0  w-full flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      <div className="w-[calc(100%-10rem)] mt-20 pt-9 pb-6 mx-auto">
        <h1 className="text-[2rem] font-medium">Trips</h1>
        <div className="grid gap-x-6 py-10 grid-cols-four-col justify-center w-full items-start gap-y-8 grid-flow-row"></div>
      </div>
      <LongFooter></LongFooter>
    </div>
  );
};

export default Trips;
