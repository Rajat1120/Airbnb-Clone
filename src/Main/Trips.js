import React from "react";
import LongFooter from "../House-detail/LongFooter";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../Services/apiRooms";

const Trips = () => {
  const userData = useSelector((store) => store.app.userData);

  const { data, error, isLoading } = useQuery({
    queryFn: () => getPayments(userData?.email),
    queryKey: ["payments"],
  });

  console.log(data);

  let isTripAvailable = false;

  return (
    <div className="relative">
      <div
        id="header"
        className={`  z-50 bg-white fixed top-0  w-full flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      {!isTripAvailable && (
        <div className="w-[calc(100%-10rem)] mt-20 pt-9 pb-6 mx-auto">
          <h1 className="text-3xl border-b border-grey-light-50 pb-5 font-medium">
            Trips
          </h1>
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
        </div>
      )}
      <LongFooter></LongFooter>
    </div>
  );
};

export default Trips;
