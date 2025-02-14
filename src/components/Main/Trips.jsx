import React, { useEffect, useRef } from "react";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";
import { getPayments, getWishList } from "../../api/apiRooms";
import MobileFooter from "../../components/Footer/MobileFooter";
import monthSvg from "../../asset/Icons_svg/month.svg";
import person from "../../asset/Icons_svg/Person.svg";
import LoadingOverlay from "../../utils/LoadingOverlay";

const NoTripsBooked = () => {
  return (
    <div className="py-10 flex flex-col gap-y-2 justify-center w-full items-start mb-96">
      <h2 className="text-2xl font-normal">No trips Booked ... yet!</h2>
      <p className="font-light">
        Time to dust off your bags and start planning your next adventure.
      </p>
      <Link to="/">
        <button className="px-6 mt-2 py-3 border-black border rounded-lg font-medium">
          Start searching
        </button>
      </Link>

      <div className="w-full mt-10 h-[1px] bg-grey-light-50"></div>
    </div>
  );
};

const TripCard = ({ tripData, paymentsData }) => {
  const paymentDetails = paymentsData.find(
    (item) => item.room_id === tripData.id
  );

  return (
    <div className=" shadow-2xl p-5 rounded-xl">
      <Link to={`/house/${tripData.id}`} key={tripData.id}>
        <img
          className="rounded-[20px] w-full h-full object-cover"
          src={tripData.images?.[0]}
          alt={tripData["house-title"]}
          style={{
            scrollSnapAlign: "start",
            flexShrink: 0,
            scrollSnapStop: "always",
            aspectRatio: "1/1",
          }}
        />
      </Link>
      <TripInfo tripData={tripData} paymentDetails={paymentDetails} />
    </div>
  );
};

const TripInfo = ({ tripData, paymentDetails }) => (
  <div className="w-full h-full p-2 mt-5 grid-cols-2">
    <div className="1xxl:flex-row gap-x-2 flex flex-col gap-y-2 justify-between">
      <div>
        <h2 className="text-xl text-ellipsis truncate max-w-52 font-medium">
          {tripData["house-title"]}
        </h2>
        <span className="text-gray-600 block mt-2 font-[600px]">
          {tripData.city}, {tripData.country}
        </span>
      </div>
      <div>
        <span className="bg-blue-200 text-sm font-medium text-blue-800 rounded-full px-2 py-1">
          UPCOMING
        </span>
      </div>
    </div>

    <TripDates
      startDate={paymentDetails?.startDate}
      endDate={paymentDetails?.endDate}
    />
    <GuestInfo guestName={paymentDetails?.Guest} />
    <ItineraryButton reservationCode={paymentDetails?.id} />
  </div>
);

const TripDates = ({ startDate, endDate }) => (
  <div className="flex mt-3 items-center gap-x-2">
    <img className="h-4 w-4 opacity-70" src={monthSvg} alt="Month" />
    <span className="text-grey text-[15px] font-[600px]">
      {startDate} - {endDate}
    </span>
  </div>
);

const GuestInfo = ({ guestName }) => (
  <div className="flex items-center gap-x-2">
    <img className="h-4 w-4 opacity-70" src={person} alt="Guest" />
    <span className="text-grey text-[15px] font-[600px]">{guestName}</span>
  </div>
);

const ArrowRightSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        display: "block",
        fill: "none",
        height: "16px",
        width: "16px",
        stroke: "#ff385c",
        strokeWidth: "3",
        overflow: "visible",
      }}
    >
      <path fill="none" d="M12 4l11.3 11.3a1 1 0 0 1 0 1.4L12 28" />
    </svg>
  );
};

const ItineraryButton = ({ reservationCode }) => (
  <div className="flex flex-col gap-x-2 gap-y-2 1xxl:flex-row mt-3 items-start justify-between">
    <div className="flex gap-x-2 items-center">
      <h4 className="font-medium text-nowrap text-gray-700">
        Reservation code:
      </h4>
      <span className="text-grey text-[15px] font-[600px]">
        {String(reservationCode).split("-")[0]}
      </span>
    </div>
    <button className="flex cursor-auto items-center gap-x-2">
      <span className="text-nowrap text-pink font-medium">View itinerary</span>
      <ArrowRightSVG />
    </button>
  </div>
);

// main

const Trips = () => {
  const userData = useSelector((store) => store.app.userData);
  const navigate = useNavigate();
  const {
    data: paymentsData,

    isLoading: isGettingPayment,
  } = useQuery({
    queryFn: () => getPayments(userData?.email),
    queryKey: ["payments"],
    enabled: !!userData?.email,
  });

  const {
    data: bookedTrips,
    refetch,
    isLoading: isGettingTrips,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getWishList(paymentsData?.map((item) => item.room_id)),
    enabled: false,
  });

  let loading = isGettingTrips || isGettingPayment;

  useEffect(() => {
    if (paymentsData?.length) {
      refetch();
    }
  }, [paymentsData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  let isTripAvailable = bookedTrips?.length;

  let userDataLoaded = useRef(false);
  useEffect(() => {
    if (userData) {
      userDataLoaded.current = true;
    } else {
      userDataLoaded.current = false;
    }
  }, [userData]);

  useEffect(() => {
    setTimeout(() => {
      if (!userDataLoaded.current) {
        return navigate("/login");
      }
    }, 1000);
  }, [userData, navigate]);

  return (
    <div className="relative">
      {loading ? (
        <>
          <LoadingOverlay></LoadingOverlay>
          <div className="w-screen h-screen"></div>
        </>
      ) : null}
      <div
        id="header"
        className={`  z-50 bg-white fixed top-0 hidden  w-full 1xz:flex items-start justify-center  `}
      >
        <Header></Header>
      </div>

      <div className="1smd:w-[calc(100%-10rem)] px-5 1xz:mt-20 pt-9 pb-6 mx-auto">
        <h1 className="text-3xl border-b border-grey-light-50 pb-5 font-medium">
          Trips
        </h1>
        {!isTripAvailable && !loading ? <NoTripsBooked></NoTripsBooked> : null}
        {isTripAvailable && (
          <div className="grid 1lg:gap-x-4 mt-5 mb-20  1xs:px-12 1xz:px-0 gap-x-4  gap-y-10 grid-cols-1 1xz:grid-cols-2 1xll:grid-cols-3 justify-center w-full items-start 1lg:gap-y-4 xl:gap-y-8   grid-flow-row">
            {bookedTrips?.map((tripData) => (
              <TripCard
                key={tripData.id}
                tripData={tripData}
                paymentsData={paymentsData}
              />
            ))}
          </div>
        )}
      </div>
      {userData && <MobileFooter></MobileFooter>}
      <LongFooter></LongFooter>
    </div>
  );
};

export default Trips;
