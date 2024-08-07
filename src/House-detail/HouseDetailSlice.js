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
      const updatedInfo = { ...state.houseInfo, ...action.payload };
      if (updatedInfo.price && updatedInfo.country) {
        if (updatedInfo.country === "United States") {
          updatedInfo.price = Math.ceil(updatedInfo.price / 83);
        }
      }
      state.houseInfo = updatedInfo;
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
