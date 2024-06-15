// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

let formState = {
  curSelectInput: "",
  search: false,
};

const formSlice = createSlice({
  name: "mainForm",
  initialState: formState,
  reducers: {
    setActiveInput: (state, action) => {
      state.curSelectInput = action.payload;
    },
    setSearchEl: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setActiveInput, setSearchEl } = formSlice.actions;
export default formSlice.reducer;
