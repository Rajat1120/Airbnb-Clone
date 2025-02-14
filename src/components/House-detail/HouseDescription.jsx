import React, { useEffect, useRef, useState } from "react";

import showMore from "../../asset/Icons_svg/arrow-right.svg";
import HouseDescriptionModal from "./HouseDescriptionModal";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import TruncatedText from "./Truncatedtext";

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
    } else {
      // If content does not overflow, remove truncation and reset max height
      setIsOverflowing(false);
    }
  }, [isLoading, maxLines, paragraphRef]);

  return { isOverflowing };
};

const DescriptionWithShowMore = ({ description, setIsModalOpen }) => {
  const paragraphRef = useRef(null);

  const isLoading = useSelector((store) => store.houseDetail.isLoading);

  let maxLines = 3;

  const { isOverflowing } = useTruncateParagraph(
    paragraphRef,
    maxLines,
    isLoading
  );

  return (
    <div className="pt-8 h-60 flex flex-col justify-center pb-11 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-grey-dim">
      <TruncatedText
        text={description}
        textRef={paragraphRef}
        maxLines={maxLines}
        onShowMore={() => setIsModalOpen(true)}
        isOverflowing={isOverflowing}
        imgSrc={showMore}
      ></TruncatedText>
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
