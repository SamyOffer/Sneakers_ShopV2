import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Chemin vers votre fichier Tailwind
import App from './App';
import MyAccount from './components/MyAccount';
import LoginPageV2 from './components/LoginPageV2';
import RegisterPageV2 from './components/RegisterPageV2';
import SneakersPage from './components/SneakersPage';
import ProductPageV2 from './components/ProductPageV2';
import CartPageV2 from './components/CartPageV2';
import Shipping48H from './components/Shipping48H'
import ContactV2 from './components/ContactV2';
import AboutUs from './components/AboutUs';
import TermOfUse from './components/TermOfUse';
import EditShippingInfo from './components/EditShippingInfo';
const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/LoginPage" element={<LoginPageV2 />} />
      <Route path="/RegisterPage" element={<RegisterPageV2 />} />
      <Route path="/SneakersPage" element={<SneakersPage />} />
      <Route path="/ProductPage/:sneakerId" element={<ProductPageV2 />} />
      <Route path="/CartPage" element={<CartPageV2 />} />
      <Route path='/shipping48h' element={<Shipping48H />} />
      <Route path='/Contact' element={<ContactV2 />} />
      <Route path='/AboutUs' element={<AboutUs />} />
      <Route path='/Terms_of_use' element={<TermOfUse />} />
      <Route path='/EditShippingInfo' element={<EditShippingInfo />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root />);
