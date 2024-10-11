import React, { useEffect, useRef, useState } from "react";

import showMore from "../data/Icons svg/arrow-right.svg";
import HouseDescriptionModal from "./HouseDescriptionModal";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

//custom hook
const useTruncateParagraph = (paragraphRef, maxLines, isLoading) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const paragraph = paragraphRef.current;

    if (!paragraph || isLoading) return;

    // Get the line-height of the paragraph element from computed styles
    const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);

    // Calculate the maximum height allowed based on the number of lines
    const maxHeight = lineHeight * maxLines;

    // Check if the actual content height (scrollHeight) exceeds the maximum height
    if (paragraph.scrollHeight > maxHeight) {
      // If content overflows, set the overflowing state to true and apply truncation
      setIsOverflowing(true);
      paragraph.style.maxHeight = `${maxHeight}px`; // Limit the visible height of the paragraph
      paragraph.classList.add("truncatePara"); // Add custom class to handle additional styling (e.g., ellipsis)
    } else {
      // If content does not overflow, remove truncation and reset max height
      setIsOverflowing(false);
      paragraph.style.maxHeight = "none"; // Allow full content to be visible
      paragraph.classList.remove("truncatePara"); // Remove truncation styling
    }
  }, [isLoading, maxLines, paragraphRef]);

  return { isOverflowing };
};

const DescriptionWithShowMore = ({ description, setIsModalOpen }) => {
  const paragraphRef = useRef(null);

  const isLoading = useSelector((store) => store.houseDetail.isLoading);

  let maxLines = 5;

  const { isOverflowing } = useTruncateParagraph(
    paragraphRef,
    maxLines,
    isLoading
  );

  return (
    <div className="pt-8 h-60 flex flex-col justify-center pb-11 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-grey-dim">
      <p className="flex-grow overflow-hidden relative">
        <span
          ref={paragraphRef}
          className="absolute whitespace-pre-wrap inset-0 overflow-hidden"
        >
          {description}
        </span>
      </p>
      {isOverflowing && (
        <div className="w-full flex justify-start">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center"
          >
            <span className="underline font-medium">Show more</span>
            <span>
              <img className="h-4 w-4" src={showMore} alt="Show more" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const HouseDescription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);

  if (!houseInfo?.house_description) return null;
  return (
    <div>
      <DescriptionWithShowMore
        description={houseInfo?.house_description}
        setIsModalOpen={setIsModalOpen}
      ></DescriptionWithShowMore>
      <HouseDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="max-w-[46rem] w-full h-full whitespace-pre-wrap ">
          {houseInfo?.house_description}
        </div>
      </HouseDescriptionModal>
    </div>
  );
};

export default HouseDescription;
