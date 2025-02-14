import React from "react";

import Review from "./Review";
import Map from "./Map";
import HostDetails from "./HostDetails";
import Insights from "./Insights";
const BottomMainCont = () => {
  return (
    <div className="max-w-7xl w-full 1smm:px-10 1lg:px-20  flex flex-col items-center ">
      <Review></Review>
      <Map></Map>
      <HostDetails></HostDetails>
      <Insights></Insights>
    </div>
  );
};

export default BottomMainCont;
