import { useState, useEffect } from "react";
import bcrypt from "bcryptjs"; 
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Layout/Header";

const Register = () => {
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    password: ""
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchToken = async () => {
    if (sessionStorage.getItem('jwt') !== null) {
      navigate("/home");
    }
    setIsTokenFetched(true);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const res = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/authentication/register`, { ...data, password: hashedPassword });
      const tokenResponse = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/authorization/getJWT`, { "jwt": data.email });
      const token = tokenResponse.data.total_server_access_token;

      setMessage("Registration successful!");
      setOpen(true);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      data._id = res.data._id;
      if (res.status === 200) {
        const addUserResponse = await axios.post(
          `http://${import.meta.env.VITE_SERVER_IP}:8000/user/user/addUser`,
          { ...data, password: hashedPassword }, 
          config
        );
      }

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage("Error during registration. Please try again.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
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
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#021526" }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={data.name}
              onChange={handleChange}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
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
              autoComplete="new-password"
              value={data.password}
              onChange={handleChange}
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
                mt: 2,
                alignSelf: "center",
                padding: "12px 24px",
                borderRadius: "8px",
                backgroundColor: "#DDDDDD",
                color: "#1E201E",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s, transform 0.2s",
                "&:hover": {
                  backgroundColor: "#1E201E",
                  transform: "scale(1.05)",
                  color: "#fff",
                },
                "&:active": {
                  backgroundColor: "#0d47a1",
                  transform: "scale(1.02)",
                },
              }}
              disabled={!isTokenFetched}
            >
              Register
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2, color: "black" }}>
              Already have an account?{" "}
              <Link href="/login" variant="body2">
                Log in here
              </Link>
            </Typography>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Register;
