import React, { useEffect, useRef, useState } from "react";
import LocationDescriptionModal from "./LocationDescriptionModal";
import showMore from "../data/Icons svg/arrow-right.svg";
import { useSelector } from "react-redux";
const Map = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paragraphRef = useRef(null);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  let locationDescp = Boolean(houseInfo?.location_description);
  let houseLocation = Boolean(houseInfo?.house_location);
  console.log(locationDescp);

  let maxLines = 2;

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);
    const maxHeight = lineHeight * maxLines;

    if (paragraph.scrollHeight > maxHeight) {
      setIsOverflowing(true);
      paragraph.style.maxHeight = `${maxHeight}px`;
      paragraph.classList.add("truncateLocDes");
    } else {
      setIsOverflowing(false);
      paragraph.style.maxHeight = "none";
      paragraph.classList.remove("truncateLocDes");
    }
  }, [houseInfo, maxLines]);

  if (!houseLocation) return null;

  return (
    <div
      id="Location"
      className="w-full relative scroll-mt-20 after:content-[''] after:absolute after:bottom-0  after:w-full after:h-[1px]  after:bg-grey-dim"
    >
      <div className="max-h-[50rem] w-full py-12">
        <div className="pb-6 w-full flex justify-start">
          <span className="w-full text-2xl font-medium">Where you’ll be</span>
        </div>
        <div className="w-full h-[30rem] mb-8 rounded-xl addBorder">
          leaflet map
        </div>
        <div className="w-full mt-6 flex flex-col gap-y-6 max-h-[8.75rem]">
          <div className="flex flex-col w-full">
            <span className="mb-4 font-medium">
              {houseInfo?.house_location}
            </span>
            {locationDescp && (
              <span
                ref={paragraphRef}
                className="font-light h-12 whitespace-pre-wrap overflow-hidden"
              >
                {houseInfo?.location_description}
              </span>
            )}
          </div>
          {isOverflowing && (
            <div className="w-full flex justify-start ">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center"
              >
                <span className="underline font-medium ">Show more</span>
                <span>
                  <img className="h-6 w-6 " src={showMore} alt="" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <LocationDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="w-full  h-full ">
          {" "}
          {locationDescp && houseInfo?.location_description}
        </div>
      </LocationDescriptionModal>
    </div>
  );
};

export default Map;
