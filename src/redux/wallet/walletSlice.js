import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    mode: 'light',
    account: localStorage.getItem('connectedAccount') || 'Not connected',
    // Remove the provider from the initial state
    userBalance: null,
  },
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
      // Remove provider data when disconnecting
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
