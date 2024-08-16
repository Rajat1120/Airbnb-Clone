import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import supabase from "./Services/Supabase";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address Line 1"
        value={customerAddress.line1}
        onChange={(e) =>
          setCustomerAddress({ ...customerAddress, line1: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="City"
        value={customerAddress.city}
        onChange={(e) =>
          setCustomerAddress({ ...customerAddress, city: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="State"
        value={customerAddress.state}
        onChange={(e) =>
          setCustomerAddress({ ...customerAddress, state: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={customerAddress.postal_code}
        onChange={(e) =>
          setCustomerAddress({
            ...customerAddress,
            postal_code: e.target.value,
          })
        }
        required
      />
      <CardElement />
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <button type="submit" disabled={!stripe || processing || !session}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
