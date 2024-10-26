import { useState, useEffect } from "react";

function useSmallScreen(maxWidth = 920) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    // Clean up event listener
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [maxWidth]);

  return isSmallScreen;
}

export default useSmallScreen;
