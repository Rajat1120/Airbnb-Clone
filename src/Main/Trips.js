import React, { useEffect } from "react";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import star from "../data/Icons svg/star.svg";
import { useQuery } from "@tanstack/react-query";
import { getPayments, getWishList } from "../Services/apiRooms";

const Trips = () => {
  const userData = useSelector((store) => store.app.userData);

  const {
    data: paymentsData,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getPayments(userData?.email),
    queryKey: ["payments"],
    enabled: !!userData?.email,
  });

  const { data: bookedTrips, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: () => getWishList(paymentsData?.map((item) => item.room_id)),
    enabled: false,
  });

  // console.log(paymentsData);
  // console.log(bookedTrips);

  useEffect(() => {
    if (paymentsData?.length) {
      refetch();
    }
  }, [paymentsData]);

  let isTripAvailable = bookedTrips.length;

  return (
    <div className="relative">
      <div
        id="header"
        className={`  z-50 bg-white fixed top-0  w-full flex items-start justify-center  `}
      >
        <Header></Header>
      </div>

      <div className="w-[calc(100%-10rem)] mt-20 pt-9 pb-6 mx-auto">
        <h1 className="text-3xl border-b border-grey-light-50 pb-5 font-medium">
          Trips
        </h1>
        {!isTripAvailable && (
          <div className=" py-10 flex flex-col gap-y-2 justify-center w-full items-start mb-96 ">
            <h2 className="text-2xl font-normal">No trips Booked ... yet!</h2>
            <p className="font-light">
              Time to dust off your bags and start planning your next adventure.
            </p>
            <Link to={"/"}>
              <button className="px-6 mt-2 py-3 border-black border rounded-lg font-medium">
                Start searching
              </button>
            </Link>

            <div className="w-full mt-10 h-[1px] bg-grey-light-50"></div>
          </div>
        )}
        {isTripAvailable && (
          <div className="w-full">
            {bookedTrips?.map((data) => (
              <div
                key={data.id}
                className="grid-cols-3 border-b border-grey-light-50   grid "
              >
                <div className=" p-5 h-full">
                  <div className="w-full  grid-cols-2 items-center grid-flow-col  py-6 grid">
                    <div className="w-40 h-40">
                      <img
                        className="w-full object-cover rounded-xl h-full"
                        src={data?.images?.[0]}
                        alt=""
                      />
                    </div>
                    <div className="w-full justify-center flex space-y-1 flex-col">
                      <span className="block text-sm font-medium">
                        At{" "}
                        {data?.host_name
                          ? data?.host_name?.replace(/about/gi, "")
                          : "Carl's"}
                        's
                      </span>
                      <span className="text-sm font-light">
                        Entire guest suite
                      </span>
                      <div className="flex items-center space-x-1">
                        <img className="w-4 h-4" src={star} alt="" />
                        <span className="text-sm font-medium">
                          {data?.house_rating}
                        </span>
                        <span className="text-sm font-light">
                          ({data?.rating_count})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" p-5 h-full"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LongFooter></LongFooter>
    </div>
  );
};

export default Trips;
