import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const mapContainerStyle = {
  height: "90vh",
  width: "99%",
  margin: "15px",
  marginLeft: "7.5px",
  borderRadius: '15px', 
};

const center = {
  lat: 13.0827, 
  lng: 80.2707,
};

const driverRide = {
  userName: 'Driver Name',
  from: 'MMTC Colony, Nanganallur, Chennai, Tamil Nadu 600061, India',
  to: 'Vandalur Zoo, Tamil Nadu 600048, India',
  amount: 200, 
  date: '2024-10-08',
  time: '18:30:00',
  driverRoute: {
    origin: { lat: 12.9699248, lng: 80.18425479999999 }, 
    destination: { lat: 12.8812767, lng: 80.09256839999999 },
  },
};

const PostRideDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [riderMarkers, setRiderMarkers] = useState([]); 
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'directions'],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = () => {
      setBookings([
        {
          userName: 'Rider Name 1',
          from: 'MMTC Colony, Nanganallur, Chennai',
          to: 'Vandalur Zoo, Tamil Nadu',
          amount: 150,
          timeOfJoining: '3:00 PM',
          contact: 'rider1@example.com',
          riderRoute: {
            origin: { lat: 12.9899248, lng: 80.18425479999999 }, 
            destination: { lat: 12.8912767, lng: 80.09256839999999 },
          },
        },
        {
          userName: 'Rider Name 2',
          from: 'Keelkattalai, Chennai',
          to: 'Urapakkam, Tamil Nadu',
          amount: 180,
          timeOfJoining: '3:30 PM',
          contact: 'rider2@example.com',
          riderRoute: {
            origin: { lat: 12.9556074, lng: 80.1868681 }, 
            destination: { lat: 12.8438835, lng: 80.05973639999999 },
          },
        },
      ]);
    };
    fetchBookings();

    if (isLoaded) {
      fetchDriverRoute();
    }
  }, [isLoaded]);

  const fetchDriverRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: driverRide.driverRoute.origin,
        destination: driverRide.driverRoute.destination,
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
        origin: rider.riderRoute.origin,
        destination: rider.riderRoute.destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setRiderMarkers([rider.riderRoute.origin, rider.riderRoute.destination]);
        } else {
          console.error(`Error fetching rider's route: ${result}`);
        }
      }
    );
  };

  const handleGoBack = () => {
    setSelectedRider(null);
    setDirectionsResponse(null); // Clear the current directions (rider's route)
    setRiderMarkers([]); // Clear all rider markers
    fetchDriverRoute(); // Fetch and render the driver's route again
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
                {selectedRider.userName}'s Ride Details
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'gray', mb: 1 }}>
                From: <strong>{selectedRider.from}</strong>
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'gray', mb: 1 }}>
                To: <strong>{selectedRider.to}</strong>
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
                Amount: <strong>₹{selectedRider.amount}</strong>
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
                Time of Joining: <strong>{selectedRider.timeOfJoining}</strong>
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
                Contact: <strong>{selectedRider.contact}</strong>
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
                          {booking.userName}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontSize: '1.1rem', color: '#555' }}>
                          {booking.from} → {booking.to}
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
          center={center}
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