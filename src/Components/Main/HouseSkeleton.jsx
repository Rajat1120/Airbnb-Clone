import React from "react";

const SkeletonLoader = () => {
  return (
    <div
      data-testid="skeleton-loader"
      className="1xs:w-full w-[calc(100vw-40px)]"
    >
      <SkeletonImage />
      <SkeletonText />
    </div>
  );
};

const SkeletonImage = () => (
  <div className="relative w-full aspect-square mb-4">
    <div className="w-full h-full animate-shimmer bg-gray-200 rounded-[20px]"></div>
  </div>
);

const SkeletonText = () => (
  <div className="flex justify-between items-start">
    <div className="w-[80%]">
      <ShimmerBlock width="90%" height="5" marginBottom="2" />
      <ShimmerBlock width="70%" height="4" marginBottom="1" />
      <ShimmerBlock width="60%" height="4" marginBottom="1" />
      <ShimmerBlock width="40%" height="4" />
    </div>
    <SkeletonButton />
  </div>
);

const SkeletonButton = () => (
  <div className="w-[20%] flex justify-end">
    <div className="w-8 h-6 animate-shimmer bg-gray-200 rounded-sm"></div>
  </div>
);

const ShimmerBlock = ({ width, height, marginBottom }) => (
  <div
    className={`w-[${width}] h-${height} animate-shimmer bg-gray-200 mb-${marginBottom}`}
  ></div>
);

const SkeletonLoaderList = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </>
  );
};

export default SkeletonLoaderList;
