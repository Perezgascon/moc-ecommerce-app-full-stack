import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Navbar from './components/Navbar'
import CheckOutPage from './pages/CheckOutPage'
import Dashboard from './pages/Dashboard'
import PaymentPage from './pages/PaymentPage'
import AbaPaymentPage from './pages/AbaPaymentPage'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import PayPalPaymentPage from './pages/PayPalPaymentPage';
import EnterYourAddress from './pages/EnterYourAddress';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LogInPage';



import './App.css';

export default function App() {
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <Router>
          <Navbar />
          <Footer />
          <Routes>
            {/* Define your routes here */}
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/abapayment" element={<AbaPaymentPage />} />
            <Route path="/paypal/:orderId" element={<PayPalPaymentPage />} />
            <Route path="/enter-your-address" element={<EnterYourAddress />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        {/* Place the PayPalScriptProvider outside of the Router */}
      </PayPalScriptProvider>
    </div >
  );
}
