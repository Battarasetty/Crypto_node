import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  account: localStorage.getItem('connectedAccount') || 'Not connected',
  userBalance: null,
  providerData: null, // Adding providerData to initial state
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setProvider: (state, action) => {
      state.providerData = action.payload;
    },
    setUserBalance: (state, action) => {
      state.userBalance = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.account = action.payload;
    },
    disconnectWallet: (state) => {
      localStorage.removeItem('connectedAccount');
      state.account = 'Not connected';
      state.providerData = null;
      state.userBalance = null;
    },
  },
});

export const {
  setMode,
  setAccount,
  setProvider,
  setUserBalance,
  setWalletAddress,
  disconnectWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
