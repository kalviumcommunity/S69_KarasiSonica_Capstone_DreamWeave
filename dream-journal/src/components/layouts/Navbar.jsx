import { Link } from "react-router-dom";
import { FiMoon, FiUser } from "react-icons/fi";

const Navbar = ({ setShowAuthModal, isAuthenticated }) => {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FiMoon className="text-violet-600 text-2xl" />
          <span className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            DreamWeave
          </span>
        </div>
        <div className="flex items-center space-x-8">
          {/* Home button */}
          <Link to="/dreams" className="text-gray-600 hover:text-violet-600 transition-colors">
            Home
          </Link>
          
          {/* Conditionally render Get Started button */}
          {!isAuthenticated && (
            <button
              onClick={() => setShowAuthModal(true)}
              className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 cursor-pointer hover:scale-105 transition-all"
            >
              Get Started
            </button>
          )}

          {/* Optionally add User icon for authenticated users */}
          {isAuthenticated && (
            <Link to="/profile">
              <FiUser className="text-violet-600 text-2xl" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
