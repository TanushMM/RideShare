import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Grow,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const mapContainerStyle = {
  height: '90vh',
  width: '99%',
  margin: '15px',
  marginLeft: '7.5px',
  borderRadius: '15px',
};

const PostRideDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [driverDetails, setDriverDetails] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [riderMarkers, setRiderMarkers] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'directions'],
  });

  const navigate = useNavigate();
  
  const fetchMatches = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
    };
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/match-ride/poster-match`, config);

      const matchedResult = response.data.matched_result;

      const driver = matchedResult[0].poster;

      const riders = matchedResult.map((result) => ({
        ...result.search_details,
        amount: result.amount,
      }));

      sessionStorage.setItem('driver', JSON.stringify(driver));
      sessionStorage.setItem('riders', JSON.stringify(riders));

      setDriverDetails(driver);
      setBookings(riders);
      fetchDriverRoute(driver.from.coordinates, driver.to.coordinates);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  useEffect(() => {
    if (isLoaded) {
      fetchMatches();
    }
  }, [isLoaded]);

  const fetchDriverRoute = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching driver route: ${result}`);
        }
      }
    );
  };

  const handleRiderClick = (rider) => {
    setSelectedRider(rider);
    setDirectionsResponse(null);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: rider.from.coordinates,
        destination: rider.to.coordinates,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setRiderMarkers([rider.from.coordinates, rider.to.coordinates]);
        } else {
          console.error(`Error fetching rider's route: ${result}`);
        }
      }
    );
  };

  const handleGoBack = () => {
    setSelectedRider(null);
    setDirectionsResponse(null);
    setRiderMarkers([]);
    if (driverDetails) {
      fetchDriverRoute(driverDetails.from.coordinates, driverDetails.to.coordinates);
    }
  };

  const handleNext = () => {
    navigate('/post-payment-summary');
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Skeleton variant="rectangular" width="100%" height="93vh" />;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '93vh',
        backgroundColor: '#f0f4f7',
        marginTop: '1.5vh',
      }}
    >
      {/* Left Side: Rider Details */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          margin: '15px',
          marginRight: '7.5px',
          textAlign: 'left',
          borderRadius: 6,
          width: '30%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 8,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#333',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          Ride Details
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            width: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            backgroundColor: '#fafafa',
            padding: 2,
          }}
        >
          <Grow in={true} mountOnEnter unmountOnExit>
            {selectedRider ? (
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 1,
                    textAlign: 'center',
                  }}
                >
                  {selectedRider.email}'s Ride Details
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'gray', mb: 1 }}>
                  From: <strong>{selectedRider.from.location}</strong>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'gray', mb: 1 }}>
                  To: <strong>{selectedRider.to.location}</strong>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
                  Amount: <strong>₹{selectedRider.amount}</strong>
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleGoBack}
                  sx={{
                    mt: 2,
                    alignSelf: 'center',
                  }}
                >
                  Go Back
                </Button>
              </Paper>
            ) : (
              <List>
                {bookings.length === 0 ? (
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      color: '#888',
                      textAlign: 'center',
                    }}
                  >
                    No one has booked this ride yet.
                  </Typography>
                ) : (
                  bookings.map((booking, index) => (
                    <Accordion key={index} sx={{ marginBottom: 2 }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                          {booking.email}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" sx={{ color: '#555' }}>
                          {booking.from.location} → {booking.to.location}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleRiderClick(booking)}
                          sx={{ mt: 1 }}
                        >
                          View Route
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </List>
            )}
          </Grow>
        </Box>

        {/* Next Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{
            mt: 4,
            alignSelf: 'center',
            padding: '10px 20px',
          }}
        >
          Next
        </Button>
      </Paper>

      {/* Right Side: Google Map */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={driverDetails ? driverDetails.from.coordinates : { lat: 0, lng: 0 }}
          zoom={10}
          options={{
            styles: [
              // You can add custom map styles here
            ],
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {directionsResponse ? (
            <Fade in={true}>
              <DirectionsRenderer directions={directionsResponse} />
            </Fade>
          ) : (
            <CircularProgress
              size={60}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-30px',
                marginLeft: '-30px',
              }}
            />
          )}

          {riderMarkers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </Box>
    </Box>
  );
};

export default PostRideDetails;
