import React from "react";
import MobileFooter from "./MobileFooter";
import Header from "./Header/Header";

const Profile = () => {
  return (
    <div>
      <div
        id="header"
        className={`  z-50 bg-white hidden fixed top-0  w-full 1xz:flex items-start justify-center  `}
      >
        <Header></Header>
      </div>
      <div>Profile</div>
      <MobileFooter></MobileFooter>
    </div>
  );
};

export default Profile;
