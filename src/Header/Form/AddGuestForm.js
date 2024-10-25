import React from "react";
import Modal from "../../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setActiveInput, setHoverInput } from "./mainFormSlice";
import AddGuest from "./FormFields/AddGuest";
import searchIcon from "../../data/Icons svg/search-icon.svg";
import { handleSearch, useHandleCrossClick } from "./MainFormContent";
import cross from "../../data/Icons svg/cross.svg";
import { setHitSearch, setMinimize } from "../../Main/AppSlice";
import { handleSearchInput } from "./HandleSearch";

const AddGuestForm = ({
  onlyOneTime,
  handleInputField,
  addGuestRef,
  addGuestResetRef,
  modalRef,
}) => {
  const {
    curSelectInput,
    guestPlural,
    extraGuest,
    destinationInputVal,
    startDateToShow,
    EndDateToShow,
    selectedStartDate,
    selectedEndDate,
    textForGuestInput,
    textForFlexibleInput,
    region,
    adultCount,
    textForInputDuration,
    childCount,
    infantCount,
    petsCount: petCount,
    dateOption,

    combinedString,
  } = useSelector((store) => store.form);
  const { hitSearch } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const handleCrossClick = useHandleCrossClick();
  return (
    <Modal onlyOneTime={onlyOneTime}>
      <div
        id="addGuest-form"
        ref={addGuestRef}
        onMouseEnter={() => {
          if (curSelectInput !== "addGuest")
            dispatch(setHoverInput("addGuest"));
        }}
        onMouseLeave={() => {
          if (curSelectInput !== "addGuest") dispatch(setHoverInput(null));
        }}
        className={`flex 1xz:relative 1smd:static 1smd:w-[17.7rem]  ${
          curSelectInput === "addGuest"
            ? "rounded-full bg-white shadow-AddGuestShadow "
            : ""
        } 1xz:justify-between 1smd:justify-center items-center`}
      >
        <Modal.Open opens="addGuest">
          <div className="flex justify-center  items-center">
            <div
              htmlFor="addGuest"
              onClick={(e) => handleInputField(e.target, "addGuest")}
              className={`${
                curSelectInput
                  ? "1smd:w-[12.2rem] flex items-center before:z-10 "
                  : "1smd:w-[14.2rem]"
              } hover:before:content-['']  1xz:before:w-full 1smd:before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
                  ${
                    curSelectInput === "addGuest"
                      ? ""
                      : "before:hover:bg-grey-light-50 "
                  }
              justify-between
               1smd:before:left-[35.20rem] before:rounded-full before:hover:opacity-40    py-[0.8rem]  h-[3.85rem] 1smd:px-[1.5rem] cursor-pointer`}
            >
              <div className="flex flex-col 1xz:pl-6 1smd:pl-0 justify-center items-start">
                <div className="text-xs font-medium">Who</div>
                <div
                  className={`1smd:w-[6.62rem] flex justify-between items-center outline-none focus:outline-none  
                    ${
                      curSelectInput && curSelectInput !== "addGuest"
                        ? "bg-shadow-gray"
                        : ""
                    }
                    `}
                >
                  <p
                    className={`text-sm mt-[2px] truncate ${
                      adultCount + childCount > 0 && curSelectInput
                        ? "font-medium"
                        : "font-extralight"
                    } font-extralight text-black `}
                  >
                    {adultCount + childCount > 0 && curSelectInput
                      ? `${adultCount + childCount} guest${guestPlural} ${
                          petCount + infantCount > 0 ? extraGuest : ""
                        }`
                      : "Add guest"}
                  </p>
                </div>
              </div>
              {(adultCount || childCount || infantCount || petCount) &&
              curSelectInput === "addGuest" ? (
                <div
                  ref={addGuestResetRef}
                  onClick={(e) => handleCrossClick(e, "guest")}
                  className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                >
                  <img className="h-4 w-4" src={cross} alt="" />
                </div>
              ) : null}
              <div />
            </div>
          </div>
        </Modal.Open>
        {
          <div
            onClick={() => {
              curSelectInput && dispatch(setActiveInput(""));
              dispatch(setHitSearch(hitSearch + 1));
              handleSearch({
                region,
                dispatch,
                dateOption,
                startDateToShow,
                EndDateToShow,
                selectedStartDate,
                selectedEndDate,
                destinationInputVal,
                textForInputDuration,
                textForFlexibleInput,
                textForGuestInput,
              });
              handleSearchInput(
                region,
                destinationInputVal,
                combinedString,
                dispatch
              );
              dispatch(setMinimize(false));
            }}
            className={`hover:bg-dark-pink 1xz:mr-2  ${
              curSelectInput
                ? "1smd:w-[8rem] 1xz:w-[3rem]  z-50"
                : "w-[3rem] 1smd:mr-0 z-50 "
            } hover:cursor-pointer flex items-center ${
              curSelectInput
                ? "1xz:justify-center 1smd:justify-start"
                : "justify-center"
            } duration-200 ease-out ${
              curSelectInput
                ? "bg-dark-pink ml-[-1.6rem] mr-2"
                : "bg-pink ml-[-0.5rem]"
            } rounded-full h-[3rem]`}
          >
            <img
              className={` ${curSelectInput ? "1smd:pl-2 1smd:pr-1" : ""} `}
              src={searchIcon}
              alt=""
            />
            {curSelectInput ? (
              <p className=" text-center 1xz:hidden 1smd:block text-white ">
                Search
              </p>
            ) : (
              ""
            )}
          </div>
        }
      </div>
      <Modal.Window
        resetRef={addGuestResetRef}
        modalRef={modalRef}
        name="addGuest"
      >
        <AddGuest></AddGuest>
      </Modal.Window>
    </Modal>
  );
};

export default AddGuestForm;
