import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/HomePage";
import DreamsPage from "./pages/DreamsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AuthModal from "./components/auth/AuthModal";
import Footer from "./components/layouts/Footer";

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing auth status
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isLiked, setIsLiked] = useState({});

  // Persist auth state on change
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDream = {
      id: Date.now(),
      title: e.target.title.value,
      description: e.target.description.value,
      mood: e.target.mood.value,
      tags: e.target.tags.value.split(",").map(tag => tag.trim()),
      likes: 0,
      date: new Date().toISOString()
    };
    setDreams([...dreams, newDream]);
  };

  const toggleLike = (dreamId) => {
    setIsLiked(prev => ({
      ...prev,
      [dreamId]: !prev[dreamId]
    }));
    setDreams(dreams.map(dream => 
      dream.id === dreamId 
        ? { ...dream, likes: dream.likes + (isLiked[dreamId] ? -1 : 1) } 
        : dream
    ));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={
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
              }}
            />
          </>
        } />

        {/* Protected Routes */}
        <Route path="/dreams" element={
          isAuthenticated ? (
            <>
              <Navbar 
                setShowAuthModal={setShowAuthModal} 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
              <DreamsPage 
                dreams={dreams}
                searchTerm={searchTerm}
                selectedMood={selectedMood}
                isLiked={isLiked}
                toggleLike={toggleLike}
                handleSubmit={handleSubmit}
                setSearchTerm={setSearchTerm}
                setSelectedMood={setSelectedMood}
              />
              <Footer />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/analytics" element={
          isAuthenticated ? (
            <>
              <Navbar 
                setShowAuthModal={setShowAuthModal} 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
              <AnalyticsPage dreams={dreams} />
              <Footer />
            </>
          ) : (
            <Navigate to="/" replace />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;