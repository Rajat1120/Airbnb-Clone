import React from "react";

import Review from "./Review";
import Map from "./Map";
import HostDetails from "./HostDetails";
import Insights from "./Insights";
const BottomMainCont = () => {
  return (
    <div className="w-[calc(100%-10rem)] mx-auto px-[5rem] flex flex-col items-center ">
      <Review></Review>
      <Map></Map>
      <HostDetails></HostDetails>
      <Insights></Insights>
    </div>
  );
};

export default BottomMainCont;
