import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";

import arrowLeft from "../asset/Icons_svg/arrow-left.svg";

import { store } from "../redux/Store";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router";

import { differenceInDays, format, isSameMonth } from "date-fns";
import CalendarModal from "../components/Header/Form/CalendarModal";
import Calendar from "../components/Header/Form/FormFields/Calendar";
import {
  setAdultCount,
  setCalendarModalOpen,
  setSelectedEndDate,
  setSelectedStartDate,
} from "../redux/mainFormSlice";
import Footer from "../components/Footer/Footer";

import toast, { Toaster } from "react-hot-toast";
import AddGuestModal from "../components/Modals/AddGuestModal";
import { setBookingDate, setCancelGuestUpdate } from "../redux/AppSlice";
import { useBookingHandlers } from "./BookingHandlers";
import { useBookingQueries } from "./BookingQueries";
import useSmallScreen from "./ScreenSize";
import LoadingOverlay from "../utils/LoadingOverlay";
import CheckOutPageHeader from "./CheckoutPageHeader";
import {
  BookingButton,
  CardholderNameInput,
  CardTypeSection,
  ErrorMessage,
  GroundRules,
  HeaderErrorMessage,
  PaymentMethods,
  PaymentSection,
  PriceDetails,
  RoomCard,
  TripRequirements,
  TripSummary,
} from "./BookingSection";
import { areAllKeysTruthy } from "../utils/Helper";

const calculateTotalAmount = (price, numOfDays, userBookingData) => {
  const days = Math.abs(numOfDays || userBookingData?.booking?.numOfDays) || 0;
  const basePrice = Math.ceil(price / 83);
  const stayCost = Math.ceil(basePrice * days);
  const serviceFee = Math.floor(basePrice * 0.7);
  const tax = Math.floor(0.11 * stayCost);

  return stayCost + serviceFee + tax;
};

// custom hook for checking booking status
const useCheckBookingStatus = (refetchPayment, paymentData, id) => {
  const [bookingStatus, setBookingStatus] = useState("NotFound");

  useEffect(() => {
    const checkBookingStatus = async () => {
      // Fetch the latest payment data
      await refetchPayment();

      if (paymentData?.length && id) {
        const isBooked = paymentData.some((item) => {
          return Number(item.room_id) === Number(id);
        });

        if (isBooked) {
          setBookingStatus("found");
          toast.error("You have already booked this place", {
            duration: 30000,
          });
        } else {
          setBookingStatus("NotFound");
        }
      }
    };

    checkBookingStatus();
  }, [paymentData, refetchPayment, id]);

  return bookingStatus;
};

const useHandleResize = (handleCloseModal, setOpenGuestModal) => {
  useEffect(() => {
    function handleResize() {
      handleCloseModal();
      setOpenGuestModal(false);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleCloseModal, setOpenGuestModal]);
};

// custom hook for updating booking dates
const useFormattedBookingDate = (
  startDate,
  endDate,
  formatStartDate,
  formattedEndDate,
  userBookingData
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const formatDateRange = (start, end) => {
      const startDt = new Date(start);
      const endDt = new Date(end);

      if (start && end) {
        if (isSameMonth(startDt, endDt)) {
          return `${format(startDt, "dd")} - ${format(endDt, "dd MMM")}`;
        } else {
          return `${format(startDt, "dd MMM")} - ${format(endDt, "dd MMM")}`;
        }
      }
      return "";
    };

    const formattedDateRange = formatDateRange(
      formatStartDate || userBookingData?.booking?.startDate,
      formattedEndDate || userBookingData?.booking?.endDate
    );

    dispatch(setBookingDate(formattedDateRange));

    // eslint-disable-next-line
  }, [
    startDate,
    endDate,

    formatStartDate,
    formattedEndDate,
    dispatch,
    userBookingData,
  ]);
};

