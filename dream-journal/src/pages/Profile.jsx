import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, LogOut, Mail, User, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useDreams } from "../components/dreams/DreamContext";

const Profile = () => {
  const navigate = useNavigate();
  const { dreams } = useDreams();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Try to fetch from backend first, fallback to localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const userData = JSON.parse(storedProfile);
      setProfile({
        ...userData,
        totalDreams: dreams.length,
        totalLikes: dreams.reduce((sum, d) => sum + (d.likes || 0), 0)
      });
      setEditData(userData);
    } else {
      // If no stored profile, show a default message
      setProfile(null);
    }
  }, [dreams]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('dreams');
      navigate("/dreams");
      window.location.reload();
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...profile,
      ...editData
    };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
    alert("Profile updated successfully!");
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
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">@{profile.username}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false);
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 size={18} />
                    {isEditing ? "Cancel" : "Edit"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </div>
              </div>

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
                    <p className="text-gray-900 font-semibold ml-6">{profile.bio}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  {/* Editable Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Editable Username */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Editable Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Editable Bio */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <input
                      type="text"
                      name="bio"
                      value={editData.bio}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveProfile}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Save Changes
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
            <div className="bg-white rounded-2xl shadow-md p-6 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Dreams</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{profile.totalDreams}</p>
                </div>
                <div className="text-4xl">📚</div>
              </div>
            </div>

            {/* Total Likes */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Likes</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{profile.totalLikes}</p>
                </div>
                <div className="text-4xl">❤️</div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Account Status</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">Active</p>
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
                <span className="text-lg">✓</span>
                <span>Your dreams are securely stored on your device using local storage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>All data is private and only accessible when you're logged in</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>You can edit your profile information at any time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✓</span>
                <span>Logging out will clear your session but keep your dreams saved</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
