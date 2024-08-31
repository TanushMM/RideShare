// src/contexts/MapContext.js

import React, { createContext, useState, useContext } from 'react';

// Create the context
const MapContext = createContext();

// Create a provider component
export const MapProvider = ({ children }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const updateMarkerPosition = (position) => {
    setMarkerPosition(position);
  };

  return (
    <MapContext.Provider value={{ markerPosition, updateMarkerPosition }}>
      {children}
    </MapContext.Provider>
  );
};

// Custom hook for using the context
export const useMap = () => {
  return useContext(MapContext);
};
