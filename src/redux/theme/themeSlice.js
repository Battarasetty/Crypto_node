import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
    selectedWallet: null,
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      console.log(state.mode)
    },
    setSelectedWallet: (state, action) => {
      state.selectedWallet = action.payload;
      console.log('Selected wallet:', action.payload);
    },
  },
});

export const { setThemeMode, setSelectedWallet } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export default themeSlice.reducer;
