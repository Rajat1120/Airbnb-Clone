import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
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

const UpdatedPaymentForm = ({
  totalAmount,
  userId,
  onSendData,
  onSubmitReference,
  setOnSubmitReference,
}) => {
  const [session, setSession] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const isCardNumEmpty = useSelector((store) => store.card.isCardNumEmpty);
  const isExpEmpty = useSelector((store) => store.card.isExpEmpty);

  const isCvcEmpty = useSelector((store) => store.card.isCvcEmpty);

  let fieldEmpty = !isCardNumEmpty || !isExpEmpty || !isCvcEmpty;

  let childData = {
    stripe: stripe,
    processing: processing,
    session: session,
    error: error,
    success: success,
  };

  const sendDataToParent = () => {
    onSendData(childData);
  };

  useEffect(() => {
    sendDataToParent();
  }, [stripe, processing, session, error, success]);

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

  function fieldEmptyFun() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const onSubmit = async (formData) => {
    if (fieldEmpty) {
      dispatch(setHasError(true));
      setOnSubmitReference(false);
      fieldEmptyFun();
      return;
    } else {
      dispatch(setHasError(false));
    }
    sendDataToParent();
    setProcessing(true);

    if (!stripe || !elements || !session) {
      setProcessing(false);
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
            amount: 1000, // Amount in cents
            customerName: `rajat`,
            customerAddress: {
              line1: "2034",
              city: "Los angeles",
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
            name: `rajat`,

            address: {
              line1: "2034",
              city: "Los angeles",
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
        /*       await bookRoom({
          amount: 1000,
          status: "succeeded",
          stripe_payment_intent_id: result.paymentIntent.id,
        }); */

        setSuccess("Payment successful!");
      } else {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const bookRoom = async (paymentDetails) => {
    // Implement your room booking logic here
    console.log("Booking room with payment details:", paymentDetails);
  };

  useEffect(() => {
    toast.success(
      <div className="flex-center ">
        <span className="font-medium  text-sm">
          {" "}
          Copy test card details by clicking on this icon{" "}
          <img src={copySvg} className="h-6 inline w-6" alt=""></img>
        </span>{" "}
      </div>,
      {
        style: {
          border: "2px solid #ff385c",
        },
        duration: 5000,
        icon: <img alt="important icon" src={importantSvg}></img>,
      }
    );
  }, []);

  useEffect(() => {
    if (onSubmitReference) {
      onSubmit();
    }
  }, [onSubmitReference]);

  return (
    <>
      <CustomCardElement />
      <Toaster></Toaster>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </>
  );
};

export default UpdatedPaymentForm;
