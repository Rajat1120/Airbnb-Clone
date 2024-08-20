import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import star from "../data/Icons svg/star.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserFavListing,
  setIsFavorite,
  setItemId,
  setUserFavListing,
} from "./AppSlice";
import { svg } from "../data/HeartIconSvg";
import { useQuery } from "@tanstack/react-query";
import { getWishList } from "../Services/apiRooms";

import LongFooter from "../House-detail/LongFooter";

const Wishlist = () => {
  const [wishList, setWishList] = useState(null);
  const favListings = useSelector((store) => store.app.userFavListing);
  const userData = useSelector((store) => store.app.userData);

  const { data, refetch } = useQuery({
    queryKey: ["wishList"],
    queryFn: () => getWishList(favListings),
    enabled: false,
  });

  const imageWidth = 301.91;

  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setWishList(data); // Always set the latest data
    }
  }, [data]);

  if (!userData) {
    return <p>you need to sing in</p>;
  }

  return (
    <div className="relative">
      <div
        id="header"
        className={`  z-50 bg-white fixed top-0  w-full flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      <div className="w-[calc(100%-10rem)] mt-20 pt-9 pb-6 mx-auto">
        <h1 className="text-[2rem] font-medium">Wishlists</h1>
        <div className="grid gap-x-6 py-10 grid-cols-four-col justify-center w-full items-start gap-y-8 grid-flow-row">
          {wishList?.map((item) => (
            <a
              key={item.id}
              href={`/house/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-[24.5rem]"
            >
              <div className="w-full relative h-full  flex gap-y-4 items-center justify-center flex-col">
                {item.guest_favorite === "Guest favourite" && (
                  <div className="absolute w-32 shadow-2xl h-7 flex-center top-3 py-2 left-3 rounded-2xl bg-white">
                    <span className="text-sm font-medium">Guest favourite</span>
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
                    {svg(item.id, favListings)}
                  </button>

                  <img
                    className="rounded-[20px] flex-center w-full h-full object-cover scroll-snap-align-start"
                    src={item.images[0]}
                    alt=""
                    style={{
                      scrollSnapAlign: "start",
                      flexShrink: 0,
                      width: `${imageWidth}px`,
                    }}
                  />
                </div>
                <div className="flex w-full justify-between items-start h-[25%]">
                  <div className="w-[80%]">
                    <p className="text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-[90%] font-medium">
                      {item["house-title"]}
                    </p>
                    <p className="font-light text-grey text-[15px]">
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
      </div>
      <LongFooter></LongFooter>
    </div>
  );
};

export default Wishlist;
