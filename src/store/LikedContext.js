import React, { createContext, useState } from 'react';

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [reload, setReload] = useState(false);

  return (
    <LikedContext.Provider value={{ reload, setReload }}>
      {children}
    </LikedContext.Provider>
  );
};