// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

let formState = {
  curSelectInput: "",
};

const formSlice = createSlice({
  name: "mainForm",
  initialState: formState,
  reducers: {
    setActiveInput: (state, action) => {
      state.curSelectInput = action.payload;
    },
  },
});

export const { setActiveInput } = formSlice.actions;
export default formSlice.reducer;
