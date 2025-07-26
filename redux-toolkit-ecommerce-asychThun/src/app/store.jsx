import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../fetures/products/productSlice";

const store = configureStore({
  reducer: {
    productsR: productReducer,
  },
});

export default store;
