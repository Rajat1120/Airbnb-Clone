import React, { useEffect, useState } from "react";
import share from "../../src/data/Icons svg/shareIcon.svg";
import heart from "../../src/data/Icons svg/heart.svg";
import dots from "../data/Icons svg/dots.svg";
import { useNavigate, useParams } from "react-router";
import arrowLeft from "../data/Icons svg/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import ImageGalleryModal from "./ImageGalleryModal";
import { svg } from "../data/HeartIconSvg";
import {
  removeUserFavListing,
  setIsFavorite,
  setItemId,
  setShowLogin,
  setUserFavListing,
} from "../Main/AppSlice";
import { deleteFavorite, saveFavorite } from "../Services/apiAuthentication";

const TopMainCont = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector((store) => store.houseDetail.isLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let userData = useSelector((store) => store.app.userData);
  const dispatch = useDispatch();
  let favListings = useSelector((store) => store.app.userFavListing);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);
  const isFavorite = useSelector((store) => store.app.isFavorite);

  useEffect(() => {
    const handleUpdate = async () => {
      if (houseInfo?.id && userData) {
        if (isFavorite) {
          await saveFavorite(houseInfo.id);
        } else {
          await deleteFavorite(houseInfo.id);
        }
      }
    };

    handleUpdate();
  }, [favListings, isFavorite, userData, houseInfo?.id]);

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
      <div className="w-full 1xz:hidden">
        <div className="w-full px-3 flex items-center  justify-between h-16">
          <button
            onClick={() => navigate(-1)}
            className=" h-8 w-8 rounded-full hover:bg-grey-dim flex-center"
          >
            <img src={arrowLeft} className="w-4 h-4" alt="" />
          </button>
          <div className="  space-x-2 items-center flex justify-between ">
            <button className="underline cursor-auto rounded-full h-8 w-8 flex-center hover:bg-shadow-gray-light text-sm font-medium justify-center  gap-2 items-center flex">
              <img className="w-5 h-5 py-[1px]" src={share} alt="" />
            </button>
            <button
              onClick={() => {
                if (!userData) {
                  dispatch(setShowLogin(true));
                } else {
                  if (favListings.includes(houseInfo.id)) {
                    dispatch(removeUserFavListing(houseInfo.id));
                    dispatch(setIsFavorite(false));
                    dispatch(setItemId(houseInfo.id));
                  } else {
                    dispatch(setUserFavListing(houseInfo.id));
                    dispatch(setIsFavorite(true));
                    dispatch(setItemId(houseInfo.id));
                  }
                }
              }}
              className="underline  rounded-full w-8 h-8 flex-center hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex"
            >
              {svg(houseInfo?.id, favListings, userData)}
            </button>
          </div>
        </div>
        <div className="w-full  ">
          <div
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
            className="w-full  h-full  flex overflow-x-auto"
          >
            {houseInfo?.images.map((img, i) => {
              return (
                <img
                  key={i}
                  style={{
                    scrollSnapAlign: "start",
                    scrollSnapStop: "always",
                    flexShrink: 0,
                    aspectRatio: "16/10",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={img}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl  w-full px-5 1xz:px-10 1lg:px-20  flex justify-between ">
        <div>
          {isLoading ? (
            <div className="pt-6 imgLoader text-[1.68rem] w-96 h-5 mt-10 font-[460]"></div>
          ) : (
            <h1
              className={` pt-6 text-[1.68rem] hidden  1xz:block font-[460] `}
            >
              {houseInfo?.title_1}
            </h1>
          )}
        </div>
        {isLoading ? (
          <div className="pt-6 w-[10rem] h-5"></div>
        ) : (
          <div className="pt-6 hidden  1xz:flex justify-between w-[10rem]">
            <button className="underline w-[5.2rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex">
              <img className="w-[1.2rem] h-[1.2rem] pt-1" src={share} alt="" />
              <span className="h-[1.2rem]">Share</span>
            </button>
            <button
              onClick={() => {
                if (!userData) {
                  dispatch(setShowLogin(true));
                } else {
                  if (favListings.includes(houseInfo.id)) {
                    dispatch(removeUserFavListing(houseInfo.id));
                    dispatch(setIsFavorite(false));
                    dispatch(setItemId(houseInfo.id));
                  } else {
                    dispatch(setUserFavListing(houseInfo.id));
                    dispatch(setIsFavorite(true));
                    dispatch(setItemId(houseInfo.id));
                  }
                }
              }}
              className="underline w-[4.8rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex"
            >
              {svg(houseInfo?.id, favListings, userData)}
              <span className="h-[1.2rem]">Save</span>
            </button>
          </div>
        )}
      </div>
      <div className="max-w-7xl hidden 1xz:block  w-full px-10 1lg:px-20  ">
        <div className="pt-6">
          {isLoading ? (
            <div className="grid-areas rounded-xl overflow-hidden  ">
              {gridLayout.map((gridArea, index) => (
                <div key={index} className={`${gridArea} imgLoader`}></div>
              ))}
            </div>
          ) : (
            <div className="grid-areas hidden 1xz:grid rounded-xl overflow-hidden">
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
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className="flex-center cursor-pointer text-nowrap w-[9rem] 1smm:w-[10rem] h-8 bg-white absolute bottom-5 right-2 1smm:right-5 gap-x-2 rounded-lg border-[1px] border-black"
                    >
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
        <ImageGalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {houseInfo?.images}
        </ImageGalleryModal>
      </div>
    </div>
  );
};

export default TopMainCont;
