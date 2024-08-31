import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Logout = () => {
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('privilage');

  return (
    <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100vh',
    //     backgroundColor: '#f5f5f5',
    //     color: '#333',
    //     textAlign: 'center',
    //     p: 3,
    //   }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontFamily: 'New Amsterdam, sans-serif'}}>
        You have successfully logged out
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
        sx={{ mt: 2 }}
      >
        Go to Login
      </Button>
    </Box>
  );
}

export default Logout;
