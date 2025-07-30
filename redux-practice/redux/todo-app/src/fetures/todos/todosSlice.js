import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `http://localhost:3003/todos`;

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(BASE_URL);
  console.log(res.data);
  return res.data;
});

export const deleteTodos = createAsyncThunk("todos/deleteTodos", async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  console.log(res.data);
  return id;
});

export const updateTodos = createAsyncThunk(
  "todos/updateTodos",
  async ({ id, updatedTodoInfo }) => {
    await axios.patch(`${BASE_URL}/${id}`, updatedTodoInfo);
    return updatedTodoInfo;
  }
);

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (todo) => {
    console.log(todo);
    const res = await axios.post(BASE_URL, todo);
    console.log(res);
    return res.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    todos: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.todos = [];
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.todos = [];
        state.error = action.error.message;
      })
      // delete todos
      .addCase(deleteTodos.fulfilled, (state, action) => {
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id);
      })
      // delete todos
      .addCase(updateTodos.fulfilled, (state, action) => {})
      // create todos
      .addCase(createTodos.fulfilled, (state, action) => {});
  },
});

export default todosSlice.reducer;
