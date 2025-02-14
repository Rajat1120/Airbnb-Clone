import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setDestinationInputVal,
  setMinimizeFormBtn,
  setOpenName,
  setRegion,
} from "../../../../redux/mainFormSlice";
import Europe from "../../../../asset/Continents/europe.jpg";
import MiddleEast from "../../../../asset/Continents/Middle-East.jpg";
import world from "../../../../asset/Continents/world.jpg";
import UnitedArabEmirates from "../../../../asset/Continents/UAE.jpg";
import Thiland from "../../../../asset/Continents/thisland.jpg";
import SouthEastAsia from "../../../../asset/Continents/southEash.jpg";

// Custom hook to manage region selection logic
const useRegionSelection = () => {
  const dispatch = useDispatch();
  const dateOption = useSelector((store) => store.form.dateOption);

  const handleRegionSelect = (region) => {
    dispatch(setMinimizeFormBtn(""));
    dispatch(setRegion(region));
    dispatch(setDestinationInputVal(""));
    dispatch(setActiveInput("checkIn"));

    const openNameMap = {
      dates: "checkIn",
      month: "month",
      flexible: "flexible",
    };

    dispatch(setOpenName(openNameMap[dateOption] || "checkIn"));
    dispatch(setActiveInput(openNameMap[dateOption] || "checkIn"));
  };

  return { handleRegionSelect };
};

// Region data configuration
const regionConfig = [
  { id: "all", name: "I'm flexible", image: world },
  { id: "Europe", name: "Europe", image: Europe },
  { id: "Thiland", name: "Thailand", image: Thiland },
  { id: "Southeast Asia", name: "Southeast Asia", image: SouthEastAsia },
  {
    id: "United Arab Emirates",
    name: "United Arab Emirates",
    image: UnitedArabEmirates,
  },
  { id: "MiddleEast", name: "Middle East", image: MiddleEast },
];

// RegionCard component for individual region selection
const RegionCard = ({ region, image, name, isSelected, onClick }) => {
  return (
    <div
      onClick={() => onClick(region)}
      className="w-[7.8rem] flex justify-center flex-col items-center rounded-2xl hover:bg-shadow-gray h-[9.5rem]"
    >
      <img
        className="rounded-[1rem] hover:cursor-pointer mt-2 max-w-[6.8rem] border-[0.1rem]"
        src={image}
        alt={name}
      />
      <p
        className={`text-[0.85rem] w-[6.9rem] self-start font-[300] mt-2 ml-4 ${
          isSelected ? "font-medium" : ""
        } ${name === "United Arab Emirates" ? "truncate" : ""}`}
      >
        {name}
      </p>
    </div>
  );
};

// RegionGrid component to display all region cards
const RegionGrid = ({ selectedRegion, onRegionSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {regionConfig.map(({ id, name, image }) => (
        <RegionCard
          key={id}
          region={id}
          image={image}
          name={name}
          isSelected={selectedRegion === id}
          onClick={onRegionSelect}
        />
      ))}
    </div>
  );
};

// Main Destination component
const Destination = () => {
  const region = useSelector((store) => store.form.region);
  const { handleRegionSelect } = useRegionSelection();

  return (
    <div className="h-full pt-[2rem] px-[1.5rem] shadow-2xl rounded-[2rem] justify-center z-50 w-full pb-[1.5rem] bg-white">
      <div className="flex flex-col justify-center items-center">
        <p className="flex mb-3 text-sm font-medium ml-[1rem] w-full justify-self-start items-center">
          Search by region
        </p>
        <RegionGrid
          selectedRegion={region}
          onRegionSelect={handleRegionSelect}
        />
      </div>
    </div>
  );
};

export default Destination;
