import React from "react";
import MobileFooter from "./MobileFooter";
import Header from "./Header/Header";
import profilePageData from "./profilePageData";
import LongFooter from "./House-detail/LongFooter";
import { useSelector } from "react-redux";
import MobileProfilePage from "./MobileProfilePage";

const Profile = () => {
  const userData = useSelector((state) => state.app.userData);

  return (
    <div>
      <div
        id="header"
        className={`  z-50 bg-white hidden fixed top-0  w-full 1xz:flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      <MobileProfilePage></MobileProfilePage>
      <div className="w-full hidden  1xz:flex  mt-36 mb-20 justify-center">
        <div className="flex flex-col justify-start">
          <div className="flex-col  justify-start">
            <h1 className="text-4xl font-medium">Account</h1>
            <div className="mt-2 flex gap-x-1 items-center">
              <span className="font-medium text-lg">
                {String(userData?.user_metadata?.name).split(" ")[0]},
              </span>
              <span className="text-lg font-light">{userData?.email}</span>
              <span className="flex  mx-0 items-center justify-center">
                <span className="w-[2px] h-[2px] bg-current rounded-full"></span>
              </span>
              <button className="cursor-auto underline text-lg font-medium">
                Go to profile
              </button>
            </div>
          </div>
          <div className="grid gap-5 mt-10 grid-cols-2  1lg:grid-cols-3">
            {profilePageData.map((item, i) => {
              return (
                <div
                  key={i}
                  className="shadow-priceCardShadow flex flex-col gap-y-6 p-4 w-full max-w-80 rounded-xl "
                >
                  <div>
                    <img className="w-9 h-9" src={item.svg} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title1}</span>
                    <span className="text-sm font-light text-grey">
                      {item.title2}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <LongFooter></LongFooter>
      <MobileFooter></MobileFooter>
    </div>
  );
};

export default Profile;
