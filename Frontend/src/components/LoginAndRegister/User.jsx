import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  maxWidth: "500px",
  width: "100%",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#333",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontFamily: "'Roboto Slab', serif",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  backgroundColor: "#0F172A",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "uppercase",
  boxShadow: "0 8px 15px rgba(15, 23, 42, 0.3)",
  transition: "background 0.3s, transform 0.2s",
  "&:hover": {
    backgroundColor: "#1E293B",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 20px rgba(30, 41, 59, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 6px 15px rgba(15, 23, 42, 0.2)",
  },
}));

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all required fields.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_SERVER_IP}:8000/authentication/login`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        const jwtResponse = await axios.post(
          `http://${import.meta.env.VITE_SERVER_IP}:8000/authorization/getJWT`,
          {
            jwt: email,
          }
        );

        if (jwtResponse.status === 200) {
          const token = jwtResponse.data.total_server_access_token;
          sessionStorage.setItem("jwt", token);
          sessionStorage.setItem("privilage", "user");
          sessionStorage.setItem("email", email);
          console.log("JWT stored in sessionStorage:", token);
          navigate("/user-dashboard");
        } else {
          setMessage("Error fetching JWT. Please try again.");
          setOpenSnackbar(true);
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        "Login failed: " +
          (error.response?.data?.message || "An error occurred")
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GradientBackground>
      <StyledContainer component="main" maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%" }}
        >
          <StyledBox>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#0F172A" }}>
                <PersonIcon />
              </Avatar>
              <Heading component="h1" sx={{fontFamily:"Raleway"}}>User Login</Heading>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: "8px",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Log In"
                )}
              </StyledButton>
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "#555" }}
              >
                Don't have an account?{" "}
                <Link to="/login/register" style={{ color: "#0F172A" }}>
                  Register here
                </Link>
              </Typography>
            </Box>
          </StyledBox>
        </motion.div>
      </StyledContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            message.includes("successful") ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </GradientBackground>
  );
};

export default User;
