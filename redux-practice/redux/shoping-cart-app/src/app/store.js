import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../fetures/cart/cartSlice";
import productReducer from "../fetures/products/productSlice";

export const store = configureStore({
  reducer: {
    productsR: productReducer,
    cartR: cartReducer,
  },
});
