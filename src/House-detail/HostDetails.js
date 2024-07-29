import React from "react";
import star from "../../src/data/Icons svg/star.svg";

const HostDetails = () => {
  let hostDescription = true;

  return (
    <div className="flex py-10  w-full max-h-[27.75rem] justify-between relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim">
      <div className=" w-[24.68rem] h-full ">
        <div className="mb-6">
          <h1 className="text-[25px]   font-[460]">Meet your host</h1>
        </div>
        <div className=" ">
          <div className="h-[14.37rem] shadow-2xl rounded-3xl w-[23.75rem] grid grid-cols-3">
            <div className="col-span-2 w-full   grid-cols-1 grid ">
              <div className="w-full  flex justify-center items-end">
                <img
                  className="w-28 h-28 rounded-full"
                  src="https://a0.muscache.com/im/pictures/user/c4e01b26-3e06-4b65-b501-abfcd0c75840.jpg?im_w=240"
                  alt="host-image"
                />
              </div>
              <div className="flex w-full justify-start pt-2 flex-col items-center">
                <h1 className="text-[32px] leading-9 tracking-wide font-[600]">
                  Ankita
                </h1>
                <span className="leading-4 pb-2 text-sm font-medium">Host</span>
              </div>
            </div>
            <div className="col-start-3 items-center justify-items-end grid grid-cols-1 col-end-4">
              <div className="w-24 flex flex-col justify-between h-44">
                <div className="flex items-start justify-start flex-col">
                  <span className="text-2xl leading-6 font-bold">1607</span>
                  <span className="text-[10px] font-medium leading-4 pt-1 ">
                    Reviews
                  </span>
                </div>
                <div className="h-[1px] bg-grey-dim"></div>
                <div className="flex items-start justify-start flex-col">
                  <div className="flex gap-[2px] items-center">
                    <span className="text-2xl leading-6 font-bold">4.34</span>
                    <span>
                      <img className="w-4 h-4" src={star} alt="" />
                    </span>
                  </div>
                  <span className="text-[10px] font-medium leading-4 pt-1 ">
                    Rating
                  </span>
                </div>
                <div className="h-[1px] bg-grey-dim"></div>
                <div className="flex items-start justify-start flex-col">
                  <span className="text-2xl leading-6 font-bold">6</span>
                  <span className="text-[10px] font-medium leading-4 pt-1 ">
                    Years hosting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` w-[41.31rem]  flex flex-col justify-between  ${
          hostDescription ? "h-[22rem]" : "h-[18rem]"
        }`}
      >
        {hostDescription && (
          <div className="w-full pt-14 flex flex-col justify-between h-20">
            <span className="block text-lg font-medium">About Ankita</span>
            <span className="block font-light ">
              Life's journey is not to arrive at the grave safely, in a
              well-preserved body; but rather to skid in sideways, totally
              worn-out, shouting: "Holy shit, what a ride"..."!
            </span>
          </div>
        )}
        <div
          className={`w-full ${
            hostDescription ? "pt-10" : "pt-14"
          } h-20 flex flex-col justify-between `}
        >
          <span className="block text-lg font-medium">Host details</span>
          <div className="w-full h-10  flex flex-col justify-center">
            <span className="block leading-5 text-[15px] font-light">
              Response rate: 100%
            </span>
            <span className="block leading-5 text-[15px] font-light">
              Responds within an hour
            </span>
          </div>
        </div>
        <div className="w-full pb-2  h-14">
          <div className="w-40 flex-center h-full bg-black text-white rounded-lg">
            Message Host
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDetails;
