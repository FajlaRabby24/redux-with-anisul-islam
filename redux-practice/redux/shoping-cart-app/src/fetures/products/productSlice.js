import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = `http://localhost:3003/products`;

export const fetchProducs = createAsyncThunk("fetchProducts", async () => {
  const res = await axios.get(BASE_URL);
  console.log(res.data);
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsError: null,
    productLoading: true,
    products: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducs.pending, (state, action) => {
        state.productsError = null;
        state.productLoading = true;
        state.products = [];
      })
      .addCase(fetchProducs.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productLoading = false;
        state.productsError = null;
      })

      .addCase(fetchProducs.rejected, (state, action) => {
        state.productsError = action.error.message;
        state.productLoading = false;
        state.products = [];
      });
  },
});

export default productSlice.reducer;
