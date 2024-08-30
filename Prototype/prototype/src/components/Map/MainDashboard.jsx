import React, { useEffect, useRef } from 'react';
import { useMap } from './MapContext';
import { Box } from '@mui/material';

const MainDashboard = () => {
  const mapRef = useRef(null);
  const { markerPosition } = useMap();
  const [map, setMap] = React.useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize the map
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 12.979154, lng: 80.199172 },
        zoom: 12,
      });
      setMap(mapInstance);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && markerPosition) {
      // Create a marker
      new window.google.maps.Marker({
        position: markerPosition,
        map: map,
      });

      // Optionally center the map on the marker
      map.setCenter(markerPosition);
    }
  }, [map, markerPosition]);

  return <Box id="map" sx={{ height: '100vh', width: '100%' }} ref={mapRef}></Box>;
};

export default MainDashboard;

