import React from "react";
import kitchen from "../../asset/Icons_svg/kitchen.svg";
import car from "../../asset/Icons_svg/car.svg";
import wifi from "../../asset/Icons_svg/wifi.svg";
import tub from "../../asset/Icons_svg/tub.svg";
import pets from "../../asset/Icons_svg/pets.svg";
import tv from "../../asset/Icons_svg/tv.svg";
import lift from "../../asset/Icons_svg/Lift.svg";
import airConditioner from "../../asset/Icons_svg/AC.svg";
import carbon from "../../asset/Icons_svg/Carbon.svg";
import alarm from "../../asset/Icons_svg/Alarm.svg";
import bed from "../../asset/Icons_svg/bed.svg";
import Calendar from "../Header/Form/FormFields/Calendar";
import {
  setSelectedEndDate,
  setSelectedStartDate,
} from "../../redux/mainFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { differenceInCalendarDays, format } from "date-fns";
import { useParams } from "react-router";

// Bedroom Card Component (For individual bedroom display)
const BedroomCard = ({ imageUrl, bedType, bedroomName }) => (
  <div className="w-80 shrink-0 flex justify-center flex-col">
    <div className="h-52 flex items-center justify-center w-full">
      <img
        className="rounded-xl object-cover w-full h-full"
        src={imageUrl}
        alt={bedroomName}
        style={{
          scrollSnapAlign: "start",
          flexShrink: 0,
          scrollSnapStop: "always",
        }}
      />
    </div>
    <div className="flex flex-col">
      <span className="mt-4 font-medium">{bedroomName}</span>
      <span className="text-sm font-light">{bedType}</span>
    </div>
  </div>
);

// Empty Bedroom Placeholder (Fallback if no images are available)
const EmptyBedroomPlaceholder = ({ bedType }) => (
  <div className="border-[1px] max-w-56 w-full flex-center rounded-xl h-36">
    <div className="w-44 flex justify-between flex-col h-24">
      <img src={bed} className="w-7 h-7" alt="bed icon" />
      <div className="flex flex-col">
        <span className="text-lg font-medium">Bedroom 1</span>
        <span className="text-sm font-light">{bedType}</span>
      </div>
    </div>
  </div>
);

// Main Bedroom Section Component
const BedroomSection = ({ houseInfo }) => {
  const { sleep_bed_1_link, sleep_bed_2_link } = houseInfo || {};

  return (
    <div className="py-12 w-full flex justify-between flex-col">
      <h3 className="text-2xl leading-6 font-medium pb-6">
        Where you'll sleep
      </h3>

      {/* Render empty placeholder if no bed images are available */}
      {!sleep_bed_1_link ? (
        <EmptyBedroomPlaceholder bedType="1 double bed" />
      ) : (
        <div
          className="flex gap-4 w-full overflow-x-auto min-w-5rem"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          <BedroomCard
            imageUrl={sleep_bed_1_link}
            bedroomName="Bedroom 1"
            bedType="1 double bed"
          />

          {/* Render second bedroom only if the second bed image is available */}
          {sleep_bed_2_link && (
            <BedroomCard
              imageUrl={sleep_bed_2_link}
              bedroomName="Bedroom 2"
              bedType="1 queen bed"
            />
          )}
        </div>
      )}
    </div>
  );
};

const AmenityItem = ({ iconSrc, label, isAvailable = true }) => (
  <div className="w-1/2 pb-4 gap-4 flex">
    <img className="h-6 w-6" src={iconSrc} alt={`${label} icon`} />
    <span className={`font-light ${!isAvailable ? "line-through" : ""}`}>
      {label}
    </span>
  </div>
);

// Array of amenities to be rendered dynamically
const AMENITIES = [
  { iconSrc: kitchen, label: "Kitchen" },
  { iconSrc: wifi, label: "WiFi" },
  { iconSrc: car, label: "Free on-street parking" },
  { iconSrc: tub, label: "Private hot tub" },
  { iconSrc: pets, label: "Pets allowed" },
  { iconSrc: tv, label: "TV with standard cable/satellite" },
  { iconSrc: lift, label: "Lift" },
  { iconSrc: airConditioner, label: "Air conditioning", id: "airConditioner" },
  { iconSrc: carbon, label: "Carbon monoxide alarm", isAvailable: false },
  { iconSrc: alarm, label: "Smoke alarm", isAvailable: false },
];

