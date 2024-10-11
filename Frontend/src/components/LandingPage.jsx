import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PaymentIcon from "@mui/icons-material/Payment";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const LandingPage = () => {



  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#section1",
      start: "top top", // When the top of section2 hits the top of the viewport
      end: "bottom 150px", // When the bottom of section2 reaches 150px from the top
      pin: "#section1-content",
      pinSpacing: false, // Adjust spacing as needed
      markers: false, // Set to true for debugging
    });
    // Example Pinning for Section 2
    ScrollTrigger.create({
      trigger: "#section2",
      start: "top top", // When the top of section2 hits the top of the viewport
      end: "bottom 100vh", // When the bottom of section2 reaches 150px from the top
      pin: "#section2-content",
      pinSpacing: false, // Adjust spacing as needed
      markers: false, // Set to true for debugging
    });

    // Example Pinning for Section 3
    ScrollTrigger.create({
      trigger: "#section3",
      start: "top top", // When the top of section3 hits the center of the viewport
      end: "+=200", // 200px past the start
      pin: "#section3-content",
      pinSpacing: false,
      markers: false,
    });
    ScrollTrigger.create({
      trigger: "#section4",
      start: "top center", // When the top of section3 hits the center of the viewport
      end: "+=200", // 200px past the start
      pin: "#section4-content",
      pinSpacing: false,
      markers: false,
    });

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box sx={styles.container}>

      {/* Section 1 - Welcome and Buttons */}
      <Box
        id="section1"
        sx={{
          ...styles.section,
          backgroundColor: "#0F172A",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Optional Floating Element Removed */}

        <Box id="section1-content" sx={{ textAlign: "center", color: "#FFFFFF", padding: "0 2rem" }}>
          {/* Static Heading */}
          <Typography variant="h3" sx={styles.heading}>
            Welcome to Hexaware's Rideshare
          </Typography>

          <Typography variant="body1" sx={styles.description}>
            Revolutionize your travel experience with our cutting-edge RideShare application.
            Connect with drivers and passengers effortlessly, enjoy smooth ride bookings,
            and explore new destinations with ease. Join us in redefining convenience and
            comfort on the road.
          </Typography>

          <Box sx={styles.buttonGroup}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={styles.ctaButton_1}>
                Get Started
              </Button>
            </Link>
            <Link to="/developer" style={{ textDecoration: "none" }}>
              <Button variant="outlined" sx={styles.secondaryButton_1}>
                Meet the Developers
              </Button>
            </Link>
            <Link to="/user-documentation" style={{ textDecoration: "none" }}>
              <Button variant="outlined" sx={styles.secondaryButton_1}>
                User Documentation
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Section 2 - Drive When You Want */}
      <Box
        id="section2"
        sx={{
          ...styles.section,
          backgroundColor: "#FFFFFF",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          position: "relative",
          overflow: "hidden",

        }}
      >
        {/* Dynamic Gradient Overlay Removed or Made Static */}


        <Box id="section2-content"   sx={{ textAlign: "center", color: "#2D3748", padding: "0 2rem" }}>
          <Typography variant="h4" sx={styles.heroText}>
            Drive When You Want, Share the Journey
          </Typography>

          <Typography variant="body1" sx={styles.subText}>
            Earn extra income by offering rides on your schedule or join someone else's journey to share the cost. With RideShare, you have the flexibility to post your ride or find a ride that fits your plans. Connect with fellow commuters, save on travel costs, and make your daily commute more efficient and enjoyable.
          </Typography>

          <Box sx={styles.buttonGroup}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={styles.ctaButton_2}>
                Get Started
              </Button>
            </Link>
            <Link to="/login/user" style={{ textDecoration: "none" }}>
              <Button variant="outlined" sx={styles.secondaryButton_2}>
                Log In
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

        {/* Section 3 - Business Section */}
        <Box
          id="section3"
          sx={{
            ...styles.section,
            ...styles.fullWidthSection,
            backgroundColor: "#0F172A",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            position: "relative",
          overflow: "hidden",


          }}
        >
          {/* Content to be pinned */}
          <Box
            id="section3-content"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              height: "100%", // Ensures the content box takes full height for vertical centering
              // Removed margin:0 to prevent content from being pushed
              // margin: 0,
              padding: "2rem",
            }}
          >
            <Box sx={{display:"flex",flexDirection:"row", gap:"2",m:0}}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={styles.businessTitle}
                >
                  The RideShare You Know, Reimagined for Business
                </Typography>

                <Typography
                  variant="body1"
                  sx={styles.businessDescription}
                >
                  RideShare for Business is a platform for managing global rides and deliveries,
                  tailored for companies of any size. Streamline your corporate travel, reduce costs,
                  and enhance employee satisfaction with our comprehensive solutions.
                </Typography>

                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="contained" sx={styles.ctaButton_1}>
                    Get Started
                  </Button>
                </Link>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.businessImage}>
                  <img
                    src="https://i.postimg.cc/QCTztQ5Z/business-people-paying-vehicle-equiped-with-car-payment-system-vehicle-payments-car-payment-technolo.png"
                    alt="Business Image"
                    style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                  />
                </Box>
            </Grid>
            </Box>
          </Box>
        </Box>


      {/* Section 4 - Features Section */}
      <Box
        id="section4"
        sx={{
          ...styles.section,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box id="section4-content" marginBottom={40}>
        <Typography variant="h4" sx={styles.featuresTitle}>
          Why Choose RideShare?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Box sx={styles.featureBox}>
              <DirectionsCarIcon sx={styles.featureIcon} />
              <Typography variant="h6" sx={styles.featureHeading}>
                Real-time Ride Tracking
              </Typography>
              <Typography variant="body2" sx={styles.featureText}>
                Track your driver in real-time and enjoy a seamless travel experience.
              </Typography>
            </Box>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Box sx={styles.featureBox}>
              <PaymentIcon sx={styles.featureIcon} />
              <Typography variant="h6" sx={styles.featureHeading}>
                Seamless Payment
              </Typography>
              <Typography variant="body2" sx={styles.featureText}>
                Choose from various secure payment methods for a worry-free transaction.
              </Typography>
            </Box>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Box sx={styles.featureBox}>
              <CompareArrowsIcon sx={styles.featureIcon} />
              <Typography variant="h6" sx={styles.featureHeading}>
                Flexible Ride Options
              </Typography>
              <Typography variant="body2" sx={styles.featureText}>
                Select from multiple ride options that suit your preferences and budget.
              </Typography>
              
            </Box>
          </Grid>
        </Grid>
        </Box>
      </Box>
    </Box>
  );
};

