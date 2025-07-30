import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    addBy5: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, reset, addBy5 } = counterSlice.actions;

export default counterSlice.reducer;
