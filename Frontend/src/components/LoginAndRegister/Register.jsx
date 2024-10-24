import React, { useState, useEffect } from "react"
import bcrypt from "bcryptjs"
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
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../Layout/Header"
import { styled } from "@mui/system"
import { motion } from "framer-motion"

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  display: "flex",
  flexDirection: "column",
}))

const StyledContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  maxWidth: "500px",
  width: "100%",
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#333",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  fontFamily: "'Roboto Slab', serif",
}))

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
}))

const Register = () => {
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [isTokenFetched, setIsTokenFetched] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const fetchToken = async () => {
    if (sessionStorage.getItem("jwt") !== null) {
      navigate("/home")
    }
    setIsTokenFetched(true)
  }

  useEffect(() => {
    fetchToken()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.name || !data.email || !data.password) {
      setMessage("Please fill in all required fields.")
      setOpenSnackbar(true)
      return
    }

    setLoading(true)

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const res = await axios.post(
        `http://${import.meta.env.VITE_SERVER_IP}:8000/authentication/register`,
        { ...data, password: hashedPassword }
      )
      const tokenResponse = await axios.post(
        `http://${import.meta.env.VITE_SERVER_IP}:8000/authorization/getJWT`,
        { jwt: data.email }
      )
      const token = tokenResponse.data.total_server_access_token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      data._id = res.data._id
      if (res.status === 201) {
        await axios.post(
          `http://${import.meta.env.VITE_SERVER_IP}:8000/user/user/addUser`,
          { ...data, password: hashedPassword },
          config
        )
      }

      setMessage("Registration successful!")
      setOpenSnackbar(true)

      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      console.error("Error during registration:", err)
      setMessage("Error during registration. Please try again.")
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <GradientBackground>
      <Header />
      <StyledContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "40%" }}
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
                <AppRegistrationIcon />
              </Avatar>
              <Heading component="h1">Create an Account</Heading>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={data.name}
                onChange={handleChange}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
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
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
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
                disabled={!isTokenFetched || loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </StyledButton>
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "#555" }}
              >
                Already have an account?{" "}
                <Link href="/login" variant="body2" sx={{ color: "#0F172A" }}>
                  Log in here
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
            message === "Registration successful!" ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </GradientBackground>
  )
}

export default Register
