import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import CheckOutPage from './pages/CheckOutPage'
import Dashboard from './pages/Dashboard'
import PaymentPage from './pages/PaymentPage'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
// import LogInPage from './pages/LogInPage'
// import RegisterPage from './pages/RegisterPage'
// import ProtectedRoute from './components/ProtectedRoute'


import './App.css';



export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Footer />
        <Routes>
          {/* <Route path="/login" element={<LogInPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
