import React from "react";

const Navbar = ({ setShowAuthModal }) => (
  <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <i className="fas fa-moon text-violet-600 text-2xl"></i>
        <span
          className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Pacifico', serif" }}
        >
          DreamWeave
        </span>
      </div>
      <div className="flex items-center space-x-8">
        <a
          href="#"
          className="text-gray-600 hover:text-violet-600 transition-colors text-sm tracking-wide uppercase"
          style={{ fontFamily: "'Monomakh', serif" }}
        >
          Home
        </a>
        <button
          onClick={() => setShowAuthModal(true)}
          className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 cursor-pointer
                     hover:scale-105 hover:opacity-90 transition-all duration-300 ease-out 
                     whitespace-nowrap text-sm font-medium tracking-wide shadow-lg shadow-violet-200"
          style={{ fontFamily: "'Monomakh', serif" }}
        >
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
