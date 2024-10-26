import React, { useEffect } from "react";

const LoadingOverlay = () => {
  useEffect(() => {
    // Disable scroll by setting overflow style on the body
    document.body.style.overflow = "hidden";

    // Cleanup to re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="w-screen z-50 h-screen bg-white opacity-80 fixed flex items-center justify-center">
      <div className="cssLoader absolute top-1/2 left-1/2 w-12 h-3"></div>
    </div>
  );
};

export default LoadingOverlay;
