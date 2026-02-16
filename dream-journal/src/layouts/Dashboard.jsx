import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Chatbot from '../components/dreams/ChatBot';
import { useDreams } from '../components/dreams/DreamContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { dreams } = useDreams();

  // Calculate stats
  const stats = {
    totalDreams: dreams.length,
    totalLikes: dreams.reduce((sum, d) => sum + (d.likes || 0), 0),
    recentDream: dreams[0]?.title || "Start journaling!",
    moodCounts: {}
  };

  dreams.forEach(dream => {
    stats.moodCounts[dream.mood] = (stats.moodCounts[dream.mood] || 0) + 1;
  });

  const mostCommonMood = Object.entries(stats.moodCounts).sort((a, b) => b[1] - a[1])[0];
  const dominantMood = mostCommonMood ? mostCommonMood[0] : "N/A";

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    scared: "😱",
    peaceful: "😴",
    confused: "😕",
    curious: "🤔"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const linkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8 pt-24">
      
      {/* Centered content container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col min-h-[calc(100vh-200px)]">
        
        {/* Aesthetic Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
            ✨ DreamWeave Dashboard
          </h1>
          <p className="text-lg text-gray-700 mt-3 max-w-xl mx-auto">
            Explore your dreams, track patterns, and gain insights at a glance
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-5 rounded-full shadow-md"></div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Summary Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {/* Total Dreams */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Dreams</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalDreams}</p>
                  <p className="text-xs text-gray-500 mt-2">Recorded so far</p>
                </div>
                <div className="text-4xl">📚</div>
              </div>
            </motion.div>

            {/* Total Likes */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-md border border-red-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Likes</p>
                  <p className="text-4xl font-bold text-red-600 mt-2">{stats.totalLikes}</p>
                  <p className="text-xs text-gray-500 mt-2">Hearts collected</p>
                </div>
                <div className="text-4xl">❤️</div>
              </div>
            </motion.div>

            {/* Dominant Mood */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-md border border-yellow-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Dominant Mood</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {dominantMood === "N/A" ? "N/A" : dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Most common feeling</p>
                </div>
                <div className="text-4xl">{dominantMood === "N/A" ? "❓" : moodEmojis[dominantMood]}</div>
              </div>
            </motion.div>

            {/* Streak */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Journaling Streak</p>
                  <p className="text-4xl font-bold text-indigo-600 mt-2">{Math.max(0, Math.ceil(stats.totalDreams / 3))}</p>
                  <p className="text-xs text-gray-500 mt-2">Days active</p>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/add-dreams" className="block h-full">
                <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="text-6xl">📝</div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">Add Dreams</h2>
                    <p className="text-purple-100">Create new dreams and add them to your collection.</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/dream-list" className="block h-full">
                <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="text-6xl">📋</div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">Dream List</h2>
                    <p className="text-indigo-100">View all your added dreams.</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/dream-analytics" className="block h-full">
                <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="text-6xl">📊</div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">Dream Analytics</h2>
                    <p className="text-blue-100">Analyze patterns in your dreams.</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/ai-agent" className="block h-full">
                <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="text-6xl">🤖</div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">AI Agent</h2>
                    <p className="text-pink-100">Get insights and recommendations from an AI.</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/profile" className="block h-full">
                <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all h-full cursor-pointer">
                  <div className="text-6xl">👤</div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">Profile</h2>
                    <p className="text-orange-100">Manage your account settings.</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Info Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          >
            <motion.section variants={itemVariants} className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md border border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">🌟 Dream Tip</h3>
              <p className="text-yellow-800 leading-relaxed text-sm">
                Write your dreams down immediately after waking up to retain the most detail. Keep a journal by your bedside!
              </p>
            </motion.section>

            <motion.section variants={itemVariants} className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-md border border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">📊 Quick Stats</h3>
              <ul className="text-indigo-800 space-y-2 leading-relaxed text-sm">
                <li>✓ Total Dreams: <strong>{stats.totalDreams}</strong></li>
                <li>✓ Total Likes: <strong>{stats.totalLikes}</strong></li>
                <li>✓ Most Common Mood: <strong>{dominantMood === "N/A" ? "N/A" : dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1)}</strong></li>
              </ul>
            </motion.section>

            <motion.section variants={itemVariants} className="p-6 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl shadow-md border border-rose-200">
              <h3 className="text-xl font-bold text-rose-900 mb-3">🌌 Quote of the Day</h3>
              <blockquote className="text-rose-800 italic leading-relaxed text-sm">
                "Dreams are illustrations... from the book your soul is writing about you." – Marsha Norman
              </blockquote>
            </motion.section>
          </motion.div>

          {/* Call to Action */}
          {stats.totalDreams === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center p-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl border-2 border-dashed border-purple-300"
            >
              <p className="text-lg font-semibold text-purple-900 mb-4">
                Ready to start journaling your dreams?
              </p>
              <Link
                to="/add-dreams"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Add Your First Dream
              </Link>
            </motion.div>
          )}
        </main>
      </div>

      {/* FOOTER full width */}
      <footer className="w-full border-t border-gray-300 pt-6 mt-auto">
        <Footer />
      </footer>

      <Chatbot />

    </div>
  );
};

export default Dashboard;