const useBookingDates = () => {
  const startDate = useSelector((store) => store.form.selectedStartDate);
  const endDate = useSelector((store) => store.form.selectedEndDate);
  const dispatch = useDispatch();

  const numOfDays = useRef(0);
  const formattedEndDate = useRef(null);
  const formatStartDate = useRef(null);

  const updateDates = useCallback(() => {
    if (startDate && endDate) {
      numOfDays.current = differenceInDays(startDate, endDate);
      formattedEndDate.current = format(endDate, "EEE MMM dd, yyyy");
      formatStartDate.current = format(startDate, "EEE MMM dd, yyyy");
    }
  }, [endDate, startDate]);

  const handleCloseModal = useCallback(() => {
    dispatch(setCalendarModalOpen(false));
    updateDates();
  }, [updateDates, dispatch]);

  return {
    numOfDays: numOfDays.current,
    formattedEndDate: formattedEndDate?.current,
    formatStartDate: formatStartDate?.current,
    updateDates,
    handleCloseModal,
    startDate,
    endDate,
  };
};

function useBookingModal(
  updateBookingData,

  updateUserBooking,
  getBooking,
  booking,
  userData,
  id,
  InitialBookingData
) {
  useEffect(() => {
    async function updateDates() {
      if (
        areAllKeysTruthy(updateBookingData) &&
        areAllKeysTruthy(InitialBookingData)
      ) {
        localStorage.setItem(
          `${updateBookingData.roomId}`,
          JSON.stringify(updateBookingData)
        );
        updateBookingDates(id);
        if (userData && id) {
          const data = await getBooking(userData?.email, id);

          if (data?.success) {
            await updateUserBooking();
          } else {
            await booking(InitialBookingData);
          }
        }
      }
    }
    updateDates();
    //eslint-disable-next-line
  }, [InitialBookingData, userData, id]);
}

const useGuestCount = ({
  adultCount,
  childCount,
  infantCount,
  petCount,
  openGuestModal,
  cancelGuestUpdate,
  guestPlural,
  petPlural,
}) => {
  const dispatch = useDispatch();
  const [guestCount, setGuestCount] = useState("");

  useLayoutEffect(() => {
    const totalGuests = adultCount + childCount;

    let formattedCount = `${totalGuests} guest${guestPlural}${
      infantCount + petCount > 0 ? "," : ""
    }`;

    if (infantCount) {
      formattedCount += ` ${infantCount} infant${infantCount > 1 ? "s" : ""}`;
    }

    if (petCount) {
      formattedCount += `${infantCount ? "," : ""} ${petCount} pet${petPlural}`;
    }

    if (formattedCount !== "0 guests,") {
      if (!openGuestModal && !cancelGuestUpdate) {
        setGuestCount(formattedCount);
      }
    } else {
      setGuestCount("1 guest");
    }

    if (guestCount === "0 guest") {
      dispatch(setAdultCount(1));
    }
  }, [
    adultCount,
    childCount,
    infantCount,
    dispatch,
    guestCount,
    petCount,
    openGuestModal,
    guestPlural,
    petPlural,
    cancelGuestUpdate,
  ]);

  return guestCount;
};

const useBookingData = ({
  id,
  numOfDays,
  userEmail,
  guestCount,
  formatStartDate,
  formattedEndDate,
}) => {
  const [bookingData, setBookingData] = useState(null);
  const [updateBookingData, setUpdateBookingData] = useState(null);

  useEffect(() => {
    if (!formatStartDate || !formattedEndDate) return;

    const newBookingData = {
      startDate: formatStartDate,
      endDate: formattedEndDate,
      numOfDays: Math.abs(numOfDays),
      status: "pending",
      user_email: userEmail,
      room_id: id,
      guest: String(guestCount),
    };
    setBookingData(newBookingData);

    const newUpdateBookingData = {
      startDate: formatStartDate,
      endDate: formattedEndDate,
      numOfDays: Math.abs(numOfDays),
      userEmail: userEmail,
      roomId: id,
      guest: String(guestCount),
    };

    if (areAllKeysTruthy(newUpdateBookingData)) {
      setUpdateBookingData(newUpdateBookingData);
    }
  }, [id, numOfDays, userEmail, guestCount, formatStartDate, formattedEndDate]);

  return {
    bookingData,
    updateBookingData,
  };
};

