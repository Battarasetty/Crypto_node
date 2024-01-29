import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  account: localStorage.getItem('connectedAccount') || 'Not connected',
  userBalance: null,
  providerData: null,
  quantity: 1, 
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
    incrementQuantity: (state) => {
      state.quantity = Math.min(state.quantity + 1, 10);
    },
    decrementQuantity: (state) => {
      state.quantity = Math.max(state.quantity - 1, 1);
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
  incrementQuantity,
  decrementQuantity,
} = walletSlice.actions;

// Selector for accessing the quantity state
export const selectQuantity = (state) => state.wallet.quantity;

export default walletSlice.reducer;
