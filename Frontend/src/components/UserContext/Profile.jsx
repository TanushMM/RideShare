import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useSpring, animated } from '@react-spring/web';

// Define a local theme with improved typography and palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00bcd4',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    grey: {
      200: '#e0e0e0',
      300: '#d1d1d1',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      fontSize: '2.2rem',
      color: '#333333',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.2rem',
      color: '#555555',
    },
    body1: {
      fontSize: '1rem',
      color: '#666666',
    },
  },
});

// Styled Components
const FullPageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  background: '#B0BEC5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: 700,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  '&:hover $EditButton': {
    opacity: 1,
    transform: 'scale(1.1)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[300]}`,
  transition: 'all 0.3s ease-in-out',
  opacity: 0,
  transform: 'scale(1)',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(4),
  gap: theme.spacing(2),
}));

// Profile Component
const Profile = () => {
  // Hard-coded user data
  const [user, setUser] = useState({
    fullName: 'Tanush',
    email: 'tanushmmofficial@gmail.com',
    phoneNumber: '+91 1234567890',
    address: 'Somwhere in Chennai, Tamil Nadu, India',
    dateOfBirth: '2004-06-05',
  });

  // State to handle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle save action (for demonstration, it just toggles edit mode)
  const handleSave = () => {
    toggleEdit();
    alert('Profile updated successfully!');
  };

  // Function to extract initials from full name
  const getInitials = (name) => {
    const names = name.trim().split(' ');
    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    const initials =
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase();
    return initials;
  };

  // Animations for avatar and form elements
  const avatarAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 800 },
  });

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 300,
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 600,
  });

  return (
    <ThemeProvider theme={theme}>
      <FullPageContainer>
        <StyledPaper elevation={3}>
          <AvatarContainer>
            <animated.div style={avatarAnimation}>
              <StyledAvatar>{getInitials(user.fullName)}</StyledAvatar>
            </animated.div>
            {/* Edit Button */}
            <EditButton onClick={toggleEdit} aria-label="edit profile">
              <EditIcon />
            </EditButton>
          </AvatarContainer>
          <Typography component="h1" variant="h4" gutterBottom>
            {user.fullName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {user.email}
          </Typography>
          <FormContainer component="form" noValidate>
            <animated.div style={formAnimation}>
              <Grid container spacing={3}>
                {/* Full Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Email Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={user.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Date of Birth */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={user.dateOfBirth}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
              </Grid>
            </animated.div>

            {/* Action Buttons */}
            <ActionButtons>
              {isEditing ? (
                <animated.div style={buttonAnimation}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    size="large"
                  >
                    Save
                  </Button>
                </animated.div>
              ) : (
                <animated.div style={buttonAnimation}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={toggleEdit}
                    size="large"
                  >
                    Edit
                  </Button>
                </animated.div>
              )}
            </ActionButtons>
          </FormContainer>
        </StyledPaper>
      </FullPageContainer>
    </ThemeProvider>
  );
};

export default Profile;
