import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { setCalendarModalOpen } from "../redux/mainFormSlice";
import { areAllKeysTruthy } from "../utils/Helper";

export const useBookingHandlers = (
  userBookingData,
  bookingData,
  updateBookingData,
  updateUserBooking,
  insertBooking
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
      if (areAllKeysTruthy(updateBookingData)) {
        updateUserBooking();
      }
    } else {
      if (areAllKeysTruthy(bookingData)) {
        insertBooking();
      }
    }
  }, [
    userBookingData,
    updateBookingData,
    bookingData,
    updateUserBooking,
    insertBooking,
  ]);

  return {
    dataFromChild,
    handleDataFromChild,
    handleEditClick,
    updateBookingDataFn,
  };
};
