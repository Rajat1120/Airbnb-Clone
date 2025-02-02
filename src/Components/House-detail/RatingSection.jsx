import React from "react";
import star from "../../asset/Icons_svg/star.svg";
import spray from "../../asset/Icons_svg/Spray.svg";
import checkMark from "../../asset/Icons_svg/accuracy.svg";
import key from "../../asset/Icons_svg/key.svg";
import msg from "../../asset/Icons_svg/msg.svg";
import location from "../../asset/Icons_svg/location.svg";
import value from "../../asset/Icons_svg/value.svg";
import { useSelector } from "react-redux";

const StarRating = ({ houseRating, ratingCount, formatSingleDigit }) => {
  return (
    <div className="h-[1.87rem] px-5 1smm:px-0 mb-10 gap-x-2 flex items-center w-full">
      <div className="flex items-center gap-x-2">
        <span>
          <img className="w-6 h-6" src={star} alt="star" />
        </span>
        {houseRating && (
          <span className="text-2xl font-medium">
            {formatSingleDigit(houseRating)}
          </span>
        )}
      </div>

      {houseRating && (
        <span className="flex items-center justify-center">
          <span className="w-[4px] h-[4px] bg-current rounded-full"></span>
        </span>
      )}
      <span className="text-2xl font-medium">{ratingCount}</span>
    </div>
  );
};

const SingleRatingItem = ({ title, score, icon }) => {
  return (
    <div className="border-r-[1px] border-grey-dim flex justify-center h-full">
      <div className="h-[6.45rem]">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="1md:text-sm text-xs font-medium">{title}</h3>
            <span className="1md:text-lg text-sm font-medium">{score}</span>
          </div>
          <img className="1md:h-8 1md:w-8 h-6 w-6" src={icon} alt={title} />
        </div>
      </div>
    </div>
  );
};

const ratingItems = [
  { title: "Cleanliness", score: "5.0", icon: spray },
  { title: "Accuracy", score: "5.0", icon: checkMark },
  { title: "Check-in", score: "5.0", icon: key },
  { title: "Communication", score: "5.0", icon: msg },
  { title: "Location", score: "4.9", icon: location },
  { title: "Value", score: "4.9", icon: value },
];

const RatingBreakdown = () => {
  return (
    <>
      {ratingItems.map((item, index) => (
        <SingleRatingItem
          key={index}
          title={item.title}
          score={item.score}
          icon={item.icon}
        />
      ))}
    </>
  );
};

const OverallRating = () => {
  return (
    <div className="border-r-[1px] border-grey-dim flex justify-center h-full">
      <div className="w-full mr-8 h-full">
        <div className="flex flex-col justify-between">
          <h3 className="1md:text-sm text-xs text-nowrap font-medium mb-2">
            Overall rating
          </h3>
          <ol>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <li
                key={index}
                className="flex justify-between gap-x-2 items-center"
              >
                <span className="text-xs">{rating}</span>
                <div className="w-full h-1 bg-grey-dim">
                  <div className={`w-[${rating * 20}%] h-full bg-black`}></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

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

const RatingsSection = ({ showReviewSection }) => {
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  if (!showReviewSection) return null;

  return (
    <div className="1smm:pb-12 1smm:mb-12 1smm:border-b-[1px] border-grey-dim w-full">
      <StarRating
        houseRating={houseInfo?.house_rating}
        ratingCount={houseInfo?.rating_count}
        formatSingleDigit={formatSingleDigit}
      />
      <div className="w-full hidden 1smm:grid grid-cols-7 h-[6.90rem]">
        <OverallRating />
        <RatingBreakdown />
      </div>
    </div>
  );
};

export default RatingsSection;
