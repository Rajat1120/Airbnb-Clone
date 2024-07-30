import React, { useEffect, useRef, useState } from "react";
import LocationDescriptionModal from "./LocationDescriptionModal";
import showMore from "../data/Icons svg/arrow-right.svg";
const Map = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paragraphRef = useRef(null);

  let maxLines = 2;

  let text =
    " situated close to Sai Noi Beach, approximately two minutes' walk sTurtle Bay is situated between Khao Tao Valley and a naturallybeautiful lotus pond. Chic cafés, a mangrove forest in the middle of nowhere, and five-star luxury resorts and condos can all be found in Khao Tao. - 2 mins walk to the beach - 15 mins drive toHua Hin Town - 20 min drive to Hua Hin Airport - 2 Hrs fly from condos can all be found in Khao Tao. - 2 mins walk to the beach - 15 mins drive toHua Hin Town - 20 min drive to Hua Hin Airport - 2 Hrs fly from condos can all be found in Khao Tao. Town - 20 min drive to Hua Hin Airport - 2 Hrs fly from condos can all be found in Khao Tao Town - 20 min drive to Hua Hin Airport - 2 Hrs fly from condos can all be found in Khao Tao";

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
  }, [text, maxLines]);

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
              Hua Hin District, Prachuap Khiri Khan, Thailand
            </span>
            <span
              ref={paragraphRef}
              className="font-light h-12 overflow-hidden"
            >
              {text}
            </span>
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
        <div className="w-full  h-full ">{text}</div>
      </LocationDescriptionModal>
    </div>
  );
};

export default Map;
