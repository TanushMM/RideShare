import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: 'Search Ride',
      icon: LocalTaxiIcon,
      path: '/search-ride',
      style: { backgroundColor: '#405D72', color: 'white', borderColor: '#405D72'}, // Grey background for Join Ride
    },
    {
      id: 2,
      name: 'Post Ride',
      icon: LocalTaxiIcon,
      path: '/postride',
      style: { backgroundColor: 'white', color: '#021526', borderColor: '#021526' }, // White background for Post Ride
    },
  ];

  // Function to check JWT presence
  const isLoggedIn = () => {
    return !!sessionStorage.getItem('jwt'); // Check if JWT exists
  };

  return (
    <Box
      sx={{
        backgroundColor: '#021526',
        color: 'white',
        p: 2,
        boxShadow: 3,
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 50,
        fontFamily: 'New Amsterdam, sans-serif',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/rideshare_icon.png"
            alt="Rideshare Icon"
            style={{ width: 48, height: 48, marginRight: 8 }}
          />
          <Typography
            variant="h4"
            sx={{ color: '#e0e0e0', fontWeight: 'bold', mr: 4, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'New Amsterdam', letterSpacing: 4}}
            component={Link}
            to='/'
          >
            RIDESHARE
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1 }}>
          {headerMenu.map((item) => (
            <Button
              key={item.id}
              component={Link}
              to={item.path}
              startIcon={<item.icon sx={{ color: item.id === 1 ? 'white' : '#021526' }} />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid',
                borderColor: item.style.borderColor,
                backgroundColor: item.style.backgroundColor,
                color: item.style.color,
                '&:hover': {
                  backgroundColor: item.id === 1 ? '#1e3a52' : '#f0f0f0',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'New Amsterdam', fontSize: '20px', letterSpacing: 1.3 }}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 2}}>
          <IconButton component={Link} to="/profile" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
            <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Profile</Typography>
          </IconButton>
          <IconButton href="#" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
            <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Settings</Typography>
          </IconButton>
          {isLoggedIn() ? (
            <IconButton component={Link} to="/logout" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
              <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Logout</Typography>
            </IconButton>
          ) : (
            <IconButton component={Link} to="/login" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
              <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Login</Typography>
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
