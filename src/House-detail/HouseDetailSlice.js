// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

let HouseDetail = {
  startScroll: false,
  houseInfo: {},
  isLoading: true,
  isVisible: true,
};

const HouseDetailSlice = createSlice({
  name: "HouseDetail",
  initialState: HouseDetail,
  reducers: {
    setHouseInfo(state, action) {
      state.houseInfo = { ...state.houseInfo, ...action.payload };
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsVisible(state, action) {
      state.isVisible = action.payload;
    },
  },
});

export const { setHouseInfo, setIsLoading, setIsVisible } =
  HouseDetailSlice.actions;

export default HouseDetailSlice.reducer;
