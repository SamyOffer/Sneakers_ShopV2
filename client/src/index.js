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
import CartPageV2 from './components/CartPageV2';
import Shipping48H from './components/Shipping48H'
const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
      <Route path="/SneakersPage" element={<SneakersPage />} />
      <Route path="/ProductPage/:sneakerId" element={<ProductPageV2 />} />
      {/*<Route path="/CartPage" element={<CartPage />} />*/}
      <Route path="/CartPage/:id/:size/:quantity" element={<CartPageV2 />} />

      <Route path='/shipping48h' element={<Shipping48H />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root />);
