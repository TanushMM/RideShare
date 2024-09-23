import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const headingAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 1200 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 600,
    config: { tension: 280, friction: 60 },
  });

  const textAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 300,
    config: { tension: 250, friction: 40 },
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.backgroundContainer} />

      <animated.div style={{ ...styles.heading, ...headingAnimation }}>
        <Typography variant="h1" sx={styles.heading}>
          Welcome to Hexaware's Rideshare
        </Typography>
      </animated.div>

      <animated.div style={textAnimation}>
        <Typography variant="h5" sx={styles.description}>
          Revolutionize your travel experience with our cutting-edge RideShare application. 
          Connect with drivers and passengers effortlessly, enjoy smooth ride bookings, 
          and explore new destinations with ease. Join us in redefining convenience and 
          comfort on the road.
        </Typography>
      </animated.div>

      <animated.div style={buttonAnimation}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={styles.button}>
            Get Started
          </Button>
        </Link>
      </animated.div>

      <animated.div style={buttonAnimation}>
        <Link to="/developer" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={styles.devButton}>
            Meet the Developers
          </Button>
        </Link>
      </animated.div>

      <animated.div style={buttonAnimation}>
        <Link to="/user-documentation" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={styles.devButton}>
            User Documentation
          </Button>
        </Link>
      </animated.div>
      

      <Box sx={styles.featuresContainer}>
        <Typography variant="h6" sx={styles.featuresHeading}>
          Key Features:
        </Typography>
        <ul style={styles.featuresList}>
          <li style={styles.featureItem}>Real-time ride tracking and booking</li>
          <li style={styles.featureItem}>Seamless payment integration</li>
          <li style={styles.featureItem}>Customizable ride preferences</li>
        </ul>
      </Box>
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
    backgroundColor: '#B0BEC5',
    color: '#001F3F',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    padding: 2,
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'linear-gradient(135deg, rgba(5,47,84,0.8), rgba(0,0,0,0.8))',
    zIndex: -1,
  },
  heading: {
    fontSize: '4rem',
    fontFamily: 'New Amsterdam, sans-serif',
    marginBottom: 2,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    letterSpacing: 2
  },
  description: {
    fontSize: '1.25rem',
    marginBottom: 4,
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  button: {
    px: 4,
    py: 2,
    fontSize: '1.25rem',
    backgroundColor: '#405D72',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#021526',
    },
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '1rem',
  },
  devButton: {
    px: 4,
    py: 2,
    fontSize: '1.25rem',
    borderColor: '#fff',
    color: '#fff',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#ffffff22',
      borderColor: "#507687"
    },
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '2rem',
  },
  featuresContainer: {
    backgroundColor: '#ffffff',
    color: '#333333',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '80%',
    marginTop: '2rem',
  },
  featuresHeading: {
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '1rem',
  },
  featuresList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
};

export default LandingPage;