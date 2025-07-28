import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../src/fetures/products/productSlice";
import { productApi } from "./services/productApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    productsR: productReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(productApi.middleware),
});
