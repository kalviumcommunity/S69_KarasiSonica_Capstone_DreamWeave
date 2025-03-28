const DreamList = ({ dreams, searchTerm, selectedMood, isLiked, toggleLike }) => {
    const filteredDreams = dreams.filter((dream) => {
      const matchesSearch =
        dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesMood = !selectedMood || dream.mood === selectedMood;
      return matchesSearch && matchesMood;
    });
  
    return (
      <div className="mt-4">
        {filteredDreams.map((dream) => (
          <div key={dream.id} className="border p-4 my-2 rounded-lg bg-white">
            <h3 className="text-lg font-bold">{dream.title}</h3>
            <p>{dream.description}</p>
            <p className="text-sm"><strong>Mood:</strong> {dream.mood}</p>
            <p className="text-sm"><strong>Tags:</strong> {dream.tags.join(", ")}</p>
            <button 
              onClick={() => toggleLike(dream.id)} 
              className="mt-2"
            >
              {isLiked[dream.id] ? "❤️" : "🤍"} {dream.likes}
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default DreamList;