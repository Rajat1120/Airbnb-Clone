import { createSlice } from "@reduxjs/toolkit";

let appState = {
  startScroll: true,
  minimize: false,
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
  },
});

export const { setStartScroll, setMinimize } = AppSlice.actions;

export default AppSlice.reducer;
