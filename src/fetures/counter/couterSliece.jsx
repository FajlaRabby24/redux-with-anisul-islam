import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increament: (state) => {
      state.count += 1;
    },
    decreament: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    increaseByAmount: (state, action) => {
      console.log(action);
      state.count += action.payload;
    },
  },
});

export const { increament, decreament, reset, increaseByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
