import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import TrainingPage from './pages/TrainingPage';
import ToursPage from './pages/ToursPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import BlogAdmin from './components/BlogAdmin';
import AdminPage from './pages/AdminPage';
import FeaturedClubsPage from './pages/FeaturedClubsPage';
import EventsCalendarPage from './pages/EventsCalendarPage';
import PartnerMatchingPage from './pages/PartnerMatchingPage';
import FeatureClubPage from './pages/FeatureClubPage';
import ClubInformationPage from './pages/ClubInformationPage';
import EventSubmissionPage from './pages/EventSubmissionPage';
import TestStyleBible from './pages/TestStyleBible';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/admin/blog" element={<BlogAdmin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/clubs" element={<FeaturedClubsPage />} />
        <Route path="/events" element={<EventsCalendarPage />} />
        <Route path="/find-partner" element={<PartnerMatchingPage />} />
        <Route path="/feature-your-club" element={<FeatureClubPage />} />
        <Route path="/club-information-form" element={<ClubInformationPage />} />
        <Route path="/submit-event" element={<EventSubmissionPage />} />
        <Route path="/test-style-bible" element={<TestStyleBible />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100%',
      position: 'relative'
    }}>
      <Navbar />
      <main style={{ 
        margin: 0, 
        padding: 0, 
        width: '100%', 
        maxWidth: '100%', 
        position: 'relative',
        zIndex: 1,
        overflow: 'visible',
        height: 'auto',
        minHeight: 'auto',
        display: 'block'
      }}>
        <AnimatedRoutes />
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
}

export default App;