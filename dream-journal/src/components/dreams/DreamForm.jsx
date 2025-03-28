const DreamForm = ({ onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="mb-4">
        <input 
          type="text" 
          name="title" 
          placeholder="Dream Title" 
          required 
          className="border p-2 mr-2" 
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Dream Description" 
          required 
          className="border p-2 mr-2" 
        />
        <input 
          type="text" 
          name="tags" 
          placeholder="Tags (comma-separated)" 
          className="border p-2 mr-2" 
        />
        <select name="mood" className="border p-2">
          <option value="">Select Mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="anxious">Anxious</option>
        </select>
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Add Dream
        </button>
      </form>
    );
  };
  
  export default DreamForm;