import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [] },
  reducers: {
    add: (state, action) => {
      state.products.push(action.payload);
    },
    remove: (state, action) => {
      state.products = state.products.filter(
        (p) => p.id !== action.payload && p.productId !== action.payload
      );
    },
    setCart: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { add, remove, setCart } = cartSlice.actions;
export default cartSlice.reducer;
