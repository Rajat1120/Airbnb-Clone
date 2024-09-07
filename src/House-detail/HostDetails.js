import React from "react";
import star from "../../src/data/Icons svg/star.svg";
import { useSelector } from "react-redux";
import person from "../data/person.svg";
const HostDetails = () => {
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  let hostDescription = Boolean(houseInfo?.host_description);

  function cleanString(input) {
    // Replace "About" with an empty string
    let result = input.replace(/About/g, "");

    // Trim any leading or trailing spaces and remove extra spaces between words
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }

  return (
    <div className="flex px-5 1smm:px-0 1xz:flex-row flex-col gap-y-10 py-10 gap-x-20 w-full  justify-between relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim">
      <div className=" w-[24.68rem] max-h-80 h-full ">
        <div className="mb-6">
          <h1 className="text-[25px]   font-[460]">Meet your host</h1>
        </div>
        <div className=" ">
          <div className="h-full py-5 shadow-2xl rounded-3xl w-[23.75rem] grid grid-cols-3">
            <div className="col-span-2 w-full   grid-cols-1 grid ">
              <div className="w-full  flex justify-center items-end">
                <img
                  className="w-28 h-28 object-cover rounded-full"
                  src={houseInfo?.host_image ? houseInfo?.host_image : person}
                  alt="host-image"
                />
              </div>
              <div className="flex w-full justify-start pt-2 flex-col items-center">
                <h1 className="text-[32px] leading-9 tracking-wide font-[600] w-[80%] max-w-full overflow-hidden text-center   text-ellipsis whitespace-nowrap">
                  {houseInfo?.host_name
                    ? cleanString(houseInfo?.host_name)
                    : "Carl"}
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
        className={` w-[41.31rem]  flex flex-col gap-y-5 justify-between  ${
          hostDescription ? "max-h-[22rem] h-full" : "max-h-[18rem] h-full"
        }`}
      >
        {hostDescription && (
          <div className="w-full pt-14 flex flex-col justify-between">
            <span className="block text-lg font-medium">
              About{" "}
              {houseInfo?.host_name
                ? cleanString(houseInfo?.host_name)
                : "Carl"}
            </span>
            <span className="font-light whitespace-pre-wrap w-full h-[4.8rem] overflow-scroll">
              {houseInfo?.host_description}
            </span>
          </div>
        )}
        <div
          className={`w-full ${
            hostDescription ? "pt-5" : "1xz:pt-14"
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
