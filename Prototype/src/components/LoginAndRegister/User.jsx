import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Layout/Header"

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://3.110.16.132:9000/login", {
      email,
      password,
    }).then(navigate("/home"));

    if (response.status === 200) {
      const jwtResponse = await axios.post(`http://3.110.16.132:5000/getJWT`, {
        jwt: email,  
      });

      console.log(jwtResponse.data);

      if (jwtResponse.status === 200) {
        const token = jwtResponse.data.total_server_access_token;

        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("privilage", "user");
        console.log("JWT stored in sessionStorage:", token);

        navigate("/home");
      } else {
        setMessage("Error fetching JWT. Please try again.");
      }
    } else {
      setMessage("Login failed. Please check your credentials.");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.response?.data?.message || "An error occurred");
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
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"black"}>
          User
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
            LogIn
          </Button>
          <Typography variant="body2" align="center" color={"black"}>
            Don't have an account?{" "}
            <Link to="/login/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
    </div>
    </div>
  );
};

export default User;
