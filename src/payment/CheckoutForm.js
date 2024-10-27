import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";

import icon from "../data/airbnbLogo.svg";
import arrowLeft from "../data/Icons svg/arrow-left.svg";
import star from "../data/Icons svg/star.svg";
import errorImg from "../data/Icons svg/Error.svg";
import card from "../data/Icons svg/card.svg";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router";

import { differenceInDays, format, isSameMonth } from "date-fns";
import CalendarModal from "../Header/Form/CalendarModal";
import Calendar from "../Header/Form/FormFields/Calendar";
import {
  setAdultCount,
  setCalendarModalOpen,
  setSelectedEndDate,
  setSelectedStartDate,
} from "../Header/Form/mainFormSlice";
import Footer from "../Footer";
import UpdatedPaymentForm from "./UpdatePaymentForm";
import { setFirstBtnClick } from "./CardSlice";
import toast, { Toaster } from "react-hot-toast";
import AddGuestModal from "../Modals/AddGuestModal";
import { setBookingDate, setCancelGuestUpdate } from "../Main/AppSlice";
import { useBookingHandlers } from "./BookingHandlers";
import { useBookingQueries } from "./BookingQueries";
import useSmallScreen from "./ScreenSize";

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
  dateChangeRef,
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

    if (!dateChangeRef.current) {
      const formattedDateRange = formatDateRange(
        formatStartDate || userBookingData?.booking?.startDate,
        formattedEndDate || userBookingData?.booking?.endDate
      );

      dispatch(setBookingDate(formattedDateRange));
    }
    // eslint-disable-next-line
  }, [
    startDate,
    endDate,
    dateChangeRef?.current,
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
  isModalOpen,
  userBookingData,
  updateBookingData,
  allBookingDataTruthy,
  updateUserBooking
) {
  const dispatch = useDispatch();
  const dateChange = useRef(false);

  useEffect(() => {
    if (isModalOpen) {
      // Set flag to indicate a date change
      dateChange.current = true;

      // Update selected start and end dates if available in user booking data
      if (userBookingData?.booking?.startDate) {
        dispatch(setSelectedStartDate(userBookingData.booking.startDate));
      }
      if (userBookingData?.booking?.endDate) {
        dispatch(setSelectedEndDate(userBookingData.booking.endDate));
      }
    } else {
      // If modal is closed and data is valid, trigger an update after a delay
      if (allBookingDataTruthy(updateBookingData)) {
        const timeoutId = setTimeout(() => {
          updateUserBooking();
        }, 1000);

        // Cleanup the timeout on unmount
        return () => clearTimeout(timeoutId);
      }
      // Reset date change flag when modal closes
      dateChange.current = false;
    }
  }, [
    isModalOpen,
    userBookingData,
    updateBookingData,
    allBookingDataTruthy,
    dispatch,
    updateUserBooking,
  ]);

  return dateChange;
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

function useOneTimeBookingCheck(
  userData,
  id,
  InitialBookingData,
  getBooking,
  booking,
  userBookingData
) {
  const onlyOneTimeRun = useRef(true);

  useEffect(() => {
    async function checkBooking() {
      if (InitialBookingData && onlyOneTimeRun.current) {
        await getBooking(userData, id);
        if (userBookingData.success) {
          return;
        } else {
          await booking(InitialBookingData);
          onlyOneTimeRun.current = false;
        }
      }
    }

    checkBooking();
  }, [userData, id, InitialBookingData, getBooking, booking, userBookingData]);

  return onlyOneTimeRun.current;
}

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

  const allBookingDataTruthy = useCallback((data) => {
    if (data) {
      return Object?.values(data).every((value) => Boolean(value));
    }
  }, []);

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

    if (allBookingDataTruthy(newUpdateBookingData)) {
      setUpdateBookingData(newUpdateBookingData);
    }
  }, [
    id,
    numOfDays,
    userEmail,
    guestCount,
    formatStartDate,
    formattedEndDate,
    allBookingDataTruthy,
  ]);

  return {
    bookingData,
    updateBookingData,
    allBookingDataTruthy,
  };
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

