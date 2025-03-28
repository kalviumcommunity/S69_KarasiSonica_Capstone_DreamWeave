import { Link } from "react-router-dom";
import { FiMoon, FiUser } from "react-icons/fi";

const Navbar = ({ setShowAuthModal }) => {
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
          <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors">
            Home
          </Link>
          <Link to="/dreams" className="text-gray-600 hover:text-violet-600 transition-colors">
            Dreams
          </Link>
          <Link to="/analytics" className="text-gray-600 hover:text-violet-600 transition-colors">
            Analytics
          </Link>
          <button
            onClick={() => setShowAuthModal(true)}
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 cursor-pointer hover:scale-105 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // Make sure this export exists!