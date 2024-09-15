import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import star from "../data/Icons svg/star.svg";
import arrow_right from "../data/Icons svg/arrow-right.svg";
import arrow_left from "../data/Icons svg/arrow-left.svg";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions } from "../Services/apiRooms";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserFavListing,
  setHoveredItem,
  setHoveredItems,
  setIsFavorite,
  setItemId,
  setMinimize,
  setShowLogin,
  setStartScroll,
  setUserFavListing,
} from "./AppSlice";
import { setActiveInput } from "../Header/Form/mainFormSlice";
import { deleteFavorite, saveFavorite } from "../Services/apiAuthentication";
import { svg } from "../data/HeartIconSvg";
import { Link } from "react-router-dom";

const House = () => {
  const isFavorite = useSelector((store) => store.app.isFavorite);
  const itemId = useSelector((store) => store.app.itemId);
  const imageWidth = 301.91;
  const houseImagesRefs = useRef({});
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const selectedIcon = useSelector((store) => store.app.selectedIcon);
  const selectedCountry = useSelector((store) => store.app.selectedCountry);
  const hoveredItem = useSelector((store) => store.app.hoveredItem);
  const startScroll = useSelector((store) => store.app.startScroll);
  const hoveredItems = useSelector((store) => store.app.hoveredItems);

  let userData = useSelector((store) => store.app.userData);
  let favListings = useSelector((store) => store.app.userFavListing);

  let showMore = useRef(true);
  const city = useSelector((store) => store.app.city);

  const [localScrollPositions, setLocalScrollPositions] = useState({});
  const ids = useSelector((store) => store.app.inputSearchIds);

  useEffect(() => {
    const handleUpdate = async () => {
      if (itemId && userData) {
        if (isFavorite) {
          await saveFavorite(itemId);
        } else {
          await deleteFavorite(itemId);
        }
      }
    };

    handleUpdate();
  }, [favListings, isFavorite, userData, itemId]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["iconFilter", ids, selectedIcon, selectedCountry, city],
      queryFn: ({ pageParam = 0 }) =>
        fetchRowsWithOptions(
          ids,
          selectedIcon,
          selectedCountry,
          city,
          pageParam * 16,
          (pageParam + 1) * 16 - 1
        ),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage && lastPage.length < 16) return undefined;
        return pages.length;
      },
      enabled: !!selectedIcon,
    });

  const handleScrollBtn = (e, direction, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    const container = houseImagesRefs.current[itemId];
    if (container) {
      const scrollAmount = direction === "right" ? imageWidth : -imageWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = useCallback((itemId) => {
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
  }, []);

  // Initialize scroll positions for all items
  useEffect(() => {
    if (data) {
      const initialScrollPositions = {};
      data.pages.forEach((page) => {
        page.forEach((item) => {
          initialScrollPositions[item.id] = {
            isAtStart: true,
            isAtEnd: false,
          };
        });
      });
      setLocalScrollPositions(initialScrollPositions);
    }
  }, [data]);

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
      // Check if we're near the bottom of the page
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
  }, [dispatch, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleWindowScroll]);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    showMore.current = true;
  }, [selectedIcon]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 743px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!startScroll) window.scrollTo(0, 10);
  }, [selectedIcon, startScroll]);

  return (
    <div
      className={`relative pb-14 w-full transition-transform duration-[0.3s] ease-in-out 1xs:px-10 px-5  1xl:px-20 top-[4rem] ${
        !startScroll
          ? "-translate-y-[4.8rem] "
          : "1sm:translate-y-[4rem] 1md:translate-y-[0rem]"
      }`}
      ref={containerRef}
    >
      <div className="grid    gap-x-6 1md:grid-cols-three-col grid-cols-1 gap-y-10 1lg:my-grid-cols-four-col justify-center w-full items-start 1xs:grid-cols-two-col 1lg:gap-y-4 xl:gap-y-8  1md:gap-y-10 1xs:gap-y-10 grid-flow-row">
        {status === "pending"
          ? Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="1xs:w-full w-[calc(100vw-40px)]">
                <div className="relative  w-full aspect-square mb-4">
                  <div className="w-full h-full animate-shimmer bg-gray-200 rounded-[20px]"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="w-[80%]">
                    <div className="w-[90%] h-5 animate-shimmer bg-gray-200 mb-2"></div>
                    <div className="w-[70%] h-4 animate-shimmer bg-gray-200 mb-1"></div>
                    <div className="w-[60%] h-4 animate-shimmer bg-gray-200 mb-1"></div>
                    <div className="w-[40%] h-4 animate-shimmer bg-gray-200"></div>
                  </div>
                  <div className="w-[20%] flex justify-end">
                    <div className="w-8 h-6 animate-shimmer bg-gray-200 rounded-sm"></div>
                  </div>
                </div>
              </div>
            ))
          : data?.pages.flatMap((page) =>
              page.map((item, index) =>
                isSmallScreen ? (
                  <Link key={item.id} to={`/house/${item.id}`}>
                    <motion.div
                      className="1xl:w-full   relative 1xl:h-full   flex gap-y-4 items-center justify-center flex-col"
                      onMouseEnter={() => {
                        dispatch(setHoveredItem(item.id));
                        dispatch(setHoveredItems([...hoveredItems, item.id]));
                      }}
                      onMouseLeave={() => dispatch(setHoveredItem(null))}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      {item.guest_favorite === "Guest favourite" && (
                        <div className="absolute w-32 shadow-2xl h-7 flex-center top-3 py-2 left-3 rounded-2xl bg-white">
                          <span className="text-sm font-medium">
                            Guest favourite
                          </span>
                        </div>
                      )}
                      <div
                        ref={(el) => (houseImagesRefs.current[item.id] = el)}
                        className="w-full flex items-center justify-start overflow-x-auto h-[75%] scroll-smooth"
                        style={{
                          scrollSnapType: "x mandatory",
                          scrollBehavior: "smooth",
                        }}
                        onScroll={() => handleScroll(item.id)}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (!userData) {
                              dispatch(setShowLogin(true));
                            } else {
                              if (favListings.includes(item.id)) {
                                dispatch(removeUserFavListing(item.id));
                                dispatch(setIsFavorite(false));
                                dispatch(setItemId(item.id));
                              } else {
                                dispatch(setUserFavListing(item.id));
                                dispatch(setIsFavorite(true));
                                dispatch(setItemId(item.id));
                              }
                            }
                          }}
                          className="absolute hover:scale-110 top-3 right-4"
                        >
                          {svg(item.id, favListings, userData)}
                        </button>
                        {hoveredItem === item.id &&
                          !localScrollPositions[item.id]?.isAtStart && (
                            <button
                              onClick={(e) =>
                                handleScrollBtn(e, "left", item.id)
                              }
                              className="z-10 bg-white hover:scale-105 w-8 h-8 hover:bg-opacity-100 bg-opacity-80 absolute hover:drop-shadow-md flex-center rounded-[50%] border-[1px] left-2 border-grey-dim"
                            >
                              <img
                                className="h-4 w-6 "
                                src={arrow_left}
                                alt="Scroll left"
                              />
                            </button>
                          )}
                        {hoveredItem === item.id &&
                          !localScrollPositions[item.id]?.isAtEnd && (
                            <button
                              onClick={(e) =>
                                handleScrollBtn(e, "right", item.id)
                              }
                              className="z-10 bg-white hover:scale-105 w-8 flex-center hover:bg-opacity-100 bg-opacity-80 h-8 absolute hover:drop-shadow-md right-2 rounded-[50%] border-[1px] border-grey-dim"
                            >
                              <img
                                className="h-4 w-6 "
                                src={arrow_right}
                                alt="Scroll right"
                              />
                            </button>
                          )}
                        <img
                          className="rounded-[20px] flex-center  w-full h-full object-cover scroll-snap-align-start"
                          src={item.images[0]}
                          rel="preload"
                          as="image"
                          alt=""
                          style={{
                            scrollSnapAlign: "start",
                            flexShrink: 0,
                            aspectRatio: "1/1",
                          }}
                        />
                        {hoveredItems?.includes(item.id) &&
                          item.images.slice(1).map((img, i) => (
                            <img
                              className="rounded-[20px] flex-center w-full  h-full object-cover scroll-snap-align-start"
                              src={img}
                              rel="preload"
                              as="image"
                              key={i}
                              alt=""
                              style={{
                                scrollSnapAlign: "start",
                                flexShrink: 0,
                                scrollSnapStop: "always",
                                aspectRatio: "1/1",
                              }}
                            />
                          ))}
                      </div>
                      <div className="flex w-full justify-between items-start h-[25%]">
                        <div className="w-[80%]">
                          <p className="text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-[90%] font-medium">
                            {item["house-title"]}
                          </p>
                          <p className="font-light text-grey text-[15px]">
                            {Math.ceil(item.price / 83 + 150)} kilometers away
                          </p>
                          <p className="font-light text-grey text-[15px]">
                            16-21 May
                          </p>
                          <p className="text-[15px] font-medium">
                            ${Math.ceil(item.price / 83)}
                            <span className="font-light text-[15px]">
                              {" "}
                              night
                            </span>
                          </p>
                        </div>
                        <p className="flex gap-x-1 w-[20%] justify-end items-center">
                          {item.house_rating > 2 && (
                            <img
                              src={star}
                              className="w-[15px] h-[15px]"
                              alt=""
                            />
                          )}
                          <span className="font-light text-[15px]">
                            {item.house_rating > 2 && item.house_rating}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <a
                    key={item.id}
                    href={`/house/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block "
                  >
                    <motion.div
                      className="1xl:w-full   relative 1xl:h-full   flex gap-y-4 items-center justify-center flex-col"
                      onMouseEnter={() => {
                        dispatch(setHoveredItem(item.id));
                        dispatch(setHoveredItems([...hoveredItems, item.id]));
                      }}
                      onMouseLeave={() => dispatch(setHoveredItem(null))}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.07 }}
                    >
                      {item.guest_favorite === "Guest favourite" && (
                        <div className="absolute w-32 shadow-2xl h-7 flex-center top-3 py-2 left-3 rounded-2xl bg-white">
                          <span className="text-sm font-medium">
                            Guest favourite
                          </span>
                        </div>
                      )}
                      <div
                        ref={(el) => (houseImagesRefs.current[item.id] = el)}
                        className="w-full flex items-center justify-start overflow-x-auto h-[75%] scroll-smooth"
                        style={{
                          scrollSnapType: "x mandatory",
                          scrollBehavior: "smooth",
                        }}
                        onScroll={() => handleScroll(item.id)}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (!userData) {
                              dispatch(setShowLogin(true));
                            } else {
                              if (favListings.includes(item.id)) {
                                dispatch(removeUserFavListing(item.id));
                                dispatch(setIsFavorite(false));
                                dispatch(setItemId(item.id));
                              } else {
                                dispatch(setUserFavListing(item.id));
                                dispatch(setIsFavorite(true));
                                dispatch(setItemId(item.id));
                              }
                            }
                          }}
                          className="absolute hover:scale-110 top-3 right-4"
                        >
                          {svg(item.id, favListings, userData)}
                        </button>
                        {hoveredItem === item.id &&
                          !localScrollPositions[item.id]?.isAtStart && (
                            <button
                              onClick={(e) =>
                                handleScrollBtn(e, "left", item.id)
                              }
                              className="z-10 bg-white hover:scale-105 w-8 h-8 hover:bg-opacity-100 bg-opacity-80 absolute hover:drop-shadow-md flex-center rounded-[50%] border-[1px] left-2 border-grey-dim"
                            >
                              <img
                                className="h-4 w-6 "
                                src={arrow_left}
                                alt="Scroll left"
                              />
                            </button>
                          )}
                        {hoveredItem === item.id &&
                          !localScrollPositions[item.id]?.isAtEnd && (
                            <button
                              onClick={(e) =>
                                handleScrollBtn(e, "right", item.id)
                              }
                              className="z-10 bg-white hover:scale-105 w-8 flex-center hover:bg-opacity-100 bg-opacity-80 h-8 absolute hover:drop-shadow-md right-2 rounded-[50%] border-[1px] border-grey-dim"
                            >
                              <img
                                className="h-4 w-6 "
                                src={arrow_right}
                                alt="Scroll right"
                              />
                            </button>
                          )}
                        <img
                          className="rounded-[20px] flex-center  w-full h-full object-cover scroll-snap-align-start"
                          src={item.images[0]}
                          rel="preload"
                          as="image"
                          alt=""
                          style={{
                            scrollSnapAlign: "start",
                            flexShrink: 0,
                            aspectRatio: "1/1",
                          }}
                        />
                        {hoveredItems?.includes(item.id) &&
                          item.images.slice(1).map((img, i) => (
                            <img
                              className="rounded-[20px] flex-center w-full  h-full object-cover scroll-snap-align-start"
                              src={img}
                              rel="preload"
                              as="image"
                              key={i}
                              alt=""
                              style={{
                                scrollSnapAlign: "start",
                                flexShrink: 0,
                                scrollSnapStop: "always",
                                aspectRatio: "1/1",
                              }}
                            />
                          ))}
                      </div>
                      <div className="flex w-full justify-between items-start h-[25%]">
                        <div className="w-[80%]">
                          <p className="text-ellipsis whitespace-nowrap overflow-hidden text-[15px] w-[90%] font-medium">
                            {item["house-title"]}
                          </p>
                          <p className="font-light text-grey text-[15px]">
                            {Math.ceil(item.price / 83 + 150)} kilometers away
                          </p>
                          <p className="font-light text-grey text-[15px]">
                            16-21 May
                          </p>
                          <p className="text-[15px] font-medium">
                            ${Math.ceil(item.price / 83)}
                            <span className="font-light text-[15px]">
                              {" "}
                              night
                            </span>
                          </p>
                        </div>
                        <p className="flex gap-x-1 w-[20%] justify-end items-center">
                          {item.house_rating > 2 && (
                            <img
                              src={star}
                              className="w-[15px] h-[15px]"
                              alt=""
                            />
                          )}
                          <span className="font-light text-[15px]">
                            {item.house_rating > 2 && item.house_rating}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  </a>
                )
              )
            )}
      </div>
      {!!data && showMore.current && hasNextPage && (
        <div className="w-full flex flex-col mt-10 gap-y-2 justify-center items-center h-20">
          <span className="text-lg font-medium">
            {`Continue exploring ${selectedIcon} 
            ${selectedIcon.endsWith("s") ? "" : "homes"}`}
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
      )}

      {isFetchingNextPage && (
        <div className="w-full text-center mt-4 loader h-[24.5rem] flex-center"></div>
      )}
    </div>
  );
};

export default House;
