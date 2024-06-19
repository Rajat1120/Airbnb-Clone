// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

let formState = {
  curSelectInput: "",
  search: false,
  currentMonth: new Date(),
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
    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
  },
});

export const { setActiveInput, setSearchEl, setCurrentMonth } =
  formSlice.actions;
export default formSlice.reducer;
