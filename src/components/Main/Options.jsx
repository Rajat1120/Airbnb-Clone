import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import FilterHome from "./buttons/FilterHome";
import arrow_left from "../../asset/Icons_svg/arrow-left.svg";
import arrow_right from "../../asset/Icons_svg/arrow-right.svg";
import optionImgs from "../../utils/OptionsImgs";
import { setSelectedIcon } from "../../redux/AppSlice";
import { getRooms } from "../../api/apiRooms";
import { motion } from "framer-motion";

function useUniqueFilters({ roomsData, hitSearch, normalizeString }) {
  const [uniqueFilters, setUniqueFilters] = useState([]);
  const dispatch = useDispatch();
  // Effect to update unique filters and set initial selected icon
  useEffect(() => {
    if (roomsData) {
      const uniqueFilterValues = [
        ...new Set(
          roomsData.pages.flatMap((page) => page.map((item) => item.filter))
        ),
      ];
      setUniqueFilters(uniqueFilterValues);

      // Set the first option from the new list as the selected icon
      const newOptions = optionImgs.filter((item) =>
        uniqueFilterValues
          .map(normalizeString)
          .includes(normalizeString(item.iconName))
      );

      if (newOptions.length > 0) {
        dispatch(setSelectedIcon(newOptions[0].iconName));
      }
    }
  }, [roomsData, dispatch, hitSearch, normalizeString]);

  return uniqueFilters;
}

function useAtStart({
  optionsRef,
  itemRefs,
  isLoading,
  fetchNext,
  filteredOptions,
}) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = useCallback(() => {
    const container = optionsRef.current;
    if (container && itemRefs.current.length > 0) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const firstItemWidth = itemRefs.current[0]?.offsetWidth || 0;
      const lastItemWidth =
        itemRefs.current[itemRefs.current.length - 1]?.offsetWidth || 0;

      setIsAtStart(scrollLeft < firstItemWidth);
      setIsAtEnd(
        Math.abs(scrollWidth - clientWidth - scrollLeft) < lastItemWidth
      );

      fetchNext();
    }
  }, [fetchNext, itemRefs, optionsRef]);

  useEffect(() => {
    const container = optionsRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const lastItemWidth =
        itemRefs.current[itemRefs.current.length - 1]?.offsetWidth || 0;
      setIsAtEnd(
        Math.abs(scrollWidth - clientWidth - scrollLeft) < lastItemWidth
      );
    }
  }, [filteredOptions, itemRefs, optionsRef]);

  // Handle scroll event
  useEffect(() => {
    const optionRef = optionsRef?.current;
    if (optionRef) {
      optionRef.addEventListener("scroll", handleScroll);
      return () => optionRef.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, isLoading, optionsRef]);

  const handleScrollBtn = useCallback(
    (direction) => {
      const container = optionsRef.current;
      if (container) {
        const itemWidth = itemRefs.current[0]?.offsetWidth * 7 || 0;
        const scrollAmount = direction === "right" ? itemWidth : -itemWidth;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });

        // Immediately update isAtStart and isAtEnd
        setTimeout(() => {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          setIsAtStart(scrollLeft < itemWidth);
          setIsAtEnd(
            Math.abs(scrollWidth - clientWidth - scrollLeft) < itemWidth
          );

          if (scrollWidth - (scrollLeft + clientWidth) < clientWidth * 0.5) {
            fetchNext();
          }
        }, 100); // A short delay to ensure the scroll has started
      }
    },
    [fetchNext, itemRefs, optionsRef, setIsAtStart, setIsAtEnd]
  );

  return [isAtStart, isAtEnd, handleScrollBtn];
}

// Component for rendering loading placeholders
const LoadingPlaceholder = () => (
  <div className="flex space-x-10 mt-5 items-center justify-start inset-shadow w-full">
    {Array.from({ length: 28 }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col space-y-2 items-center justify-between"
      >
        <div className="h-8 w-8  bg-gray-200 animate-pulse  rounded-[50%]"></div>
        <div className="h-3 w-20  bg-gray-200 animate-pulse  rounded-2xl"></div>
      </div>
    ))}
  </div>
);

// Component for rendering options
const OptionsContainer = ({
  options,
  selectedIcon,
  dispatch,
  optionsRef,
  itemRefs,
}) => (
  <div
    id="options"
    ref={optionsRef}
    className="flex items-center pr-5 pl-6 1xs:pl-10 1xz:pl-2 1xs:pr-10 1xz:pr-0 overflow-y-hidden space-x-10 2xl:space-x-16 hide-scrollbar  justify-start h-16 1xz:h-20 2xl:h-28  w-full overflow-x-auto scroll-smooth"
    style={{ scrollBehavior: "smooth" }}
  >
    {options.map((item, i) => (
      <OptionItem
        index={i}
        key={i}
        item={item}
        isSelected={selectedIcon === item.iconName}
        onClick={() => dispatch(setSelectedIcon(item.iconName))}
        ref={(el) => {
          if (el) itemRefs.current[i] = el;
        }}
      />
    ))}
  </div>
);

