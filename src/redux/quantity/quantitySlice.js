import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      return { ...state, value: Math.min(state.value + 1, 10) }; // Returning a new state object
    },
    decrement: (state) => {
      return { ...state, value: Math.max(state.value - 1, 1) }; // Returning a new state object
    },
  },
});

export const { increment, decrement } = quantitySlice.actions;
export const setQuantity = (state) => state.quantity.value; // Renamed to selectQuantity

export default quantitySlice.reducer;
