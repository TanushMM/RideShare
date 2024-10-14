import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  Avatar,
  Slide,
  Fade,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const [paymentConfirmed, setPaymentConfirmed] = useState(false); // Payment confirmation state
  const [ridesPaid, setRidesPaid] = useState(0); // Number of riders paid

  useEffect(() => {
    let isMounted = true;

    // Simulate payment processing
    setTimeout(() => {
      if (isMounted) {
        // Assuming all riders are paid after loading
        setLoading(false);
        setPaymentConfirmed(true);
        // Update the number of riders paid
        const ridersData = sessionStorage.getItem('riders');
        if (ridersData) {
          const riders = JSON.parse(ridersData);
          setRidesPaid(riders.length);
        }

        // Redirect to feedback page after a delay
        setTimeout(() => {
          navigate('/post-driver-feedback');
        }, 3000); // Redirect after 3 seconds
      }
    }, 2000); // Simulate loading for 2 seconds

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: '10%' }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Card
          sx={{
            boxShadow: 6,
            borderRadius: 3,
            p: 4,
            backgroundColor: '#ffffff',
            textAlign: 'center',
          }}
        >
          {loading ? (
            // Loading State
            <Fade in={loading} timeout={1000}>
              <Box>
                <CircularProgress size={80} sx={{ color: '#1976d2', mb: 3 }} />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  Processing Payments...
                </Typography>
              </Box>
            </Fade>
          ) : paymentConfirmed ? (
            // Payment Confirmed State
            <Fade in={paymentConfirmed} timeout={1000}>
              <Box>
                <Avatar
                  sx={{
                    bgcolor: 'green',
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: 60 }} />
                </Avatar>

                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  Payment Confirmed
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" component="p" sx={{ mt: 2, color: '#555' }}>
                  <strong>Number of Riders:</strong> {ridesPaid}
                  <br />
                  <strong>Number of Riders Paid:</strong> {ridesPaid}
                </Typography>

                <Typography variant="body2" sx={{ mt: 2, color: '#999' }}>
                  Redirecting to feedback page...
                </Typography>
              </Box>
            </Fade>
          ) : null}
        </Card>
      </Slide>
    </Container>
  );
};

export default ConfirmationPage;
