import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../fetures/counter/counterDelaySlice";

export const store = configureStore({
  reducer: {
    counterR: counterReducer,
  },
});
