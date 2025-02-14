import React from "react";
import Modal from "../../Modals/Modal";
import { useDispatch } from "react-redux";
import { setHoverInput } from "../../../redux/mainFormSlice";
import CheckInOption from "./DatesOption";
import Calendar from "./FormFields/Calendar";
import cross from "../../../asset/Icons_svg/cross.svg";
import { useHandleCrossClick } from "../../../hooks/MainFormContent";

// Custom hook for handling input hover state
const useInputHover = () => {
  const dispatch = useDispatch();

  const handleMouseEnter = () => dispatch(setHoverInput("checkIn"));
  const handleMouseLeave = () => dispatch(setHoverInput(null));

  return { handleMouseEnter, handleMouseLeave };
};

// Input Label Component
const InputLabel = ({ startDateToShow, curSelectInput }) => (
  <div className="flex flex-col justify-center items-start">
    <p className="text-xs font-medium">Check in</p>
    <p
      className={`${
        startDateToShow === "" || !curSelectInput
          ? "font-extralight text-[0.9rem]"
          : "text-sm font-medium"
      }`}
    >
      {startDateToShow && curSelectInput ? startDateToShow : "Add dates"}
    </p>
  </div>
);

// Reset Button Component
const ResetButton = ({ checkInResetRef, handleCrossClick }) => (
  <div
    ref={checkInResetRef}
    onClick={(e) => handleCrossClick(e, "checkIn")}
    className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
  >
    <img className="h-4 w-4" src={cross} alt="" />
  </div>
);

// Input Container Component
const InputContainer = ({
  curSelectInput,
  startDateToShow,
  handleInputField,
  checkInResetRef,
  handleCrossClick,
}) => (
  <div
    onClick={(e) => handleInputField(e.target, "checkIn")}
    className={`1smd:w-[8.67rem] hover:before:content-[''] 1smd:before:w-[8.67rem] 1xz:before:w-full before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[17.67rem] before:rounded-full 
      ${
        curSelectInput === "checkIn"
          ? "rounded-full w-full bg-white"
          : "before:hover:bg-grey-light-50"
      }
      before:hover:opacity-40 flex-col flex justify-center items-center h-[3.85rem] cursor-pointer`}
  >
    <div
      className={`1smd:w-[5.62rem] 1smd:pl-0 1smd:pr-0 1xz:pl-6 1xz:pr-3 1xz:w-full outline-none flex justify-between items-center focus:outline-none h[2rem] placeholder:text-sm 
      ${curSelectInput && curSelectInput !== "checkIn" ? "bg-shadow-gray" : ""} 
      placeholder:font-extralight placeholder:text-black`}
    >
      <InputLabel
        startDateToShow={startDateToShow}
        curSelectInput={curSelectInput}
      />
      {startDateToShow !== "" && curSelectInput === "checkIn" && (
        <ResetButton
          checkInResetRef={checkInResetRef}
          handleCrossClick={handleCrossClick}
        />
      )}
    </div>
  </div>
);

// Main DatesForm Component
const CheckInDateForm = ({
  onlyOneTime,
  checkInRef,
  checkInResetRef,
  modalRef,
  curSelectInput,
  startDateToShow,
  handleInputField,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useInputHover();
  const handleCrossClick = useHandleCrossClick();

  return (
    <Modal onlyOneTime={onlyOneTime}>
      <Modal.Open opens="checkIn">
        <div
          ref={checkInRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`flex 1xz:w-full 1xz:relative 1smd:static ${
            curSelectInput === "checkIn"
              ? "shadow-checkInShadow rounded-full"
              : ""
          } justify-center items-center`}
        >
          <InputContainer
            curSelectInput={curSelectInput}
            startDateToShow={startDateToShow}
            handleInputField={handleInputField}
            checkInResetRef={checkInResetRef}
            handleCrossClick={handleCrossClick}
          />
        </div>
      </Modal.Open>
      <Modal.Window
        resetRef={checkInResetRef}
        modalRef={modalRef}
        name="checkIn"
      >
        <div className="flex flex-col justify-center items-center">
          <CheckInOption />
          <Calendar />
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default CheckInDateForm;
