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
  dateOption: "",
  adultCount: 0,
  childCount: 0,
  infantCount: 0,
  petsCount: 0,
  openName: "",
  isCalendarModalOpen: false,
};

const formSlice = createSlice({
  name: "mainForm",
  initialState: formState,
  reducers: {
    setActiveInput: (state, action) => {
      state.curSelectInput = action.payload;
    },
    setOpenName: (state, action) => {
      state.openName = action.payload;
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
    setAdultCount(state, action) {
      state.adultCount = action.payload;
    },
    setChildCount(state, action) {
      state.childCount = action.payload;
    },
    setInfantCount(state, action) {
      state.infantCount = action.payload;
    },
    setPetsCount(state, action) {
      state.petsCount = action.payload;
    },
    setCalendarModalOpen(state, action) {
      state.isCalendarModalOpen = action.payload;
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
  setAdultCount,
  setChildCount,
  setInfantCount,
  setPetsCount,
  setOpenName,
  setCalendarModalOpen,
} = formSlice.actions;
export default formSlice.reducer;
