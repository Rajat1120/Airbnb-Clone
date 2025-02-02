import React from "react";
import Modal from "../../Modals/Modal";
import Destination from "./FormFields/Destination";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveInput,
  setDestinationInputVal,
  setHoverInput,
  setRegion,
} from "../../../redux/mainFormSlice";
import cross from "../../../asset/Icons_svg/cross.svg";
import { useHandleCrossClick } from "../../../hooks/MainFormContent";

// Custom hook for destination form logic
const useDestinationForm = () => {
  const dispatch = useDispatch();
  const { curSelectInput, destinationInputVal, region } = useSelector(
    (store) => store.form
  );

  const handleDestinationField = (input) => {
    if (input === "destination") {
      dispatch(setActiveInput("destination"));
    }
  };

  const handleInputChange = (value) => {
    dispatch(setRegion("all"));
    dispatch(setDestinationInputVal(value));
  };

  const handleMouseEvents = {
    onMouseEnter: () => {
      if (curSelectInput !== "destination") {
        dispatch(setHoverInput("destination"));
      }
    },
    onMouseLeave: () => {
      if (curSelectInput !== "destination") {
        dispatch(setHoverInput(null));
      }
    },
  };

  return {
    curSelectInput,
    destinationInputVal,
    region,
    handleDestinationField,
    handleInputChange,
    handleMouseEvents,
  };
};

// Separate input field component
const DestinationInput = React.forwardRef(
  ({ value, onChange, isActive, placeholder }, ref) => (
    <input
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      className={`1smd:w-[10.62rem] text-sm font-medium
      outline-none focus:outline-none placeholder:text-sm 
      ${isActive ? "" : "bg-shadow-gray"}
      placeholder:font-extralight placeholder:text-black`}
      id="destination"
      placeholder={placeholder}
      value={value}
    />
  )
);

// Clear button component
const ClearButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="w-[1.5rem] mr-[-1rem] self-center justify- flex justify-center items-center z-50 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
  >
    <img className="h-4 w-4" src={cross} alt="" />
  </div>
);

// Main component
const DestinationForm = ({ onlyOneTime, buttonRef, inputRef, modalRef }) => {
  const {
    curSelectInput,
    destinationInputVal,
    region,
    handleDestinationField,
    handleInputChange,
    handleMouseEvents,
  } = useDestinationForm();

  const handleCrossClick = useHandleCrossClick();

  const getInputValue = () => {
    if (!curSelectInput) return "";
    if (destinationInputVal) return destinationInputVal;
    if (region !== "all") return region;
    return "";
  };

  const showClearButton =
    (region !== "all" || destinationInputVal) &&
    curSelectInput === "destination";

  return (
    <div id="destination-form">
      <Modal onlyOneTime={onlyOneTime}>
        <Modal.Open opens="destination">
          <div
            ref={buttonRef}
            {...handleMouseEvents}
            className={`flex 1xz:relative 1smd:static 
              ${
                curSelectInput === "destination"
                  ? "shadow-destinationShadow rounded-full"
                  : ""
              }
              1smd:justify-center 1xz:justify-start items-center`}
          >
            <label
              onClick={() => handleDestinationField("destination")}
              htmlFor="destination"
              className={`1smd:w-[17.67rem] hover:before:content-[''] 
                1smd:before:w-[17.67rem] 1xz:before:w-full 
                before:absolute before:top-0 before:h-[3.85rem] 
                before:left-0 before:rounded-full
                ${
                  curSelectInput === "destination"
                    ? "rounded-full w-full bg-white"
                    : ""
                }
                ${
                  curSelectInput === "destination"
                    ? ""
                    : "before:hover:bg-grey-light-50"
                }
                before:hover:opacity-40 py-[0.8rem] h-[3.85rem] px-[2rem] cursor-pointer`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs font-medium">Where</div>
                  <DestinationInput
                    ref={inputRef}
                    value={getInputValue()}
                    onChange={handleInputChange}
                    isActive={
                      !curSelectInput || curSelectInput === "destination"
                    }
                    placeholder="Search Destinations"
                  />
                </div>
                {showClearButton && (
                  <ClearButton
                    onClick={(e) => handleCrossClick(e, "destination")}
                  />
                )}
              </div>
            </label>
          </div>
        </Modal.Open>
        <Modal.Window modalRef={modalRef} name="destination">
          <Destination />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default DestinationForm;
