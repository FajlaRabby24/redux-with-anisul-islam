import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const incrementDelay = createAsyncThunk(
  "counter/incremntDelayUpdate",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }
);
export const decrementDelay = createAsyncThunk(
  "counter/decrementDelayUpdate",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }
);

const counterSlice = createSlice({
  name: "counterDelay",
  initialState: {
    count: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementDelay.fulfilled, (state, action) => {
        state.count += 1;
      })
      .addCase(decrementDelay.fulfilled, (state, action) => {
        state.count -= 1;
      });
  },
});

export default counterSlice.reducer;
