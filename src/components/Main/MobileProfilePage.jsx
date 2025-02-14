import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import notifications from "../../asset/ProfilePageSvg/notifications.svg";
import arrowRight from "../../asset/Icons_svg/arrow-right.svg";
import personalInfo from "../../asset/ProfilePageSvg/MobilePersonalInfo.svg";
import account from "../../asset/ProfilePageSvg/MobileAccount.svg";
import help from "../../asset/ProfilePageSvg/MobileHelp.svg";
import safety from "../../asset/ProfilePageSvg/MobileSaftey.svg";
import airbnb from "../../asset/ProfilePageSvg/MobileAirbnb.svg";
import Report from "../../asset/ProfilePageSvg/MobileReport.svg";
import { getUserLogout } from "../../api/apiAuthentication";

// Custom hook to handle authentication check
const useAuthCheck = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.app.userData);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userData) {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [userData, navigate]);

  return userData;
};

// Profile Header Component
const ProfileHeader = () => (
  <div className="w-full flex justify-between">
    <h1 className="text-3xl font-medium">Profile</h1>
    <img src={notifications} className="h-6 w-6" alt="notifications" />
  </div>
);

// User Info Section Component
const UserInfoSection = () => (
  <div className="mt-10 pb-5 border-b border-grey-light-50 flex h-full justify-between items-center">
    <div className="flex h-full gap-x-5 items-center">
      <div className="h-14 w-14 rounded-full flex-center bg-black text-white">
        <span>R</span>
      </div>
      <div className="flex h-full flex-col">
        <span className="font-light text-lg">Rajat</span>
        <span className="text-sm font-light text-grey">Show profile</span>
      </div>
    </div>
    <div className="h-full flex items-center">
      <button>
        <img src={arrowRight} className="w-5 h-5" alt="show profile" />
      </button>
    </div>
  </div>
);

// Airbnb Promotion Component
const AirbnbPromotion = () => (
  <div className="py-5">
    <div className="w-full border shadow-priceCardShadow border-grey-light-50 flex items-center rounded-lg p-6">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-y-1 flex-col">
          <span className="text-lg font-medium">Airbnb your place</span>
          <span className="text-sm font-light">
            it's simple to get set up and start earning.
          </span>
        </div>
        <div>
          <img
            src="https://a0.muscache.com/pictures/b0021c55-05a2-4449-998a-5593567220f7.jpg"
            alt="airbnb promotion"
          />
        </div>
      </div>
    </div>
  </div>
);

// Navigation Item Component
const NavigationItem = ({ icon, text, altText }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-x-5 items-center">
      <img src={icon} className="w-6 h-6" alt={altText} />
      <span className="opacity-80">{text}</span>
    </div>
    <div>
      <img src={arrowRight} className="w-5 h-5" alt={`${altText} button`} />
    </div>
  </div>
);

// Personal Settings Section Component
const PersonalSettings = () => (
  <div className="pt-5 pb-10 flex flex-col border-b border-grey-light-50 gap-y-8">
    <NavigationItem
      icon={personalInfo}
      text="Personal info"
      altText="personal info"
    />
    <NavigationItem icon={account} text="Account" altText="account" />
  </div>
);

// Support Section Component
const SupportSection = () => (
  <div className="py-5">
    <h1 className="text-2xl opacity-80 my-5 font-medium">Support</h1>
    <div className="flex py-5 border-b border-grey-light-50 flex-col gap-y-5">
      <NavigationItem
        icon={help}
        text="Visit the help center"
        altText="help center"
      />
      <NavigationItem
        icon={safety}
        text="Get help with safety issues"
        altText="safety"
      />
      <NavigationItem
        icon={Report}
        text="Report a neighborhood concern"
        altText="report"
      />
      <NavigationItem
        icon={airbnb}
        text="How Airbnb works"
        altText="how airbnb works"
      />
    </div>
  </div>
);

// Logout Button Component
const LogoutButton = () => (
  <div className="w-full py-5">
    <button
      onClick={getUserLogout}
      className="w-full h-12 font-medium hover:bg-shadow-gray-light border-black border rounded-lg"
    >
      Log out
    </button>
  </div>
);

// Main MobileProfilePage Component
const MobileProfilePage = () => {
  useAuthCheck();

  return (
    <div className="w-full 1xz:hidden h-full">
      <div className="px-5 mb-20 mt-10">
        <ProfileHeader />
        <UserInfoSection />
        <AirbnbPromotion />
        <PersonalSettings />
        <SupportSection />
        <LogoutButton />
      </div>
    </div>
  );
};

export default MobileProfilePage;
