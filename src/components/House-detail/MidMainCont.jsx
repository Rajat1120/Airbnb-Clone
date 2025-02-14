import React from "react";

import { useSelector } from "react-redux";

import HouseInfo from "./ListingDetails";
import BookingForm from "./BookingForm";

const MidMainCont = () => {
  const { houseInfo } = useSelector((store) => store.houseDetail);
  return (
    <div className="max-w-7xl w-full px-2 1xsss:px-5 1xz:px-10 1lg:px-20 mx-auto    relative  ">
      <div className="flex w-full 1xz:border-b 1xz:border-grey-dim justify-between">
        <HouseInfo houseInfo={houseInfo}></HouseInfo>
        <BookingForm houseInfo={houseInfo}></BookingForm>
      </div>
    </div>
  );
};

export default MidMainCont;
