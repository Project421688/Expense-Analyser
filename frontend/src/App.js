// src/App.js
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Egg from './pages/Egg';
import Meat from './pages/Meat';
import Charcoal from './pages/Charcoal';
import Leaf from './pages/Leaf';
import Orders from './pages/Orders';
import Bills from './pages/Bills';
import Borrows from './pages/Borrows';
import Grocery from './pages/Grocery';

import './App.css';

export default function App() {
  const location = useLocation();

  // Simple page title mapping
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/egg': return 'Egg Page';
      case '/meat': return 'Meat Page';
      case '/charcoal': return 'Charcoal Page';
      case '/leaf': return 'Leaf Page';
      case '/orders': return 'Orders Page';
      case '/bills': return 'Bills Page';
      case '/borrows': return 'Borrows Page';
      case '/grocery': return 'Grocery Page';
      case '/contact': return 'Contact Page';
      default: return 'Home Page';
    }
  };

  return (
    <MainLayout pageTitle={getPageTitle()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/egg" element={<Egg />} />
        <Route path="/meat" element={<Meat />} />
        <Route path="/charcoal" element={<Charcoal />} />
        <Route path="/leaf" element={<Leaf />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/borrows" element={<Borrows />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MainLayout>
  );
}
