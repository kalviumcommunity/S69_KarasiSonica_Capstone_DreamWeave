import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDreams } from "./DreamContext";
import { ArrowLeft, Save } from "lucide-react";
import { motion } from "framer-motion";

const DreamForm = () => {
  const { addDream } = useDreams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mood: "",
    tags: "",
    date: new Date().toISOString().split('T')[0]
  });

  const moodOptions = [
    { value: "happy", label: "😊 Happy", color: "from-yellow-400 to-yellow-600" },
    { value: "sad", label: "😢 Sad", color: "from-blue-400 to-blue-600" },
    { value: "excited", label: "🤩 Excited", color: "from-pink-400 to-pink-600" },
    { value: "scared", label: "😱 Scared", color: "from-red-400 to-red-600" },
    { value: "peaceful", label: "😴 Peaceful", color: "from-green-400 to-green-600" },
    { value: "confused", label: "😕 Confused", color: "from-purple-400 to-purple-600" },
    { value: "curious", label: "🤔 Curious", color: "from-indigo-400 to-indigo-600" }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Dream title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.mood) newErrors.mood = "Please select a mood";
    if (!formData.tags.trim()) newErrors.tags = "Add at least one tag";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const newDream = {
        id: Date.now(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        mood: formData.mood,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(t => t),
        date: formData.date,
        createdAt: new Date().toISOString(),
        likes: 0
      };
      
      addDream(newDream);
      
      // Show success feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate("/dream-list");
    } catch (error) {
      console.error("Error adding dream:", error);
      setErrors({ submit: "Failed to add dream. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-24">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-8 py-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-white">✨ Add Your Dream</h2>
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
                title="Back to Dashboard"
              >
                <ArrowLeft size={24} className="text-white" />
              </button>
            </div>
            <p className="text-purple-100">Capture your dreams and explore patterns</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dream Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Flying through clouds, Lost in a forest..."
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  errors.title
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-purple-200 focus:border-purple-500 bg-purple-50"
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dream Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write what happened in your dream... include details, colors, people, feelings..."
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-purple-200 focus:border-purple-500 bg-purple-50"
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:border-purple-500 bg-purple-50 transition-all"
              />
            </div>

            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How did the dream make you feel? *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {moodOptions.map(mood => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, mood: mood.value }));
                      if (errors.mood) setErrors(prev => ({ ...prev, mood: "" }));
                    }}
                    className={`p-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                      formData.mood === mood.value
                        ? `bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
              {errors.mood && <p className="mt-2 text-sm text-red-600">{errors.mood}</p>}
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags (comma separated) *
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., adventure, scary, family, recurring..."
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all ${
                  errors.tags
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-purple-200 focus:border-purple-500 bg-purple-50"
                }`}
              />
              {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
              {formData.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.split(",").map((tag, idx) => (
                    tag.trim() && (
                      <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                        #{tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {isSubmitting ? "Saving..." : "Save Dream"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DreamForm;
