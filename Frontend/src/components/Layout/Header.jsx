import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Drawer } from '@mui/material';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Header() {
  const [open, setOpen] = useState(false); 

  const headerMenu = [
    {
      id: 1,
      name: 'Search Ride',
      icon: LocalTaxiIcon,
      path: '/search-ride',
      style: { backgroundColor: '#405D72', color: 'white', borderColor: '#405D72' },
    },
    {
      id: 2,
      name: 'Post Ride',
      icon: LocalTaxiIcon,
      path: '/post-ride',
      style: { backgroundColor: 'white', color: '#021526', borderColor: '#021526' },
    },
  ];

  const isLoggedIn = () => {
    return !!sessionStorage.getItem('jwt');
  };

  const toggleDrawer = () => {
    setOpen(!open); 
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
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/Logo_2.png"
            alt="Rideshare Icon"
            style={{ width: 48, height: 48, marginRight: 8 }}
          />
          <Typography
            variant="h4"
            sx={{ color: '#e0e0e0', fontWeight: 'bold', mr: 4, textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'New Amsterdam', letterSpacing: 4 }}
            component={Link}
            to='/'
          >
            RIDESHARE
          </Typography>
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', flexGrow: 1 }}>
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
                  backgroundColor: item.id === 1 ? '#5B99C2' : '#f0f0f0',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'New Amsterdam', fontSize: '20px', letterSpacing: 1.3 }}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* Desktop Profile, Settings, Login/Logout Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                {isLoggedIn() && (
                    <>
                      <IconButton component={Link} to="/profile" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
                        <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Profile</Typography>
                      </IconButton>

                      <IconButton component={Link} to="/user-dashboard" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
                        <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Dashboard</Typography>
                      </IconButton>
                    </>
                  )}
          {isLoggedIn() ? (
            <IconButton component={Link} to="/logout" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
              <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Logout</Typography>
            </IconButton>
          ) : (
                <>
                <IconButton component={Link} to="/login/register" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
              <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Register</Typography>
            </IconButton>
                <IconButton component={Link} to="/login" sx={{ color: 'white', '&:hover': { color: '#90caf9' } }}>
              <Typography variant="body1" sx={{ fontFamily: 'New Amsterdam', fontSize: '23px' }}>Login</Typography>
            </IconButton>
                </>
          )}
        </Box>

        {/* Mobile Toggle Button */}
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Sidebar */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
          <Box
            sx={{ width: 250, backgroundColor: '#021526', color: 'white', height: '100%', p: 2 }}
            role="presentation"
            onClick={toggleDrawer}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: 'white', float: 'right' }}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ mt: 4 }}>
              {headerMenu.map((item) => (
                <Button
                  key={item.id}
                  component={Link}
                  to={item.path}
                  startIcon={<item.icon sx={{ color: item.id === 1 ? 'white' : '#021526' }} />}
                  sx={{
                    width: '100%',
                    mb: 2,
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
              <IconButton component={Link} to="/profile" sx={{ color: 'white', mt: 2, '&:hover': { color: '#90caf9' } }}>
                Profile
              </IconButton>

              {isLoggedIn() ? (
                <IconButton component={Link} to="/logout" sx={{ color: 'white', mt: 2, '&:hover': { color: '#90caf9' } }}>
                  Logout
                </IconButton>
              ) : (
                <IconButton component={Link} to="/login" sx={{ color: 'white', mt: 2, '&:hover': { color: '#90caf9' } }}>
                  Login
                </IconButton>
              )}
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;