import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext();

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

export const useMap = () => {
  return useContext(MapContext);
};
