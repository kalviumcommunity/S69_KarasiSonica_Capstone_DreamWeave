import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar, Smile, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useDreams } from "./DreamContext";

const DreamAnalytics = () => {
  const navigate = useNavigate();
  const { dreams } = useDreams();

  // Mock data for visualization
  const mockData = useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    const moodCounts = {
      happy: Math.max(0, 8 + Math.floor(Math.random() * 5) - 2),
      sad: Math.max(0, 3 + Math.floor(Math.random() * 3) - 1),
      excited: Math.max(0, 5 + Math.floor(Math.random() * 4) - 2),
      scared: Math.max(0, 2 + Math.floor(Math.random() * 3) - 1),
      peaceful: Math.max(0, 7 + Math.floor(Math.random() * 4) - 2),
      confused: Math.max(0, 2 + Math.floor(Math.random() * 2)),
      curious: Math.max(0, 4 + Math.floor(Math.random() * 3) - 1)
    };

    const dailyCount = last7Days.map(date => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: Math.max(0, 2 + Math.floor(Math.random() * 4) - 1)
    }));

    return { moodCounts, dailyCount };
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalDreams = dreams.length;
    const totalLikes = dreams.reduce((sum, d) => sum + (d.likes || 0), 0);
    
    const moodCounts = {};
    dreams.forEach(dream => {
      moodCounts[dream.mood] = (moodCounts[dream.mood] || 0) + 1;
    });
    
    const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalDreams,
      totalLikes,
      dominantMood: dominantMood ? dominantMood[0] : "N/A",
      moodCounts
    };
  }, [dreams]);

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    scared: "😱",
    peaceful: "😴",
    confused: "😕",
    curious: "🤔"
  };

  const moodColors = {
    happy: { bg: "bg-yellow-100", text: "text-yellow-700", bar: "bg-yellow-400" },
    sad: { bg: "bg-blue-100", text: "text-blue-700", bar: "bg-blue-400" },
    excited: { bg: "bg-pink-100", text: "text-pink-700", bar: "bg-pink-400" },
    scared: { bg: "bg-red-100", text: "text-red-700", bar: "bg-red-400" },
    peaceful: { bg: "bg-green-100", text: "text-green-700", bar: "bg-green-400" },
    confused: { bg: "bg-purple-100", text: "text-purple-700", bar: "bg-purple-400" },
    curious: { bg: "bg-indigo-100", text: "text-indigo-700", bar: "bg-indigo-400" }
  };

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              📊 Dream Analytics
            </h1>
            <p className="text-gray-600 mt-2">Insights into your dream patterns</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Dreams */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Dreams</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalDreams}</p>
                <p className="text-xs text-gray-500 mt-2">All-time record</p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </motion.div>

          {/* Total Likes */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Likes</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalLikes}</p>
                <p className="text-xs text-gray-500 mt-2">Hearts collected</p>
              </div>
              <div className="text-4xl">❤️</div>
            </div>
          </motion.div>

          {/* Dominant Mood */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Dominant Mood</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.dominantMood.charAt(0).toUpperCase() + stats.dominantMood.slice(1)}
                </p>
                <p className="text-xs text-gray-500 mt-2">Most common feeling</p>
              </div>
              <div className="text-4xl">{moodEmojis[stats.dominantMood]}</div>
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{Math.max(0, Math.ceil(stats.totalDreams / 3))}</p>
                <p className="text-xs text-gray-500 mt-2">Days journaling</p>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        >
          {/* Mood Distribution */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Smile size={20} className="text-purple-600" />
              Mood Distribution
            </h2>
            <div className="space-y-4">
              {Object.entries(mockData.moodCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([mood, count]) => {
                  const maxCount = Math.max(...Object.values(mockData.moodCounts));
                  const percentage = (count / maxCount) * 100;
                  const colors = moodColors[mood];
                  
                  return (
                    <div key={mood}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{moodEmojis[mood]}</span>
                          <span className="font-medium text-gray-700">
                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-2 rounded-full ${colors.bar}`}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>

          {/* Weekly Trend */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              Weekly Dream Frequency
            </h2>
            <div className="space-y-4">
              {mockData.dailyCount.map((day, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{day.date}</span>
                    <span className="text-sm font-semibold text-gray-600">{day.count} dreams</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.count / 5) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md p-8 border border-green-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap size={20} className="text-green-600" />
            Key Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Most Active Day</p>
              <p className="text-lg font-bold text-green-600">
                {mockData.dailyCount.reduce((max, day) => day.count > max.count ? day : max).date}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {mockData.dailyCount.reduce((max, day) => day.count > max.count ? day : max).count} dreams recorded
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Dream Recall Rate</p>
              <p className="text-lg font-bold text-yellow-600">
                {stats.totalDreams > 0 ? Math.round((stats.totalDreams / 30) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Average dreams per month
              </p>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Engagement Level</p>
              <p className="text-lg font-bold text-purple-600">
                {stats.totalLikes > 0 ? "Active" : "Starting"}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {stats.totalLikes > 0 ? `${stats.totalLikes} hearts earned` : "Keep journaling to track!"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 p-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border border-purple-200"
        >
          <h3 className="text-lg font-bold text-purple-900 mb-4">💡 Tips for Better Dream Journaling</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-800">
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Write your dreams immediately after waking up to retain the most detail</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Include emotions and sensations, not just events</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Use tags to identify recurring themes and symbols</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">✓</span>
              <span>Consistency helps improve dream recall over time</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default DreamAnalytics;