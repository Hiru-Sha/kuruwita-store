import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home     = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Product  = lazy(() => import('./pages/Product'));
const Cart     = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Success  = lazy(() => import('./pages/Success'));
const Track    = lazy(() => import('./pages/Track'));
const About    = lazy(() => import('./pages/About'));

const Loader = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
    <div style={{ textAlign:'center' }}>
      <div style={{ fontSize:40, marginBottom:12 }}>👁️</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", color:'#6b7280' }}>Loading...</div>
    </div>
  </div>
);

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ minHeight:'80vh' }}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/products"   element={<Products />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/cart"       element={<Cart />} />
              <Route path="/checkout"   element={<Checkout />} />
              <Route path="/success"    element={<Success />} />
              <Route path="/track/:id"  element={<Track />} />
              <Route path="/about"      element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
