import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { motion } from "framer-motion";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setAuthError("");
    setSuccessMessage("");

    const newErrors = {};
    if (!username) newErrors.username = "Username required";
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      // Call authentication service
      const result = await authService.login({
        username,
        email,
        password
      });

      setIsLoading(false);

      if (result.success) {
        // Store user info
        localStorage.setItem('userProfile', JSON.stringify(result.user));
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        setSuccessMessage("✅ Login successful! Redirecting to dashboard...");
        
        setTimeout(() => {
          onLoginSuccess();
          navigate("/dashboard");
          onClose();
        }, 1000);
      } else {
        setAuthError(`❌ ${result.error}`);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setAuthError("");
    setSuccessMessage("");

    const newErrors = {};
    if (!username) newErrors.username = "Username required";
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm password";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      const result = await authService.register({
        username,
        email,
        password,
        confirmPassword
      });

      setIsLoading(false);

      if (result.success) {
        setSuccessMessage("✅ Account created successfully! You can now login.");
        
        setTimeout(() => {
          setIsLogin(true);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsSubmitted(false);
        }, 1500);
      } else {
        setAuthError(`❌ ${result.error}`);
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setIsSubmitted(false);
    setAuthError("");
    setSuccessMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">✨</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Join DreamWeave"}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {isLogin ? "Track your dreams" : "Start your dream journey"}
          </p>
        </div>

        {/* Error Message */}
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {authError}
          </motion.div>
        )}

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          >
            {successMessage}
          </motion.div>
        )}

        <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleRegister}>
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none transition-all ${
                isSubmitted && errors.username
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 focus:border-purple-500 bg-gray-50"
              }`}
            />
            {isSubmitted && errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border-2 rounded-lg px-4 py-2 focus:outline-none transition-all ${
                isSubmitted && errors.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 focus:border-purple-500 bg-gray-50"
              }`}
            />
            {isSubmitted && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border-2 rounded-lg px-4 py-2 pr-10 focus:outline-none transition-all ${
                  isSubmitted && errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 focus:border-purple-500 bg-gray-50"
                }`}
              />
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
              </button>
            </div>
            {isSubmitted && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full border-2 rounded-lg px-4 py-2 pr-10 focus:outline-none transition-all ${
                    isSubmitted && errors.confirmPassword
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 focus:border-purple-500 bg-gray-50"
                  }`}
                />
              </div>
              {isSubmitted && errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 mt-6 rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </motion.button>
        </form>

        {/* Toggle Between Login/Register */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? (
            <span>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </p>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">📝 Demo Credentials:</p>
            <p className="text-xs text-blue-800">Username: <code className="bg-white px-1 py-0.5 rounded">demo</code></p>
            <p className="text-xs text-blue-800">Email: <code className="bg-white px-1 py-0.5 rounded">demo@example.com</code></p>
            <p className="text-xs text-blue-800">Password: <code className="bg-white px-1 py-0.5 rounded">password123</code></p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthModal;