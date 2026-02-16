import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDreams } from "./DreamContext";
import { ArrowLeft, Trash2, Heart, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const Dreams = () => {
  const { dreams, deleteDream, toggleLike } = useDreams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [likedDreams, setLikedDreams] = useState(new Set());

  const moodColors = {
    happy: "from-yellow-400 to-yellow-600",
    sad: "from-blue-400 to-blue-600",
    excited: "from-pink-400 to-pink-600",
    scared: "from-red-400 to-red-600",
    peaceful: "from-green-400 to-green-600",
    confused: "from-purple-400 to-purple-600",
    curious: "from-indigo-400 to-indigo-600"
  };

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    scared: "😱",
    peaceful: "😴",
    confused: "😕",
    curious: "🤔"
  };

  const filteredDreams = dreams.filter(dream => {
    const matchesSearch = 
      dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dream.tags && dream.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesMood = !selectedMood || dream.mood === selectedMood;
    
    return matchesSearch && matchesMood;
  });

  const handleLike = (id) => {
    setLikedDreams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    toggleLike(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this dream?")) {
      deleteDream(id);
    }
  };

  const uniqueMoods = [...new Set(dreams.map(d => d.mood).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                📚 My Dreams
              </h1>
              <p className="text-gray-600 mt-2">
                {dreams.length} {dreams.length === 1 ? "dream" : "dreams"} recorded
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search dreams by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-500 bg-white transition-all"
              />
            </div>

            {/* Mood Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-500 bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="">All Moods</option>
                {uniqueMoods.map(mood => (
                  <option key={mood} value={mood}>
                    {moodEmojis[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Dreams Grid */}
        {filteredDreams.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">😴</div>
            <p className="text-gray-600 text-lg font-medium">
              {dreams.length === 0 ? "No dreams yet. Start journaling!" : "No dreams match your filters."}
            </p>
            {dreams.length === 0 && (
              <button
                onClick={() => navigate("/add-dreams")}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Add Your First Dream
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreams.map((dream, idx) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-purple-100 h-full flex flex-col">
                  {/* Mood Header */}
                  <div className={`bg-gradient-to-r ${moodColors[dream.mood] || 'from-gray-400 to-gray-600'} p-4 text-white`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold opacity-90">
                          {moodEmojis[dream.mood]} {dream.mood.charAt(0).toUpperCase() + dream.mood.slice(1)}
                        </p>
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(dream.date).toLocaleDateString("en-US", { 
                            month: "short", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {dream.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {dream.description}
                    </p>

                    {/* Tags */}
                    {dream.tags && dream.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dream.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {dream.tags.length > 3 && (
                          <span className="text-xs text-gray-500 self-center">
                            +{dream.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="border-t border-purple-100 p-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLike(dream.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-all ${
                        likedDreams.has(dream.id)
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Heart size={18} fill={likedDreams.has(dream.id) ? "currentColor" : "none"} />
                      {dream.likes || 0}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(dream.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={18} />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Dream Button (floating) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/add-dreams")}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl z-50"
        >
          ✨
        </motion.button>
      </div>
    </div>
  );
};

export default Dreams;
