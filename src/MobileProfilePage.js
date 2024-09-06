import React, { useEffect, useRef } from "react";
import notifications from "./data/ProfilePageSvg/notifications.svg";
import arrowRight from "./data/Icons svg/arrow-right.svg";
import personalInfo from "./data/ProfilePageSvg/MobilePersonalInfo.svg";
import account from "./data/ProfilePageSvg/MobileAccount.svg";
import help from "./data/ProfilePageSvg/MobileHelp.svg";
import safety from "./data/ProfilePageSvg/MobileSaftey.svg";
import airbnb from "./data/ProfilePageSvg/MobileAirbnb.svg";
import Report from "./data/ProfilePageSvg/MobileReport.svg";
import { getUserLogout } from "./Services/apiAuthentication";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const MobileProfilePage = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.app.userData);
  // navigate to login page if user is not logged in
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
        return navigate("/");
      }
    }, 1000);
  }, [userData, navigate]);

  return (
    <div className="w-full 1xz:hidden h-full">
      <div className="px-5 mb-20 mt-10">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-medium ">Profile</h1>
          <img src={notifications} className="h-6 w-6" alt="" />
        </div>
        <div className="mt-10 pb-5 border-b border-grey-light-50 flex h-full justify-between items-center">
          <div className="flex h-full gap-x-5 items-center">
            <div className="h-14 w-14 rounded-full flex-center bg-black text-white">
              <span>R</span>
            </div>
            <div className="flex  h-full flex-col">
              <span className="font-light text-lg">Rajat</span>
              <span className="text-sm font-light text-grey">Show profile</span>
            </div>
          </div>
          <div className="h-full flex items-center">
            <button className="">
              <img src={arrowRight} className="w-5 h-5" alt="" />
            </button>
          </div>
        </div>
        <div className="py-5">
          <div
            className="
            w-full border shadow-priceCardShadow border-grey-light-50 flex items-center rounded-lg p-6"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-y-1 flex-col">
                <span className="text-lg font-medium">Airbnb your place</span>
                <span className="text-sm font-light ">
                  it's simple to get set up and start earning.
                </span>
              </div>
              <div>
                <img
                  src="https://a0.muscache.com/pictures/b0021c55-05a2-4449-998a-5593567220f7.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5  pb-10 flex flex-col border-b border-grey-light-50 gap-y-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-5 items-center">
              <img src={personalInfo} className="w-6 h-6" alt="personal info" />
              <span>Personal info</span>
            </div>
            <div className="">
              <img
                src={arrowRight}
                className="w-5 h-5"
                alt="personal info button"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-5 items-center">
              <img src={account} className="w-6 h-6" alt="personal info" />
              <span>Account</span>
            </div>
            <div className="">
              <img
                src={arrowRight}
                className="w-5 h-5"
                alt="personal info button"
              />
            </div>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-2xl opacity-80 my-5 font-medium">Support</h1>
          <div className="flex py-5 border-b border-grey-light-50 flex-col gap-y-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5 items-center">
                <img src={help} className="w-6 h-6" alt="personal info" />
                <span className="opacity-80">Visit the help center</span>
              </div>
              <div className="">
                <img
                  src={arrowRight}
                  className="w-5 h-5"
                  alt="personal info button"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5 items-center">
                <img src={safety} className="w-6 h-6" alt="personal info" />
                <span className="opacity-80">Get help with safety issues</span>
              </div>
              <div className="">
                <img
                  src={arrowRight}
                  className="w-5 h-5"
                  alt="personal info button"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5 items-center">
                <img src={Report} className="w-6 h-6" alt="personal info" />
                <span className="opacity-80">
                  Report a neighborhood concern
                </span>
              </div>
              <div className="">
                <img
                  src={arrowRight}
                  className="w-5 h-5"
                  alt="personal info button"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-x-5 items-center">
                <img src={airbnb} className="w-6 h-6" alt="personal info" />
                <span className="opacity-80">How Airbnb works</span>
              </div>
              <div className="">
                <img
                  src={arrowRight}
                  className="w-5 h-5"
                  alt="personal info button"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-5">
          <button
            onClick={() => getUserLogout()}
            className="w-full h-12 font-medium hover:bg-shadow-gray-light border-black border  rounded-lg"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProfilePage;