// Component for individual option items
const OptionItem = React.forwardRef(
  ({ index, item, isSelected, onClick }, ref) => (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={`flex-center h-16 border-b-2 ${
        isSelected
          ? "border-black cursor-default"
          : "border-white cursor-pointer hover:border-grey-light-50 "
      }`}
      style={{
        scrollSnapAlign: "start",
        flexShrink: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isSelected ? 1 : 0.65 }}
      whileHover={{
        opacity: 1,
        transition: { duration: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="flex-col space-y-2 h-full items-center justify-center flex">
        <img src={item.link} className="h-6 2xl:h-10 2xl:w-10 w-6" alt="" />
        <span className="text-xs text-black font-medium text-center block whitespace-nowrap">
          {item.iconName}
        </span>
      </div>
    </motion.div>
  )
);

// Component for scroll buttons
const ScrollButtons = ({
  fetchNext,
  isAtStart,
  isAtEnd,
  optionsLength,
  handleScrollBtn,
}) => (
  <>
    {!isAtStart && optionsLength > 8 && (
      <ScrollButton direction="left" onClick={() => handleScrollBtn("left")} />
    )}
    {!isAtEnd && optionsLength > 8 && (
      <ScrollButton
        fetchNext={fetchNext}
        direction="right"
        onClick={() => handleScrollBtn("right")}
      />
    )}
  </>
);

// Component for individual scroll button
const ScrollButton = ({ fetchNext, direction, onClick }) => (
  <>
    <div
      className={`absolute ${
        direction === "left" ? "-left-1" : "right-[21.7rem]"
      } hidden 1sm:flex items-center justify-center w-10 h-20 bg-white`}
    >
      <div
        className={`absolute ${
          direction === "left" ? "left-4" : "-left-4"
        } w-full h-full bg-white ${
          direction === "left" ? "blur-right" : "blur-left"
        }`}
      ></div>
    </div>
    <button
      onMouseEnter={() => fetchNext && fetchNext()}
      onClick={onClick}
      className={`absolute hidden 1sm:flex items-center justify-center top-[30%] z-50 ${
        direction === "left" ? "left-0" : "right-[22rem]"
      } h-9 w-9 border-grey-dim bg-white hover:scale-110 hover:drop-shadow-md rounded-[50%] border-[1px]`}
    >
      <img
        src={direction === "left" ? arrow_left : arrow_right}
        className="h-4 w-6"
        alt={`Scroll ${direction}`}
      />
    </button>
  </>
);

// main

const Options = () => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const dispatch = useDispatch();
  const optionsRef = useRef(null);
  const itemRefs = useRef([]);

  const {
    selectedCountry,
    selectedIcon,
    hitSearch,
    inputSearchIds: ids,
    city,
    minimize,
  } = useSelector((store) => store.app);

  // Fetch function for rooms (used with infinite query)
  const {
    data: roomsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["rooms", ids, selectedCountry, city],
    queryFn: ({ pageParam = 0 }) =>
      getRooms(ids, selectedCountry, city, 2000, pageParam * 2000),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage && lastPage.length < 2000) return undefined;
      return pages.length;
    },
    enabled: true,
  });

  // Helper function to normalize strings
  const normalizeString = useCallback(
    (str) => str.replace(/[-'/]/g, "").toLowerCase(),
    []
  );

  // Redux selectors

  const uniqueFilters = useUniqueFilters({
    hitSearch,
    normalizeString,
    roomsData,
  });

  // Normalize filters and options
  const normalizedFilters = uniqueFilters.map(normalizeString);
  const curFilteredOptions = optionImgs.filter((item) =>
    normalizedFilters.includes(normalizeString(item.iconName))
  );

  useEffect(() => {
    const newOptions = curFilteredOptions.filter(
      (curItem) =>
        !filteredOptions.some(
          (filteredItem) => filteredItem.iconName === curItem.iconName
        )
    );

    if (newOptions.length > 0) {
      setFilteredOptions((prevOptions) => [...prevOptions, ...newOptions]);
    }
  }, [curFilteredOptions, filteredOptions]);

  let isLoading = status === "pending";

  // function to fetch the data from next 1k rows
  const fetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [isAtStart, isAtEnd, handleScrollBtn] = useAtStart({
    optionsRef,
    itemRefs,
    isLoading,
    fetchNext,
    filteredOptions,
  });

  return (
    <div
      className={`1sm:bg-white ${
        minimize ? "hidden" : ""
      } z-10 justify-self-center w-full 1sm:w-[calc(100%-5rem)] 1xl:w-[calc(100%-10rem)] mx-auto`}
    >
      <div
        className={`h-auto  flex w-full relative items-center justify-between space-x-10`}
      >
        <div className="w-full flex items-center overflow-hidden rounded-lg">
          {isLoading ? (
            <LoadingPlaceholder />
          ) : (
            <div className="flex items-center justify-start inset-shadow w-full">
              <OptionsContainer
                options={filteredOptions}
                selectedIcon={selectedIcon}
                dispatch={dispatch}
                optionsRef={optionsRef}
                itemRefs={itemRefs}
              />
              <ScrollButtons
                fetchNext={fetchNext}
                isAtStart={isAtStart}
                isAtEnd={isAtEnd}
                optionsLength={filteredOptions.length}
                handleScrollBtn={handleScrollBtn}
              />
            </div>
          )}
        </div>
        <FilterHome />
      </div>
    </div>
  );
};

export default Options;
