import { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/authentication/login", {
        email: email,
        password: password, 
      });

      if (response.status === 200) {
        const jwtResponse = await axios.post("http://127.0.0.1:8000/authorization/getJWT", {
          jwt: email,
        });

        if (jwtResponse.status === 200) {
          const token = jwtResponse.data.total_server_access_token;
          sessionStorage.setItem("jwt", token);
          sessionStorage.setItem("privilage", "user");
          sessionStorage.setItem("email", email);
          console.log("JWT stored in sessionStorage:", token);
          navigate("/home");
        } else {
          setMessage("Error fetching JWT. Please try again.");
          setOpen(true);
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
        setOpen(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed: " + (error.response?.data?.message || "An error occurred"));
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Container component="main" maxWidth="xs" sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            padding: "2rem",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            backgroundColor: "white",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
            <PersonIcon />
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#021526" }}>
            User Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976D2",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976D2",
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt:2,
                mb:2,
                alignSelf: 'center',
                padding: '12px 24px',
                borderRadius: '8px',
                width: '120px',
                height: '40px',
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
              Log In
            </Button>
            <Typography variant="body2" align="center" sx={{ color: "black" }}>
              Don't have an account?{" "}
              <Link to="/login/register" variant="body2">
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default User;