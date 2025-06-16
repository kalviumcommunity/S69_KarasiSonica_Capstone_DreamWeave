import React from "react";

const DreamList = ({ dreams, searchTerm, selectedMood, isLiked, toggleLike, deleteDream }) => {
  // Filter the dreams based on search term and selected mood
  const filteredDreams = dreams.filter((dream) => {
    const matchesSearch =
      dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = !selectedMood || dream.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="mt-4 space-y-4">
      {filteredDreams.length === 0 ? (
        <p className="text-center text-gray-500">No dreams found based on your criteria.</p>
      ) : (
        filteredDreams.map((dream) => (
          <div key={dream.id} className="border p-4 my-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-purple-600">{dream.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{dream.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <strong>Mood:</strong> {dream.mood}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              <strong>Tags:</strong> {dream.tags.join(", ")}
            </div>

            {/* Like and Delete Buttons */}
            <div className="flex items-center mt-3 justify-between">
              {/* Like Button */}
              <button
                onClick={() => toggleLike(dream.id)}
                className="flex items-center space-x-2 p-2 border rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                <span>{isLiked[dream.id] ? "❤️" : "🤍"}</span>
                <span>{dream.likes || 0}</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => deleteDream(dream.id)}
                className="flex items-center space-x-2 p-2 border rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default DreamList;
