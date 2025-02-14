import React from "react";
import CheckInOption from "./DatesOption";
import cross from "../../../asset/Icons_svg/cross.svg";
import Calendar from "./FormFields/Calendar";
import Modal from "../../Modals/Modal";
import { useDispatch } from "react-redux";
import { setHoverInput } from "../../../redux/mainFormSlice";
import { useHandleCrossClick } from "../../../hooks/MainFormContent";

// Custom hook to handle input hover state
const useHoverState = () => {
  const dispatch = useDispatch();

  const handleMouseEnter = () => dispatch(setHoverInput("checkOut"));
  const handleMouseLeave = () => dispatch(setHoverInput(null));

  return { handleMouseEnter, handleMouseLeave };
};

// Separate component for the date display and cross button
const DateDisplay = ({
  EndDateToShow,
  curSelectInput,
  checkOutResetRef,
  handleCrossClick,
}) => (
  <div className="flex justify-between items-center w-full">
    <div
      className={`flex flex-col justify-center items-start ${
        EndDateToShow && curSelectInput === "checkOut" ? "ml-[-0.5rem]" : ""
      }`}
    >
      <p className="text-xs font-medium">Check out</p>
      <p
        className={`${
          EndDateToShow === "" || !curSelectInput
            ? "font-extralight text-[0.9rem]"
            : "text-sm font-medium"
        }`}
      >
        {EndDateToShow && curSelectInput ? EndDateToShow : "Add dates"}
      </p>
    </div>
    {EndDateToShow !== "" && curSelectInput === "checkOut" && (
      <CrossButton
        checkOutResetRef={checkOutResetRef}
        handleCrossClick={handleCrossClick}
      />
    )}
  </div>
);

// Separate component for the cross button
const CrossButton = ({ checkOutResetRef, handleCrossClick }) => (
  <div
    ref={checkOutResetRef}
    onClick={(e) => handleCrossClick(e, "checkOut")}
    className="w-[1.5rem] flex justify-center items-center z-50 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
  >
    <img className="h-4 w-4" src={cross} alt="" />
  </div>
);

// Separate component for the input wrapper
const InputWrapper = ({ curSelectInput, children, onClick }) => (
  <div
    onClick={onClick}
    className={`1smd:w-[8.67rem] hover:before:content-[''] 1smd:before:w-[8.67rem] 1xz:before:w-full before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[26.34rem] before:rounded-full 
      ${curSelectInput === "checkOut" ? "" : "before:hover:bg-grey-light-50"}
      before:hover:opacity-40 
      ${curSelectInput === "checkOut" ? "rounded-full w-full bg-white" : ""}
      h-[3.85rem] flex-col flex justify-center items-center cursor-pointer`}
  >
    {children}
  </div>
);

// Main component
const CheckOutDateForm = ({
  onlyOneTime,
  checkOutResetRef,
  checkOutRef,
  modalRef,
  curSelectInput,
  EndDateToShow,
  handleInputField,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useHoverState();
  const handleCrossClick = useHandleCrossClick();

  const containerClassName = `flex 1xz:w-full 1xz:relative 1smd:static ${
    curSelectInput === "checkOut" ? "shadow-checkOutShadow rounded-full" : ""
  } justify-center items-center`;

  const inputClassName = `1smd:w-[5.62rem] items-center 1smd:pl-0 1smd:pr-0 1xz:pl-6 1xz:pr-3 1xz:w-full flex justify-between outline-none focus:outline-none h[2rem] placeholder:text-sm ${
    curSelectInput && curSelectInput !== "checkOut" ? "bg-shadow-gray" : ""
  } placeholder:font-extralight placeholder:text-black`;

  return (
    <Modal onlyOneTime={onlyOneTime}>
      <Modal.Open opens="checkOut">
        <div
          ref={checkOutRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={containerClassName}
        >
          <InputWrapper
            curSelectInput={curSelectInput}
            onClick={(e) => handleInputField(e.target, "checkOut")}
          >
            <div className={inputClassName}>
              <DateDisplay
                EndDateToShow={EndDateToShow}
                curSelectInput={curSelectInput}
                checkOutResetRef={checkOutResetRef}
                handleCrossClick={handleCrossClick}
              />
            </div>
          </InputWrapper>
        </div>
      </Modal.Open>
      <Modal.Window
        resetRef={checkOutResetRef}
        modalRef={modalRef}
        name="checkOut"
      >
        <div className="flex flex-col justify-center items-center">
          <CheckInOption />
          <Calendar />
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default CheckOutDateForm;
