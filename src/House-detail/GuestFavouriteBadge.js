import React from "react";
import { useSelector } from "react-redux";

// Helper function for formatting the rating
function formatSingleDigit(number) {
  // Convert the number to a string
  let numStr = number.toString();

  // Split the number into the integer and decimal parts
  let [integerPart, decimalPart] = numStr.split(".");

  // Check if the integer part is a single digit and decimal part is undefined
  if (integerPart.length === 1 && !decimalPart) {
    // Append ".0" to the single-digit number
    numStr = integerPart + ".0";
  }

  return numStr;
}

const formatRating = (rating) => {
  return rating && formatSingleDigit(rating);
};

// Image component for the guest favourite badge
const GuestFavouriteImage = ({ src, alt }) => (
  <img className="h-full" src={src} alt={alt} />
);

// Component for displaying the house rating
const HouseRating = ({ rating }) => (
  <span className="h-full w-[196px] flex items-start justify-center">
    <span className="text-[5rem] h-full font-bold leading-[4rem]">
      {formatRating(rating)}
    </span>
  </span>
);

// Main GuestFavouriteBadge component
const GuestFavouriteBadge = () => {
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  const houseRating = houseInfo?.house_rating;

  if (houseInfo.guest_favorite !== "Guest favourite") return null;

  return (
    <div className="mt-4 mb-16 flex flex-col justify-between items-center">
      <div className="h-[8.25rem] items-start flex">
        <GuestFavouriteImage
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
          alt="Guest Favourite Badge Left"
        />
        <HouseRating rating={houseRating} />
        <GuestFavouriteImage
          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
          alt="Guest Favourite Badge Right"
        />
      </div>

      <div className="pb-2 flex-center">
        <span className="text-xl font-medium">Guest favourite</span>
      </div>

      <div className="max-w-96 flex-center">
        <span className="text-center leading-6 font-extralight text-grey w-full px-2 text-base 1xz:text-lg">
          One of the most loved homes on Airbnb based on ratings, reviews, and
          reliability
        </span>
      </div>
    </div>
  );
};

export default GuestFavouriteBadge;
