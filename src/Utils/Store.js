import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../Header/Form/mainFormSlice";
import appReducer from "../../src/Main/AppSlice";
import HouseDetailSlice from "../House-detail/HouseDetailSlice";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const stateSyncMiddleware = createStateSyncMiddleware();

export const store = configureStore({
  reducer: {
    form: formReducer,
    app: appReducer,
    houseDetail: HouseDetailSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stateSyncMiddleware),
});

initMessageListener(store);
