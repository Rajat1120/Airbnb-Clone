import React from "react";
import copySvg from "../asset/Icons_svg/copy.svg";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsCardNumEmpty,
  setIsCvcEmpty,
  setError,
  setIsExpEmpty,
} from "../redux/CardSlice";

let ccNumber = "4242 4242 4242 4242";
let expirationDate = "02/28";
let cvc = "567";

function copyDetails(btnName) {
  if (btnName === "card") {
    document.getElementById("copy-cc")?.addEventListener("click", function () {
      // Get the text from the div
      const textToCopy = ccNumber;
      // Use the Clipboard API to copy the text
      navigator.clipboard.writeText(textToCopy);
    });
  } else if (btnName === "expiry") {
    document.getElementById("copy-exp")?.addEventListener("click", function () {
      // Get the text from the div
      const textToCopy = expirationDate;
      // Use the Clipboard API to copy the text
      navigator.clipboard.writeText(textToCopy);
    });
  } else {
    document.getElementById("copy-cvc")?.addEventListener("click", function () {
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
      color: "#424770",
    },
  },
};

const CustomCardElement = () => {
  const dispatch = useDispatch();

  const { isCardNumEmpty, error, isExpEmpty, isCvcEmpty, firstBtnClick } =
    useSelector((store) => store.card);

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
              onClick={copyDetails("card")}
              id="copy-cc"
            >
              <img src={copySvg} alt="" />
            </button>
          </div>
          <div className="mt-1">
            <CardNumberElement
              onChange={(e) => {
                dispatch(setIsCardNumEmpty(e.complete));
                if (e.error) {
                  dispatch(setError([...error, "cardError"]));
                } else {
                  dispatch(
                    setError(error.filter((error) => error !== "cardError"))
                  );
                }
              }}
              autocomplete="cc-number"
              id="card-number"
              options={options}
              className={` block w-full px-3 py-2 border ${
                (firstBtnClick && !isCardNumEmpty) ||
                error.includes("cardError")
                  ? "border-red-700 bg-red-50 border-2"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 `}
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
                onClick={copyDetails("expiry")}
                id="copy-exp"
              >
                <img src={copySvg} alt="" />
              </button>
            </div>
            <div className="mt-1">
              <CardExpiryElement
                onChange={(e) => {
                  dispatch(setIsExpEmpty(e.complete));

                  if (e.error) {
                    dispatch(setError([...error, "ExpiryError"]));
                  } else {
                    dispatch(
                      setError(error.filter((error) => error !== "ExpiryError"))
                    );
                  }
                }}
                id="card-expiry"
                options={options}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 ${
                  (firstBtnClick && !isExpEmpty) ||
                  error.includes("ExpiryError")
                    ? "border-red-700 bg-red-50 border-2"
                    : "border-gray-300"
                } focus:border-indigo-500`}
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
                onClick={copyDetails("cvc")}
                id="copy-cvc"
              >
                <img src={copySvg} alt="" />
              </button>
            </div>
            <div className="mt-1">
              <CardCvcElement
                onChange={(e) => {
                  dispatch(setIsCvcEmpty(e.complete));
                  if (e.error) {
                    dispatch(setError([...error, "cvcError"]));
                  } else {
                    dispatch(
                      setError(error.filter((error) => error !== "cvcError"))
                    );
                  }
                }}
                id="card-cvc"
                options={options}
                className={`block w-full px-3 py-2 border ${
                  (firstBtnClick && !isCvcEmpty) || error.includes("cvcError")
                    ? "border-red-700 bg-red-50 border-2"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCardElement;
