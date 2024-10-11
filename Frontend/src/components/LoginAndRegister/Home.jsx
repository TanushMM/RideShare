import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, keyframes, Grid } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

// Define keyframes for fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled animated Box component
const AnimatedBox = animated(Box);

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const privilege = sessionStorage.getItem("privilage");
    const jwt = sessionStorage.getItem("jwt");

    if (privilege === "admin" && jwt) {
      navigate('/admin');
    } else if (privilege === "user" && jwt) {
      navigate('/home');
    }
  }, [navigate]);

  const handleAdminClick = () => {
    navigate("/login/admin");
  };

  const handleUserClick = () => {
    navigate("/login/user");
  };

  // Animation props using react-spring
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FFFFFF', // Neutral white background
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif', // Clean sans-serif font
        padding: { xs: '2rem', md: '4rem' }, // Responsive padding
      }}
    >
      {/* Welcome Message */}
      <AnimatedBox style={animationProps}>
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            fontWeight: '700',
            fontFamily:"Lato",
            fontSize: "2.5rem",
            color: '#2D3748', // Dark gray color for contrast
            letterSpacing: '1px',
          }}
        >
          Login as Admin or User
        </Typography>
      </AnimatedBox>

      {/* Buttons Group */}
      <AnimatedBox style={animationProps}>
        <Box sx={{display:"flex", flexDirection: "column", gap: "1rem"}}>
          {/* Admin Button */}
          <Button
        variant="contained"
        onClick={handleAdminClick}
        sx={{
          alignSelf: 'center',
          padding: '12px 24px',
          borderRadius: '8px',
          width: '150px',
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
        Admin
      </Button>

      <Button
        variant="contained"
        onClick={handleUserClick}
        sx={{
          mt:2,
          alignSelf: 'center',
          padding: '12px 24px',
          borderRadius: '8px',
          width: '150px',
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
        User
      </Button>
        </Box>
      </AnimatedBox>
    </Box>
  );
};

export default Login;
