import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        account: localStorage.getItem('connectedAccount') || 'Not connected',
        provider: null,
        userBalance: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setProvider: (state, action) => {
            state.provider = action.payload;
        },
        setUserBalance: (state, action) => {
            state.userBalance = action.payload;
        },
        disconnectWallet: (state) => {
            localStorage.removeItem('connectedAccount');
            return {
                account: 'Not connected',
                provider: null,
                userBalance: null,
            };
        },
    },
});

export const {
    setAccount,
    setProvider,
    setUserBalance,
    disconnectWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
