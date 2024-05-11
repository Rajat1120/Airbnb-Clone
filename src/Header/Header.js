// import myIcon from "./data/airbnb-Img.svg";

import icon from "../data/airbnbLogo.svg";
import globe from "../data/globe.svg";
import menu from "../data/Menu-Icon.svg";
import person from "../data/person.svg";

function Header({ startScroll }) {
  let onScrollProperty =
    "translate-y-[-5.2rem] duration-300 scale-50 w-[40rem] h-[5.5rem]  ";

  let classForForm = `w-[53rem] flex ${
    !startScroll ? onScrollProperty : ""
  }  mb-5 border-[1px]  rounded-full shadow-[0_3px_12px_0px_rgba(0,0,0,0.1)] ] self-center absolute top-[5rem]   h-[4rem]`;

  return (
    <div
      className={`after:content-[''] flex flex-col justify-start after:w-full after:bg-grey-dim bg-white   after:absolute  ${
        !startScroll
          ? "after:translate-y-[5rem]  after:duration-300 "
          : "after:translate-y-[10rem] duration-1000"
      }  ${!startScroll ? "" : " h-[10rem] "} after:h-[0.6px]`}
    >
      <div className="grid grid-cols-3  px-10 ">
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
        <div
          className={`flex h-20 ${
            !startScroll ? "scale-0 duration-300 " : ""
          } justify-center  items-center px-6`}
        >
          <button className="h-[44] w-[72.65] px-4 py-2 rounded-md font-medium ">
            Stays
          </button>

          <p className="h-[44]  text-center w-[7rem] text-grey font-light  ">
            Experiences
          </p>
          <p className="w-[12rem] text-center text-grey font-light ">
            Online Experiences
          </p>
        </div>
        <div className="h-20 flex items-center justify-end ">
          <a href="#">
            <p className="text-sm font-[450]; ">Airbnb your home</p>
          </a>
          <button className="px-[0.62rem]">
            <img className="scale-[0.7] w-[100%]" src={globe} alt="" />
          </button>

          <div className=" py-[8px] pl-[14px] pr-[8px] hover:shadow-3xl transition-all rounded-3xl border-[1px] border-grey opacity-[0.7] ">
            <button className="w-[62px] flex space-x-3">
              <img src={menu} className="scale-[0.8]" alt="" />
              <img src={person} className="scale-[1.5]" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className={classForForm}>
        <div>
          <div className="flex justify-center  items-center">
            <label
              htmlFor="destination"
              className="w-[17.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-0 before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
            >
              <div className="0">
                <div className="text-xs font-medium">Where</div>
                <input
                  type="text"
                  className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                  id="destination"
                  placeholder="Search destinations"
                />
              </div>
            </label>
          </div>
          <div className=":map"></div>
        </div>
        <div></div>
        <div className="flex">
          <div className="flex justify-center  items-center">
            <label
              htmlFor="dates"
              className="w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[17.67rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
            >
              <div className="0">
                <div className="text-xs font-medium">Check in</div>
                <input
                  type="text"
                  className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                  id="dates"
                  placeholder="Add dates"
                />
              </div>
            </label>
          </div>
          <div className="flex justify-center  items-center">
            <label
              htmlFor="dates"
              className="w-[8.67rem] hover:before:content-[''] before:w-[8.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[26.34rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
            >
              <div className="0">
                <div className="text-xs font-medium">Check in</div>
                <input
                  type="text"
                  className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                  id="dates"
                  placeholder="Add dates"
                />
              </div>
            </label>
          </div>
        </div>
        <div></div>
        <div>
          <div className="flex justify-center  items-center">
            <label
              htmlFor="destination"
              className="w-[17.67rem] hover:before:content-[''] before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem] before:left-[35.20rem] before:rounded-full before:hover:bg-gray-300 before:hover:opacity-40   py-[0.8rem]  h-[3.85rem] px-[2rem] cursor-pointer"
            >
              <div className="0">
                <div className="text-xs font-medium">Who</div>
                <input
                  type="text"
                  className="w-[13.62rem] outline-none focus:outline-none h[2rem] placeholder:text-sm placeholder:font-extralight placeholder:text-black"
                  id="destination"
                  placeholder="Add guests"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
