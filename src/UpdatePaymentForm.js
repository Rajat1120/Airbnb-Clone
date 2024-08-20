import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import supabase from "./Services/Supabase"; // Adjust the import path as needed
import CustomCardElement from "./CustomCardElement"; // Adjust the import path as needed

const UpdatedPaymentForm = ({
  totalAmount,
  userId,
  onSendData,
  onSubmitReference,
}) => {
  const [session, setSession] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

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

  const onSubmit = async (formData) => {
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
    if (onSubmitReference) {
      onSubmit();
    }
  }, [onSubmitReference]);

  return (
    <>
      <CustomCardElement />

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </>
  );
};

export default UpdatedPaymentForm;
