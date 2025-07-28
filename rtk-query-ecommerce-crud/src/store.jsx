import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./fetures/products/productSlice";
import { productApi } from "./services/productApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    productsR: productsReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(productApi.middleware),
});
