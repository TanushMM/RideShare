import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const RideMonitoringDashboard = () => {
  const [activeRides, setActiveRides] = useState([]);

  useEffect(() => {
    // Fetch active rides from the backend
    const fetchActiveRides = async () => {
      const response = await axios.get("http://yourapi.com/active-rides");
      setActiveRides(response.data);
    };
    fetchActiveRides();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ride Monitoring Dashboard
        </Typography>
        <Grid container spacing={3}>
          {activeRides.map((ride) => (
            <Grid item xs={12} md={6} lg={4} key={ride.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{ride.user}</Typography>
                <Typography variant="body1">Status: {ride.status}</Typography>
                <Typography variant="body2">Start: {ride.startLocation}</Typography>
                <Typography variant="body2">End: {ride.endLocation}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RideMonitoringDashboard;
