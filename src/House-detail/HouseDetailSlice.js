// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

let HouseDetail = {
  startScroll: false,
  houseInfo: {},
  isLoading: true,
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
  },
});

export const { setHouseInfo, setIsLoading } = HouseDetailSlice.actions;

export default HouseDetailSlice.reducer;
