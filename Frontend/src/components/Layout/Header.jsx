import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Typography, Button, IconButton, Drawer } from "@mui/material"
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

function Header() {
  const [open, setOpen] = useState(false)

  const headerMenu = [
    {
      id: 1,
      name: "Search Ride",
      icon: LocalTaxiIcon,
      path: "/search-ride",
      style: {
        backgroundColor: "#405D72",
        color: "white",
        borderColor: "#405D72",
      },
    },
    {
      id: 2,
      name: "Post Ride",
      icon: LocalTaxiIcon,
      path: "/post-ride",
      style: {
        backgroundColor: "white",
        color: "#021526",
        borderColor: "#021526",
      },
    },
  ]

  const isLoggedIn = () => {
    return !!sessionStorage.getItem("jwt")
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        backgroundColor: "#0F172A",
        color: "white",
        p: 2,
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 50,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://rideshare-s3.s3.ap-south-1.amazonaws.com/Logo_2.png"
            alt="Rideshare Icon"
            style={{ width: 48, height: 48, marginRight: 8 }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "#e0e0e0",
              fontWeight: "bold",
              mr: 4,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              fontFamily: "new amsterdam",
              letterSpacing: 4,
            }}
            component={Link}
            to="/"
          >
            RIDESHARE
          </Typography>
        </Box>

        {/* Flexible Spacer */}

        {/* Desktop Navigation Links */}
        {isLoggedIn() && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            {headerMenu.map((item) => (
              <Button
                key={item.id}
                component={Link}
                to={item.path}
                startIcon={
                  <item.icon
                    sx={{ color: item.id === 1 ? "white" : "#021526" }}
                  />
                }
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: item.style.borderColor,
                  backgroundColor: item.style.backgroundColor,
                  color: item.style.color,
                  "&:hover": {
                    backgroundColor: item.id === 1 ? "#5B99C2" : "#f0f0f0",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {item.name}
                </Typography>
              </Button>
            ))}
          </Box>
        )}

        {/* Desktop Profile, Settings, Login/Logout Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
            ml: "auto",
          }}
        >
          {isLoggedIn() && (
            <>
              <Button
                component={Link}
                to="/profile"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "18px",
                  "&:hover": { color: "#90caf9" },
                }}
              >
                Profile
              </Button>

              <Button
                component={Link}
                to="/user-dashboard"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "18px",
                  "&:hover": { color: "#90caf9" },
                }}
              >
                Dashboard
              </Button>
            </>
          )}
          {isLoggedIn() ? (
            <Button
              component={Link}
              to="/logout"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                fontFamily: "Raleway, sans-serif",
                fontSize: "18px",
                "&:hover": { color: "#90caf9" },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login/register"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "18px",
                  "&:hover": { color: "#90caf9" },
                }}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "18px",
                  "&:hover": { color: "#90caf9" },
                }}
              >
                Login
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Toggle Button */}
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            color: "white",
            ml: "auto",
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Sidebar */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#021526",
            color: "white",
            height: "100%",
            p: 2,
          }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 4 }}>
            {headerMenu.map((item) => (
              <Button
                key={item.id}
                component={Link}
                to={item.path}
                startIcon={
                  <item.icon
                    sx={{ color: item.id === 1 ? "white" : "#021526" }}
                  />
                }
                sx={{
                  width: "100%",
                  mb: 2,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: item.style.borderColor,
                  backgroundColor: item.style.backgroundColor,
                  color: item.style.color,
                  "&:hover": {
                    backgroundColor: item.id === 1 ? "#1e3a52" : "#f0f0f0",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "20px",
                    letterSpacing: 1.3,
                  }}
                >
                  {item.name}
                </Typography>
              </Button>
            ))}
            {isLoggedIn() ? (
              <>
                <Button
                  component={Link}
                  to="/profile"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                    mt: 2,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  Profile
                </Button>
                <Button
                  component={Link}
                  to="/user-dashboard"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                    mt: 2,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  component={Link}
                  to="/logout"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                    mt: 2,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login/register"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                    mt: 2,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                    mt: 2,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Header
