import React from "react";
import AddGuest from "./FormFields/AddGuest";

const MobileWhoCard = () => {
  return (
    <div className="w-full py-5 h-full shadow-lg bg-white border border-shadow-gray   rounded-2xl">
      <div className="px-4">
        <h1 className="text-2xl font-[600]">Who's coming?</h1>
        <AddGuest></AddGuest>
      </div>
    </div>
  );
};

export default MobileWhoCard;
