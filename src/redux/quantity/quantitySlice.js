import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value = Math.min(state.value + 1, 10);
    },
    decrement: (state) => {
      state.value = Math.max(state.value - 1, 1);
    },
  },
});

export const { increment, decrement } = quantitySlice.actions;
export const setQuantity = (state) => state.quantity.value;

export default quantitySlice.reducer;
