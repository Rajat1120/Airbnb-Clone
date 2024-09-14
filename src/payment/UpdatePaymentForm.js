import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import supabase from "../Services/Supabase"; // Adjust the import path as needed
import CustomCardElement from "./CustomCardElement"; // Adjust the import path as needed
import copySvg from "../data/Icons svg/copy.svg";
import importantSvg from "../data/Icons svg/important.svg";
import { useDispatch, useSelector } from "react-redux";
import { setHasError } from "./CardSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookRoom } from "../Services/apiRooms";

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
  const [session, setSession] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [stripePaymentId, setStripePaymentId] = useState(null);
  const [success, setSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isCardNumEmpty = useSelector((store) => store.card.isCardNumEmpty);

  const isExpEmpty = useSelector((store) => store.card.isExpEmpty);
  const { id } = useParams();

  const isCvcEmpty = useSelector((store) => store.card.isCvcEmpty);

  let fieldEmpty = !isCardNumEmpty || !isExpEmpty || !isCvcEmpty;

  let childData = useMemo(
    () => ({
      stripe: stripe,
      processing: processing,
      session: session,
      error: error,
      success: success,
      isSubmitting: isSubmitting,
    }),
    [stripe, processing, session, error, isSubmitting, success]
  );

  const sendDataToParent = useCallback(() => {
    onSendData(childData);
  }, [childData, onSendData]);

  useEffect(() => {
    sendDataToParent();
  }, [stripe, processing, session, sendDataToParent, error, success]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  function areAllKeysTruthy(obj) {
    return Object.values(obj).every((value) => Boolean(value));
  }

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
        } else {
          throw new Error("Payment failed. Please try again.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setProcessing(false);
        setIsSubmitting(false);
      }
    },
    [
      dispatch,
      stripe,
      elements,
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

  const queryClient = useQueryClient();

  useEffect(() => {
    if (success && !paymentError) {
      if (areAllKeysTruthy(paymentDetails)) {
        refetch();
        queryClient.invalidateQueries(["payments"]);
      }
    }

    if (paymentError) {
      toast.error("Payment failed, please try again");
    }
  }, [
    success,
    refetch,
    queryClient,
    paymentError,
    paymentDetails,
    stripePaymentId,
  ]);

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
