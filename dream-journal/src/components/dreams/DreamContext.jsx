import React, { createContext, useState, useContext, useEffect } from 'react';

const DreamContext = createContext();

export const useDreams = () => {
  return useContext(DreamContext);
};

export const DreamProvider = ({ children }) => {
  const [dreams, setDreams] = useState(() => {
    const savedDreams = localStorage.getItem('dreams');
    return savedDreams ? JSON.parse(savedDreams) : [];
  });

  // Persist dreams to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dreams', JSON.stringify(dreams));
  }, [dreams]);

  const addDream = (dream) => {
    const dreamWithDate = {
      ...dream,
      id: dream.id || Date.now(),
      date: dream.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      likes: dream.likes || 0
    };
    setDreams((prevDreams) => [dreamWithDate, ...prevDreams]);
  };

  const updateDream = (id, updatedDream) => {
    setDreams((prevDreams) =>
      prevDreams.map(dream => dream.id === id ? { ...dream, ...updatedDream } : dream)
    );
  };

  const deleteDream = (id) => {
    setDreams((prevDreams) => prevDreams.filter(dream => dream.id !== id));
  };

  const toggleLike = (id) => {
    setDreams((prevDreams) =>
      prevDreams.map(dream =>
        dream.id === id ? { ...dream, likes: (dream.likes || 0) + 1 } : dream
      )
    );
  };

  return (
    <DreamContext.Provider value={{ dreams, addDream, updateDream, deleteDream, toggleLike }}>
      {children}
    </DreamContext.Provider>
  );
};
