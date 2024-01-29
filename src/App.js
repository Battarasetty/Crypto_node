import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWalletComponent from './components/ConnectWalletComponent';
import BuyNodeComponent from './components/BuyNodeComponent';
import Home from './pages/Home.jsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { mode } = useSelector((state) => state.wallet);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<BuyNodeComponent />}
          />
          {/* <Route path="/connect-wallet" element={<ConnectWalletComponent />} /> */}
          <Route
            path="/home"
            element={<Home />}
          />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </ThemeProvider>
  );
};

export default App;
