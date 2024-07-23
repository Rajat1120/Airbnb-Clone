// src/features/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { format, setDate } from "date-fns";
import { set } from "date-fns";

let HouseDetail = {
  startScroll: false,
};

const HouseDetailSlice = createSlice({
  name: "HouseDetail",
  initialState: HouseDetail,
  reducers: {},
});

export default HouseDetailSlice.reducer;
