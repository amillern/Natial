/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Terms } from './pages/Terms';
import { Checkout } from './pages/Checkout';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
              <Route path="terms" element={<Terms />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}
