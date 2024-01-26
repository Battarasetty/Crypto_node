import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../redux/wallet/walletSlice';
import themeReducer from '../redux/theme/themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    wallet: walletReducer,
  },
});

export default store;
