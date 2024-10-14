import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();
  const deleteSearch = async () => {
    const token = sessionStorage.getItem('jwt');
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const searchResponse = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/search-ride/delete`, {}, config);
        const postResponse = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/post-ride/delete`, {}, config);

        if (searchResponse.status === 200 && postResponse.status === 200) {
            navigate('/ride-results');
        }
    } catch (error) {
        console.log("Error:", error);
    }
  }

  deleteSearch();

  // Clear session storage
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('privilage');
  sessionStorage.removeItem('email');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
        color: '#333',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ 
          mb: 3, 
          fontFamily: 'New Amsterdam, sans-serif',
          color: '#2c3e50',  
          fontWeight: 'bold',
        }}
      >
        You have successfully logged out
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/login"
        sx={{
          mt:2,
          alignSelf: 'center',
          padding: '12px 24px',
          borderRadius: '8px',
          width: '200px',
          backgroundColor: '#DDDDDD',
          color: '#1E201E',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s, transform 0.2s',
          '&:hover': {
              backgroundColor: '#1E201E',
              transform: 'scale(1.05)',
              color: '#fff'
          },
          '&:active': {
              backgroundColor: '#0d47a1',
              transform: 'scale(1.02)',
          }
      }}
      >
        Go to Login
      </Button>
    </Box>
  );
}

export default Logout;