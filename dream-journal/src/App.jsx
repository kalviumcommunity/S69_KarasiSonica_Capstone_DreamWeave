import "swiper/css";
import "swiper/css/pagination";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import Router
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import AuthModal from "./components/AuthModal";
import MainPage from "./pages/MainPage"; // ✅ Import MainPage

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50">
        <Navbar setShowAuthModal={setShowAuthModal} />
        <HeroSection setShowAuthModal={setShowAuthModal} />
        <Testimonials />
        <Routes>
          <Route
            path="/"
            element={
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
              />
            }
          />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
