// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { format, setDate } from "date-fns";
import { set } from "date-fns";

let formState = {
  curSelectInput: "",
  search: false,
  currentMonth: new Date(),
  selectedStartDate: null,
  startDurationDate: new Date(),
  selectedEndDate: null,
  region: "all",
  dateOption: "dates",
  adultCount: 0,
  curDot: 2,
  childCount: 0,
  infantCount: 0,
  petsCount: 0,
  openName: "",
  stayDuration: "week",
  months: [],
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
    setStartDurationDate(state, action) {
      state.startDurationDate = action.payload;
    },
    setMonths(state, action){
      if(state.months.includes(action.payload)){
        state.months = state.months.filter((month) => month !== action.payload);
      }else{

        state.months.push(action.payload)
      }
    },
    setStayDuration(state, action){ 
      state.stayDuration = action.payload;

    },
    setCurrentDot(state, action){
      state.curDot = action.payload;
    }
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
  setStartDurationDate,
  setStayDuration,
  setMonths,
setCurrentDot} = formSlice.actions;
export default formSlice.reducer;
