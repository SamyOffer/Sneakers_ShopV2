import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Chemin vers votre fichier Tailwind
import App from './App';
import MyAccount from './components/MyAccount';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SneakersPage from './components/SneakersPage';
import ProductPageV2 from './components/ProductPageV2';
import CartPage from './components/CartPage';
const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
      <Route path="/SneakersPage" element={<SneakersPage />} />
      <Route path="/ProductPage/:sneakerId" element={<ProductPageV2 />} />
      <Route path="/CartPage" element={<CartPage />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root />);
