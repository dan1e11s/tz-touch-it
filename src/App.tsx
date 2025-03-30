import { Routes, Route } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';

import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Product from '@/pages/Product';

import Navbar from '@/components/Navbar/Navbar';

const App = () => {
  return (
    <MainLayout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
