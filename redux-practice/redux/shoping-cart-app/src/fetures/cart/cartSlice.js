import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartError: null,
    cartLoading: true,
    cart: [],
  },
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const { productId } = action.payload;

      const isExist = state.cart.find((item) => item?.productId === productId);

      if (isExist) {
        isExist.quantity += 1;
      } else {
        const product = { ...action.payload, quantity: 1 };
        state.cart.push(product);
      }
    },
    //remove from cart
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    //  increase quantity
    increaseQauntity: (state, action) => {
      const id = action.payload;
      const matchedItem = state.cart.find((item) => item.productId === id);
      if (matchedItem) {
        matchedItem.quantity += 1;
      }
    },
    // decrease qantity
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const matchedItem = state.cart.find((item) => item.productId === id);
      if (matchedItem) {
        matchedItem.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQauntity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