const CheckoutForm = () => {
  const [openGuestModal, setOpenGuestModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const { hasError, error } = useSelector((store) => store.card);

  const { userData, cancelGuestUpdate } = useSelector((store) => store.app);

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
  const {
    bookingData: InitialBookingData,
    updateBookingData,
    allBookingDataTruthy,
  } = useBookingData({
    id,
    numOfDays,
    userEmail: userData?.email,
    guestCount,
    formatStartDate,
    formattedEndDate,
  });

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

  useOneTimeBookingCheck(
    userData,
    id,
    InitialBookingData,
    getBooking,
    booking,
    userBookingData
  );

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
    insertBooking,
    allBookingDataTruthy
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

  let dateChange = useRef(false);

  useFormattedBookingDate(
    startDate,
    endDate,
    dateChange,
    formatStartDate,
    formattedEndDate,
    userBookingData
  );

  useBookingModal(
    isModalOpen,
    userBookingData,
    updateBookingData,
    allBookingDataTruthy,
    updateUserBooking
  );

  useRedirectIfNotLoggedIn(userData);

  const rating = roomData?.rating_count.match(/\d+/);

  const isSmallScreen = useSmallScreen();

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      {load && (
        <div className=" w-screen z-50 h-screen bg-white opacity-80  fixed flex-center">
          <div className="cssLoader  absolute top-1/2 left-1/2  w-12 h-3"></div>
        </div>
      )}
      <header className="hidden 1xz:block">
        <div className="pl-6 border-b border-shadow-gray ">
          <div className="w-8 ">
            <a href="/">
              <div className="flex h-20 items-center">
                <img
                  className="mr-2  h-34 scale-[1.2] "
                  src={icon}
                  alt="like"
                />
                <h1 className="text-2xl  leading-8   text-pink text-start font-semibold">
                  airbnb
                </h1>
              </div>
            </a>
          </div>
        </div>
      </header>
      <main>
        <div className="w-full max-w-7xl px-14 1xz:mt-16 mt-0 border-b border-grey-dim 1xz:border-none   1lg:px-20 mx-auto ">
          <div className="w-full  flex pb-2 pt-2 1xz:pt-0 1xz:pb-8">
            <button
              onClick={() => navigate(-1)}
              className=" hover:bg-shadow-gray-light -ml-12 h-12 w-12 flex-center rounded-full "
            >
              <img className="h-4 w-4" src={arrowLeft} alt="" />
            </button>
            <span className=" block w-full 1xz:w-auto flex-center text-lg 1xz:text-[2rem] font-medium ">
              Request to book
            </span>
          </div>
        </div>

        <div className=" w-full flex-col-reverse 1xz:flex-row px-5 1xz:px-14 gap-x-12 1md:gap-x-28 1lg:px-20 flex max-w-7xl mx-auto">
          <section className="1xz:w-1/2 w-full ">
            {hasError && (
              <div className="p-4 mb-10 flex space-x-2  border border-shadow-gray rounded-xl">
                <div className="bg-red-700 flex-center h-[2.8rem] w-[2.8rem] rounded-full">
                  <img className="h-4 w-4 " src={errorImg} alt="" />
                </div>
                <div className="flex justify-center flex-col">
                  <span className="text-sm font-bold">
                    Let's try that again
                  </span>
                  <span className="text-sm font-light">
                    Please check your payment details
                  </span>
                </div>
              </div>
            )}
            <span className="text-2xl block font-medium pb-6">Your trip</span>
            <div className="pb-6  flex justify-between">
              <div className="flex flex-col">
                <span className="mt-2 font-medium block">Dates</span>
                <span className="font-light ">{bookingDate}</span>
              </div>
              <button
                onClick={() => handleEditClick()}
                className={`font-medium ${
                  bookingStatus === "found" ? "cursor-disable" : ""
                } underline`}
                disabled={bookingStatus === "found"}
              >
                Edit
              </button>
            </div>
            <div className="pb-6  flex justify-between">
              <div className="flex flex-col">
                <span className="mt-2 font-medium block">Guests</span>
                <span className="font-light ">
                  {guestCount !== "0 guest" ? guestCount : "1 guest"}
                </span>
              </div>
              <button
                onClick={() => setOpenGuestModal(true)}
                className={`font-medium ${
                  bookingStatus === "found" ? "cursor-disable" : ""
                } underline`}
                disabled={bookingStatus === "found"}
              >
                Edit
              </button>
            </div>
            <div className="mt-2">
              <div className="border-t border-grey-light-50 w-full"></div>
              <div className="pt-8 pb-6">
                <div>
                  <div className="">
                    <div className="flex mb-6 items-end justify-between">
                      <span className="text-2xl">Pay with</span>
                      <div className="flex space-x-1">
                        <img
                          className="w-8 h-3"
                          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                          alt=""
                        />
                        <img
                          className="w-8 h-3"
                          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
                          alt=""
                        />
                        <img
                          className="w-8 h-3"
                          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
                          alt=""
                        />
                        <img
                          className="w-8 h-3"
                          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_rupay.f419bf8f3062eb6d2408393354129ba8.svg"
                          alt=""
                        />
                        <img
                          className="w-8 h-3"
                          src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_dinersclub.0e75154d53aa4800c036282b8e189999.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="w-full border border-grey rounded-lg">
                      <div className="pt-4    pb-4 pl-4 pr-10">
                        <div className="flex h-6 items-center space-x-2">
                          <img src={card} className="h-8 w-10" alt="" />
                          <span className="font-light">
                            Credit or debit card
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-4 border border-grey rounded-lg">
                      <UpdatedPaymentForm
                        guestCount={
                          guestCount !== "0 guest"
                            ? String(guestCount)
                            : "1 guest"
                        }
                        booked={bookingStatus}
                        startDate={
                          formatStartDate || userBookingData?.booking?.startDate
                        }
                        endDate={
                          formattedEndDate || userBookingData?.booking?.endDate
                        }
                        numOfDays={
                          numOfDays || userBookingData?.booking?.numOfDays
                        }
                        setOnSubmitReference={setSubmitFormReference}
                        onSubmitReference={submitFormReference}
                        onSendData={handleDataFromChild}
                        totalAmount={totalAmount}
                        userId={userData}
                      ></UpdatedPaymentForm>
                    </div>
                    {error?.length ? (
                      <div className="py-2 flex space-x-1 items-center">
                        <div className="bg-red-700 flex-center h-3 w-3 rounded-full">
                          <img className="h-2 w-2" src={errorImg} alt="" />
                        </div>
                        <span className="text-xs text-red-500">
                          Check your {error[0] === "cardError" && "card number"}{" "}
                          {error[0] === "ExpiryError" && "expiry date"}
                          {error[0] === "cvcError" && "CVC"}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <label htmlFor="card-holder-name"></label>
                    <div className="w-full relative flex justify-center mt-4 border border-grey rounded-lg">
                      <span className="absolute left-3 top-2 text-xs font-light">
                        Cardholder name
                      </span>
                      <input
                        className="mx-3 mt-6 mb-2 w-full outline-none "
                        id="card-holder-name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>
            <div className="mt-2 w-full">
              <span className="pt-8 border-t  border-grey-light-50  w-full block text-2xl font-medium pb-6">
                Required for your trip
              </span>
              <div className="mb-6 justify-between flex">
                <div className="flex flex-col">
                  <span className="">Write a message to the Host</span>
                  <span className="text-sm">
                    Before you continue, let Renata know a little about your
                    trip and why their place is a good fit.
                  </span>
                </div>
                <div className="">
                  <button
                    disabled
                    className="px-[15px] text-sm border-black py-[7px] border rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="mb-10 justify-between flex">
                <div className="flex flex-col">
                  <span className="font-bold">Profile photo</span>
                  <span className="text-sm">
                    Hosts want to know who’s staying at their place.
                  </span>
                </div>
                <div className="">
                  <button
                    disabled
                    className="px-[15px] text-sm border-black py-[7px] border rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 border-t border-grey-light-50  w-full">
              <div className="pt-8  w-full pb-6">
                <span className="block  font-medium text-2xl mb-6">
                  Ground rules
                </span>
                <p className="mb-4 font-light">
                  We ask every guest to remember a few simple things about what
                  makes a great guest.
                </p>
                <ul className="custom-list">
                  <li className="">
                    <span className="font-light">Follow the house rules</span>
                  </li>
                  <li className="">
                    <span className="font-light">
                      Treat your Host’s home like your own
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="py-8 mt-2 border-t border-grey-light-50  w-full">
              <button
                onClick={() => {
                  setSubmitFormReference(true);

                  dispatch(setFirstBtnClick(true));
                }}
                type="button"
                disabled={
                  bookingStatus === "found" ||
                  !dataFromChild.stripe ||
                  dataFromChild.processing ||
                  !dataFromChild.session
                }
                className={`bg-dark-pink ${
                  bookingStatus === "found"
                    ? "cursor-disable"
                    : "cursor-pointer  "
                } font-medium rounded-lg text-white w-56 h-14`}
              >
                {dataFromChild.processing || dataFromChild.isSubmitting
                  ? "Processing..."
                  : "Request to book"}
              </button>
            </div>
          </section>
          <section className="1xz:w-1/2 w-full 1md:pl-10 1xz:mb-32">
            <div className=" 1xz:sticky  1xz:top-52 ">
              <div className="1xz:mb-[5.5rem]  py-5 1xz:p-6 border-0 1xz:border border-grey-light-50 rounded-lg">
                <div className="w-full  border-b border-grey-light-50  items-center flex gap-x-5 pb-6 ">
                  <div className="max-w-28 min-w-24 min-h-24 max-h-28">
                    <img
                      className="w-full object-cover rounded-xl h-full aspect-square"
                      src={roomData?.images[0]}
                      alt=""
                    />
                  </div>
                  <div className="w-full justify-center flex space-y-1 flex-col">
                    <span
                      className={`block ${
                        isSmallScreen
                          ? "1xz:max-w-28  1xz:truncate 1xz:text-ellipsis"
                          : ""
                      }  text-sm font-medium`}
                    >
                      At{" "}
                      {roomData?.host_name
                        ? roomData?.host_name?.replace(/about/gi, "")
                        : "Carl's"}
                      's
                    </span>
                    <span className="text-sm font-light">
                      Entire guest suite
                    </span>
                    <div className="flex items-center space-x-1">
                      <img className="w-4 h-4" src={star} alt="" />
                      <span className="text-sm font-medium">
                        {roomData?.house_rating}
                      </span>
                      <span className="text-sm font-light">
                        {isSmallScreen ? `(${rating})` : `(${rating} reviews)`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-6">
                  <span className="block text-2xl font-medium">
                    Price details
                  </span>
                </div>
                <div>
                  <div className="flex pb-4 font-light justify-between items-center">
                    <span>
                      ${Math.ceil(roomData?.price / 83)} x{" "}
                      {Math.abs(
                        numOfDays || userBookingData?.booking?.numOfDays
                      )}{" "}
                      nights
                    </span>
                    <span>
                      $
                      {Math.ceil(
                        Math.ceil(roomData?.price / 83) *
                          Math.abs(
                            numOfDays || userBookingData?.booking?.numOfDays
                          )
                      )}
                    </span>
                  </div>
                  <div className="flex pb-4 justify-between font-light  items-center">
                    <span>Cleaning fee</span>
                    <span>
                      ${Math.floor(Math.ceil(roomData?.price / 83) * 0.7)}
                    </span>
                  </div>
                  <div className="flex pb-4 justify-between   font-light items-center">
                    <span>Airbnb service fee</span>
                    <span>
                      $
                      {Math.floor(
                        0.11 *
                          Math.ceil(
                            Math.ceil(roomData?.price / 83) *
                              Math.abs(
                                numOfDays || userBookingData?.booking?.numOfDays
                              )
                          )
                      )}
                    </span>
                  </div>
                  <div className="flex border-t border-grey-light-50 pt-4 justify-between font-light  items-center">
                    <span className="font-medium">Total (U.S. Dollar)</span>
                    <span className="font-medium">${totalAmount}</span>
                  </div>
                </div>
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
