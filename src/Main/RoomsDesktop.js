import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import star from "../data/Icons svg/star.svg";
import arrow_right from "../data/Icons svg/arrow-right.svg";
import arrow_left from "../data/Icons svg/arrow-left.svg";

import {
  removeUserFavListing,
  setHoveredItem,
  setHoveredItems,
  setIsFavorite,
  setItemId,
  setShowLogin,
  setUserFavListing,
} from "./AppSlice";
import { svg as favSvg } from "../data/HeartIconSvg";

// Utility component to render rating stars and rating value
const Rating = ({ rating }) => (
  <>
    {rating > 2 && <img src={star} className="w-[15px] h-[15px]" alt="Star" />}
    <span className="font-light text-[15px]">{rating > 2 && rating}</span>
  </>
);

// Guest Favorite Badge component
const GuestFavoriteBadge = () => (
  <div className="absolute w-32 shadow-2xl h-7 flex-center top-3 py-2 left-3 rounded-2xl bg-white">
    <span className="text-sm font-medium">Guest favourite</span>
  </div>
);

// Favorite Button component
const FavoriteButton = ({ item, favListings, userData }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!userData) {
          dispatch(setShowLogin(true));
        } else {
          if (favListings.includes(item.id)) {
            dispatch(removeUserFavListing(item.id));
            dispatch(setIsFavorite(false));
            dispatch(setItemId(item.id));
          } else {
            dispatch(setUserFavListing(item.id));
            dispatch(setIsFavorite(true));
            dispatch(setItemId(item.id));
          }
        }
      }}
      className="absolute hover:scale-110 top-3 right-4"
    >
      {favSvg(item?.id, favListings, userData)}
    </button>
  );
};

// Scroll Button component
const ScrollButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="z-10 bg-white hover:scale-105 w-8 flex-center hover:bg-opacity-100 bg-opacity-80 h-8 absolute hover:drop-shadow-md rounded-[50%] border-[1px] border-grey-dim"
    style={{ [direction === "left" ? "left" : "right"]: "2px" }}
  >
    <img
      className="h-4 w-6"
      src={direction === "left" ? arrow_left : arrow_right}
      alt={`Scroll ${direction}`}
    />
  </button>
);

// Main HouseCard Component
const HouseCard = ({
  item,
  hoveredItem,
  hoveredItems,
  localScrollPositions,
  userData,
  favListings,
  handleScroll,
  handleScrollBtn,
  houseImagesRefs,
  index,
}) => {
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch(setHoveredItem(item.id));
    dispatch(setHoveredItems([...hoveredItems, item.id]));
  };

  const handleMouseLeave = () => dispatch(setHoveredItem(null));

  return (
    <a
      key={item.id}
      href={`/house/${item.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        className="1xl:w-full relative 1xl:h-full flex gap-y-4 items-center justify-center flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: index * 0.07 }}
      >
        {item.guest_favorite === "Guest favourite" && <GuestFavoriteBadge />}

        <div
          ref={(el) => (houseImagesRefs.current[item.id] = el)}
          className="w-full flex items-center justify-start overflow-x-auto hide-scrollbar h-[75%] scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
          onScroll={() => handleScroll(item.id)}
        >
          <FavoriteButton
            item={item}
            favListings={favListings}
            userData={userData}
          />

          {hoveredItem === item.id &&
            !localScrollPositions[item.id]?.isAtStart && (
              <ScrollButton
                direction="left"
                onClick={(e) => handleScrollBtn(e, "left", item.id)}
              />
            )}

          {hoveredItem === item.id &&
            !localScrollPositions[item.id]?.isAtEnd && (
              <ScrollButton
                direction="right"
                onClick={(e) => handleScrollBtn(e, "right", item.id)}
              />
            )}

          <img
            className="rounded-[20px] flex-center 2xl:rounded-[30px] w-full h-full object-cover scroll-snap-align-start"
            src={item.images[0]}
            alt=""
            style={{
              scrollSnapAlign: "start",
              flexShrink: 0,
              aspectRatio: "1/1",
              backgroundColor: "#DBDBDB",
            }}
          />
          {hoveredItems?.includes(item.id) &&
            item.images.slice(1).map((img, i) => (
              <img
                className="rounded-[20px] 2xl:rounded-[30px] flex-center w-full h-full object-cover scroll-snap-align-start"
                src={img}
                key={i}
                alt=""
                style={{
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                  scrollSnapStop: "always",
                  aspectRatio: "1/1",
                  backgroundColor: "#DBDBDB",
                }}
              />
            ))}
        </div>

        <div className="flex w-full justify-between items-start h-[25%]">
          <div className="w-[80%]">
            <p className="text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-[90%] font-medium">
              {item["house-title"]}
            </p>
            <p className="font-light text-grey text-[15px]">
              {Math.ceil(item.price / 83 + 150)} kilometers away
            </p>
            <p className="font-light text-grey text-[15px]">16-21 May</p>
            <p className="text-[15px] font-medium">
              ${Math.ceil(item.price / 83)}
              <span className="font-light text-[15px]"> night</span>
            </p>
          </div>

          <Rating rating={item.house_rating} />
        </div>
      </motion.div>
    </a>
  );
};

export default HouseCard;
