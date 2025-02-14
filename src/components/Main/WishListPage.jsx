import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import star from "../../asset/Icons_svg/star.svg";

import MobileFooter from "../../components/Footer/MobileFooter";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import {
  setIsFavorite,
  removeUserFavListing,
  setUserFavListing,
  setItemId,
  setShowLogin,
} from "../../redux/AppSlice";

// Custom hook for wishlist functionality
const useWishlistActions = () => {
  const dispatch = useDispatch();

  const handleFavoriteToggle = (e, itemId, favListings) => {
    e.preventDefault();
    if (favListings.includes(itemId)) {
      dispatch(removeUserFavListing(itemId));
      dispatch(setIsFavorite(false));
    } else {
      dispatch(setUserFavListing(itemId));
      dispatch(setIsFavorite(true));
    }
    dispatch(setItemId(itemId));
  };

  return { handleFavoriteToggle };
};

// Login prompt component
const LoginPrompt = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-8">
      <div>
        <h1 className="text-2xl">Log in to view your wishlists</h1>
        <p className="text-grey mt-2 text-sm">
          You can create, view, or edit wishlists once you've logged in.
        </p>
        <button
          onClick={() => dispatch(setShowLogin(true))}
          className="bg-dark-pink w-24 mt-5 rounded-lg h-12 text-white"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

// Empty wishlist component
const EmptyWishlist = () => (
  <div className="w-full flex gap-y-5 pr-10 absolute flex-col">
    <span className="1xz:text-nowrap">
      Homes you have added to favourites will appear here
    </span>
    <Link to="/">
      <button className="px-6 mt-2 py-3 bg-black text-white border-black border rounded-lg font-medium">
        Start Exploring
      </button>
    </Link>
  </div>
);

// Wishlist item component
const WishlistItem = ({ item, favListings, userData, svg }) => {
  const { handleFavoriteToggle } = useWishlistActions();

  return (
    <a
      href={`/house/${item.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="1xl:w-full relative 1xl:h-full flex gap-y-4 items-center justify-center flex-col">
        {item.guest_favorite === "Guest favourite" && (
          <div className="absolute max-w-32 w-full shadow-2xl h-7 hidden 1xs:flex-center top-3 py-2 left-3 rounded-2xl bg-white">
            <span className="text-sm font-medium">Guest favourite</span>
          </div>
        )}
        <div className="w-full flex items-center justify-start overflow-x-auto h-[75%] scroll-smooth">
          <button
            onClick={(e) => handleFavoriteToggle(e, item.id, favListings)}
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
            <p className="font-light text-grey text-[15px]">16-21 May</p>
            <p className="text-[15px] font-medium">
              ${Math.ceil(item.price / 83)}
              <span className="font-light text-[15px]"> night</span>
            </p>
          </div>
          <div className="flex gap-x-1 w-[20%] justify-end items-center">
            {item.house_rating > 2 && (
              <>
                <img src={star} className="w-[15px] h-[15px]" alt="" />
                <span className="font-light text-[15px]">
                  {item.house_rating}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

// Main Wishlist component
const WishlistPage = ({ userData, isLoading, wishList, favListings, svg }) => {
  return (
    <div className="relative overflow-hidden">
      <div
        id="header"
        className="z-50 bg-white hidden fixed top-0 w-full 1xz:flex items-start justify-center"
      >
        <Header />
      </div>
      <div className="1xs:px-10 px-5 1lg:px-20 1xz:mt-20 pt-9 pb-6 mx-auto">
        <h1 className="text-[2rem] font-medium">Wishlists</h1>

        {!userData && !isLoading && <LoginPrompt />}

        {userData && (
          <div className="grid overflow-y-auto pt-5 pb-10 min-h-[37rem] gap-x-4 1md:grid-cols-three-col gap-y-10 1lg:my-grid-cols-four-col justify-center w-full items-start mobile-grid-cols-two-col 1lg:gap-y-4 xl:gap-y-8 1md:gap-y-10 1xs:gap-y-10 grid-flow-row">
            {!wishList || wishList?.length <= 0 ? (
              <EmptyWishlist />
            ) : (
              wishList?.map((item) => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  favListings={favListings}
                  userData={userData}
                  svg={svg}
                />
              ))
            )}
          </div>
        )}
      </div>

      {userData && (
        <div className="w-full hidden 1xz:block">
          <LongFooter />
        </div>
      )}
      <MobileFooter />
    </div>
  );
};

export default WishlistPage;
