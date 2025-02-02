// CheckOutPageHeader.js
import React from "react";
import AirbnbLogo from "../asset/airbnbLogo.svg";

const CheckOutPageHeader = () => {
  return (
    <header className="hidden 1xz:block">
      <div className="pl-6 border-b border-shadow-gray">
        <div className="w-8">
          <a href="/">
            <div className="flex h-20 items-center">
              <img
                className="mr-2 h-34 scale-[1.2]"
                src={AirbnbLogo}
                alt="like"
              />
              <h1 className="text-2xl leading-8 text-pink text-start font-semibold">
                airbnb
              </h1>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default CheckOutPageHeader;
