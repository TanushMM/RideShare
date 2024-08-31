import { useState } from "react";
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
import Header from "../Layout/Header"

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    try {
      const loginResponse = await axios.post("http://3.110.16.132:9000/login", {
        email,
        password,
      });

      if (loginResponse.status === 200) {
        const jwtResponse = await axios.post("http://3.110.16.132:5000/getJWT", {
          jwt: email, 
        });

        if (jwtResponse.status === 200) {
          const token = jwtResponse.data.total_server_access_token;

          sessionStorage.setItem("jwt", token);
          sessionStorage.setItem("privilage", "admin");
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
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    position: 'relative',
  };

  return (
    <div style={containerStyle}>
      <Header />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
      
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"black"}>
          Admin
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2" align="center" color={"black"}>
            Don't have an account?{" "}
            <Link href="/login/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>
        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
      </div>
      </div>
  );
};

export default Admin;
