import { createSlice } from "@reduxjs/toolkit";

let cardState = {
  error: [],
  isCardNumEmpty: false,
  isExpEmpty: false,
  isCvcEmpty: false,
  hasError: false,
  firstBtnClick: false,
};

const CardSlice = createSlice({
  name: "app",
  initialState: cardState,
  reducers: {
    setIsCardNumEmpty(state, action) {
      state.isCardNumEmpty = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsExpEmpty(state, action) {
      state.isExpEmpty = action.payload;
    },
    setIsCvcEmpty(state, action) {
      state.isCvcEmpty = action.payload;
    },
    setHasError(state, action) {
      state.hasError = action.payload;
    },
    setFirstBtnClick(state, action) {
      state.firstBtnClick = action.payload;
    },
  },
});

export const {
  setError,
  setIsCardNumEmpty,
  setIsExpEmpty,
  setHasError,
  setFirstBtnClick,
  setIsCvcEmpty,
} = CardSlice.actions;

export default CardSlice.reducer;
