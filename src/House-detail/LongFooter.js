import React from "react";
import arrowRight from "../data/Icons svg/arrow-right.svg";
import faceBook from "../data/Icons svg/faceBookIcon.svg";
import twitter from "../data/Icons svg/twitter.svg";
import Insta from "../data/Icons svg/Insta.svg";
import globe from "../data/globe.svg";
import { useLocation } from "react-router";

const LongFooter = () => {
  let location = useLocation();
  let onProfilePage = location.pathname.includes("account-settings");
  return (
    <footer className="w-full hidden 1xz:inline-grid   h-full border-t  border-t-grey-dim ">
      <div
        className={`1lg:px-20 border-y-[1px] ${
          onProfilePage ? "hidden" : ""
        } border-y-grey-dim   h-[5.25rem]`}
      >
        <div className="mx-20  h-full">
          <div className="py-8 items-center gap-x-1 flex">
            <span className="text-sm font-light">Airbnb</span>
            <img className="h-4  w-4" src={arrowRight} alt="" />
            <span className="text-sm font-light">United states</span>
            <img className="h-4 w-4" src={arrowRight} alt="" />
            <span className="text-sm font-light">California</span>
            <img className="h-4 w-4" src={arrowRight} alt="" />
            <span className="text-sm font-light">Los Angeles</span>
          </div>
        </div>
      </div>
      <div className=" h-full 1lg:px-20">
        <div className="mx-20  h-full">
          <div className="w-full h-full 1md:grid 1md:grid-cols-3 flex flex-col relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim">
            <div className="py-12 flex flex-col  gap-y-4">
              <span className="block font-medium text-sm">Support</span>
              <span className="block text-sm font-light">Help Center</span>
              <span className="block text-sm font-light">AirCover</span>
              <span className="block text-sm font-light">
                Anti-discrimination
              </span>
              <span className="block text-sm font-light">
                Disability support
              </span>
              <span className="block text-sm font-light">
                Cancellation options
              </span>
              <span className="block  text-sm font-light">
                Report neighbourhood concern
              </span>
            </div>
            <div className="py-12 flex border-y border-grey-dim 1md:border-y-0 flex-col  gap-y-4">
              <span className="block font-medium text-sm">Hosting</span>
              <span className="block text-sm font-light">Airbnb your home</span>
              <span className="block text-sm font-light">
                AirCover for Hosts
              </span>
              <span className="block text-sm font-light">
                Hosting resources
              </span>
              <span className="block text-sm font-light">Community forum</span>
              <span className="block text-sm font-light">
                Hosting responsibly
              </span>
              <span className="block text-sm font-light">
                Join a free Hosting class
              </span>
            </div>
            <div className="py-12 flex flex-col  gap-y-4">
              <span className="block font-medium text-sm">Airbnb</span>
              <span className="block text-sm font-light">Newsroom</span>
              <span className="block text-sm font-light">New features</span>
              <span className="block text-sm font-light">Careers</span>
              <span className="block text-sm font-light">Investors</span>
              <span className="block text-sm font-light">
                Airbnb.org emergency stays
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="1lg:px-20 w-full 
       "
      >
        <div className="mx-20  h-full">
          <div className=" h-full py-6 flex gap-y-2 1md:gap-y-0 flex-col 1md:flex-row justify-center 1md:justify-between items-center w-full">
            <div className=" items-center  flex gap-x-3 h-full">
              <span className="text-sm font-light">© 2024 Airbnb, Inc.</span>
              <span className=" flex items-center justify-center">
                <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
              </span>
              <span className="text-sm font-light">Privacy</span>
              <span className=" flex items-center justify-center">
                <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
              </span>
              <span className="text-sm font-light">terms</span>
              <span className=" flex items-center justify-center">
                <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
              </span>
              <span className="text-sm font-light">Sitemap</span>
              <span className=" flex items-center justify-center">
                <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
              </span>
              <span className="text-sm font-light">Company details</span>
            </div>
            <div className="w-10rem items-center flex gap-x-3 h-full">
              <div className="flex gap-x-2">
                <img src={globe} className="h-5 w-5" alt="" />
                <span className="text-sm">English (IN)</span>
              </div>
              <div className="">
                <span className="text-sm"> $ Dollar</span>
              </div>
              <div className="flex gap-x-4">
                <img src={faceBook} className="h-[18px] w-[18px]" alt="" />
                <img src={twitter} className="h-[18px] w-[18px]" alt="" />
                <img src={Insta} className="h-[18px] w-[18px]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LongFooter;
