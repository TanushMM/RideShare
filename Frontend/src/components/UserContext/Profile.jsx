import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value > 100 ? 100 : value;
    if (start === end) return;

    let totalDuration = 500;
    let incrementTime = (totalDuration / end) * 1.5;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [value]);

  return (
    <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#000' }}>
      {count}
    </Typography>
  );
};

const Profile = () => {
  const user = {
    name: 'Tanush M M',
    email: 'tanushmmofficial@gmail.com',
    phone: '+91 1234567890',
    address: '123 Main St, Springfield, USA',
    rides: 23,
    drives: 15,
  };

  return (
    <Box
    sx={{
      background: '#528ec1',
      padding : 12
    }}
    >
    <Container maxWidth="lg" >
      <Grid container spacing={4}>
        {/* Left Side: Profile Details */}
        <Grid item xs={12} md={6} padding='2px'>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: '100%',
              backgroundColor: '#fafafa', // Very light grey background
              color: '#000', // Black text color to match the header
              boxShadow: 5,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mr: 3,
                  bgcolor: '#e3f2fd', // Light blue background for avatar
                  color: '#021526', // Black text color for contrast
                }}
              >
                {user.name[0]}
              </Avatar>
              <Typography
                variant="h4"
                component="div"
                fontWeight="bold"
                sx={{ color: '#021526',  }} // Black for the name
              >
                {user.name}
              </Typography>
            </Box>
            <Divider sx={{ my: 2, bgcolor: '#cfd8dc' }} /> {/* Light grey divider */}
            <Box display="flex" alignItems="center" mb={1}>
              <EmailIcon sx={{ mr: 2, color: '#000' }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
                {user.email}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 2, color: '#000' }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
                {user.phone}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <HomeIcon sx={{ mr: 2, color: '#000' }} />
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
                {user.address}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Rides and Drives Counters */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  backgroundColor: '#F6F5F5', // Light yellow background
                  color: '#021526', // Black text color to match the header
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 60, color: '#021526' }} />
                <Typography variant="h6" component="div" mt={2} sx={{ color: '#021526' }}>
                  Total Drives
                </Typography>
                <AnimatedCounter value={user.drives} />
                <LocalTaxiIcon sx={{ fontSize: 60, color: '#021526' }} />
                <Typography variant="h6" component="div" mt={2} sx={{ color: '#021526' }}>
                  Total Rides
                </Typography>
                <AnimatedCounter value={user.rides} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: '#F6F5F5', // Light green background
                  color: '#021526', // Black text color to match the header
                }}
              >
                
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default Profile;