// Styles Object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    color: "#1A202C",
    fontFamily: "'Roboto', sans-serif",
    scrollBehavior: "smooth",
    position: "relative",
  },
  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
    position: "relative",
  },
  fullWidthSection: {
    width: "100%",
    padding: "4rem 0",
  },
  heading: {
    fontSize: { xs: "2rem", md: "3rem" },
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#FFFFFF",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "3rem",
    color: "#e6ecf3",
    textAlign: "center",
    maxWidth: "900px",
    lineHeight: 1.6,
  },
  heroText: {
    fontSize: { xs: "2rem", md: "3rem" },
    fontWeight: 700,
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#2D3748",
    fontFamily: "'Raleway', sans-serif",
  },
  subText: {
    fontSize: "1.1rem",
    marginBottom: "2.5rem",
    color: "#4A5568",
    maxWidth: "800px",
    textAlign: "center",
    lineHeight: 1.6,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  ctaButton_1: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "9999px",
    textTransform: "none",
    fontWeight: 600,
    borderColor: "#FFFFFF",
    color: "#0F172A",
    transition: "background-color 0.3s, color 0.3s, transform 0.2s",
    "&:hover": {
      backgroundColor: "#3a4560",
      color: "#FFFFFF",
      transform: "scale(1.05)",
    },
  },
  ctaButton_2: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#0F172A",
    borderRadius: "9999px",
    textTransform: "none",
    fontWeight: 600,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    transition: "background-color 0.3s, color 0.3s, transform 0.2s",
    "&:hover": {
      backgroundColor: "#37476c",
      color: "#FFFFFF",
      transform: "scale(1.05)",
    },
  },
  secondaryButton_2: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderColor: "#0F172A",
    color: "#0F172A",
    borderRadius: "9999px",
    textTransform: "none",
    fontWeight: 600,
    transition: "background-color 0.3s, color 0.3s, transform 0.2s",
    "&:hover": {
      backgroundColor: "#2D3748",
      color: "#FFFFFF",
      transform: "scale(1.05)",
    },
  },
  secondaryButton_1: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderColor: "#CBD5E1",
    color: "#CBD5E1",
    borderRadius: "9999px",
    textTransform: "none",
    fontWeight: 600,
    transition: "background-color 0.3s, color 0.3s, transform 0.2s",
    "&:hover": {
      borderColor: "#0F172A",
      color: "#FFFFFF",
      backgroundColor: "#2D3748",
      transform: "scale(1.05)",
    },
  },
  businessTitle: {
    fontSize: { xs: "2rem", md: "2.5rem" },
    fontWeight: 700,
    marginBottom: "0rem",
    padding: "1rem",
    ml: "2rem",
    color: "#FFFFFF",
    textAlign: "left",
    fontFamily: "'Raleway', sans-serif",
  },
  businessDescription: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
    padding: "1rem",
    ml: "2rem",
    color: "#e6ecf3",
    textAlign: "left",
    lineHeight: 1.6,
  },
  businessImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  featuresTitle: {
    fontSize: { xs: "1.75rem", md: "2rem" },
    fontWeight: 700,
    marginBottom: "2rem",
    color: "#2D3748",
    textAlign: "center",
    fontFamily: "'Raleway', sans-serif",
  },
  featureBox: {
    padding: "2rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    },
  },
  featureIcon: {
    fontSize: "3rem",
    color: "#2D3748",
    marginBottom: "1rem",
  },
  featureHeading: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    fontWeight: 700,
    color: "#2D3748",
    fontFamily: "'Raleway', sans-serif",
  },
  featureText: {
    fontSize: "1rem",
    color: "#4A5568",
    lineHeight: 1.6,
  },
};

export default LandingPage;