export const updateBookingDates = (id) => {
  if (localStorage.getItem(id)) {
    const parsedDates = JSON.parse(localStorage.getItem(id));
    const startDate = new Date(parsedDates.startDate);
    const endDate = new Date(parsedDates.endDate);

    // Dispatch actions to update dates in the Redux store
    store.dispatch(setSelectedStartDate(startDate));
    store.dispatch(setSelectedEndDate(endDate));
  }
};

// Custom hook to redirect to login if user is not logged in
function useRedirectIfNotLoggedIn(userData) {
  const navigate = useNavigate();

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (!userData) {
        navigate("/login");
      }
    }, 2000);

    return () => clearTimeout(timerId);
  }, [userData, navigate]);

  return Boolean(userData);
}

const RequestToBookHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl px-14 1xz:mt-16 mt-0 border-b border-grey-dim 1xz:border-none 1lg:px-20 mx-auto">
      <div className="w-full flex pb-2 pt-2 1xz:pt-0 1xz:pb-8">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-shadow-gray-light -ml-12 h-12 w-12 flex-center rounded-full"
        >
          <img className="h-4 w-4" src={arrowLeft} alt="Back" />
        </button>
        <span className="block w-full 1xz:w-auto flex-center text-lg 1xz:text-[2rem] font-medium">
          Request to book
        </span>
      </div>
    </div>
  );
};

