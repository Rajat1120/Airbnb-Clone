import React, { useEffect, useRef, useState } from "react";

import showMore from "../data/Icons svg/arrow-right.svg";
import HouseDescriptionModal from "./HouseDescriptionModal";

const HouseDescription = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paragraphRef = useRef(null);

  let maxLines = 4;

  let text =
    " Step into the enchanting embrace of La Maison Du Desert. Bask in the hues of sunrise & sunset, tailored for rejuvenation. The interior is a seamless dance of kitchen, living room, bedroom, cocooning you in comfort. Outside, your private paradise awaits; immerse yourself in hot tub, embrace rustic charm w a cowboy tub, gather around the fire-pit, sizzle with excitement at the BBQ grill, and find joy in playful games. Your escape to serenity is calling; book La Maison Du Desert on Airbnb now.immerse yourself in hot tub, embrace rustic charm w a cowboy tub, gather around the fire-pit, sizzle with excitement at the BBQ grill, and find joy in playful games. Your escape to ";

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);
    const maxHeight = lineHeight * maxLines;
    console.log(maxHeight);

    if (paragraph.scrollHeight > maxHeight) {
      console.log(paragraph.scrollHeight);
      setIsOverflowing(true);
      paragraph.style.maxHeight = `${maxHeight}px`;
      paragraph.classList.add("truncatePara");
    } else {
      setIsOverflowing(false);
      paragraph.style.maxHeight = "none";
      paragraph.classList.remove("truncatePara");
    }
  }, [text, maxLines]);

  return (
    <div>
      <div className="pt-8 h-64 flex flex-col  justify-between pb-11">
        <p className="flex-grow overflow-hidden relative">
          <span
            ref={paragraphRef}
            className="absolute  inset-0 overflow-hidden "
          >
            {text}
          </span>
        </p>
        {isOverflowing && (
          <div className="w-full flex justify-start pb-10">
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
        <div className="h-[1px] bg-grey-dim"></div>
      </div>
      <HouseDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="w-[46rem] h-full ">{text}</div>
      </HouseDescriptionModal>
    </div>
  );
};

export default HouseDescription;
