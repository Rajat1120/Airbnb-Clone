import React, { useEffect, useState } from "react";
import HouseDescription from "./HouseDescription";
import SleepBedDetail from "./SleepBedDetail";

import sharedSpace from "../../asset/Icons_svg/commonSpace.svg";
import bathroom from "../../asset/Icons_svg/bathroom.svg";
import furryFriend from "../../asset/Icons_svg/furryFriends.svg";
import room from "../../asset/Icons_svg/roomIcon.svg";
import star from "../../asset/Icons_svg/star.svg";
import person from "../../asset/person.svg";
import { useSelector } from "react-redux";

const HouseInfo = ({ houseInfo, houseInfoDetails, isLoading }) => {
  return (
    <div className="max-w-[40.83rem] min-w-[100%] 1xz:min-w-[60%] mb-16 flex flex-col">
      {/* Title Section */}
      <div className="1xz:py-8 py-4">
        {isLoading ? (
          <LoadingSkeleton width="26rem" height="8" />
        ) : (
          <h1 className="text-[25px] font-[460]">{houseInfo?.title_2}</h1>
        )}
        {/* Details Section */}
        <HouseDetails
          isLoading={isLoading}
          houseInfoDetails={houseInfoDetails}
        />
        {/* Rating Section */}
        <RatingSection
          isLoading={isLoading}
          houseInfo={houseInfo}
          star={star}
        />
      </div>

      {/* Host Section */}
      {isLoading ? (
        <div className="h-20"></div>
      ) : (
        <>
          <Divider />
          <HostSection houseInfo={houseInfo} person={person} />
          <Divider />
        </>
      )}

      {/* Room Details Section */}
      <RoomDetails />

      {/* Additional Components */}
      <HouseDescription />
      <SleepBedDetail />
    </div>
  );
};

/* Reusable Divider Component */
const Divider = () => <div className="h-[1px] bg-grey-dim"></div>;

/* Reusable Loading Skeleton Component */
const LoadingSkeleton = ({ width, height }) => (
  <div
    className={`max-w-[${width}] w-full h-${height} bg-gray-200 animate-pulse`}
  ></div>
);

/* House Details Component */
const HouseDetails = ({ isLoading }) => {
  const { houseInfo } = useSelector((store) => store.houseDetail);

  const [houseInfoDetails, setHouseInfoDetails] = useState([]);

  useEffect(() => {
    // Initialize an empty array to store the counts
    const counts = [];

    // Regular expression to match non-alphanumeric characters except spaces
    const cleanString = (str) => str?.replace(/[^a-zA-Z0-9\s]/g, "").trim();

    // Clean and check guest_count
    if (houseInfo?.guest_count !== null) {
      const cleanedGuestCount = cleanString(houseInfo?.guest_count);
      if (cleanedGuestCount) {
        counts.push(cleanedGuestCount);
      }
    }

    // Clean and check bedroom_count
    if (houseInfo?.bedroom_count !== null) {
      const cleanedBedroomCount = cleanString(houseInfo?.bedroom_count);
      if (cleanedBedroomCount) {
        counts.push(cleanedBedroomCount);
      }
    }

    // Clean and check bed_count
    if (houseInfo?.bed_count !== null) {
      const cleanedBedCount = cleanString(houseInfo?.bed_count);
      if (cleanedBedCount) {
        counts.push(cleanedBedCount);
      }
    }

    // Clean and check bathroom_count
    if (houseInfo?.bathroom_count !== null) {
      const cleanedBathroomCount = cleanString(houseInfo?.bathroom_count);
      if (cleanedBathroomCount) {
        counts.push(cleanedBathroomCount);
      }
    }

    setHouseInfoDetails(counts);
  }, [houseInfo]);
  return (
    <div className="flex items-center">
      {isLoading ? (
        <LoadingSkeleton width="80" height="5" />
      ) : (
        <div className="flex w-full items-center">
          {houseInfoDetails.map((item, i) => (
            <div className="flex items-center" key={i}>
              <span className="font-light">{item}</span>
              {i < houseInfoDetails.length - 1 && <DotSeparator />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* Dot Separator Component */
const DotSeparator = () => (
  <span className="flex h-full mx-1 items-center justify-center">
    <span className="w-[3px] h-[3px] bg-current rounded-full"></span>
  </span>
);

/* Rating Section Component */
const RatingSection = ({ isLoading, houseInfo, star }) => (
  <div className="flex gap-1 items-center leading-8">
    {isLoading ? (
      <div className="w-4 h-4"></div>
    ) : (
      <>
        <img className="w-4 h-4" src={star} alt="star" />
        <span className="underline">{houseInfo?.rating_count}</span>
      </>
    )}
  </div>
);

function cleanString(input) {
  // Replace "About" with an empty string
  let result = input.replace(/About/g, "");

  // Trim any leading or trailing spaces and remove extra spaces between words
  result = result.replace(/\s+/g, " ").trim();

  return result;
}

/* Host Section Component */
const HostSection = ({ houseInfo, person }) => (
  <div className="py-6 gap-8 items-center flex">
    <img
      className="h-10 w-10 object-cover rounded-full"
      src={houseInfo?.host_image || person}
      alt="host"
    />
    <div className="flex flex-col">
      <span className="font-medium">
        Hosted by{" "}
        {houseInfo?.host_name ? cleanString(houseInfo?.host_name) : "Carl"}
      </span>
      <span className="font-extralight text-grey text-sm">6 years hosting</span>
    </div>
  </div>
);

/* Room Details Section */
const RoomDetails = () => (
  <div className="py-8 flex border-b border-grey-dim flex-col gap-y-5">
    <RoomDetailItem
      icon={room}
      title="Room in a villa"
      description="Your own room in a home, plus access to shared spaces."
    />
    <RoomDetailItem
      icon={sharedSpace}
      title="Shared common spaces"
      description="You’ll share parts of the home."
    />
    <RoomDetailItem
      icon={bathroom}
      title="Shared bathroom"
      description="You’ll share the bathroom with others."
    />
    <RoomDetailItem
      icon={furryFriend}
      title="Furry friends welcome"
      description="Bring your pets along for the stay."
    />
  </div>
);

/* Reusable Room Detail Item Component */
const RoomDetailItem = ({ icon, title, description }) => (
  <div className="flex items-start gap-8">
    <img className="w-6 h-6" src={icon} alt={title} />
    <div className="flex flex-col">
      <span className="leading-4">{title}</span>
      <span className="leading-8 text-sm text-grey">{description}</span>
    </div>
  </div>
);

export default HouseInfo;
