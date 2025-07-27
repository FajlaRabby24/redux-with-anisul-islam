import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3003/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(BASE_URL);
    console.log(res.data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

export const craeteProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    const res = await axios.post(BASE_URL, product);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const id = product.id;
    const res = await axios.put(`${BASE_URL}/${id}`, product);
    console.log(res.data);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(craeteProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, title, description, price, category } = action.payload;
        const isExist = state.products.find((product) => product.id === id);
        if (isExist) {
          isExist.title = title;
          isExist.description = description;
          isExist.price = price;
          isExist.category = category;
        }
      });
  },
});

export default productSlice.reducer;
