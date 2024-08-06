import React from "react";
import share from "../../src/data/Icons svg/shareIcon.svg";
import heart from "../../src/data/Icons svg/heart.svg";
import dots from "../data/Icons svg/dots.svg";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const TopMainCont = () => {
  const { id } = useParams();
  const isLoading = useSelector((store) => store.houseDetail.isLoading);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);

  // Pre-define the grid layout
  const gridLayout = [
    "grid-area-image1",
    "grid-area-image2",
    "grid-area-image3",
    "grid-area-image4",
    "grid-area-image5",
  ];

  return (
    <div className="flex-center flex-col">
      <div className="w-[calc(100%-20rem)] flex justify-between mx-auto">
        <h1 className="pt-6 text-[27px] font-[460]">
          {isLoading ? "Loading" : houseInfo?.title_1}
        </h1>
        <div className="pt-6 flex justify-between w-[10rem]">
          <span className="underline w-[5.2rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex">
            <img className="w-[1.2rem] h-[1.2rem] pt-1" src={share} alt="" />
            <span className="h-[1.2rem]">Share</span>
          </span>
          <span className="underline w-[4.8rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex">
            <img className="w-[1.2rem] h-[1.2rem] pt-1" src={heart} alt="" />
            <span className="h-[1.2rem]">Save</span>
          </span>
        </div>
      </div>
      <div className="w-[calc(100%-20rem)] px-auto">
        <div className="pt-6">
          {isLoading ? (
            <div className="h-[25rem] w-full">Loading...</div>
          ) : (
            <div className="grid-areas rounded-xl overflow-hidden">
              {gridLayout.map((gridArea, index) => (
                <div key={index} className={gridArea}>
                  {houseInfo?.images &&
                    !isLoading &&
                    houseInfo.images[index] && (
                      <img
                        src={houseInfo.images[index]}
                        alt={`House img ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  {index === 4 && (
                    <div className="flex-center cursor-pointer w-[10rem] h-8 bg-white absolute bottom-5 right-5 gap-x-2 rounded-lg border-[1px] border-black">
                      <img src={dots} className="!w-4 !h-4" alt="" />
                      <span className="text-sm font-medium">
                        Show all photos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMainCont;
