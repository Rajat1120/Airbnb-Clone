import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInDays } from "date-fns";
import { setCalendarModalOpen } from "../Header/Form/mainFormSlice";

export const useBookingHandlers = (
  userBookingData,
  bookingData,
  updateBookingData,
  updateUserBooking,
  insertBooking,
  allBookingDataTruthy
) => {
  const dispatch = useDispatch();
  const [dataFromChild, setDataFromChild] = useState({});

  const handleDataFromChild = useCallback((data) => {
    setDataFromChild(data);
  }, []);

  const handleEditClick = useCallback(() => {
    dispatch(setCalendarModalOpen(true));
  }, [dispatch]);

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
    updateBookingDataFn,
  };
};
