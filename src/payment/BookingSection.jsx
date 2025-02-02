import React from "react";
import errorImg from "../asset/Icons_svg/Error.svg";
import UpdatedPaymentForm from "./UpdatePaymentForm";
import cardImage from "../asset/Icons_svg/card.svg";
import star from "../asset/Icons_svg/star.svg";
import { useDispatch } from "react-redux";
import { setFirstBtnClick } from "../redux/CardSlice";

export const HeaderErrorMessage = () => {
  return (
    <div className="p-4 mb-10 flex space-x-2 border border-shadow-gray rounded-xl">
      <div className="bg-red-700 flex-center h-[2.8rem] w-[2.8rem] rounded-full">
        <img className="h-4 w-4" src={errorImg} alt="Error icon" />
      </div>
      <div className="flex justify-center flex-col">
        <span className="text-sm font-bold">Let's try that again</span>
        <span className="text-sm font-light">
          Please check your payment details
        </span>
      </div>
    </div>
  );
};

export const TripSummary = ({
  bookingDate,
  guestCount,
  bookingStatus,
  handleEditClick,
  setOpenGuestModal,
}) => {
  return (
    <div>
      <span className="text-2xl block font-medium pb-6">Your trip</span>

      {/* Booking Date Section */}
      <div className="pb-6 flex justify-between">
        <div className="flex flex-col">
          <span className="mt-2 font-medium block">Dates</span>
          <span className="font-light">{bookingDate}</span>
        </div>
        <button
          onClick={handleEditClick}
          className={`font-medium ${
            bookingStatus === "found" ? "cursor-disable" : ""
          } underline`}
          disabled={bookingStatus === "found"}
        >
          Edit
        </button>
      </div>

      {/* Guest Count Section */}
      <div className="pb-6 flex justify-between">
        <div className="flex flex-col">
          <span className="mt-2 font-medium block">Guests</span>
          <span className="font-light">
            {guestCount !== "0 guest" ? guestCount : "1 guest"}
          </span>
        </div>
        <button
          onClick={() => setOpenGuestModal(true)}
          className={`font-medium ${
            bookingStatus === "found" ? "cursor-disable" : ""
          } underline`}
          disabled={bookingStatus === "found"}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export const ErrorMessage = ({ error }) => {
  return (
    <div className="py-2 flex space-x-1 items-center">
      <div className="bg-red-700 flex items-center justify-center h-3 w-3 rounded-full">
        <img className="h-2 w-2" src={errorImg} alt="Error Icon" />
      </div>
      <span className="text-xs text-red-500">
        Check your {error[0] === "cardError" && "card number"}
        {error[0] === "ExpiryError" && "expiry date"}
        {error[0] === "cvcError" && "CVC"}
      </span>
    </div>
  );
};

export const PaymentSection = ({
  guestCount,
  bookingStatus,
  formatStartDate,
  formattedEndDate,
  numOfDays,
  setSubmitFormReference,
  submitFormReference,
  handleDataFromChild,
  totalAmount,
  userData,
  userBookingData,
}) => {
  return (
    <div className="w-full mt-4 border border-grey rounded-lg">
      <UpdatedPaymentForm
        guestCount={guestCount !== "0 guest" ? String(guestCount) : "1 guest"}
        booked={bookingStatus}
        startDate={formatStartDate || userBookingData?.booking?.startDate}
        endDate={formattedEndDate || userBookingData?.booking?.endDate}
        numOfDays={numOfDays || userBookingData?.booking?.numOfDays}
        setOnSubmitReference={setSubmitFormReference}
        onSubmitReference={submitFormReference}
        onSendData={handleDataFromChild}
        totalAmount={totalAmount}
        userId={userData}
      />
    </div>
  );
};

export const CardTypeSection = () => {
  return (
    <div className="w-full border border-grey rounded-lg">
      <div className="pt-4 pb-4 pl-4 pr-10">
        <div className="flex h-6 items-center space-x-2">
          <img src={cardImage} className="h-8 w-10" alt="Card Icon" />
          <span className="font-light"> Credit or debit card</span>
        </div>
      </div>
    </div>
  );
};

export const PaymentMethods = () => {
  return (
    <div className="flex mb-6 items-end justify-between">
      <span className="text-2xl">Pay with</span>
      <div className="flex space-x-1">
        <img
          className="w-8 h-3"
          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
          alt="Visa"
        />
        <img
          className="w-8 h-3"
          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
          alt="Mastercard"
        />
        <img
          className="w-8 h-3"
          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
          alt="American Express"
        />
        <img
          className="w-8 h-3"
          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_rupay.f419bf8f3062eb6d2408393354129ba8.svg"
          alt="RuPay"
        />
        <img
          className="w-8 h-3"
          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_dinersclub.0e75154d53aa4800c036282b8e189999.svg"
          alt="Diners Club"
        />
      </div>
    </div>
  );
};

export const CardholderNameInput = () => {
  return (
    <div className="w-full relative flex justify-center mt-4 border border-grey rounded-lg">
      <span className="absolute left-3 top-2 text-xs font-light">
        Cardholder name
      </span>
      <input
        className="mx-3 mt-6 mb-2 w-full outline-none"
        id="card-holder-name"
        type="text"
      />
    </div>
  );
};

export const TripRequirements = () => {
  return (
    <div className="mt-2 w-full">
      <span className="pt-8 border-t border-grey-light-50 w-full block text-2xl font-medium pb-6">
        Required for your trip
      </span>

      {/* Message to the Host Section */}
      <div className="mb-6 justify-between space-x-2 flex">
        <div className="flex flex-col">
          <span>Write a message to the Host</span>
          <span className="text-sm">
            Before you continue, let Renata know a little about your trip and
            why their place is a good fit.
          </span>
        </div>
        <div>
          <button
            disabled
            className="px-[15px] text-sm border-black py-[7px] border rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="mb-10 justify-between space-x-2 flex">
        <div className="flex  flex-col">
          <span className="font-bold">Profile photo</span>
          <span className="text-sm">
            Hosts want to know who’s staying at their place.
          </span>
        </div>
        <div>
          <button
            disabled
            className="px-[15px] text-sm border-black py-[7px] border rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export const GroundRules = () => {
  return (
    <div className="mt-2 border-t border-grey-light-50 w-full">
      <div className="pt-8 w-full pb-6">
        <span className="block font-medium text-2xl mb-6">Ground rules</span>
        <p className="mb-4 font-light">
          We ask every guest to remember a few simple things about what makes a
          great guest.
        </p>
        <ul className="custom-list">
          <li>
            <span className="font-light">Follow the house rules</span>
          </li>
          <li>
            <span className="font-light">
              Treat your Host’s home like your own
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const BookingButton = ({
  bookingStatus,
  dataFromChild,
  setSubmitFormReference,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setSubmitFormReference(true);
    dispatch(setFirstBtnClick(true));
  };

  const isDisabled =
    bookingStatus === "found" ||
    !dataFromChild.stripe ||
    dataFromChild.processing ||
    !dataFromChild.session;

  return (
    <div className="py-8 mt-2 border-t border-grey-light-50 w-full">
      <button
        onClick={handleClick}
        type="button"
        disabled={isDisabled}
        className={`bg-dark-pink ${
          isDisabled ? "cursor-disable" : "cursor-pointer"
        } font-medium rounded-lg text-white w-56 h-14`}
      >
        {dataFromChild.processing || dataFromChild.isSubmitting
          ? "Processing..."
          : "Request to book"}
      </button>
    </div>
  );
};

export const RoomCard = ({ roomData, isSmallScreen, rating }) => {
  return (
    <div className="flex space-x-4">
      <div className="max-w-28 min-w-24 min-h-24 max-h-28">
        <img
          className="w-full object-cover rounded-xl h-full aspect-square"
          src={roomData?.images[0]}
          alt={`${roomData?.host_name || "Guest's Room"} Img`}
        />
      </div>
      <div className="w-full justify-center flex space-y-1 flex-col">
        <span
          className={`block ${
            isSmallScreen ? "1xz:max-w-28 1xz:truncate 1xz:text-ellipsis" : ""
          } text-sm font-medium`}
        >
          At{" "}
          {roomData?.host_name
            ? roomData?.host_name?.replace(/about/gi, "")
            : "Carl's"}
          's
        </span>
        <span className="text-sm font-light">Entire guest suite</span>
        <div className="flex items-center space-x-1">
          <img className="w-4 h-4" src={star} alt="Star Rating" />
          <span className="text-sm font-medium">{roomData?.house_rating}</span>
          <span className="text-sm font-light">
            {isSmallScreen ? `(${rating})` : `(${rating} reviews)`}
          </span>
        </div>
      </div>
    </div>
  );
};

export const PriceDetails = ({
  roomData,
  numOfDays,
  userBookingData,
  totalAmount,
}) => {
  // Calculate the number of nights and prices
  const nights = Math.abs(numOfDays || userBookingData?.booking?.numOfDays);
  const nightlyRate = Math.ceil(roomData?.price / 83);
  const totalNightsPrice = nightlyRate * nights;
  const cleaningFee = Math.floor(nightlyRate * 0.7);
  const serviceFee = Math.floor(0.11 * totalNightsPrice);

  return (
    <>
      <div className="py-6  ">
        <span className="block text-2xl font-medium">Price details</span>
      </div>

      <div>
        <div className="flex pb-4 font-light justify-between items-center">
          <span>
            ${nightlyRate} x {nights} nights
          </span>
          <span>${totalNightsPrice}</span>
        </div>
        <div className="flex pb-4 justify-between font-light items-center">
          <span>Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
        <div className="flex pb-4 justify-between font-light items-center">
          <span>Airbnb service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="flex border-t border-grey-light-50 pt-4 justify-between font-light items-center">
          <span className="font-medium">Total (U.S. Dollar)</span>
          <span className="font-medium">${totalAmount}</span>
        </div>
      </div>
    </>
  );
};
