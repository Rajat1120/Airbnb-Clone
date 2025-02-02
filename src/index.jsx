import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { store } from "./redux/Store";
import { Provider } from "react-redux";
import { initStateWithPrevTab } from "redux-state-sync";

import { loadStripe } from "@stripe/stripe-js";
const root = ReactDOM.createRoot(document.getElementById("root"));
initStateWithPrevTab(store);
const stripePromise = loadStripe(
  "pk_test_51LMAx8SCRBrt6RELwkEG3Qfg1kH9IikU9CTKNbbrSOjLahCowOu04DRDRnXMv7OCpRiMyWSOGHkbUB06uJBQoOAm00sSk0vv4G"
);
root.render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Elements>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
