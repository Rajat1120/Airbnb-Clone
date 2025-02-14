import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import SkeletonLoaderList from "./HouseSkeleton";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions } from "../../api/apiRooms";
import { useDispatch, useSelector } from "react-redux";
import { setMinimize, setStartScroll } from "../../redux/AppSlice";
import { setActiveInput } from "../../redux/mainFormSlice";
import { deleteFavorite, saveFavorite } from "../../api/apiAuthentication";

import HouseCard from "./RoomsDesktop";
import MobileHouseCard from "./RoomsMobile";

const ContinueExploring = ({
  selectedIcon,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  showMore,
}) => {
  return (
    <div className="w-full flex flex-col mt-10 gap-y-2 justify-center items-center h-20">
      <span className="text-lg font-medium">
        {`Continue exploring ${selectedIcon} ${
          selectedIcon.endsWith("s") ? "" : "homes"
        }`}
      </span>
      <button
        className="bg-black text-white h-12 w-32 rounded-lg"
        onClick={() => {
          fetchNextPage();
          showMore.current = false;
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Show More
      </button>
    </div>
  );
};

const SkeletonGrid = ({ itemCount = 12, gridClasses = "" }) => {
  return (
    <div className={`grid gap-x-6 mt-5 ${gridClasses}`}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="skeleton rounded-2xl aspect-square skeleton-item"
        ></div>
      ))}
    </div>
  );
};

const IMAGE_WIDTH = 301.91;
const ITEMS_PER_PAGE = 16;

// Handles favorite-related effects
const useFavoriteEffect = (
  itemId,
  userData,
  isFavorite,
  saveFavorite,
  deleteFavorite
) => {
  useEffect(() => {
    const handleFavoriteUpdate = async () => {
      if (!itemId || !userData) return;

      if (isFavorite) {
        await saveFavorite(itemId);
      } else {
        await deleteFavorite(itemId);
      }
    };

    handleFavoriteUpdate();
  }, [itemId, userData, isFavorite, saveFavorite, deleteFavorite]);
};

// Manages scroll positions for house listings
const useScrollPositions = (houseListingData) => {
  const [localScrollPositions, setLocalScrollPositions] = useState({});

  useEffect(() => {
    if (!houseListingData) return;

    const initialScrollPositions = {};
    houseListingData.pages.forEach((page) => {
      page.forEach((item) => {
        initialScrollPositions[item.id] = {
          isAtStart: true,
          isAtEnd: false,
        };
      });
    });
    setLocalScrollPositions(initialScrollPositions);
  }, [houseListingData]);

  return [localScrollPositions, setLocalScrollPositions];
};

// Handles window scroll event listeners
const useWindowScrollEffect = (handleWindowScroll) => {
  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [handleWindowScroll]);
};

// Manages screen size detection
const useScreenSize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 743px)");
    setIsSmallScreen(mediaQuery?.matches);

    const handleResize = (event) => setIsSmallScreen(event.matches);
    mediaQuery?.addEventListener("change", handleResize);

    return () => mediaQuery?.removeEventListener("change", handleResize);
  }, []);

  return isSmallScreen;
};

// Manages scroll restoration and position
const useScrollRestoration = (selectedIcon, startScroll) => {
  // Initial scroll restoration
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll position based on startScroll
  useLayoutEffect(() => {
    if (!startScroll) window.scrollTo(0, 10);
  }, [selectedIcon, startScroll]);
};

// Main hook that combines all functionality
const useCustomEffects = ({
  itemId,
  userData,
  isFavorite,
  saveFavorite,
  deleteFavorite,
  houseListingData,
  handleWindowScroll,
  selectedIcon,
  startScroll,
  showMore,
}) => {
  // Initialize individual hooks
  const isSmallScreen = useScreenSize();
  const [localScrollPositions, setLocalScrollPositions] =
    useScrollPositions(houseListingData);

  // Set up all effects
  useFavoriteEffect(itemId, userData, isFavorite, saveFavorite, deleteFavorite);
  useWindowScrollEffect(handleWindowScroll);
  useScrollRestoration(selectedIcon, startScroll);

  // Handle showMore updates
  useEffect(() => {
    showMore.current = true;
  }, [selectedIcon, showMore]);

  return {
    isSmallScreen,
    showMore,
    localScrollPositions,
    setLocalScrollPositions,
  };
};

// Handles the item-level scroll logic
const useItemScroll = (setLocalScrollPositions, houseImagesRefs) => {
  // Track horizontal scroll position
  const handleScroll = useCallback(
    (itemId) => {
      const container = houseImagesRefs.current[itemId];
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setLocalScrollPositions((prev) => ({
          ...prev,
          [itemId]: {
            isAtStart: scrollLeft === 0,
            isAtEnd: Math.abs(scrollWidth - clientWidth - scrollLeft) < 1,
          },
        }));
      }
    },
    [setLocalScrollPositions, houseImagesRefs]
  );

  // Handle scroll button clicks
  const handleScrollBtn = useCallback(
    (e, direction, itemId) => {
      e.preventDefault();
      e.stopPropagation();
      const container = houseImagesRefs.current[itemId];

      if (container) {
        const scrollAmount = direction === "right" ? IMAGE_WIDTH : -IMAGE_WIDTH;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    },
    [houseImagesRefs]
  );

  return { handleScroll, handleScrollBtn };
};

