import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      if (itemIndex < 0) {
        state.items = [...state.items, action.payload];
      } else {
        state.items[itemIndex] = action.payload;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      if (itemIndex > -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      state.total += action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
