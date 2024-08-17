import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const CustomCardElement = () => {
  const options = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="bg-white  rounded-lg p-4 w-full max-w-md">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <div className="mt-1">
            <CardNumberElement
              id="card-number"
              options={options}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="card-expiry"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Date
            </label>
            <div className="mt-1">
              <CardExpiryElement
                id="card-expiry"
                options={options}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="card-cvc"
              className="block text-sm font-medium text-gray-700"
            >
              CVC
            </label>
            <div className="mt-1">
              <CardCvcElement
                id="card-cvc"
                options={options}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCardElement;
