import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWalletComponent from './components/ConnectWalletComponent';
import BuyNodeComponent from './components/BuyNodeComponent';
import Home from './pages/Home.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyNodeComponent />} />
        {/* <Route path="/connect-wallet" element={<ConnectWalletComponent />} /> */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
