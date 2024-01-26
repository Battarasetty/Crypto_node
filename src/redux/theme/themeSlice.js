import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light', // You may customize the initial state based on your needs
  },
  reducers: {
    setThemeMode: (state, action) => {
        state.mode = action.payload;
        console.log(state.mode)
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export default themeSlice.reducer;
