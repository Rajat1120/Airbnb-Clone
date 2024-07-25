import React from "react";
import share from "../../src/data/Icons svg/shareIcon.svg";
import heart from "../../src/data/Icons svg/heart.svg";

const TopMainCont = () => {
  return (
    <div className="flex-center flex-col">
      <div className="w-[calc(100%-20rem)] flex justify-between mx-auto">
        <h1 className="pt-6 text-[27px] font-[460]">
          Alsisar Haveli - A Heritage Home
        </h1>
        <div className="pt-6 flex justify-between w-[10rem]">
          <span className="underline w-[5.2rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex">
            <img className="w-[1.2rem] h-[1.2rem] pt-1" src={share} alt="" />{" "}
            <span className="h-[1.2rem]">Share</span>
          </span>
          <span className="underline w-[4.8rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex">
            <img className="w-[1.2rem] h-[1.2rem] pt-1" src={heart} alt="" />
            <span className="h-[1.2rem]">Save</span>
          </span>
        </div>
      </div>
      <div className=" w-[calc(100%-20rem)] px-auto  ">
        <div className="  pt-6 ">
          <div className="grid-areas h-[25rem] overflow-hidden rounded-xl">
            <div className=" relative grid-area-image1">
              <img
                className="w-full h-full object-cover object-center   inset-0"
                src="https://a0.muscache.com/im/pictures/miso/Hosting-36774428/original/15110762-267f-4a08-88ae-2d9d3603284d.jpeg?im_w=1200"
                alt=""
              />
            </div>
            <div className=" bg-green-400 grid-area-image2 "></div>
            <div className="bg-blue-400 grid-area-image3"></div>
            <div className="bg-orange-400 grid-area-image4 "></div>
            <div className="bg-pink grid-area-image5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMainCont;
