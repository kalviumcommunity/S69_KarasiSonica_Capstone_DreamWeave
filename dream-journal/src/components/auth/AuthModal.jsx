import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = {};
    if (!username) newErrors.username = "Username required";
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Login successful! 🎉");
      onLoginSuccess(); // Update auth state in parent
      navigate("/dreams"); // Redirect to dreams page
      onClose(); // Close modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-6">
          <div className="text-3xl text-violet-600">&#9790;</div>
          <h2 className="text-2xl font-bold mt-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border ${
                isSubmitted && errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-600 focus:outline-none`}
            />
            {isSubmitted && errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border ${
                isSubmitted && errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-600 focus:outline-none`}
            />
            {isSubmitted && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${
                  isSubmitted && errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-violet-600 focus:outline-none`}
              />
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {isSubmitted && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 mt-6 rounded-md shadow-md hover:bg-violet-700 transition-all"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? (
            <span>
              Need an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setIsSubmitted(false);
                }}
                className="text-violet-600 hover:underline"
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
                  setIsSubmitted(false);
                }}
                className="text-violet-600 hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;