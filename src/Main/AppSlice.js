import { createSlice } from "@reduxjs/toolkit";

let appState = {
  startScroll: true,
  minimize: false,
  filterData: {},
  selectedIcon: "Amazing views",
  selectedCountry: "United States",
  isLoading: true,
  city: "",
};

const AppSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setStartScroll(state, action) {
      state.startScroll = action.payload;
    },
    setMinimize(state, action) {
      state.minimize = action.payload;
    },
    setFilterData(state, action) {
      state.filterData = { ...state.filterData, ...action.payload };
    },

    setSelectedIcon(state, action) {
      state.selectedIcon = action.payload;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
  },
});

export const {
  setStartScroll,
  setMinimize,
  setFilterData,
  setSelectedIcon,
  setIsLoading,
  setSelectedCountry,
} = AppSlice.actions;

export default AppSlice.reducer;
