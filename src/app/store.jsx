import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../fetures/counter/counterSlice";
import postsReducer from "../fetures/posts/postSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
});

export default store;