const AmenitiesSection = () => (
  <div
    id="Amenities"
    className="py-12 scroll-mt-20 border-t border-grey-dim relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-grey-dim"
  >
    <div className="h-full">
      <h3 className="text-2xl leading-6 font-medium pb-6">
        What this place offers
      </h3>
      <div className="flex flex-col 1smm:flex-row 1xz:flex-wrap">
        {/* Map through amenities array to render each item */}
        {AMENITIES.map(({ iconSrc, label, isAvailable, id }) => (
          <AmenityItem
            key={label}
            iconSrc={iconSrc}
            label={label}
            isAvailable={isAvailable}
          />
        ))}
      </div>
    </div>
  </div>
);

// Component for clearing the date selection
const ClearDatesButton = ({ onClear }) => (
  <div
    onClick={onClear}
    className="w-full cursor-pointer flex items-center justify-end pr-4"
  >
    <span className="underline text-sm font-medium">Clear dates</span>
  </div>
);

// Function to format the date range or show default text
const DateRangeDisplay = ({
  startDate,
  endDate,
  formattedStartDate,
  formattedEndDate,
}) => {
  return startDate && endDate ? (
    <DateRange startDate={formattedStartDate} endDate={formattedEndDate} />
  ) : (
    <span className="text-sm font-light text-grey">
      Add your travel dates for exact pricing
    </span>
  );
};

const CalendarSection = ({ houseInfo }) => {
  const dispatch = useDispatch();

  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);
  // Custom handler for clearing the dates, using Redux dispatch
  const clearSelectedDates = () => {
    dispatch(setSelectedStartDate(null));
    dispatch(setSelectedEndDate(null));
  };

  let formatStartDate = startDate && format(new Date(startDate), "dd MMM yyyy");
  let formatEndDate = endDate && format(new Date(endDate), "dd MMM yyyy");

  // Usage:

  let numOfNights = Math.abs(differenceInCalendarDays(startDate, endDate));

  function calendarTitle() {
    if (!startDate && !endDate) {
      return "Select check-In date";
    } else if (startDate && !endDate) {
      return "Select checkout date";
    } else {
      return `${numOfNights} nights in ${houseInfo?.city}`;
    }
  }

  return (
    <div className="1xz:py-12 pt-12">
      <div className="flex flex-col">
        <h3 id="calendar" className="text-2xl leading-6 font-medium">
          {calendarTitle()}
        </h3>

        {/* Date range or prompt to add dates */}
        <div className="h-9 flex pt-2 items-start">
          <div className="flex-center gap-1">
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              formattedStartDate={formatStartDate}
              formattedEndDate={formatEndDate}
            />
          </div>
        </div>

        {/* Calendar display */}
        <div className="w-full flex pt-4 justify-center items-center">
          <Calendar />
        </div>

        {/* Clear dates button */}
        <ClearDatesButton onClear={clearSelectedDates} />
      </div>
    </div>
  );
};

const DateRange = ({ startDate, endDate }) => {
  return (
    <>
      <span className="text-sm text-gray-500 font-light">{startDate}</span>
      <span className="flex-center">-</span>
      <span className="text-sm text-gray-500 font-light">{endDate}</span>
    </>
  );
};

// Main component

const SleepBedDetail = () => {
  const { id } = useParams();

  const houseInfo = useSelector((store) => store.houseDetail.houseInfo[id]);
  return (
    <div className="w-full">
      <BedroomSection houseInfo={houseInfo}></BedroomSection>
      <AmenitiesSection></AmenitiesSection>
      <CalendarSection houseInfo={houseInfo}></CalendarSection>
    </div>
  );
};

export default SleepBedDetail;
