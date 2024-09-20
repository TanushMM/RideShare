import React from 'react';
import MainDashboard from './MainDashboard';
import Search from './Search';
import { MapProvider } from './MapContext';

const Map = () => {
  return (
    <MapProvider>
      <div className='relative'>
      <div className='relative'>
        <MainDashboard />
        <Search />
      </div>
    </div>
    </MapProvider>
    
  );
};

export default Map;