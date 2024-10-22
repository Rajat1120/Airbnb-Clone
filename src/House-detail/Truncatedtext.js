import React from "react";

const TruncatedText = ({
  text,
  maxLines = 2,
  onShowMore,
  imgSrc,
  isOverflowing,
  textRef,
}) => {
  return (
    <div className="w-full flex flex-col">
      <span
        ref={textRef}
        className={`font-light whitespace-pre-wrap overflow-hidden line-clamp-${maxLines}`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: maxLines,
        }}
      >
        {text}
      </span>
      {isOverflowing && (
        <div className="w-full flex justify-start mt-6">
          <button onClick={onShowMore} className="flex items-center">
            <span className="underline font-medium">Show more</span>
            <span>
              <img className="h-4 w-4" src={imgSrc} alt="Show more icon" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