// Handles the window-level scroll logic
const useWindowScroll = (
  containerRef,
  showMore,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
) => {
  const dispatch = useDispatch();

  const handleWindowScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY;

    // Handle UI state updates
    dispatch(setMinimize(false));
    dispatch(setActiveInput(""));

    if (currentScrollPosition > 0) {
      dispatch(setStartScroll(false));
    } else if (currentScrollPosition < 22) {
      dispatch(setStartScroll(true));
    }

    // Handle infinite scroll
    if (!showMore.current) {
      if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 500
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    }
  }, [
    dispatch,
    fetchNextPage,
    containerRef,
    showMore,
    hasNextPage,
    isFetchingNextPage,
  ]);

  return handleWindowScroll;
};

// Main hook that combines both scroll handlers
const useScrollHandlers = ({
  setLocalScrollPositions,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  showMore,
  houseImagesRefs,
  containerRef,
}) => {
  const { handleScroll, handleScrollBtn } = useItemScroll(
    setLocalScrollPositions,
    houseImagesRefs
  );
  const handleWindowScroll = useWindowScroll(
    containerRef,
    showMore,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  );

  return {
    handleScroll,
    handleWindowScroll,
    handleScrollBtn,
  };
};

const useHouseListingData = (ids, selectedIcon, selectedCountry, city) => {
  const {
    data: houseListingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["iconFilter", ids, selectedIcon, selectedCountry, city],
    queryFn: ({ pageParam = 0 }) =>
      fetchRowsWithOptions(
        ids,
        selectedIcon,
        selectedCountry,
        city,
        pageParam * ITEMS_PER_PAGE,
        (pageParam + 1) * ITEMS_PER_PAGE - 1
      ),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage && lastPage.length < ITEMS_PER_PAGE) return undefined;
      return pages.length;
    },
    enabled: !!selectedIcon,
  });

  return {
    houseListingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

// Main house component
const House = () => {
  const [localScrollPositions, setLocalScrollPositions] = useState({});
  const houseImagesRefs = useRef({});
  const containerRef = useRef(null);
  const showMore = useRef(true);

  const {
    isFavorite,
    itemId,
    selectedIcon,
    selectedCountry,
    startScroll,
    userData,
    userFavListing: favListings,
    city,
    inputSearchIds: ids,
  } = useSelector((store) => store.app);

  // Fetch house data
  const {
    houseListingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useHouseListingData(ids, selectedIcon, selectedCountry, city);

  const { handleScroll, handleWindowScroll, handleScrollBtn } =
    useScrollHandlers({
      setLocalScrollPositions,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
      houseImagesRefs,
      containerRef,
      showMore,
    });

  const { isSmallScreen } = useCustomEffects({
    itemId,
    userData,
    isFavorite,
    favListings,
    saveFavorite,
    deleteFavorite,
    houseListingData,
    handleWindowScroll,
    selectedIcon,
    startScroll,
    showMore,
  });

  return (
    <div
      className={`relative pb-14 w-full transition-transform duration-[0.3s] ease-in-out 1xs:px-10 px-5  1xl:px-20 top-[4rem] ${
        !startScroll
          ? "-translate-y-[4.8rem] "
          : "1sm:translate-y-[4rem] 1md:translate-y-[0rem]"
      }`}
      ref={containerRef}
    >
      <div className="grid    gap-x-6 1md:grid-cols-three-col grid-cols-1 gap-y-10 1lg:my-grid-cols-four-col 2xl:my-grid-cols-six-col justify-center w-full items-start 1xs:grid-cols-two-col 1lg:gap-y-4 xl:gap-y-8  1md:gap-y-10 1xs:gap-y-10 grid-flow-row">
        {status === "pending" ? (
          <SkeletonLoaderList></SkeletonLoaderList>
        ) : (
          houseListingData?.pages.flatMap((page) =>
            page.map((item, index) =>
              isSmallScreen ? (
                <MobileHouseCard
                  key={item.id}
                  item={item}
                  localScrollPositions={localScrollPositions}
                  userData={userData}
                  favListings={favListings}
                  handleScroll={handleScroll}
                  handleScrollBtn={handleScrollBtn}
                  houseImagesRefs={houseImagesRefs}
                  index={index}
                ></MobileHouseCard>
              ) : (
                <HouseCard
                  key={item.id}
                  item={item}
                  localScrollPositions={localScrollPositions}
                  userData={userData}
                  favListings={favListings}
                  handleScroll={handleScroll}
                  handleScrollBtn={handleScrollBtn}
                  houseImagesRefs={houseImagesRefs}
                  index={index}
                />
              )
            )
          )
        )}
      </div>
      {!!houseListingData && showMore?.current && hasNextPage && (
        <ContinueExploring
          selectedIcon={selectedIcon}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          showMore={showMore}
        />
      )}

      {isFetchingNextPage && (
        <SkeletonGrid
          itemCount={12}
          gridClasses="1md:grid-cols-three-col grid-cols-1 gap-y-10 
        1lg:my-grid-cols-four-col 2xl:my-grid-cols-six-col 
        justify-center w-full items-start 1xs:grid-cols-two-col 
        1lg:gap-y-4 xl:gap-y-8 1md:gap-y-10 1xs:gap-y-10 grid-flow-row"
        />
      )}
    </div>
  );
};

export default House;
