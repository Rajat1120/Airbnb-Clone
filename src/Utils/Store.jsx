import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formReducer from "../Header/Form/mainFormSlice";
import appReducer from "../../src/Main/AppSlice";
import HouseDetailSlice from "../Components/House-detail/HouseDetailSlice";

import CardSlice from "../payment/CardSlice";
import {
  createStateSyncMiddleware,
  initMessageListener,
  withReduxStateSync,
} from "redux-state-sync";

const stateSyncMiddleware = createStateSyncMiddleware({
  whitelist: [
    "app/setItemId",
    "app/setIsFavorite",
    "app/removeUserFavListing",
    "app/setUserFavListing",
    "app/setUserData",
  ],
});

export const store = configureStore({
  reducer: withReduxStateSync(
    combineReducers({
      form: formReducer,
      app: appReducer,
      houseDetail: HouseDetailSlice,
      card: CardSlice,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stateSyncMiddleware),
});

initMessageListener(store);
