import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/users/userSlice";

export const store = configureStore({
  reducer: {
    authR: authReducer,
  },
});
