import React from "react";
import globe from "../src/data/globe.svg";

const Footer = () => {
  return (
    <div className="w-[calc(100%-10rem)] flex justify-between items-center  bg-white  h-full">
      <div className="w-[60% flex">
        <span className="text-sm font-light">© 2024 Airbnb, Inc</span>
        <span className="mx-2 flex items-center justify-center">
          <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
        </span>
        <span className="text-sm font-light">Privacy</span>
        <span className="mx-2 flex items-center justify-center">
          <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
        </span>
        <span className="text-sm font-light">Terms</span>
        <span className="mx-2 flex items-center justify-center">
          <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
        </span>
        <span className="text-sm font-light">Sitemap</span>
        <span className="mx-2 flex items-center justify-center">
          <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
        </span>
        <span className="text-sm font-light">Company details</span>
      </div>
      <div className="flex gap-x-5">
        <div className="flex items-center gap-x-2">
          <img src={globe} className="h-4 w-4" alt="" />
          <span className="text-sm font-medium">English (In)</span>
        </div>
        <span className="text-sm font-medium">$ USD</span>
        <span className="text-sm font-medium">Support & resources</span>
      </div>
    </div>
  );
};

export default Footer;
