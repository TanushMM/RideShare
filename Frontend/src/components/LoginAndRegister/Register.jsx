import { useState, useEffect } from "react";
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
import Header from "../Layout/Header"

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
      const res = await axios.post(`http://3.110.16.132:9000/register`, data);
      console.log("Register response:", res.data);

      const tokenResponse = await axios.post("http://3.110.16.132:5000/getJWT", { "jwt": data.email });
      const token = tokenResponse.data.total_server_access_token;

      setMessage("Registration successful!");
      setOpen(true);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      data._id = res.data._id;

      const addUserResponse = await axios.post(
        "http://3.110.16.132:5050/user/addUser",
        data,
        config
      );
      console.log("User added successfully:", addUserResponse.data);

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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"black"}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isTokenFetched} 
          >
            Register
          </Button>
          <Typography variant="body2" align="center" color={"black"}>
            Already have an account?{" "}
            <Link href="/" variant="body2">
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
    </div>
  );
};

export default Register;