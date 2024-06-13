// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../Header/Form/mainFormSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
