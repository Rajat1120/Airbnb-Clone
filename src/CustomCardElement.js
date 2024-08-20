import React from "react";
import copySvg from "./data/Icons svg/copy.svg";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const CustomCardElement = () => {
  let ccNumber = "4242 4242 4242 4242";
  let expirationDate = "02/28";
  let cvc = "567";

  function copyDetails(btnName) {
    if (btnName === "card") {
      document.getElementById("copy-cc").addEventListener("click", function () {
        // Get the text from the div
        const textToCopy = ccNumber;
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy);
      });
    } else if (btnName === "expiry") {
      document
        .getElementById("copy-exp")
        .addEventListener("click", function () {
          // Get the text from the div
          const textToCopy = expirationDate;
          // Use the Clipboard API to copy the text
          navigator.clipboard.writeText(textToCopy);
        });
    } else {
      document
        .getElementById("copy-cvc")
        .addEventListener("click", function () {
          // Get the text from the div
          const textToCopy = cvc;
          // Use the Clipboard API to copy the text
          navigator.clipboard.writeText(textToCopy);
        });
    }
  }

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
          <div className="flex items-center space-x-2">
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <button
              className="active:scale-90"
              type="button"
              onClick={() => copyDetails("card")}
              id="copy-cc"
            >
              <img src={copySvg} alt="" />
            </button>
          </div>
          <div className="mt-1">
            <CardNumberElement
              autocomplete="cc-number"
              id="card-number"
              options={options}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="card-expiry"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration date
              </label>
              <button
                className="active:scale-90"
                type="button"
                onClick={() => copyDetails("expiry")}
                id="copy-exp"
              >
                <img src={copySvg} alt="" />
              </button>
            </div>
            <div className="mt-1">
              <CardExpiryElement
                id="card-expiry"
                options={options}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="card-cvc"
                className="block text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <button
                className="active:scale-90"
                type="button"
                onClick={() => copyDetails("cvc")}
                id="copy-cvc"
              >
                <img src={copySvg} alt="" />
              </button>
            </div>
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
