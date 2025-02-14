import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formReducer from "./mainFormSlice";
import appReducer from "./AppSlice";
import HouseDetailSlice from "./HouseDetailSlice";

import CardSlice from "./CardSlice";
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
