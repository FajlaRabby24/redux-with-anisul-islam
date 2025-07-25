import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./fetures/bookSlice";

const store = configureStore({
  reducer: {
    booksR: bookReducer,
  },
});

export default store;
