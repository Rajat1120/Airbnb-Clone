// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

let formState = {
  curSelectInput: "",
  curElement: null,
};

const formSlice = createSlice({
  name: "mainForm",
  initialState: formState,
  reducers: {
    setActiveInput: (state, action) => {
      state.curSelectInput = action.payload;
    },
    setActiveElement: (state, action) => {
      state.curElement = action.payload;
    },
  },
});

export const { setActiveInput, setActiveElement } = formSlice.actions;
export default formSlice.reducer;
