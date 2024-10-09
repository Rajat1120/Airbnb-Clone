import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import SkeletonLoaderList from "./HouseSkeleton";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions } from "../Services/apiRooms";
import { useDispatch, useSelector } from "react-redux";
import { setMinimize, setStartScroll } from "./AppSlice";
import { setActiveInput } from "../Header/Form/mainFormSlice";
import { deleteFavorite, saveFavorite } from "../Services/apiAuthentication";

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

const useCustomEffects = ({
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
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [localScrollPositions, setLocalScrollPositions] = useState({});

  // Favorite update effect
  useEffect(() => {
    const handleFavoriteUpdate = async () => {
      if (itemId && userData) {
        if (isFavorite) {
          await saveFavorite(itemId);
        } else {
          await deleteFavorite(itemId);
        }
      }
    };

    handleFavoriteUpdate();
  }, [favListings, isFavorite, userData, saveFavorite, deleteFavorite, itemId]);

  // Initialize scroll positions
  useEffect(() => {
    if (houseListingData) {
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
    }
  }, [houseListingData]);

  // Set up window scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleWindowScroll]);

  // Scroll restoration effect
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Manage showMore
  useEffect(() => {
    showMore.current = true;
  }, [selectedIcon, showMore]);

  // Media query effect
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 743px)");
    setIsSmallScreen(mediaQuery?.matches);

    const handleResize = (event) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery?.addEventListener("change", handleResize);
    return () => {
      mediaQuery?.removeEventListener("change", handleResize);
    };
  }, []);

  // Scroll position effect
  useLayoutEffect(() => {
    if (!startScroll) window.scrollTo(0, 10);
  }, [selectedIcon, startScroll]);

  return {
    isSmallScreen,
    showMore,
    localScrollPositions,
    setLocalScrollPositions,
  };
};

const useScrollHandlers = ({
  setLocalScrollPositions,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  showMore,
  houseImagesRefs,
  containerRef,
}) => {
  const dispatch = useDispatch();

  // Handle item scroll
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

  const handleScrollBtn = (e, direction, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    const container = houseImagesRefs.current[itemId];

    if (container) {
      const scrollAmount = direction === "right" ? IMAGE_WIDTH : -IMAGE_WIDTH;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Handle window scroll
  const handleWindowScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY;

    dispatch(setMinimize(false));
    dispatch(setActiveInput(""));

    if (currentScrollPosition > 0) {
      dispatch(setStartScroll(false));
    } else if (currentScrollPosition < 22) {
      dispatch(setStartScroll(true));
    }

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

  return {
    handleScroll,
    handleWindowScroll,
    handleScrollBtn,
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
