import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomerReviews from "./CustomerReviews";
import { setActiveInput } from "../Header/Form/mainFormSlice";
import { setMinimize } from "../Main/AppSlice";
import GuestFavouriteBadge from "./GuestFavouriteBadge";
import RatingsSection from "./RatingSection";

const Review = () => {
  const [showReviewSection, setShowReviewSection] = useState(true);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  const dispatch = useDispatch();

  function isNumberGreaterThanTen(inputString) {
    // Use a regular expression to extract the number from the string
    const numberMatch = inputString?.match(/\d+/);

    // If a number is found, convert it to an integer
    const number = numberMatch ? parseInt(numberMatch[0], 10) : 0;

    // Return true if the number is greater than 10, else return false
    return number > 10;
  }

  useEffect(() => {
    function handleResize() {
      dispatch(setActiveInput(""));
      dispatch(setMinimize(false));
      if (
        window.innerWidth <= 824 &&
        houseInfo.guest_favorite !== "Guest favourite"
      ) {
        setShowReviewSection(false);
      } else {
        setShowReviewSection(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [houseInfo.guest_favorite, dispatch]);

  return (
    <div
      id="Reviews"
      className={`
      ${
        showReviewSection ? "pt-12 " : " "
      }  relative border-t 1xz:border-none w-full border-grey-dim  bg-shadow-gray-light 1xz:bg-white    ]`}
    >
      <GuestFavouriteBadge></GuestFavouriteBadge>

      <RatingsSection showReviewSection={showReviewSection}></RatingsSection>

      {isNumberGreaterThanTen(houseInfo?.rating_count) && (
        <CustomerReviews
          showReviewSection={showReviewSection}
        ></CustomerReviews>
      )}
    </div>
  );
};

export default Review;
