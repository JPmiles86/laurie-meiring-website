import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import PickleballPage from './pages/PickleballPage';
import ChefPage from './pages/ChefPage';
import MarketingPage from './pages/MarketingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pickleball" element={<PickleballPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <FloatingButtons />
      <Footer />
    </Router>
  );
}

export default App;