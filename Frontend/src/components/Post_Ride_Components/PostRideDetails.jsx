import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const mapContainerStyle = {
  height: "90vh",
  width: "99%",
  margin: "15px",
  marginLeft: "7.5px",
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

  useEffect(() => {
    const fetchMatches = async () => {
      const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`, 
        },
      };
      try {
        const response = await axios.get(`http://3.110.16.132:8000/ride/match-ride/poster-match`, config);

        const matchedResult = response.data.matched_result;
        
        const driver = matchedResult[0].poster;

        const riders = matchedResult.map(result => ({
          ...result.search_details,
          amount: result.amount,
        }));
        
        sessionStorage.setItem("driver", JSON.stringify(driver));
        sessionStorage.setItem("riders", JSON.stringify(riders));

        setDriverDetails(driver);
        setBookings(riders);
        fetchDriverRoute(driver.from.coordinates, driver.to.coordinates);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMatches();
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
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box sx={{ display: 'flex', height: '93vh', backgroundColor: '#f0f4f7', marginTop: "1.5vh" }}>
      {/* Left Side: Rider Details */}
      <Box
        sx={{
          padding: 4,
          margin: '15px',
          marginRight: '7.5px',
          backgroundColor: '#fff',  
          textAlign: 'left',
          boxShadow: 3,
          borderRadius: 6,
          width: '30%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 8,
        }}
      >
        <Typography
          className="Heading"
          sx={{
            fontSize: '1.8rem',
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
            maxHeight: '350px',
            overflowY: 'auto',
            width: '100%',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            backgroundColor: '#fafafa',
            padding: 2,
          }}
        >
          {selectedRider ? (
            <>
              <Typography
                sx={{
                  fontSize: '1.7rem',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 1,
                }}
              >
                `${selectedRider.email} Ride Details`
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
            </>
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
                  <ListItemButton
                    key={index}
                    onClick={() => handleRiderClick(booking)}
                    sx={{
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      padding: '10px 15px',
                      marginBottom: 2,
                      backgroundColor: '#f9f9f9',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f0f4f7',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                          {booking.email}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontSize: '1.1rem', color: '#555' }}>
                          {booking.from.location} → {booking.to.location}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))
              )}
            </List>
          )}
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
      </Box>

      {/* Right Side: Google Map */}
      <Box sx={{ flexGrow: 1 }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={driverDetails ? driverDetails.from.coordinates : { lat: 0, lng: 0 }}
          zoom={10}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
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
