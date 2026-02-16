import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, LogOut, Mail, User, Calendar, Award, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDreams } from "../components/dreams/DreamContext";
import { authService } from "../services/authService";

const Profile = () => {
  const navigate = useNavigate();
  const { dreams } = useDreams();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const userData = JSON.parse(storedProfile);
        const profileData = {
          ...userData,
          totalDreams: dreams.length,
          totalLikes: dreams.reduce((sum, d) => sum + (d.likes || 0), 0)
        };
        setProfile(profileData);
        setEditData(userData);
      } catch (error) {
        console.error('Error parsing profile:', error);
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
  }, [dreams]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout? You'll be redirected to the home page.")) {
      const result = authService.logout();
      if (result.success) {
        navigate("/dreams");
        window.location.reload();
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!editData.name?.trim()) newErrors.name = "Name is required";
    if (!editData.email?.trim()) newErrors.email = "Email is required";
    if (!editData.username?.trim()) newErrors.username = "Username is required";
    if (editData.bio && editData.bio.length > 150) newErrors.bio = "Bio must be less than 150 characters";
    return newErrors;
  };

  const handleSaveProfile = async () => {
    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const result = await authService.updateProfile(profile.id, editData);
      
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          ...editData
        }));
        setIsEditing(false);
        setSuccessMessage("✅ Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Failed to update profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              👤 Profile
            </h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center border border-purple-100"
          >
            <div className="text-6xl mb-4">🔐</div>
            <p className="text-gray-600 text-lg font-medium">Please login to view your profile</p>
            <button
              onClick={() => navigate("/dreams")}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Go to Login
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            👤 My Profile
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium flex items-center gap-2"
          >
            <Check size={20} />
            {successMessage}
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Main Profile Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100"
          >
            {/* Header Background */}
            <div className="h-40 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>

            {/* Profile Content */}
            <div className="px-8 pb-8">
              {/* Avatar Section */}
              <div className="flex items-end gap-6 -mt-20 mb-6">
                <motion.img
                  src={editData.avatar || profile.avatar}
                  alt={editData.name || profile.name}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900">{editData.name || profile.name}</h2>
                  <p className="text-gray-600">@{editData.username || profile.username}</p>
                  {profile.isVerified && (
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold">
                      <Check size={16} />
                      Verified User
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false);
                        setEditData({...profile});
                        setErrors({});
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
                  >
                    <Edit2 size={18} />
                    {isEditing ? "Cancel" : "Edit"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </div>
              </div>

              {/* Error Messages */}
              {Object.keys(errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  {Object.entries(errors).map(([key, value]) => (
                    <p key={key} className="text-red-700 text-sm flex items-center gap-2">
                      <X size={16} />
                      {value}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Profile Info */}
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  {/* Email */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={18} className="text-purple-600" />
                      <span className="font-medium">Email</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-6">{profile.email}</p>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={18} className="text-indigo-600" />
                      <span className="font-medium">Username</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-6">@{profile.username}</p>
                  </div>

                  {/* Joined Date */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={18} className="text-blue-600" />
                      <span className="font-medium">Joined</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-6">{profile.joinedDate}</p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award size={18} className="text-green-600" />
                      <span className="font-medium">Bio</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-6">
                      {profile.bio || "No bio set yet"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  {/* Editable Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ""}
                      onChange={handleEditChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                        errors.name ? "border-red-400 bg-red-50" : "border-purple-200 focus:border-purple-500"
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Editable Username */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Username *</label>
                    <input
                      type="text"
                      name="username"
                      value={editData.username || ""}
                      onChange={handleEditChange}
                      placeholder="Enter your username"
                      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                        errors.username ? "border-red-400 bg-red-50" : "border-indigo-200 focus:border-indigo-500"
                      }`}
                    />
                    {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username}</p>}
                  </div>

                  {/* Editable Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email || ""}
                      onChange={handleEditChange}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                        errors.email ? "border-red-400 bg-red-50" : "border-purple-200 focus:border-purple-500"
                      }`}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Editable Bio */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Bio <span className="text-xs text-gray-500">(max 150 chars)</span>
                    </label>
                    <textarea
                      name="bio"
                      value={editData.bio || ""}
                      onChange={handleEditChange}
                      placeholder="Tell us about yourself..."
                      maxLength={150}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all resize-none ${
                        errors.bio ? "border-red-400 bg-red-50" : "border-indigo-200 focus:border-indigo-500"
                      }`}
                    />
                    <div className="flex justify-between">
                      {errors.bio && <p className="text-red-600 text-xs">{errors.bio}</p>}
                      <p className="text-xs text-gray-500 ml-auto">
                        {(editData.bio || "").length}/150
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="mt-6 flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({...profile});
                      setErrors({});
                    }}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Discard
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="px-8 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Total Dreams */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Dreams</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{profile.totalDreams}</p>
                  <p className="text-xs text-gray-500 mt-1">dreams recorded</p>
                </div>
                <div className="text-4xl">📚</div>
              </div>
            </div>

            {/* Total Likes */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Likes</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{profile.totalLikes}</p>
                  <p className="text-xs text-gray-500 mt-1">hearts earned</p>
                </div>
                <div className="text-4xl">❤️</div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Account Status</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {profile.isVerified ? "Verified" : "Active"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {profile.isVerified ? "verified user" : "account active"}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>
          </motion.div>

          {/* Account Settings Info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md p-6 border border-blue-200"
          >
            <h3 className="text-lg font-bold text-blue-900 mb-4">ℹ️ Account Information</h3>
            <ul className="space-y-3 text-blue-800 text-sm">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>All your dreams are securely stored and synchronized across your devices</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Your profile data is only accessible when you're authenticated</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>You can update your profile information at any time from this page</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Logging out will clear your session while keeping all your data safe</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