const CheckoutForm = () => {
  const [openGuestModal, setOpenGuestModal] = useState(false);
  const { id } = useParams();

  const [submitFormReference, setSubmitFormReference] = useState(false);

  const dispatch = useDispatch();

  const {
    selectedEndDate: endDate,
    selectedStartDate: startDate,
    guestPlural,
    petPlural,
    adultCount,
    childCount,
    infantCount,
    petsCount: petCount,
    isCalendarModalOpen: isModalOpen,
  } = useSelector((store) => store.form);

  const { hasError, error } = useSelector((store) => store?.card);

  const { userData, cancelGuestUpdate } = useSelector((store) => store?.app);

  useEffect(() => {
    if (openGuestModal) {
      dispatch(dispatch(setCancelGuestUpdate(false)));
    }
  }, [openGuestModal, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateDates();

    setTimeout(() => {
      updateBookingDataFn();
    }, 1000);
  }, []);

  useEffect(() => {
    updateBookingDates(id);
  }, [id, isModalOpen]);

  // Get dates first
  const {
    numOfDays,
    formattedEndDate,
    formatStartDate,
    updateDates,
    handleCloseModal,
    bookingData,
  } = useBookingDates();

  const guestCount = useGuestCount({
    adultCount,
    childCount,
    infantCount,
    petCount,
    openGuestModal,
    cancelGuestUpdate,
    guestPlural,
    petPlural,
  });

  //  get booking data
  const { bookingData: InitialBookingData, updateBookingData } = useBookingData(
    {
      id,
      numOfDays,
      userEmail: userData?.email,
      guestCount,
      formatStartDate,
      formattedEndDate,
    }
  );

  // Get queries
  const {
    paymentData,
    refetchPayment,
    updateLoading,
    updateUserBooking,
    bookingLoading,
    insertBooking,
    userBookingData,
    roomData,

    getBooking,
    booking,
  } = useBookingQueries(userData, id, updateBookingData, bookingData);

  // Finally, get handlers
  const {
    dataFromChild,
    handleDataFromChild,
    handleEditClick,
    updateBookingDataFn,
  } = useBookingHandlers(
    userBookingData,
    bookingData,
    updateBookingData,
    updateUserBooking,
    insertBooking
  );

  let totalAmount = calculateTotalAmount(
    roomData?.price,
    numOfDays,
    userBookingData
  );

  let load = updateLoading || bookingLoading;

  const bookingStatus = useCheckBookingStatus(refetchPayment, paymentData, id);

  useHandleResize(handleCloseModal, setOpenGuestModal);

  const bookingDate = useSelector((store) => store.app.bookingDate);

  useFormattedBookingDate(
    startDate,
    endDate,

    formatStartDate,
    formattedEndDate,
    userBookingData
  );

  useBookingModal(
    updateBookingData,
    updateUserBooking,
    getBooking,
    booking,
    userData,
    id,
    InitialBookingData
  );

  useRedirectIfNotLoggedIn(userData);

  const rating = roomData?.rating_count.match(/\d+/);

  const isSmallScreen = useSmallScreen();

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      {load || dataFromChild?.processing ? (
        <LoadingOverlay></LoadingOverlay>
      ) : null}
      <CheckOutPageHeader></CheckOutPageHeader>
      <main>
        <RequestToBookHeader></RequestToBookHeader>

        <div className=" w-full flex-col-reverse 1xz:flex-row px-5 1xz:px-14 gap-x-12 1md:gap-x-28 1lg:px-20 flex max-w-7xl mx-auto">
          <section className="1xz:w-1/2 w-full ">
            {hasError && <HeaderErrorMessage></HeaderErrorMessage>}
            <TripSummary
              bookingDate={bookingDate}
              guestCount={guestCount}
              bookingStatus={bookingStatus}
              handleEditClick={handleEditClick}
              setOpenGuestModal={setOpenGuestModal}
            ></TripSummary>
            <div className="mt-2">
              <div className="border-t border-grey-light-50 w-full"></div>
              <div className="pt-8 pb-6">
                <div>
                  <div className="">
                    <PaymentMethods></PaymentMethods>
                    <CardTypeSection></CardTypeSection>

                    <PaymentSection
                      guestCount={guestCount}
                      bookingStatus={bookingStatus}
                      formatStartDate={formatStartDate}
                      formattedEndDate={formattedEndDate}
                      numOfDays={numOfDays}
                      setSubmitFormReference={setSubmitFormReference}
                      submitFormReference={submitFormReference}
                      handleDataFromChild={handleDataFromChild}
                      totalAmount={totalAmount}
                      userData={userData}
                      userBookingData={userBookingData}
                    ></PaymentSection>
                    {error?.length ? (
                      <ErrorMessage error={error}></ErrorMessage>
                    ) : null}
                    <CardholderNameInput></CardholderNameInput>
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>
            <TripRequirements></TripRequirements>
            <GroundRules></GroundRules>
            <BookingButton
              bookingStatus={bookingStatus}
              dataFromChild={dataFromChild}
              setSubmitFormReference={setSubmitFormReference}
            ></BookingButton>
          </section>
          <section className="1xz:w-1/2 w-full 1md:pl-10 1xz:mb-32">
            <div className=" 1xz:sticky  1xz:top-52 ">
              <div className="1xz:mb-[5.5rem]  py-5 1xz:p-6 border-0 1xz:border border-grey-light-50 rounded-lg">
                <div className="w-full  border-b border-grey-light-50  items-center flex gap-x-5 pb-6 ">
                  <RoomCard
                    roomData={roomData}
                    isSmallScreen={isSmallScreen}
                    rating={rating}
                  ></RoomCard>
                </div>
                <PriceDetails
                  roomData={roomData}
                  numOfDays={numOfDays}
                  userBookingData={userBookingData}
                  totalAmount={totalAmount}
                />
              </div>
              <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="w-full overflow-x-hidden 1xz:w-[41.31rem]">
                  <Calendar />
                </div>
              </CalendarModal>
              <AddGuestModal
                isOpen={openGuestModal}
                onClose={() => setOpenGuestModal(false)}
              ></AddGuestModal>
            </div>
          </section>
        </div>
      </main>
      <div className="w-screen border-t border-grey-light-50 flex-center bg-shadow-gray-light">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CheckoutForm;
