import icon from "../data/airbnbLogo.svg";
import globe from "../data/globe.svg";

import MainForm from "./Form/MainForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import UserDashboard from "./UserDashboard";
import AuthenticationModal from "./AuthenticationModal";

function Header({ headerRef }) {
  const location = useLocation();
  let onHouseDetailPage = location.pathname.includes("/house/");
  let onWishListPage = location.pathname.includes("/wishlist");
  let onTripsPage = location.pathname.includes("trips");
  let onSignInPage = location.pathname.includes("/login");

  let sliceName = onHouseDetailPage ? "houseSlice" : "app";
  const startScroll = useSelector((store) => store[sliceName]?.startScroll);

  const minimize = useSelector((store) => store.app.minimize);

  let val1 = minimize
    ? "1md:after:translate-y-[7rem]  after:opacity-0 "
    : "1md:after:translate-y-[2.1rem] 1sm:after:translate-y-[2rem] after:opacity-100";

  let classForAfter = `after:content-[''] ${
    !startScroll || onWishListPage || onTripsPage || onSignInPage
      ? ` ${val1}`
      : "1md:after:translate-y-[7.5rem] 1sm:after:translate-y-[11rem]"
  } after:transition-transform after:duration-[0.2s] after:ease-in-out after:w-full  after:bg-grey-dim after:z-50  after:h-[1px]`;

  return (
    <div
      id="header"
      className={` ${classForAfter} w-full after:mt-2 flex flex-col items-center  justify-center relative  bg-white   after:absolute  `}
    >
      <div
        className={`grid grid-cols-${
          onWishListPage || onTripsPage || onSignInPage ? "2" : "3"
        }  ${
          onHouseDetailPage ? "w-[calc(100%-10rem)]  mx-auto" : "w-full"
        } px-10 1xl:px-20 `}
      >
        <div className="w-8 ">
          <a href="/">
            <div className="flex h-20 items-center">
              <img className="mr-2  h-34 scale-[1.2] " src={icon} alt="like" />
              <h1 className="text-2xl 1lg:flex-center hidden   leading-8   text-pink text-start font-semibold">
                airbnb
              </h1>
            </div>
          </a>
        </div>
        {!onTripsPage && !onSignInPage && !onWishListPage && (
          <div
            className={`flex h-20  transition-transform duration-[0.3s] ease-in-out ${
              !startScroll
                ? `${
                    minimize
                      ? "translate-y-0"
                      : "-translate-y-20 1md:translate-x-0 1sm:-translate-x-56"
                  }  `
                : "1sm:translate-y-12 1md:translate-y-0"
            } justify-center  items-center `}
          >
            <button className="h-[44] w-[72.65] px-4 py-2 rounded-md font-medium ">
              Stays
            </button>

            <p className="h-[2.5rem] flex items-center justify-center hover:bg-gray-100 hover:text-slate-600 rounded-full text-center w-[8rem] text-grey font-light">
              Experiences
            </p>
          </div>
        )}
        <div className="h-20 flex   items-center  justify-end ">
          <a href="#">
            <p className="text-sm h-[2.5rem]  flex items-center justify-center rounded-full hover:bg-shadow-gray-light   w-[9rem] font-[450]; ">
              Airbnb your home
            </p>
          </a>
          <button className=" h-[2rem]   flex items-center justify-center rounded-full hover:bg-shadow-gray-light w-[2rem] ">
            <img className="h-4 w-4" src={globe} alt="" />
          </button>

          <UserDashboard></UserDashboard>
        </div>
        {<AuthenticationModal></AuthenticationModal>}
      </div>
      {!onWishListPage && !onSignInPage && !onTripsPage && (
        <MainForm headerRef={headerRef}></MainForm>
      )}
    </div>
  );
}

export default Header;
