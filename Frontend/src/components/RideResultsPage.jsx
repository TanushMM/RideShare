import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { motion, AnimatePresence } from 'framer-motion';

import axios from 'axios'; 

const RideResultsPage = () => {
  const [searchRide, setSearchRide] = useState([]);
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [amount, setAmount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      };
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_SERVER_IP}:8000/ride/match-ride/match`,
          config
        );
        console.log('API response:', response);

        setSearchRide(response.data.search_data);
        setRides(response.data.post_data);
        setAmount(response.data.match_result[0]?.price || 0);

      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, []);
  

  useEffect(() => {
    if (selectedRide) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: selectedRide.from.coordinates,
          destination: selectedRide.to.coordinates,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
            setDirectionsResponse(null);
          }
        }
      );
    } else {
      setDirectionsResponse(null);
    }
  }, [selectedRide]);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const handleBackToMatches = () => {
    setSelectedRide(null);
    setDirectionsResponse(null);
  };

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
    setDirectionsResponse(null);
  };

  const memoizedRides = useMemo(() => rides, [rides]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['places', 'directions']}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={
            selectedRide
              ? selectedRide.from.coordinates
              : { lat: 40.758896, lng: -73.985130 } 
          }
        >
          {selectedRide && directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </LoadScript>

      <Box
        sx={{
          position: 'fixed',
          top: { xs: '10%', sm: '15%' },
          right: { xs: '5%', sm: '20%' },
          height: '80vh',
          width: { xs: '90%', sm: '30%' },
          backgroundColor: '#ffffff',
          padding: 0,
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
          borderRadius: { xs: 0, sm: '16px' },
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'scale(1.001)',
          boxShadow: '-4px 0 16px rgba(0, 0, 1, 0.1)',

          },
        }}
      >
        <AnimatePresence mode="wait">
          {!selectedRide && (

              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '16px',
                  padding: '16px',
                  minHeight: '60vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#0F172A',
                    fontSize:"2rem",
                    mt:2,
                    ml:3,
                    textAlign: 'left',
                    fontFamily: 'Raleway',
                  }}
                >
                  Ride Matches
                </Typography>

                {memoizedRides.length > 0 ? (
                  <List sx={{ width: '100%', }}>
                    {memoizedRides.map((ride, index) => (
                      <motion.div
                        key={ride.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 2, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                      >
                        <ListItem
                          button
                          onClick={() => handleSelectRide(ride)}
                          sx={{
                            mb: 1,
                            ml: 0,
                            mr: 0,
                            borderRadius: '8px',
                            transition:
                              'background-color 0.3s, transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <Card sx={{ width: '100%', boxShadow: 'none' }}>
                            <CardContent>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color: '#0F172A',
                                }}
                              >
                                {ride.from.location} to {ride.to.location}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mt: 0.5,
                                }}
                              >
                                <DirectionsIcon sx={{ mr: 0.5 }} />
                                Date: {ride.date}, Time: {ride.time}
                              </Typography>
                            </CardContent>
                            <Divider component="li" />
                          </Card>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mt: 4,
                    }}
                  >
                    <SearchOffIcon
                      sx={{ fontSize: 60, color: '#a0a0a0' }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: '#a0a0a0', mt: 2 }}
                    >
                      No matches found
                    </Typography>
                  </Box>
                )}
              </Box>
          )}

          {selectedRide && (
           
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#0F172A',
                    p: 2,
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                >
                  <Button
                    onClick={handleBackToMatches}
                    sx={{
                      minWidth: 'auto',
                      padding: 0,
                      color: '#ffffff',
                      '&:hover': { backgroundColor: 'transparent' },
                    }}
                  >
                    <KeyboardArrowLeftIcon fontSize="large" />
                  </Button>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'Nunito, sans-serif',
                      ml: 1,
                    }}
                  >
                    Ride Details
                  </Typography>
                </Box>
                <Box
                  sx={{
                    padding: 2.5,
                    background: '#f9f9f9',
                    display: 'flex',
                    height: '63vh',
                    flexDirection: 'column',
                    gap: 2,
                    overflowY: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      textAlign: 'left',
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>From:</strong> {selectedRide.from.location}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>To:</strong> {selectedRide.to.location}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>Date:</strong> {selectedRide.date}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>Time:</strong> {selectedRide.time}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>Seats Available:</strong> {selectedRide.seats}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>Driving Style:</strong> {selectedRide.drivingStyle}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '18px',
                        fontFamily: 'Lato',
                        color: '#0F172A',
                      }}
                    >
                      <strong>Amount:</strong> ${amount}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate(`/ride-details/`, {
                        state: { searchRide, selectedRide, amount },
                      })
                    }
                    sx={{
                      mt: 2,
                      alignSelf: 'center',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      backgroundColor: '#37476c',
                      fontSize: '16px',
                      transition: 'background-color 0.3s, transform 0.2s',
                      '&:hover': {
                        backgroundColor: '#2c3b5e',
                        transform: 'scale(1.05)',
                      },
                      '&:active': {
                        backgroundColor: '#2c3b5e',
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    View Full Details
                  </Button>
                </Box>
              </Box>
          )}
        </AnimatePresence>
      </Box>
    </div>
  );
};

export default RideResultsPage;
