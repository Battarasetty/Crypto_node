import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../redux/wallet/walletSlice';

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
