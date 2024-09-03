import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import star from "../data/Icons svg/star.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserFavListing,
  setIsFavorite,
  setItemId,
  setShowLogin,
  setUserFavListing,
} from "./AppSlice";
import { svg } from "../data/HeartIconSvg";
import { useQuery } from "@tanstack/react-query";
import { getWishList } from "../Services/apiRooms";

import LongFooter from "../House-detail/LongFooter";
import { deleteFavorite, saveFavorite } from "../Services/apiAuthentication";
import { useNavigate } from "react-router";
import MobileFooter from "../MobileFooter";

const Wishlist = () => {
  const [wishList, setWishList] = useState(null);
  const favListings = useSelector((store) => store.app.userFavListing);
  const userData = useSelector((store) => store.app.userData);
  const isFavorite = useSelector((store) => store.app.isFavorite);
  const itemId = useSelector((store) => store.app.itemId);
  const navigate = useNavigate();
  useEffect(() => {
    const handleUpdate = async () => {
      if (itemId && userData) {
        if (isFavorite) {
          await saveFavorite(itemId);
        } else {
          await deleteFavorite(itemId);
        }
      }
    };

    handleUpdate();
  }, [favListings, isFavorite, userData, itemId]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["wishList"],
    queryFn: () => getWishList(favListings),
    enabled: false,
  });
  const imageWidth = 301.91;

  const dispatch = useDispatch();

  let firstRender = useRef(false);

  useEffect(() => {
    let timeoutId;

    if (favListings.length && !firstRender.current) {
      refetch();

      timeoutId = setTimeout(() => {
        firstRender.current = true;
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [refetch, favListings, isLoading]);

  useEffect(() => {
    if (data) {
      setWishList(data); // Always set the latest data
    }
  }, [data]);

  return (
    <div className="relative">
      <div
        id="header"
        className={`  z-50 bg-white hidden fixed top-0  w-full 1xz:flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      <div className="1xs:px-10 px-5  1lg:px-20  1xz:mt-20 pt-9 pb-6 mx-auto">
        <h1 className="text-[2rem] font-medium">Wishlists</h1>
        {!userData && (
          <div className="mt-8">
            <div>
              <h1 className="text-2xl">Log in to view your wishlists</h1>
              <p className="text-grey mt-2 text-sm">
                You can create, view, or edit wishlists once you’ve logged in.
              </p>
              <button
                onClick={() => dispatch(setShowLogin(true))}
                className="bg-dark-pink w-24 mt-5 rounded-lg h-12 text-white"
              >
                Log in
              </button>
            </div>
          </div>
        )}
        {userData && (
          <div className="grid  pt-5 pb-10  gap-x-4 1md:grid-cols-three-col  gap-y-10 1lg:my-grid-cols-four-col justify-center w-full items-start mobile-grid-cols-two-col 1lg:gap-y-4 xl:gap-y-8  1md:gap-y-10 1xs:gap-y-10 grid-flow-row">
            {wishList?.map((item) => (
              <a
                key={item.id}
                href={`/house/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block "
              >
                <div className="1xl:w-full   relative 1xl:h-full   flex gap-y-4 items-center justify-center flex-col">
                  {item.guest_favorite === "Guest favourite" && (
                    <div className="absolute max-w-32 w-full shadow-2xl h-7 hidden 1xs:flex-center top-3 py-2 left-3 rounded-2xl bg-white">
                      <span className="text-sm font-medium">
                        Guest favourite
                      </span>
                    </div>
                  )}
                  <div className="w-full flex items-center justify-start overflow-x-auto h-[75%] scroll-smooth">
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        if (favListings.includes(item.id)) {
                          dispatch(removeUserFavListing(item.id));
                          dispatch(setIsFavorite(false));
                          dispatch(setItemId(item.id));
                        } else {
                          dispatch(setUserFavListing(item.id));
                          dispatch(setIsFavorite(true));
                          dispatch(setItemId(item.id));
                        }
                      }}
                      className="absolute hover:scale-110 top-3 right-4"
                    >
                      {svg(item.id, favListings, userData)}
                    </button>

                    <img
                      className="rounded-[20px] flex-center w-full h-full object-cover scroll-snap-align-start"
                      src={item.images[0]}
                      alt=""
                      style={{
                        scrollSnapAlign: "start",
                        flexShrink: 0,
                        maxWidth: "100%",
                        maxHeight: "100%",
                        aspectRatio: "1/1",
                      }}
                    />
                  </div>
                  <div className="flex w-full justify-between items-start h-[25%]">
                    <div className="w-[80%]">
                      <p className="text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-full max-w-[90%] font-medium">
                        {item["house-title"]}
                      </p>
                      <p className="font-light text-grey max-w-40 overflow-hidden text-ellipsis whitespace-nowrap text-[15px]">
                        {Math.ceil(item.price / 83 + 150)} kilometers away
                      </p>
                      <p className="font-light text-grey text-[15px]">
                        16-21 May
                      </p>
                      <p className="text-[15px] font-medium">
                        ${Math.ceil(item.price / 83)}
                        <span className="font-light text-[15px]"> night</span>
                      </p>
                    </div>
                    <p className="flex gap-x-1 w-[20%] justify-end items-center">
                      {item.house_rating > 2 && (
                        <img src={star} className="w-[15px] h-[15px]" alt="" />
                      )}
                      <span className="font-light text-[15px]">
                        {item.house_rating > 2 && item.house_rating}
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      {userData && (
        <div className="w-full hidden 1xz:block">
          <LongFooter></LongFooter>
        </div>
      )}
      {<MobileFooter></MobileFooter>}
    </div>
  );
};

export default Wishlist;
