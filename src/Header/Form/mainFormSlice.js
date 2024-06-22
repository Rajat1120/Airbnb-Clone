// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { format, setDate } from "date-fns";
import { set } from "date-fns";

let formState = {
  curSelectInput: "",
  search: false,
  currentMonth: new Date(),
  selectedStartDate: null,
  selectedEndDate: null,
  region: "all",
  dateOption: "dates",
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
    setSelectedStartDate(state, action) {
      state.selectedStartDate = action.payload;
    },
    setSelectedEndDate(state, action) {
      state.selectedEndDate = action.payload;
    },
    setRegion(state, action) {
      state.region = action.payload;
    },
    setDateOption(state, action) {
      state.dateOption = action.payload;
    },
  },
});

export const {
  setActiveInput,
  setSearchEl,
  setCurrentMonth,
  setSelectedEndDate,
  setSelectedStartDate,
  setRegion,
  setDateOption,
} = formSlice.actions;
export default formSlice.reducer;
