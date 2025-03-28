import DreamForm from "../components/dreams/DreamForm";
import DreamList from "../components/dreams/DreamList";

const DreamsPage = ({ 
  dreams, 
  searchTerm, 
  selectedMood, 
  isLiked, 
  toggleLike, 
  handleSubmit,
  setSearchTerm,
  setSelectedMood 
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Log Your Dream</h2>
      <DreamForm onSubmit={handleSubmit} />
      
      <h2 className="text-xl font-semibold mt-6">Your Dreams</h2>
      <input
        type="text"
        placeholder="Search Dreams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <select 
        onChange={(e) => setSelectedMood(e.target.value)} 
        className="border p-2 mt-2"
        value={selectedMood}
      >
        <option value="">All Moods</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="anxious">Anxious</option>
      </select>

      <DreamList 
        dreams={dreams}
        searchTerm={searchTerm}
        selectedMood={selectedMood}
        isLiked={isLiked}
        toggleLike={toggleLike}
      />
    </div>
  );
};

export default DreamsPage;