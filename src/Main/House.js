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

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRowsWithOptions } from "../Services/apiRooms";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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

  useLayoutEffect(() => {
    if (!startScroll) window.scrollTo(0, 10);
  }, [selectedIcon, startScroll]);

  return (
    <div
      className={`relative pb-14 transition-transform duration-[0.3s] ease-in-out px-10 1xl:px-20 top-[4rem] ${
        !startScroll ? "-translate-y-[4.8rem] " : ""
      }`}
      ref={containerRef}
    >
      <div className="grid gap-x-6 grid-cols-four-col  1lg:grid-cols-four-col justify-center w-full items-start 1lg:gap-y-4 xl:gap-y-8 grid-flow-row">
        {status === "pending"
          ? Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="loader w-full h-[24rem] flex-center"
              ></div>
            ))
          : data?.pages.flatMap((page) =>
              page.map((item) => (
                <a
                  key={item.id}
                  href={`/house/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-[24.5rem]"
                >
                  <div
                    className="1xl:w-full  relative 1xl:h-full   flex gap-y-4 items-center justify-center flex-col"
                    onMouseEnter={() => {
                      dispatch(setHoveredItem(item.id));
                      dispatch(setHoveredItems([...hoveredItems, item.id]));
                    }}
                    onMouseLeave={() => dispatch(setHoveredItem(null))}
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
                            onClick={(e) => handleScrollBtn(e, "left", item.id)}
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
                          <span className="font-light text-[15px]"> night</span>
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
                  </div>
                </a>
              ))
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
