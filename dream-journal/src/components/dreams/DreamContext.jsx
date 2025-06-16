import React, { createContext, useState, useContext } from 'react';

const DreamContext = createContext();

export const useDreams = () => {
  return useContext(DreamContext);
};

export const DreamProvider = ({ children }) => {
  const [dreams, setDreams] = useState([]);

  const addDream = (dream) => {
    setDreams((prevDreams) => [...prevDreams, dream]);
  };

  const deleteDream = (id) => {
    setDreams((prevDreams) => prevDreams.filter(dream => dream.id !== id));
  };

  return (
    <DreamContext.Provider value={{ dreams, addDream, deleteDream }}>
      {children}
    </DreamContext.Provider>
  );
};
