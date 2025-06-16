import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDreams } from "./DreamContext";
import { MoonIcon, HomeIcon, UserIcon, SunIcon } from "lucide-react";

const DreamForm = () => {
  const { addDream } = useDreams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mood: "",
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDream = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      mood: formData.mood,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      likes: 0
    };
    addDream(newDream);
    setFormData({
      title: "",
      description: "",
      mood: "",
      tags: ""
    });
    navigate("/dream-list");
  };

  // Theme-based colors
  const backgroundColor = "#F8F8FF"; // GhostWhite
  const cardBackgroundColor = "#FFFFFF"; // White
  const inputBorderColor = "#D8BFD8"; // Thistle
  const inputFocusRingColor = "#A5C8E4"; // PaleCerulean
  const buttonGradient = "linear-gradient(to right, #4B0082, #8B008B)"; // Indigo to DarkMagenta
  const buttonTextColor = "#FFFFFF"; // White
  const shadowColor = "rgba(0, 0, 0, 0.1)"; // Soft Shadow
  const headingTextColor = "#4B0082"; // Indigo
  const subheadingTextColor = "#778899"; // LightSlateGray

  return (
    <div
      className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(to bottom, #E7C8E7, ${backgroundColor})`
      }}
    >
      <div
        className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
        style={{
          backgroundColor: cardBackgroundColor,
          boxShadow: `0 15px 30px ${shadowColor}`,
          border: `1px solid ${inputBorderColor}`,
          maxHeight: '90vh' // Increased height
        }}
      >
        {/* Header Section */}
        <div className="bg-indigo-100 px-6 py-4">
          <h2 className="text-3xl font-extrabold text-center" style={{ color: headingTextColor }}>
            <MoonIcon color={headingTextColor} className="inline-block mr-2 mb-1" size={32} />
            DreamWeave
          </h2>
          <p className="mt-2 text-md text-center" style={{ color: subheadingTextColor }}>
            Record and cherish your dreams
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: headingTextColor }}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter your dream title..."
                className="w-full p-4 rounded-xl focus:outline-none"
                style={{
                  borderColor: inputBorderColor,
                  boxShadow: `0 0 0 2px ${inputFocusRingColor}`,
                  fontSize: "1rem"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: headingTextColor }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe your dream in detail..."
                className="w-full p-4 rounded-xl focus:outline-none"
                style={{
                  borderColor: inputBorderColor,
                  boxShadow: `0 0 0 2px ${inputFocusRingColor}`,
                  fontSize: "1rem"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: headingTextColor }}>
                Mood
              </label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl focus:outline-none"
                style={{
                  borderColor: inputBorderColor,
                  boxShadow: `0 0 0 2px ${inputFocusRingColor}`,
                  fontSize: "1rem"
                }}
              >
                <option value="">Select your mood</option>
                <option value="Happy">Happy <SunIcon color="#FFD700" className="inline-block ml-1" size={16} /></option>
                <option value="Sad">Sad</option>
                <option value="Excited">Excited</option>
                <option value="Scared">Scared</option>
                <option value="Peaceful">Peaceful</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: headingTextColor }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                required
                placeholder="e.g., adventure, fantasy, relaxation"
                className="w-full p-4 rounded-xl focus:outline-none"
                style={{
                  borderColor: inputBorderColor,
                  boxShadow: `0 0 0 2px ${inputFocusRingColor}`,
                  fontSize: "1rem"
                }}
              />
            </div>

            <button
              type="submit"
              className="text-white font-semibold py-4 rounded-xl transition duration-300 focus:outline-none focus:ring-4 w-full"
              style={{
                background: buttonGradient,
                color: buttonTextColor,
                fontSize: "1.1rem",
                boxShadow: `0 4px 6px ${shadowColor}`
              }}
            >
              Add to Dream Journal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DreamForm;