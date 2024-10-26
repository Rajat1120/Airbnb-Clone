import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInDays } from "date-fns";
import { setCalendarModalOpen } from "../Header/Form/mainFormSlice";

export const useBookingHandlers = (
  userBookingData,
  bookingData,
  updateBookingData,
  updateUserBooking,
  insertBooking
) => {
  const dispatch = useDispatch();
  const [dataFromChild, setDataFromChild] = useState({});
  const numOfDays = useRef(0);
  const formattedEndDate = useRef(null);
  const formatStartDate = useRef(null);

  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);

  // Handles data received from a child component
  const handleDataFromChild = useCallback((data) => {
    setDataFromChild(data);
  }, []);

  // Handles the "Edit" button click to open the calendar modal
  const handleEditClick = useCallback(() => {
    dispatch(setCalendarModalOpen(true));
  }, [dispatch]);

  // Updates date-related states
  const updateDates = useCallback(() => {
    if (startDate && endDate) {
      numOfDays.current = differenceInDays(startDate, endDate);
      if (endDate) {
        formattedEndDate.current = format(endDate, "EEE MMM dd, yyyy");
      }
      if (startDate) {
        formatStartDate.current = format(startDate, "EEE MMM dd, yyyy");
      }
    }
  }, [endDate, startDate]);

  // Closes the modal and updates dates
  const handleCloseModal = useCallback(() => {
    dispatch(setCalendarModalOpen(false));
    updateDates();
  }, [updateDates, dispatch]);

  // Checks if all booking data is truthy
  const allBookingDataTruthy = useCallback((data) => {
    return Object.values(data).every((value) => Boolean(value));
  }, []);

  // Updates or inserts booking data based on conditions
  const updateBookingDataFn = useCallback(() => {
    if (userBookingData?.success) {
      if (allBookingDataTruthy(updateBookingData)) {
        updateUserBooking();
      }
    } else {
      if (allBookingDataTruthy(bookingData)) {
        insertBooking();
      }
    }
  }, [
    userBookingData,
    updateBookingData,
    bookingData,
    updateUserBooking,
    insertBooking,
    allBookingDataTruthy,
  ]);

  return {
    dataFromChild,
    handleDataFromChild,
    handleEditClick,
    handleCloseModal,
    updateDates,
    updateBookingDataFn,
    numOfDays: numOfDays.current,
    formattedEndDate: formattedEndDate?.current,
    formatStartDate: formatStartDate?.current,
  };
};
