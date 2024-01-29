import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../redux/wallet/walletSlice';
import themeReducer from '../redux/theme/themeSlice';
import quantityReducer from '../redux/quantity/quantitySlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    wallet: walletReducer,
    quantity: quantityReducer,

  },
});

export default store;
