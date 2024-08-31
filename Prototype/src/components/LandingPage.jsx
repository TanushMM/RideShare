import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const headingAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { duration: 1000 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 500,
    config: { tension: 280, friction: 60 },
  });

  return (
    <Box >
      <animated.div style={{ ...styles.heading, ...headingAnimation }}>
        <Typography variant="h1" sx={styles.heading}>
          Welcome to Hexaware's Rideshare
        </Typography>
      </animated.div>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <animated.div style={buttonAnimation}>
          <Button variant="contained" sx={styles.button}>
            Get Started
          </Button>
        </animated.div>
      </Link>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#052f54',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  heading: {
    fontSize: '3rem',
    fontFamily: 'New Amsterdam, sans-serif',
    textAlign: 'center',
  },
  button: {
    mt: 4,
    px: 4,
    py: 2,
    fontSize: '1.25rem',
    color: '#fff',
    backgroundColor: '#405D72',
    '&:hover': {
      backgroundColor: '#021526',
    },
    fontFamily: 'Poppins, sans-serif',
  },
};

export default LandingPage;
