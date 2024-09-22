import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, keyframes } from "@mui/material";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#B0BEC5 ',
        textAlign: 'center',
        animation: `${fadeIn} 1s ease-in-out`,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontSize: "80px",
          fontWeight: 'bold',
          fontFamily: 'New Amsterdam, sans-serif',
          color: '#2c3e50',
          animation: `${fadeIn} 1.2s ease-in-out`,
        }}
      >
        Welcome to RideShare
      </Typography>

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
  );
};

export default Login;