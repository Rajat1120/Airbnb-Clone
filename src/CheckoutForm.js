import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import icon from "./data/airbnbLogo.svg";
import arrowLeft from "./data/Icons svg/arrow-left.svg";
import card from "./data/Icons svg/card.svg";
import supabase from "./Services/Supabase";
import CustomCardElement from "./CustomCardElement";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [session, setSession] = useState(null);

  // State for customer details
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "IN", // Assuming default country is India
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !session) {
      setProcessing(false);
      return;
    }

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
          customerName,
          customerAddress,
        }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) {
      setError(data.error);
      setProcessing(false);
      return;
    }

    const { clientSecret } = data;

    // Confirm the payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      // Payment failed
      setError(result.error.message);
    } else {
      // Payment succeeded
      if (result.paymentIntent.status === "succeeded") {
        // Update the database or perform any post-payment actions
        const { error: dbError } = await supabase.from("payments").insert({
          amount: 1000,
          status: "succeeded",
          stripe_payment_intent_id: result.paymentIntent.id,
        });

        if (dbError) {
          console.error("Error updating database:", dbError);
        }

        // Show success message in the UI
        setSuccess("Payment successful!");
      } else {
        setError("Payment failed. Please try again.");
      }
    }

    setProcessing(false);
  };

  return (
    <div>
      <header>
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
        <div className="w-full px-20 h-[9.25rem] px-auto">
          <div className="mx-20 relative pb-8">
            <span className="pt-16 block  text-[2rem] font-medium pb-4">
              Request to book
            </span>
            <button className="absolute -left-12 top-20">
              <img className="h-4 w-4" src={arrowLeft} alt="" />
            </button>
          </div>
        </div>

        <div className="w-[calc(100%-10rem)] flex px-20  mx-auto">
          <section className="w-1/2">
            <span className="text-2xl block font-medium pb-6">Your trip</span>
            <div className="pb-6  flex justify-between">
              <div className="flex flex-col">
                <span className="mt-2 block">Dates</span>
                <span className="">18 - 23 Aug</span>
              </div>
              <button className="font-medium underline">Edit</button>
            </div>
            <div className="pb-6  flex justify-between">
              <div className="flex flex-col">
                <span className="mt-2 block">Guests</span>
                <span className="">1 guest</span>
              </div>
              <button className="font-medium underline">Edit</button>
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
                      <CustomCardElement></CustomCardElement>
                    </div>
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
            <div className="mt-2">
              <span className="mt-8 text-2xl font-medium mb-6">
                Required for your trip
              </span>
              <div className="mb-6"></div>
            </div>
          </section>
          <section className=""></section>
        </div>
      </main>
    </div>
  );
};

export default CheckoutForm;

/* 

<form onSubmit={handleSubmit}>
     
      <CardElement />
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <button type="submit" disabled={!stripe || processing || !session}>
        Pay
      </button>
    </form>

*/
