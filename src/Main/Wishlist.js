import React from "react";
import Header from "../Header/Header";

const Wishlist = () => {
  return (
    <div className="relative">
      <div
        id="header"
        className={`   bg-white   w-full flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      <div className="w-[calc(100%-10rem)] pt-9 pb-6 mx-auto">
        <h1 className="text-[2rem] font-medium">Wishlists</h1>
        <div></div>
      </div>
    </div>
  );
};

export default Wishlist;
