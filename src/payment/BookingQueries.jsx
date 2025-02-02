import { useQuery } from "@tanstack/react-query";
import {
  booking,
  getBooking,
  getPayments,
  getRoomInfo,
  updateBooking,
} from "../api/apiRooms";

/**
 * Custom hook to handle all booking-related queries
 *
 * @param {Object} userData - User data containing email.
 * @param {string} id - The ID for the booking or room.
 * @param {Object} updateBookingData - Data required to update an existing booking.
 * @param {Object} bookingData - Data required for creating a new booking.
 * @returns {Object} - All queries and loading states.
 */
export const useBookingQueries = (
  userData,
  id,
  updateBookingData,
  bookingData
) => {
  const { data: paymentData, refetch: refetchPayment } = useQuery({
    queryFn: () => getPayments(userData?.email),
    queryKey: ["payments"],
    enabled: false,
  });

  const { isLoading: updateLoading, refetch: updateUserBooking } = useQuery({
    queryFn: () => updateBooking(updateBookingData),
    queryKey: ["updateBookingData"],
    enabled: false,
  });

  const { isLoading: bookingLoading, refetch: insertBooking } = useQuery({
    queryFn: () => booking(bookingData),
    queryKey: ["booking"],
    enabled: false,
  });

  const { data: userBookingData } = useQuery({
    queryFn: () => getBooking(userData?.email, id),
    queryKey: ["bookingInfo", id],
    enabled: !!userData?.email && !!id,
  });

  const { data: roomData } = useQuery({
    queryFn: () => getRoomInfo(id),
    queryKey: ["roomInfo", id],
    enabled: !!id,
  });

  return {
    paymentData,
    refetchPayment,
    updateLoading,
    updateUserBooking,
    bookingLoading,
    insertBooking,
    userBookingData,
    roomData,
    updateBooking,
    getBooking,
    booking,
  };
};
