import { createSlice } from "@reduxjs/toolkit";

let appState = {
  startScroll: true,
};

const AppSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setStartScroll(state, action) {
      state.startScroll = action.payload;
    },
  },
});

export const { setStartScroll } = AppSlice.actions;

export default AppSlice.reducer;
