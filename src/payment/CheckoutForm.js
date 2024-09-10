import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import icon from "../data/airbnbLogo.svg";
import arrowLeft from "../data/Icons svg/arrow-left.svg";
import star from "../data/Icons svg/star.svg";
import errorImg from "../data/Icons svg/Error.svg";
import card from "../data/Icons svg/card.svg";
import supabase from "../Services/Supabase";
import CustomCardElement from "./CustomCardElement";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  booking,
  bookRoom,
  getBooking,
  getPayments,
  getRoomInfo,
  updateBooking,
} from "../Services/apiRooms";
import { differenceInDays, format, isSameMonth, set } from "date-fns";
import CalendarModal from "../Header/Form/CalendarModal";
import Calendar from "../Header/Form/FormFields/Calendar";
import {
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
import { update } from "@react-spring/web";

const CheckoutForm = () => {
  const [guestCount, setGuestCount] = useState("");
  const [openGuestModal, setOpenGuestModal] = useState(false);
  const { id } = useParams();
  const [dataFromChild, setDataFromChild] = useState({});
  const [submitFormReference, setSubmitFormReference] = useState(false);

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  const dispatch = useDispatch();
  const endDate = useSelector((store) => store.form.selectedEndDate);
  const startDate = useSelector((store) => store.form.selectedStartDate);
  const hasError = useSelector((store) => store.card.hasError);
  const error = useSelector((store) => store.card.error);

  const guestPlural = useSelector((store) => store.form.guestPlural);
  const petPlural = useSelector((store) => store.form.petPlural);

  const adultCount = useSelector((store) => store.form.adultCount);
  const childCount = useSelector((store) => store.form.childCount);
  const infantCount = useSelector((store) => store.form.infantCount);
  const petCount = useSelector((store) => store.form.petsCount);
  const isModalOpen = useSelector((store) => store.form.isCalendarModalOpen);

  const userData = useSelector((store) => store.app.userData);
  const cancelGuestUpdate = useSelector((store) => store.app.cancelGuestUpdate);

  const {
    data: paymentData,
    refetch: refetchPayment,
    isLoading: paymentLoading,
    isStale,
  } = useQuery({
    queryFn: () => getPayments(userData?.email),
    queryKey: ["payments"],
    enabled: false,
  });

  const [bookingStatus, setBookingStatus] = useState(null);

  useLayoutEffect(() => {
    let guestCount = `${adultCount + childCount} guest${guestPlural}${
      infantCount + petCount > 0 ? "," : ""
    }`;

    if (infantCount) {
      guestCount += ` ${infantCount} infant${infantCount > 1 ? "s" : ""}`;
    }

    if (petCount) {
      guestCount += `${infantCount ? "," : ""} ${petCount} pet${petPlural}`;
    }
    if (guestCount !== "0 guests,") {
      if (!openGuestModal && !cancelGuestUpdate) {
        setGuestCount(guestCount);
      }
    } else {
      setGuestCount("1 guest");
    }
  }, [
    adultCount,
    childCount,
    openGuestModal,
    cancelGuestUpdate,
    infantCount,
    petCount,
    guestPlural,
    petPlural,
  ]);

  useEffect(() => {
    if (openGuestModal) {
      dispatch(dispatch(setCancelGuestUpdate(false)));
    }
  }, [openGuestModal, dispatch]);

  useLayoutEffect(() => {
    const checkBookingStatus = async () => {
      await refetchPayment();

      if (paymentData?.length && id) {
        let isBooked = paymentData.some((item) => item.room_id == id);

        if (isBooked) {
          setBookingStatus("found");
        } else {
          setBookingStatus("NotFound");
        }

        if (bookingStatus === "found") {
          toast.error("You have already booked this place", {
            duration: 30000,
          });
        }
      }
    };

    checkBookingStatus();
  }, [paymentData, bookingStatus, id]);

  const handleEditClick = () => {
    dispatch(setCalendarModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setCalendarModalOpen(false));
    updateDates();
  };

  useEffect(() => {
    function handleResize() {
      /*  handleCloseModal();
      setOpenGuestModal(false); */
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  let formattedEndDate = useRef();
  let formatStartDate = useRef();
  let numOfDays = useRef();

  function updateDates() {
    if (startDate && endDate) {
      numOfDays.current = differenceInDays(startDate, endDate);
      if (endDate) {
        formattedEndDate.current = format(endDate, "EEE MMM dd, yyyy");
      }
      if (startDate) {
        formatStartDate.current = format(startDate, "EEE MMM dd, yyyy");
      }
    }
  }

  const {
    data: updateData,
    isLoading: updateLoading,
    refetch: updateUserBooking,
    isError: updateError,
  } = useQuery({
    queryFn: () => updateBooking(updateBookingData),
    queryKey: ["updateBookingData"],
    enabled: false,
  });

  const [bookingData, setBookingData] = useState({});
  const [updateBookingData, setUpdateBookingData] = useState({});

  useEffect(() => {
    let bookingData = {
      startDate: formatStartDate?.current,
      endDate: formattedEndDate?.current,
      numOfDays: Math.abs(numOfDays?.current),
      status: "pending",
      user_email: userData?.email,
      room_id: id,
      guest: String(guestCount),
    };
    setBookingData(bookingData);

    let updateBookingData = {
      startDate: formatStartDate?.current,
      endDate: formattedEndDate?.current,
      numOfDays: Math.abs(numOfDays?.current),
      userEmail: userData?.email,
      roomId: id,
      guest: String(guestCount),
    };

    setUpdateBookingData(updateBookingData);
  }, [
    id,
    userData?.email,
    guestCount,
    formatStartDate.current,
    formattedEndDate.current,
  ]);

  function updateBookingDataFn() {
    if (userBookingData?.success) {
      if (allBookingDataTruthy(updateBookingData)) {
        updateUserBooking();
      }
    } else {
      if (allBookingDataTruthy(bookingData)) {
        insertBooking();
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    updateDates();

    setTimeout(() => {
      updateBookingDataFn();
    }, 1000);
  }, []);

  const allBookingDataTruthy = (data) => {
    return Object.values(data).every((value) => Boolean(value));
  };

  const {
    refetch: insertBooking,

    isLoading: bookingLoading,
    isError: bookingError,
  } = useQuery({
    queryFn: () => booking(bookingData),
    queryKey: ["booking"],
    enabled: false,
  });

  const { data: userBookingData } = useQuery({
    queryFn: () => getBooking(userData?.email, id),
    queryKey: ["bookingInfo", id],
    enabled: !!userData?.email && !!id,
  });

  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["roomInfo", id],
    queryFn: () => getRoomInfo(id),
    enabled: !!id,
  });

  let totalAmount =
    Math.ceil(
      Math.ceil(data?.price / 83) *
        Math.abs(numOfDays.current || userBookingData?.booking?.numOfDays)
    ) +
    Math.floor(Math.ceil(data?.price / 83) * 0.7) +
    Math.floor(
      0.11 *
        Math.ceil(
          Math.ceil(data?.price / 83) *
            Math.abs(numOfDays.current || userBookingData?.booking?.numOfDays)
        )
    );

  let load = updateLoading || bookingLoading;

  // const [bookingDate, setBookingDate] = useState("");
  const bookingDate = useSelector((store) => store.app.bookingDate);

  let dateChange = useRef(false);

  useEffect(() => {
    const formatDateRange = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (start && end)
        if (isSameMonth(startDate, endDate)) {
          return `${format(startDate, "dd")} - ${format(endDate, "dd MMM")}`;
        } else {
          return `${format(startDate, "dd MMM")} - ${format(
            endDate,
            "dd MMM"
          )}`;
        }
    };

    if (!dateChange.current) {
      dispatch(
        setBookingDate(
          formatDateRange(
            formatStartDate?.current || userBookingData?.booking?.startDate,

            formattedEndDate?.current || userBookingData?.booking?.endDate
          )
        )
      );
    }
  }, [startDate, endDate, dateChange.current, userBookingData]);

  useEffect(() => {
    if (isModalOpen) {
      dateChange.current = true;
      if (userBookingData?.booking?.startDate) {
        dispatch(setSelectedStartDate(userBookingData?.booking?.startDate));
      }
      if (userBookingData?.booking?.endDate) {
        dispatch(setSelectedEndDate(userBookingData?.booking?.endDate));
      }
    } else {
      if (allBookingDataTruthy(updateBookingData)) {
        setTimeout(() => {
          updateUserBooking();
        }, 1000);
      }
      dateChange.current = false;
    }
  }, [isModalOpen, userBookingData, dispatch, updateBookingData]);

  // navigate to login page if user is not logged in
  let userDataLoaded = useRef(false);

  useEffect(() => {
    if (userData) {
      userDataLoaded.current = true;
    } else {
      userDataLoaded.current = false;
    }
  }, [userData]);

  useEffect(() => {
    setTimeout(() => {
      if (!userDataLoaded.current) {
        return navigate("/login");
      }
    }, 1000);
  }, [userData, navigate]);

  const rating = data?.rating_count.match(/\d+/);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 920px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (event) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

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
                className="font-medium underline"
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
                className="font-medium underline"
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
                          formatStartDate.current ||
                          userBookingData?.booking?.startDate
                        }
                        endDate={
                          formattedEndDate.current ||
                          userBookingData?.booking?.endDate
                        }
                        numOfDays={
                          numOfDays.current ||
                          userBookingData?.booking?.numOfDays
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
                {dataFromChild.processing ? "Processing..." : "Request to book"}
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
                      src={data?.images[0]}
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
                      {data?.host_name
                        ? data?.host_name?.replace(/about/gi, "")
                        : "Carl's"}
                      's
                    </span>
                    <span className="text-sm font-light">
                      Entire guest suite
                    </span>
                    <div className="flex items-center space-x-1">
                      <img className="w-4 h-4" src={star} alt="" />
                      <span className="text-sm font-medium">
                        {data?.house_rating}
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
                      ${Math.ceil(data?.price / 83)} x{" "}
                      {Math.abs(
                        numOfDays.current || userBookingData?.booking?.numOfDays
                      )}{" "}
                      nights
                    </span>
                    <span>
                      $
                      {Math.ceil(
                        Math.ceil(data?.price / 83) *
                          Math.abs(
                            numOfDays.current ||
                              userBookingData?.booking?.numOfDays
                          )
                      )}
                    </span>
                  </div>
                  <div className="flex pb-4 justify-between font-light  items-center">
                    <span>Cleaning fee</span>
                    <span>
                      ${Math.floor(Math.ceil(data?.price / 83) * 0.7)}
                    </span>
                  </div>
                  <div className="flex pb-4 justify-between   font-light items-center">
                    <span>Airbnb service fee</span>
                    <span>
                      $
                      {Math.floor(
                        0.11 *
                          Math.ceil(
                            Math.ceil(data?.price / 83) *
                              Math.abs(
                                numOfDays.current ||
                                  userBookingData?.booking?.numOfDays
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
                <div className="w-full 1xz:w-[41.31rem]">
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
