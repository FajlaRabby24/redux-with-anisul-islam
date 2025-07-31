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
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
