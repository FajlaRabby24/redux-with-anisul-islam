import { configureStore } from "@reduxjs/toolkit";
import couterReducer from "../fetures/counter/couterSliece";

const store = configureStore({
  reducer: {
    counter: couterReducer,
  },
});
export default store;
