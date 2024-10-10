import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const sectionOptions = {
    triggerOnce: true,
    threshold: 0.3,  // Trigger when 30% of the section is in view
  };

  // Section 1 Animations (Heading, Description, Buttons)
  const [ref1, inView1] = useInView(sectionOptions);
  const headingAnimation1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? 'translateY(0px)' : 'translateY(-50px)',
    config: { duration: 1000 },
  });
  const descriptionAnimation1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000, delay: 300 },
  });
  const buttonAnimation1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? 'translateY(0px)' : 'translateY(50px)',
    config: { duration: 1000, delay: 600 },
  });

  // Section 2 Animations
  const [ref2, inView2] = useInView(sectionOptions);
  const headingAnimation2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? 'translateY(0px)' : 'translateY(-50px)',
    config: { duration: 1000 },
  });
  const descriptionAnimation2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000, delay: 300 },
  });
  const buttonAnimation2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? 'translateY(0px)' : 'translateY(50px)',
    config: { duration: 1000, delay: 600 },
  });

  // Section 3 Animations
  const [ref3, inView3] = useInView(sectionOptions);
  const headingAnimation3 = useSpring({
    opacity: inView3 ? 1 : 0,
    transform: inView3 ? 'translateY(0px)' : 'translateY(-50px)',
    config: { duration: 1000 },
  });
  const descriptionAnimation3 = useSpring({
    opacity: inView3 ? 1 : 0,
    transform: inView3 ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000, delay: 300 },
  });
  const buttonAnimation3 = useSpring({
    opacity: inView3 ? 1 : 0,
    transform: inView3 ? 'translateY(0px)' : 'translateY(50px)',
    config: { duration: 1000, delay: 600 },
  });

  // Section 4 Animations
  const [ref4, inView4] = useInView(sectionOptions);
  const headingAnimation4 = useSpring({
    opacity: inView4 ? 1 : 0,
    transform: inView4 ? 'translateY(0px)' : 'translateY(-50px)',
    config: { duration: 1000 },
  });
  const featureBoxAnimation = useSpring({
    opacity: inView4 ? 1 : 0,
    transform: inView4 ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000, delay: 300 },
  });

  return (
    <Box sx={styles.container}>
      {/* Section 1 - Welcome and Buttons */}
      <Box ref={ref1} sx={{ ...styles.section, backgroundColor: '#B0BEC5' }}>
        <animated.div style={headingAnimation1}>
          <Typography variant="h1" sx={styles.heading}>
            Welcome to Hexaware's Rideshare
          </Typography>
        </animated.div>

        <animated.div style={descriptionAnimation1}>
          <Typography variant="h5" sx={styles.description}>
            Revolutionize your travel experience with our cutting-edge RideShare application.
            Connect with drivers and passengers effortlessly, enjoy smooth ride bookings,
            and explore new destinations with ease. Join us in redefining convenience and
            comfort on the road.
          </Typography>
        </animated.div>

        <animated.div style={buttonAnimation1}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={styles.button}>Get Started</Button>
          </Link>
        </animated.div>

        <animated.div style={buttonAnimation1}>
          <Link to="/developer" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={styles.devButton}>Meet the Developers</Button>
          </Link>
        </animated.div>

        <animated.div style={buttonAnimation1}>
          <Link to="/user-documentation" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={styles.devButton}>User Documentation</Button>
          </Link>
        </animated.div>
      </Box>

      {/* Section 2 - Drive when you want */}
      <Box ref={ref2} sx={{ ...styles.section, backgroundColor: '#f8f9fa' }}>
        <animated.div style={headingAnimation2}>
          <Typography variant="h1" sx={styles.heroText}>
          Drive When You Want, Share the Journey
          </Typography>
        </animated.div>

        <animated.div style={descriptionAnimation2}>
          <Typography variant="h5" sx={styles.subText}>
          Earn extra income by offering rides on your schedule or join someone else's journey to share the cost. With RideShare, you have the flexibility to post your ride or find a ride that fits your plans. Connect with fellow commuters, save on travel costs, and make your daily commute more efficient and enjoyable.
          </Typography>
        </animated.div>

        <animated.div style={buttonAnimation2}>
          <Box sx={styles.buttonGroup}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={styles.ctaButton}>Get Started</Button>
            </Link>
            <Link to="/login/user" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" sx={styles.secondaryButton}>Log In</Button>
            </Link>
          </Box>
        </animated.div>
      </Box>

      {/* Section 3 - Business Section */}
      <Box ref={ref3} sx={{ ...styles.section, ...styles.fullWidthSection, backgroundColor: '#B0BEC5' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <animated.div style={headingAnimation3}>
              <Typography variant="h3" sx={styles.businessTitle}>
                The RideShare you know, reimagined for business
              </Typography>
            </animated.div>

            <animated.div style={descriptionAnimation3}>
              <Typography variant="body1" sx={styles.businessDescription}>
                RideShare for Business is a platform for managing global rides and deliveries,
                for companies of any size.
              </Typography>
            </animated.div>

            <animated.div style={buttonAnimation3}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={styles.ctaButton}>Get Started</Button>
              </Link>
            </animated.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.businessImage}>
              <img src="https://i.postimg.cc/QCTztQ5Z/business-people-paying-vehicle-equiped-with-car-payment-system-vehicle-payments-car-payment-technolo.png" alt="Business Image" style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Section 4 - Features Section */}
      <Box ref={ref4} sx={{ ...styles.section, backgroundColor: '#f8f9fa' }}>
        <animated.div style={headingAnimation4}>
          <Typography variant="h4" sx={styles.featuresTitle}>
            Why Choose RideShare?
          </Typography>
        </animated.div>

        <animated.div style={featureBoxAnimation}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={styles.featureBox}>
                <Typography variant="h6" sx={styles.featureHeading}>Real-time ride tracking</Typography>
                <Typography variant="body1" sx={styles.featureText}>Track your driver in real-time and enjoy a seamless travel experience.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={styles.featureBox}>
                <Typography variant="h6" sx={styles.featureHeading}>Seamless Payment</Typography>
                <Typography variant="body1" sx={styles.featureText}>Choose from various secure payment methods for a worry-free transaction.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={styles.featureBox}>
                <Typography variant="h6" sx={styles.featureHeading}>Flexible Ride Options</Typography>
                <Typography variant="body1" sx={styles.featureText}>Select from multiple ride options that suit your preferences and budget.</Typography>
              </Box>
            </Grid>
          </Grid>
        </animated.div>
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
    width: '100%',
    backgroundColor: '#f8f9fa',
    color: '#001F3F',
    scrollBehavior: 'smooth',
  },
  section: {
    minHeight: '100vh', // Each section takes full window height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  fullWidthSection: {
    width: '100%',
    padding: '2rem 0', // Remove horizontal gaps
  },
  heroText: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#001F3F',
  },
  subText: {
    fontSize: '1.25rem',
    fontFamily: "Lato",
    marginBottom: '2rem',
    color: '#555555',
    width:"90rem"
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  ctaButton: {
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    backgroundColor: '#405D72',
    borderRadius: '30px',
    '&:hover': {
      backgroundColor: '#001F3F',
    },
  },
  secondaryButton: {
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    borderColor: '#001F3F',
    color: '#001F3F',
    borderRadius: '30px',
    '&:hover': {
      backgroundColor: '#001F3F',
      color: '#FFFFFF',
    },
  },
  heading: {
    fontSize: '4rem',
    fontFamily: 'New Amsterdam, sans-serif',
    marginBottom: 2,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    letterSpacing: 2,
  },
  description: {
    fontSize: '1.25rem',
    marginBottom: 4,
    fontFamily: "Lato",
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
      borderColor: '#507687',
    },
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '2rem',
  },
  businessTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    marginTop: '8rem',
  },
  businessDescription: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  businessImage: {
    display: 'flex',
    justifyContent: 'center',
  },
  featuresTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  featureBox: {
    padding: '2rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    height: '100%',
    textAlign: 'left',
  },
  featureHeading: {
    fontSize: '1.75rem', // Larger font for better emphasis
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: '1.1rem', // Slightly larger and more readable
    fontFamily: "Lato",
    
  },
};

export default LandingPage;
