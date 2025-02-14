import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdultCount,
  setChildCount,
  setInfantCount,
  setPetsCount,
} from "../../../../redux/mainFormSlice";
import { useLocation } from "react-router";

// Counter Button Component
const CounterButton = ({ disabled, onClick, children, className = "" }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`w-8 h-8 m-4 items-center justify-center rounded-full bg-white border-[1px] border-grey ${
      disabled ? "cursor-disable" : ""
    } ${className}`}
  >
    {children}
  </button>
);

// Guest Category Component
const GuestCategory = ({
  title,
  subtitle,
  count,
  onDecrease,
  onIncrease,
  decreaseDisabled,
  increaseDisabled,
  showDivider = true,
  extraContent,
}) => (
  <div className="flex w-full flex-center flex-col">
    <div className="w-full justify-between flex items-center">
      <div>
        <p>{title}</p>
        <p className="text-sm text-grey">{subtitle}</p>
        {extraContent}
      </div>
      <div className="flex items-center justify-center">
        <CounterButton disabled={decreaseDisabled} onClick={onDecrease}>
          -
        </CounterButton>
        <p className="w-3 flex-center font-light">
          {count}
          {title === "Adults" && count === 16 && (
            <span className="text-sm">+</span>
          )}
        </p>
        <CounterButton disabled={increaseDisabled} onClick={onIncrease}>
          +
        </CounterButton>
      </div>
    </div>
    {showDivider && <div className="w-full mt-4 h-[1px] bg-shadow-gray" />}
  </div>
);

const GuestCounter = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    adultCount,
    childCount,
    infantCount,
    petsCount: petCount,
  } = useSelector((store) => store.form);

  const onCheckOutPage = location.pathname?.includes("/book");
  const totalCount = adultCount + childCount + infantCount + petCount;

  // Separate handlers for each guest type
  const handleAdultDecrease = () => {
    if (adultCount > 1) {
      dispatch(setAdultCount(adultCount - 1));
    }
  };

  const handleAdultIncrease = () => {
    if (adultCount + childCount < 16) {
      dispatch(setAdultCount(adultCount + 1));
    }
  };

  const handleChildDecrease = () => {
    if (childCount > 0) {
      dispatch(setChildCount(childCount - 1));
    }
  };

  const handleChildIncrease = () => {
    if (childCount + adultCount < 16) {
      if (totalCount === 0) {
        dispatch(setAdultCount(1));
      }
      dispatch(setChildCount(childCount + 1));
    }
  };

  const handleInfantDecrease = () => {
    if (infantCount > 0) {
      dispatch(setInfantCount(infantCount - 1));
    }
  };

  const handleInfantIncrease = () => {
    if (infantCount < 5) {
      if (totalCount === 0) {
        dispatch(setAdultCount(1));
      }
      dispatch(setInfantCount(infantCount + 1));
    }
  };

  const handlePetDecrease = () => {
    if (petCount > 0) {
      dispatch(setPetsCount(petCount - 1));
    }
  };

  const handlePetIncrease = () => {
    if (petCount < 5) {
      if (totalCount === 0) {
        dispatch(setAdultCount(1));
      }
      dispatch(setPetsCount(petCount + 1));
    }
  };

  const categories = [
    {
      title: "Adults",
      subtitle: "Age 13 or above",
      count: adultCount,
      onDecrease: handleAdultDecrease,
      onIncrease: handleAdultIncrease,
      decreaseDisabled: adultCount <= 1,
      increaseDisabled: adultCount + childCount === 16,
    },
    {
      title: "Children",
      subtitle: "Ages 2-12",
      count: childCount,
      onDecrease: handleChildDecrease,
      onIncrease: handleChildIncrease,
      decreaseDisabled: childCount === 0,
      increaseDisabled: childCount + adultCount === 16,
    },
    {
      title: "Infants",
      subtitle: "Under 2",
      count: infantCount,
      onDecrease: handleInfantDecrease,
      onIncrease: handleInfantIncrease,
      decreaseDisabled: infantCount === 0,
      increaseDisabled: infantCount === 5,
    },
    {
      title: "Pets",
      subtitle: "",
      count: petCount,
      onDecrease: handlePetDecrease,
      onIncrease: handlePetIncrease,
      decreaseDisabled: petCount === 0,
      increaseDisabled: petCount === 5,
      showDivider: false,
      extraContent: (
        <p className="text-sm hover:cursor-pointer font-medium text-grey">
          <u className="text-nowrap">Bringing a service animal?</u>
        </p>
      ),
    },
  ];

  return (
    <div
      className={`${
        onCheckOutPage ? "" : "1md:py-6"
      } flex-center w-full flex-col`}
    >
      {categories.map((category) => (
        <GuestCategory key={category.title} {...category} />
      ))}
    </div>
  );
};

const AddGuest = () => {
  return (
    <div className="w-full 1xz:py-5 1xz:px-5 flex-center">
      <GuestCounter />
    </div>
  );
};

export default AddGuest;
