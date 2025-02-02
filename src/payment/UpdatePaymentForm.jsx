import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import supabase from "../api/Supabase"; // Adjust the import path as needed
import CustomCardElement from "./CustomCardElement"; // Adjust the import path as needed
import copySvg from "../asset/Icons_svg/copy.svg";
import importantSvg from "../asset/Icons_svg/important.svg";
import { useDispatch, useSelector } from "react-redux";
import { setHasError } from "../redux/CardSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookRoom } from "../api/apiRooms";
import { areAllKeysTruthy } from "../utils/Helper";

// Custom hook to manage Supabase session state
const useSupabaseSession = () => {
  // State to hold the session object
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the current session on mount and set the session state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth state changes (e.g., sign-in, sign-out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Unsubscribe from the auth state listener on cleanup
    return () => subscription.unsubscribe();
  }, []);

  return session;
};

function useSendChildData({
  onSendData,
  stripe,
  processing,
  session,
  error,
  success,
  isSubmitting,
}) {
  // Memoize child data to ensure it only updates when dependencies change
  const childData = useMemo(
    () => ({
      stripe,
      processing,
      session,
      error,
      success,
      isSubmitting,
    }),
    [stripe, processing, session, error, success, isSubmitting]
  );

  // Callback function to send child data to the parent
  const sendDataToParent = useCallback(() => {
    onSendData(childData);
  }, [childData, onSendData]);

  // Effect to trigger sendDataToParent when relevant dependencies change
  useEffect(() => {
    sendDataToParent();
  }, [sendDataToParent, stripe, processing, session, error, success]);

  return sendDataToParent;
}

const UpdatedPaymentForm = ({
  guestCount,
  totalAmount,
  userId,
  onSendData,
  onSubmitReference,
  setOnSubmitReference,
  startDate,
  endDate,
  numOfDays,
  booked,
}) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [stripePaymentId, setStripePaymentId] = useState(null);
  const [success, setSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isCardNumEmpty, isExpEmpty, isCvcEmpty } = useSelector(
    (store) => store.card
  );
  const { id } = useParams();
  const queryClient = useQueryClient();

  let fieldEmpty = !isCardNumEmpty || !isExpEmpty || !isCvcEmpty;

  const session = useSupabaseSession();

  const sendDataToParent = useSendChildData({
    onSendData,
    stripe,
    processing,
    session,
    error,
    success,
    isSubmitting,
  });

  const fieldEmptyFun = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const paymentDetails = useMemo(
    () => ({
      amount: totalAmount,
      customer_name: userId?.user_metadata.name,
      user_email: userId?.email,
      currency: "usd",
      room_id: id,
      startDate: startDate,
      endDate: endDate,
      numOfDays: numOfDays,
      payment_method: "card",
      status: "successful",
      stripe_payment_intent_id: stripePaymentId,
      Guest: guestCount,
      address: {
        line1: "2034",
        city: "Los Angeles",
        state: "California",
        postal_code: "67854",
        country: "US",
      },
    }),
    [
      totalAmount,
      userId,
      id,
      startDate,
      endDate,
      numOfDays,
      stripePaymentId,
      guestCount,
    ]
  );

  const { refetch, error: paymentError } = useQuery({
    queryKey: ["payment"],
    queryFn: () => bookRoom(paymentDetails),
    enabled: false,
  });

  const onSubmit = useCallback(
    async (formData) => {
      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true);

      if (fieldEmpty) {
        dispatch(setHasError(true));
        setOnSubmitReference(false);
        fieldEmptyFun();
        setIsSubmitting(false);
        return;
      }

      dispatch(setHasError(false));
      sendDataToParent();
      setProcessing(true);
      if (!stripe || !elements || !session) {
        setProcessing(false);
        setIsSubmitting(false);
        return;
      }

      try {
        // Call Supabase function to create payment intent
        const response = await fetch(
          "https://xailnuaqpfvjojptkpgh.supabase.co/functions/v1/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              amount: totalAmount, // Amount in cents
              customerName: userId?.user_metadata.name,
              customerAddress: {
                line1: "2034",
                city: "Los Angeles",
                state: "California",
                postal_code: "67854",
                country: "US",
              },
            }),
          }
        );

        const data = await response.json();

        if (response.status !== 200) {
          throw new Error(data.error);
        }

        const { clientSecret } = data;

        // Confirm the payment with Stripe
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: userId?.user_metadata.name,
              address: {
                line1: "2034",
                city: "Los Angeles",
                state: "California",
                postal_code: "67854",
                country: "US",
              },
            },
          },
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        if (result.paymentIntent.status === "succeeded") {
          // Update the database or perform any post-payment actions
          setStripePaymentId(result.paymentIntent.id);
          setSuccess("Payment successful!");
          if (areAllKeysTruthy(paymentDetails)) {
            refetch();
            queryClient.invalidateQueries(["payment"]);
          }
        } else {
          throw new Error("Payment failed. Please try again.");
        }
      } catch (err) {
        setError(err.message);
        toast.error("Payment failed, please try again");
      } finally {
        setProcessing(false);
        setIsSubmitting(false);
      }
    },
    [
      dispatch,
      stripe,
      elements,
      refetch,
      queryClient,
      paymentDetails,
      session,
      totalAmount,
      userId,
      setOnSubmitReference,
      isSubmitting,
      fieldEmpty,
      fieldEmptyFun,
      sendDataToParent,
      setProcessing,
      setStripePaymentId,
      setSuccess,
      setError,
    ]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success("Your payment was successful");
      setTimeout(() => {
        navigate("/trips");
      }, 3000);
    }

    if (error) {
      toast.error("Your payment was declined check your card details");
      setOnSubmitReference(true);
    }
  }, [success, error, setOnSubmitReference, navigate, paymentError]);

  useEffect(() => {
    if (booked && booked !== "found")
      toast.success(
        <div className="flex-center ">
          <span className="font-medium  text-sm">
            {" "}
            Copy test card details by clicking on this icon{" "}
            <img src={copySvg} className="h-6 inline w-6" alt=""></img>
          </span>{" "}
        </div>,
        {
          style: {},
          duration: 10000,
          icon: <img alt="important icon" src={importantSvg}></img>,
        }
      );
  }, [booked]);

  useEffect(() => {
    if (onSubmitReference) {
      onSubmit();
    }
  }, [onSubmitReference, onSubmit]);

  return (
    <>
      <CustomCardElement />
      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </>
  );
};

export default UpdatedPaymentForm;
