// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../Header/Form/mainFormSlice";

import appReducer from "../../src/Main/AppSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
