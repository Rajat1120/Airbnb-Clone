import React from "react";
import Modal from "../../Modals/Modal";
import { useDispatch } from "react-redux";
import { setHoverInput } from "./mainFormSlice";
import CheckInOption from "./DatesOption";
import Calendar from "./FormFields/Calendar";
import cross from "../../data/Icons svg/cross.svg";
import { useHandleCrossClick } from "./MainFormContent";
const DatesForm = ({
  onlyOneTime,
  checkInRef,
  checkInResetRef,
  modalRef,
  curSelectInput,
  startDateToShow,
  handleInputField,
}) => {
  const dispatch = useDispatch();
  const handleCrossClick = useHandleCrossClick();
  return (
    <Modal onlyOneTime={onlyOneTime}>
      <Modal.Open opens="checkIn">
        <div
          ref={checkInRef}
          onMouseEnter={() => dispatch(setHoverInput("checkIn"))}
          onMouseLeave={() => dispatch(setHoverInput(null))}
          className={`flex 1xz:w-full  1xz:relative 1smd:static ${
            curSelectInput === "checkIn"
              ? "shadow-checkInShadow rounded-full"
              : ""
          } justify-center  items-center`}
        >
          <div
            onClick={(e) => handleInputField(e.target, "checkIn")}
            className={`1smd:w-[8.67rem] hover:before:content-[''] 1smd:before:w-[8.67rem] 1xz:before:w-full before:absolute before:top-0 before:h-[3.85rem] 1smd:before:left-[17.67rem] before:rounded-full 

                   ${
                     curSelectInput === "checkIn"
                       ? "rounded-full w-full bg-white"
                       : "before:hover:bg-grey-light-50 "
                   }
                  
                  before:hover:opacity-40 
                flex-col flex justify-center items-center 
               h-[3.85rem] cursor-pointer`}
          >
            <div
              className={`1smd:w-[5.62rem] 1smd:pl-0 1smd:pr-0 1xz:pl-6 1xz:pr-3  1xz:w-full outline-none flex justify-between items-center focus:outline-none h[2rem] placeholder:text-sm ${
                curSelectInput && curSelectInput !== "checkIn"
                  ? "bg-shadow-gray"
                  : ""
              } placeholder:font-extralight placeholder:text-black`}
            >
              <div
                className={` flex flex-col justify-center items-start ${
                  startDateToShow && curSelectInput === "checkIn"
                    ? "ml-[-0.5rem]"
                    : ""
                }`}
              >
                <p className="text-xs  font-medium">Check in</p>
                <p
                  className={`${
                    startDateToShow === "" || !curSelectInput
                      ? "font-extralight text-[0.9rem]"
                      : "text-sm font-medium"
                  }`}
                >
                  {startDateToShow && curSelectInput
                    ? startDateToShow
                    : "Add dates"}
                </p>
              </div>
              {startDateToShow !== "" && curSelectInput === "checkIn" && (
                <div
                  ref={checkInResetRef}
                  onClick={(e) => handleCrossClick(e, "checkIn")}
                  className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                >
                  <img className="h-4 w-4" src={cross} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window
        resetRef={checkInResetRef}
        modalRef={modalRef}
        name="checkIn"
      >
        <div className="flex  flex-col justify-center items-center ">
          <CheckInOption></CheckInOption>
          <Calendar></Calendar>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default DatesForm;
