import React from "react";
import star from "../../asset/Icons_svg/star.svg";
import { useSelector } from "react-redux";
import person from "../../asset/person.svg";

const HostImage = ({ src, alt }) => (
  <div className="w-full flex justify-center items-end">
    <img className="w-28 h-28 object-cover rounded-full" src={src} alt={alt} />
  </div>
);

const HostName = ({ name }) => (
  <div className="flex w-full justify-start pt-2 flex-col items-center">
    <h1 className="text-[32px] leading-9 tracking-wide font-[600] w-[80%] max-w-full overflow-hidden text-center text-ellipsis whitespace-nowrap">
      {name}
    </h1>
    <span className="leading-4 pb-2 text-sm font-medium">Host</span>
  </div>
);

const HostStats = ({ title, value, children }) => (
  <div className="flex items-start justify-start flex-col">
    <div className="flex gap-x-1">
      <span className="text-2xl leading-6 font-bold">{value}</span>
      {children}
    </div>
    <span className="text-[10px] font-medium leading-4 pt-1 ">{title}</span>
  </div>
);

const Divider = () => <div className="h-[1px] bg-grey-dim"></div>;

const HostInfo = ({
  hostImage,
  hostName,
  reviews,
  rating,
  yearsHosting,
  starIcon,
}) => (
  <div className=" py-5 shadow-2xl rounded-3xl grid grid-cols-3">
    {/* Host Image & Name Section */}
    <div className="col-span-2 w-full grid grid-cols-1">
      <HostImage src={hostImage} alt="host-image" />
      <HostName name={hostName} />
    </div>

    {/* Host Stats Section */}
    <div className="col-start-3 items-center justify-items-end grid grid-cols-1 col-end-4">
      <div className="w-24 flex flex-col justify-between h-44">
        {/* Reviews */}
        <HostStats title="Reviews" value={reviews} />
        <Divider />

        {/* Rating */}
        <HostStats title="Rating" value={rating}>
          <div className="flex gap-[2px] items-center">
            <img className="w-4 h-4" src={starIcon} alt="star-icon" />
          </div>
        </HostStats>
        <Divider />

        {/* Years Hosting */}
        <HostStats title="Years hosting" value={yearsHosting} />
      </div>
    </div>
  </div>
);
const reviews = 1607;
const rating = 4.34;
const yearsHosting = 6;

function cleanString(input) {
  // Replace "About" with an empty string
  let result = input.replace(/About/g, "");

  // Trim any leading or trailing spaces and remove extra spaces between words
  result = result.replace(/\s+/g, " ").trim();

  return result;
}

const TextBlock = ({ title, description, className = "" }) => (
  <div className={`w-full flex flex-col justify-between ${className}`}>
    <span className="block text-lg font-medium">{title}</span>
    <span className="font-light leading-5 text-[15px] whitespace-pre-wrap w-full h-full max-h-[6rem] overflow-scroll">
      {description}
    </span>
  </div>
);

const HostResponseInfo = ({
  responseRate = "100%",
  responseTime = "within an hour",
}) => (
  <div className="w-full h-20 flex flex-col justify-between">
    <span className="block text-lg font-medium">Host details</span>
    <div className="w-full h-10 flex flex-col justify-center">
      <span className="block leading-5 text-[15px] font-light">
        Response rate: {responseRate}
      </span>
      <span className="block leading-5 text-[15px] font-light">
        Responds {responseTime}
      </span>
    </div>
  </div>
);

// Reusable button component
const MessageHostButton = () => (
  <div className="w-full pb-2 h-14">
    <div className="w-40 flex-center h-full bg-black text-white rounded-lg">
      Message Host
    </div>
  </div>
);

const HostDescriptionSection = ({
  hostDescription,
  cleanString,
  houseInfo,
}) => {
  const displayHostName = houseInfo?.host_name
    ? cleanString(houseInfo?.host_name)
    : "Carl";

  return (
    <div
      className={`flex flex-col gap-y-5 justify-between ${
        hostDescription ? "max-h-[24rem] h-full" : "max-h-[18rem] h-full"
      }`}
    >
      {hostDescription && (
        <TextBlock
          title={`About ${displayHostName}`}
          description={houseInfo?.host_description}
          className="pt-14"
        />
      )}

      {/* Host Details */}
      <div
        className={`w-full ${
          hostDescription ? "pt-5" : "1xz:pt-14"
        } h-20 flex flex-col justify-between`}
      >
        <HostResponseInfo></HostResponseInfo>
      </div>

      {/* Message Host Button */}
      <MessageHostButton />
    </div>
  );
};

// Main

const HostDetails = () => {
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);
  let hostDescription = Boolean(houseInfo?.host_description);
  const hostImage = houseInfo?.host_image ? houseInfo?.host_image : person;
  const hostName = houseInfo?.host_name
    ? cleanString(houseInfo?.host_name)
    : "Carl";

  return (
    <div className="flex px-5 1smm:px-0 1xz:flex-row flex-col gap-y-10 py-10 gap-x-20 w-full   relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]  after:bg-grey-dim">
      <div className=" max-w-[24rem] w-full max-h-80 h-full ">
        <div className="mb-6">
          <h1 className="text-[25px] font-[460]">Meet your host</h1>
        </div>

        <HostInfo
          hostImage={hostImage}
          hostName={hostName}
          reviews={reviews}
          rating={rating}
          yearsHosting={yearsHosting}
          starIcon={star}
        />
      </div>
      <HostDescriptionSection
        hostDescription={hostDescription}
        cleanString={cleanString}
        houseInfo={houseInfo}
      ></HostDescriptionSection>
    </div>
  );
};

export default HostDetails;
