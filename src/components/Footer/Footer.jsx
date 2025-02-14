import React from "react";
import globe from "../../asset/globe.svg";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  let onCheckoutPage = location.pathname.includes("book");
  return (
    <div
      className={` w-full px-10 py-4  flex 1smd:flex-row flex-col-reverse justify-between items-start gap-y-1 1smd:items-center  ${
        onCheckoutPage ? "bg-shadow-gray-light" : "bg-white"
      }  h-full `}
    >
      <div className=" flex-col 1md:flex-row flex">
        <span className="text-sm text-nowrap font-light">
          © 2024 Airbnb, Inc
        </span>
        <div className="flex items-center ">
          <span className="mx-2 hidden 1md:flex items-center justify-center">
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
          <span className="text-sm text-nowrap font-light">
            Company details
          </span>
        </div>
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
