import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../fetures/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todosR: todosReducer,
  },
});
