import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setActiveInput,
  setCurrentMonth,
  setHoverInput,
  setOpenName,
} from "../../../redux/mainFormSlice";

/**
 * Custom hook to handle minimizing form inputs when the user clicks outside
 * the form elements, and to reset the current month if required.
 *
 * @param {Object} refs - Object containing various refs to form elements.
 * @param {boolean} isCalendarModalOpen - Boolean flag to check if the calendar modal is open.
 * @param {Date | null} selectedStartDate - The selected start date.
 * @param {Date | null} selectedEndDate - The selected end date.
 */
export const useMinimizeFormOnOutsideClick = (
  {
    modalRef,
    buttonRef,
    checkInRef,
    checkOutRef,
    addGuestRef,
    monthRef,
    flexibleRef,
  },
  isCalendarModalOpen,
  selectedStartDate,
  selectedEndDate
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(e) {
      // If the calendar modal is open, don't minimize the input fields.
      if (isCalendarModalOpen) return;

      // If the user clicks outside the form inputs and modal, minimize active input fields
      if (
        !modalRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target) &&
        !checkInRef.current?.contains(e.target) &&
        !checkOutRef.current?.contains(e.target) &&
        !addGuestRef.current?.contains(e.target) &&
        !monthRef.current?.contains(e.target) &&
        !flexibleRef.current?.contains(e.target)
      ) {
        dispatch(setActiveInput(""));
        dispatch(setOpenName(""));
        dispatch(setHoverInput(null));
      }

      // If both start and end dates are selected, don't reset the current month.
      if (selectedStartDate && selectedEndDate) return;

      // If the user clicks outside check-in, check-out, and guest inputs, reset the current month.
      if (
        checkInRef?.current &&
        !checkInRef.current?.contains(e.target) &&
        checkOutRef?.current &&
        !checkOutRef.current?.contains(e.target) &&
        addGuestRef?.current &&
        modalRef?.current &&
        !modalRef.current?.contains(e.target)
      ) {
        dispatch(setCurrentMonth(new Date()));
      }
    }

    // Add event listener to handle outside clicks
    document.addEventListener("click", handleClick, true);

    // Clean up event listener when the component is unmounted or dependencies change
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [
    dispatch,
    selectedStartDate,
    selectedEndDate,
    isCalendarModalOpen,
    modalRef,
    buttonRef,
    checkInRef,
    checkOutRef,
    addGuestRef,
    monthRef,
    flexibleRef,
  ]);
};
