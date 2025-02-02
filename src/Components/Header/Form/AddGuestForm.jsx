import React from "react";
import Modal from "../../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setActiveInput, setHoverInput } from "../../../redux/mainFormSlice";
import AddGuest from "./FormFields/AddGuest";
import searchIcon from "../../../asset/Icons_svg/search-icon.svg";
import cross from "../../../asset/Icons_svg/cross.svg";
import { setHitSearch, setMinimize } from "../../../redux/AppSlice";
import {
  handleSearch,
  useHandleCrossClick,
} from "../../../hooks/MainFormContent";
import { handleSearchInput } from "./HandleSearch";

// Custom hook to handle guest form state and actions
const useGuestForm = () => {
  const dispatch = useDispatch();
  const formState = useSelector((store) => store.form);
  const { hitSearch } = useSelector((store) => store.app);
  const handleCrossClick = useHandleCrossClick();

  const handleSearchClick = () => {
    const {
      region,
      dateOption,
      startDateToShow,
      EndDateToShow,
      selectedStartDate,
      selectedEndDate,
      destinationInputVal,
      textForInputDuration,
      textForFlexibleInput,
      textForGuestInput,
      combinedString,
    } = formState;

    if (formState.curSelectInput) {
      dispatch(setActiveInput(""));
    }
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

    handleSearchInput(region, destinationInputVal, combinedString, dispatch);
    dispatch(setMinimize(false));
  };

  return {
    formState,
    handleSearchClick,
    handleCrossClick,
  };
};

// Guest Input Display Component
const GuestInputDisplay = ({
  adultCount,
  childCount,
  infantCount,
  petCount,
  curSelectInput,
  guestPlural,
  extraGuest,
}) => (
  <div className="flex flex-col 1xz:pl-6 1smd:pl-0 justify-center items-start">
    <div className="text-xs font-medium">Who</div>
    <div
      className={`1smd:w-[6.62rem] flex justify-between items-center outline-none focus:outline-none  
      ${
        curSelectInput && curSelectInput !== "addGuest" ? "bg-shadow-gray" : ""
      }`}
    >
      <p
        className={`text-sm mt-[2px] truncate ${
          adultCount + childCount > 0 && curSelectInput
            ? "font-medium"
            : "font-extralight"
        } font-extralight text-black`}
      >
        {adultCount + childCount > 0 && curSelectInput
          ? `${adultCount + childCount} guest${guestPlural} ${
              petCount + infantCount > 0 ? extraGuest : ""
            }`
          : "Add guest"}
      </p>
    </div>
  </div>
);

// Search Button Component
const SearchButton = ({ curSelectInput, onClick }) => (
  <div
    onClick={onClick}
    className={`hover:bg-dark-pink 1xz:mr-2  ${
      curSelectInput
        ? "1smd:w-[8rem] 1xz:w-[3rem]  z-50"
        : "w-[3rem] 1smd:mr-0 z-50 "
    } hover:cursor-pointer flex items-center ${
      curSelectInput
        ? "1xz:justify-center 1smd:justify-start"
        : "justify-center"
    } duration-200 ease-out ${
      curSelectInput ? "bg-dark-pink ml-[-1.6rem] mr-2" : "bg-pink ml-[-0.5rem]"
    } rounded-full h-[3rem]`}
  >
    <img
      className={curSelectInput ? "1smd:pl-2 1smd:pr-1" : ""}
      src={searchIcon}
      alt="Search"
    />
    {curSelectInput && (
      <p className="text-center 1xz:hidden 1smd:block text-white">Search</p>
    )}
  </div>
);

const AddGuestForm = ({
  onlyOneTime,
  handleInputField,
  addGuestRef,
  addGuestResetRef,
  modalRef,
}) => {
  const dispatch = useDispatch();
  const { formState, handleSearchClick, handleCrossClick } = useGuestForm();

  const {
    curSelectInput,
    guestPlural,
    extraGuest,
    adultCount,
    childCount,
    infantCount,
    petsCount: petCount,
  } = formState;

  // Helper function to check if any guests are selected
  const hasAnyGuests = () => {
    return adultCount > 0 || childCount > 0 || infantCount > 0 || petCount > 0;
  };

  return (
    <Modal onlyOneTime={onlyOneTime}>
      <div
        id="addGuest-form"
        ref={addGuestRef}
        onMouseEnter={() => {
          if (curSelectInput !== "addGuest") {
            dispatch(setHoverInput("addGuest"));
          }
        }}
        onMouseLeave={() => {
          if (curSelectInput !== "addGuest") {
            dispatch(setHoverInput(null));
          }
        }}
        className={`flex 1xz:relative 1smd:static 1smd:w-[17.7rem] ${
          curSelectInput === "addGuest"
            ? "rounded-full bg-white shadow-AddGuestShadow"
            : ""
        } 1xz:justify-between 1smd:justify-center items-center`}
      >
        <Modal.Open opens="addGuest">
          <div className="flex justify-center items-center">
            <div
              onClick={(e) => handleInputField(e.target, "addGuest")}
              className={`${
                curSelectInput
                  ? "1smd:w-[12.2rem] flex items-center before:z-10"
                  : "1smd:w-[14.2rem]"
              } hover:before:content-[''] 1xz:before:w-full 1smd:before:w-[17.67rem] before:absolute before:top-0 before:h-[3.85rem]
              ${
                curSelectInput === "addGuest"
                  ? ""
                  : "before:hover:bg-grey-light-50"
              }
              justify-between 1smd:before:left-[35.20rem] before:rounded-full before:hover:opacity-40 py-[0.8rem] h-[3.85rem] 1smd:px-[1.5rem] cursor-pointer`}
            >
              <GuestInputDisplay
                adultCount={adultCount}
                childCount={childCount}
                infantCount={infantCount}
                petCount={petCount}
                curSelectInput={curSelectInput}
                guestPlural={guestPlural}
                extraGuest={extraGuest}
              />

              {hasAnyGuests() && curSelectInput === "addGuest" && (
                <div
                  ref={addGuestResetRef}
                  onClick={(e) => handleCrossClick(e, "guest")}
                  className="w-[1.5rem] flex justify-center items-center z-20 hover:rounded-full h-[1.5rem] hover:bg-grey-dim"
                >
                  <img className="h-4 w-4" src={cross} alt="Clear" />
                </div>
              )}
              <div />
            </div>
          </div>
        </Modal.Open>

        <SearchButton
          curSelectInput={curSelectInput}
          onClick={handleSearchClick}
        />
      </div>

      <Modal.Window
        resetRef={addGuestResetRef}
        modalRef={modalRef}
        name="addGuest"
      >
        <AddGuest />
      </Modal.Window>
    </Modal>
  );
};

export default AddGuestForm;
