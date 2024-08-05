import React, { useEffect, useRef, useState } from "react";

import showMore from "../data/Icons svg/arrow-right.svg";
import HouseDescriptionModal from "./HouseDescriptionModal";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const HouseDescription = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paragraphRef = useRef(null);
  const { id } = useParams();
  const isLoading = useSelector((store) => store.houseDetail.isLoading);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);

  let maxLines = 5;

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph || isLoading) return;

    const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);
    const maxHeight = lineHeight * maxLines;

    if (paragraph.scrollHeight > maxHeight) {
      setIsOverflowing(true);
      paragraph.style.maxHeight = `${maxHeight}px`;
      paragraph.classList.add("truncatePara");
    } else {
      setIsOverflowing(false);
      paragraph.style.maxHeight = "none";
      paragraph.classList.remove("truncatePara");
    }
  }, [isLoading, maxLines]);

  return (
    <div>
      <div className="pt-8 h-64 flex flex-col  justify-center  pb-11 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim">
        <p className="flex-grow overflow-hidden relative">
          <span
            ref={paragraphRef}
            className="absolute  inset-0 overflow-hidden "
          >
            {houseInfo?.house_description}
          </span>
        </p>
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
      <HouseDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="w-[46rem] h-full ">{houseInfo?.house_description}</div>
      </HouseDescriptionModal>
    </div>
  );
};

export default HouseDescription;
