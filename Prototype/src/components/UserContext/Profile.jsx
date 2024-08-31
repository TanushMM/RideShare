import React from 'react';
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import Header from '../Layout/Header';

const Profile = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>

          {/* Profile details */}
          <Box mb={4}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Name: Tanush M M
            </Typography>
            <Typography>Email: tanushmmofficial@gmail.com</Typography>
            <Typography>Phone: +1234567890</Typography>
          </Box>

          {/* Ride history */}
          <Box mb={4}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Ride History
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Ride to Downtown on 12th August 2024" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ride to Airport on 5th August 2024" />
              </ListItem>
            </List>
          </Box>

          {/* Options to post or join a ride */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary">
              Post a Ride
            </Button>
            <Button variant="contained" color="success">
              Join a Ride
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;