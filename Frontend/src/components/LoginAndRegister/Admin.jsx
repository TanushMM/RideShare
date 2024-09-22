import { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    try {

      const loginResponse = await axios.post("http://127.0.0.1:8000/authentication/login", {
        email: email,
        password: password,
      });

      if (loginResponse.status === 200) {
        const jwtResponse = await axios.post("http://127.0.0.1:8000/authorization/getJWT", {
          jwt: email,
        });

        if (jwtResponse.status === 200) {
          const token = jwtResponse.data.total_server_access_token;

          sessionStorage.setItem("jwt", token);
          sessionStorage.setItem("privilage", "admin");
          sessionStorage.setItem("email", email);
          console.log("JWT stored in sessionStorage:", token);

          navigate("/admin");
        } else {
          setMessage("Error fetching JWT. Please try again.");
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
          <Avatar sx={{ m: 1, bgcolor: "silver" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#021526" }}>
            Admin Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
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
                "& .MuiInputLabel-root": {
                  color: "rgba(0, 0, 0, 0.6)",
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
                alignSelf: 'center',
                padding: '12px 24px',
                borderRadius: '8px',
                width: '150px',
                height: '45px',
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
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "black" }}
            >
              Don't have an account?{" "}
              <Link href="/login/register" variant="body2">
                Register here
              </Link>
            </Typography>
          </Box>
          {message && (
            <Typography
              color="error"
              sx={{
                mt: 2,
                animation: "shake 0.3s ease-in-out",
                "@keyframes shake": {
                  "0%, 100%": { transform: "translateX(0)" },
                  "20%, 60%": { transform: "translateX(-10px)" },
                  "40%, 80%": { transform: "translateX(10px)" },
                },
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Admin;