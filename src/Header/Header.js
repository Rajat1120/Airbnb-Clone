// import myIcon from "./data/airbnb-Img.svg";

import icon from "../data/airbnbLogo.svg";
import globe from "../data/globe.svg";
import menu from "../data/Menu-Icon.svg";

function Header() {
  return (
    <div className="grid grid-cols-3 px-10">
      <div className="w-8 ">
        <a href="#">
          <div className="flex h-20 items-center">
            <img className="mr-2  h-34 scale-[1.2] " src={icon} alt="like" />
            <h1 className="text-xl  leading-8   text-pink text-start font-semibold">
              airbnb
            </h1>
          </div>
        </a>
      </div>
      <div className="flex h-20 justify-center  items-center px-6">
        <button className="h-[44] w-[72.65] bg-blue-500 text-white px-4 py-2 rounded-md font-medium ">
          Stays
        </button>

        <p className="h-[44]  text-center w-[7rem] text-grey font-light  ">
          Experiences
        </p>
        <p className="w-[12rem] text-center text-grey font-light ">
          Online Experiences
        </p>
      </div>
      <div className="h-20 flex items-center  justify-end ">
        <a href="#">
          <p className="text-sm ">Airbnb your home</p>
        </a>
        <button className="px-[10px]">
          <img className="scale-[0.7] w-[100%]" src={globe} alt="" />
        </button>

        <div className=" py-[8px] pl-[14px] pr-[8px] ">
          <button className="w-[62px] ">
            <img src={menu} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
