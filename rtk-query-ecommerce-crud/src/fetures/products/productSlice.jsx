import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
});

/**
 * api call - axios: get, post, put, delete
 * createAsyncthunk()
 * extraReducers: pending, fulfilled, rejected
 */

export default productSlice.reducer;
