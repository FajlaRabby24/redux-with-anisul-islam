import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: 1,
      title: "banlga",
      author: "Boddonath Sorkar",
      price: 123,
      quantity: 4,
    },
    {
      id: 2,
      title: "english",
      author: "Boddonath Sorkar",
      price: 123,
      quantity: 4,
    },
    {
      id: 3,
      title: "math",
      author: "Boddonath Sorkar",
      price: 123,
      quantity: 4,
    },
    {
      id: 4,
      title: "Statistics in Psychology",
      author: "Boddonath Sorkar",
      price: 123,
      quantity: 4,
    },
  ],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    deleteBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
    },
    addBook: (state, action) => {
      const newBook = action.payload;
      state.books = [...state.books, newBook];
    },
    updateBookSlice: (state, action) => {
      const { id, title, author, price, quantity } = action.payload;
      const isExist = state.books.find((book) => book.id === id);
      if (isExist) {
        (isExist.id = id),
          (isExist.title = title),
          (isExist.author = author),
          (isExist.price = price),
          (isExist.quantity = quantity);
      }
    },
  },
});

export const { deleteBook, addBook, updateBookSlice } = bookSlice.actions;

export default bookSlice.reducer;
