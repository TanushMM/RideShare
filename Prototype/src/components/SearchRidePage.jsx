import React, { useEffect, useRef, useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Layout/Header';


const SearchRidePage = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/ride-results');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    position: 'relative',
  };

  const headerFooterStyle = {
    background: '#3f51b5',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  };

  const mapStyle = {
    flex: 1,
    width: '100%',
  };

  const formBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  };

  return (
    <div style={containerStyle}>
      <Header />

      <div ref={mapRef} style={mapStyle} />
      <Box component="form" onSubmit={handleSearch} sx={formBoxStyle}>
        <Typography variant="h6" gutterBottom>
          Search for Rides
        </Typography>
        <TextField label="From" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <TextField label="To" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <TextField
          label="Date and Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </Box>
    </div>
  );
};

export default SearchRidePage;
