import React, { useEffect, useRef } from "react";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import star from "../data/Icons svg/star.svg";
import { useQuery } from "@tanstack/react-query";
import { getPayments, getWishList } from "../Services/apiRooms";
import MobileFooter from "../MobileFooter";

const Trips = () => {
  const userData = useSelector((store) => store.app.userData);
  const navigate = useNavigate();
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
    queryKey: ["trips"],
    queryFn: () => getWishList(paymentsData?.map((item) => item.room_id)),
    enabled: false,
  });

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
          <div className="grid    gap-x-4 1md:grid-cols-three-col grid-cols-1 gap-y-10 1lg:grid-cols-3 justify-center w-full items-start 1xs:grid-cols-two-col 1lg:gap-y-4 xl:gap-y-8  1md:gap-y-10 1xs:gap-y-10 grid-flow-row">
            {bookedTrips?.map((data, i) => (
              <div className="">
                <div>
                  <img
                    className="rounded-[20px] flex-center w-full  h-full object-cover "
                    src={data?.images?.[0]}
                    alt=""
                    style={{
                      scrollSnapAlign: "start",
                      flexShrink: 0,
                      scrollSnapStop: "always",
                      aspectRatio: "1/1",
                    }}
                  />

                  <Link to={`/house/${data?.id}`} key={data?.id}></Link>
                </div>
              </div>
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
