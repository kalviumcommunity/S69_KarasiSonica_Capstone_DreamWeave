// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./layouts/Dashboard";
import AIagent from "./components/dreams/AIagent";
import AuthModal from "./components/auth/AuthModal";
import Footer from "./components/layouts/Footer";
import DreamForm from "./components/dreams/DreamForm";
import DreamList from "./components/dreams/DreamList";
import DreamAnalytics from "./components/dreams/DreamAnalytics";
import { DreamProvider } from "./components/dreams/DreamContext";
import Profile from "./pages/Profile"; // ✅ fixed path
import AboutUs from "./pages/AboutUs"; // Import AboutUs page

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <DreamProvider>
      <Router>
        <Routes>
          {/* Public Home Page */}
          <Route path="/dreams" element={
            <>
              <Navbar
                setShowAuthModal={setShowAuthModal}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
              <HomePage setShowAuthModal={setShowAuthModal} />
              <Footer />
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginSuccess={() => {
                  setIsAuthenticated(true);
                  setShowAuthModal(false);
                  window.location.href = '/dashboard';
                }}
              />
            </>
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <>
                <Navbar {...{ setShowAuthModal, isAuthenticated, onLogout: handleLogout }} />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/dreams" replace />
            )
          } />

          <Route path="/ai-agent" element={
            isAuthenticated ? (
              <>
                <Navbar {...{ setShowAuthModal, isAuthenticated, onLogout: handleLogout }} />
                <AIagent />
              </>
            ) : (
              <Navigate to="/dreams" replace />
            )
          } />

          <Route path="/add-dreams" element={
            isAuthenticated ? (
              <>
                <Navbar {...{ setShowAuthModal, isAuthenticated, onLogout: handleLogout }} />
                <DreamForm />
              </>
            ) : (
              <Navigate to="/dreams" replace />
            )
          } />

          <Route path="/dream-list" element={
            isAuthenticated ? (
              <>
                <Navbar {...{ setShowAuthModal, isAuthenticated, onLogout: handleLogout }} />
                <DreamList />
              </>
            ) : (
              <Navigate to="/dreams" replace />
            )
          } />

          <Route path="/dream-analytics" element={
            isAuthenticated ? (
              <>
                <Navbar {...{ setShowAuthModal, isAuthenticated, onLogout: handleLogout }} />
                <DreamAnalytics />
              </>
            ) : (
              <Navigate to="/dreams" replace />
            )
          } />

          {/* ✅ Updated Profile Route */}
          <Route path="/profile" element={
            isAuthenticated ? (
              <>
                <Navbar {...{ setShowAuthModal, isAuthenticated, onLogout: handleLogout }} />
                <Profile />
              </>
            ) : (
              <Navigate to="/dreams" replace />
            )
          } />

          {/* Redirect root to /dreams */}
          <Route path="/" element={<Navigate to="/dreams" replace />} />
        </Routes>
      </Router>
    </DreamProvider>
  );
};

export default App;
