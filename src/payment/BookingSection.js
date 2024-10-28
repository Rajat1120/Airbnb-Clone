import React from "react";
import errorImg from "../data/Icons svg/Error.svg";

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
