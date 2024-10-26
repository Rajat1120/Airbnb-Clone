import { useQuery } from "@tanstack/react-query";
import {
  booking,
  getBooking,
  getPayments,
  getRoomInfo,
  updateBooking,
} from "../Services/apiRooms";

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
  // Fetch payments related to the user, refetch manually when needed
  const { data: paymentData, refetch: refetchPayment } = useQuery({
    queryFn: () => getPayments(userData?.email),
    queryKey: ["payments"],
    enabled: false, // Manually enabled
  });

  // Refetch function to update booking data
  const { isLoading: updateLoading, refetch: updateUserBooking } = useQuery({
    queryFn: () => updateBooking(updateBookingData),
    queryKey: ["updateBookingData"],
    enabled: false, // Manually enabled
  });

  // Refetch function to create a new booking
  const { isLoading: bookingLoading, refetch: insertBooking } = useQuery({
    queryFn: () => booking(bookingData),
    queryKey: ["booking"],
    enabled: false, // Manually enabled
  });

  // Fetch specific booking information based on user email and booking ID
  const { data: userBookingData } = useQuery({
    queryFn: () => getBooking(userData?.email, id),
    queryKey: ["bookingInfo", id],
    enabled: !!userData?.email && !!id, // Only enabled if user email and ID exist
  });

  // Fetch room information based on the room ID
  const { data: roomData } = useQuery({
    queryFn: () => getRoomInfo(id),
    queryKey: ["roomInfo", id],
    enabled: !!id, // Only enabled if ID exists
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
  };
};
