// import React, { useState, useEffect } from 'react';
// import { Button, Box, Typography, Divider, List, ListItemButton, ListItemText } from '@mui/material';
// import { Navigate } from 'react-router-dom';
// const PostRideDetails = ({ startTime }) => {
//   const [bookings, setBookings] = useState([]);
//   const [selectedRider, setSelectedRider] = useState(null);
//   const [showShareButton, setShowShareButton] = useState(false);

//   useEffect(() => {
//     const now = new Date();
//     const rideStart = new Date(startTime);
//     const thirtyMinutesBefore = new Date(rideStart.getTime() - 30 * 60000);

//     if (now >= thirtyMinutesBefore && now < rideStart) {
//       setShowShareButton(true);
//     } else {
//       setShowShareButton(false);
//     }

//     const fetchBookings = () => {
//       setBookings([
//         {
//           userName: 'Ravi Kumar',
//           from: 'Velachery, Chennai',
//           to: 'T. Nagar, Chennai',
//           amount: 100,
//           timeOfJoining: '3:30 PM',
//           contact: 'ravi.kumar@example.com',
//         },
//         {
//           userName: 'Suresh Mehta',
//           from: 'Adyar, Chennai',
//           to: 'Guindy, Chennai',
//           amount: 80,
//           timeOfJoining: '3:45 PM',
//           contact: 'suresh.mehta@example.com',
//         },
//         {
//           userName: 'Anita Sharma',
//           from: 'Anna Nagar, Chennai',
//           to: 'Kodambakkam, Chennai',
//           amount: 120,
//           timeOfJoining: '4:00 PM',
//           contact: 'anita.sharma@example.com',
//         },
//         {
//           userName: 'Vijay Raj',
//           from: 'Porur, Chennai',
//           to: 'Vadapalani, Chennai',
//           amount: 90,
//           timeOfJoining: '3:55 PM',
//           contact: 'vijay.raj@example.com',
//         },
//       ]);
//     };
//     fetchBookings();
//   }, [startTime]);

//   const handleRiderClick = (rider) => {
//     setSelectedRider(rider);
//   };

//   const handleGoBack = () => {
//     setSelectedRider(null);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//         backgroundColor: '#b0bec5',
//         padding: 7,
        
//       }}
//     >
//       <Box
//         sx={{
//           padding: 4,
//           backgroundColor: '#fff',
//           textAlign: 'left',
//           boxShadow: 3,
//           borderRadius: 4,
//           width: '40%',
//           display: 'flex',
//           flexDirection: 'column',
//           paddingRight: 4
//         }}
//       >
//         <Typography
//           className="Heading"
//           sx={{
//             fontSize: '1.8rem',
//             color: '#333',
//             fontWeight: 'bold',
//             fontFamily: 'Poppins',
//             marginBottom: '1.5rem',
//             textAlign: 'center',
//           }}
//         >
//           Ride Details
//         </Typography>

//         <Divider sx={{ marginBottom: 2 }} />

//         <Box
//           sx={{
//             maxHeight: '650px',
//             overflowY: 'auto',
//             width: '100%',
//             border: '1px solid #e0e0e0',
//             borderRadius: 2,
//             backgroundColor: '#fafafa',
//             mr:3,
//             padding: 2,
//           }}
//         >
//           {/* Conditionally render the list or rider details */}
//           {selectedRider ? (
//             <>
//               <Typography
//                 sx={{
//                   fontSize: '1.7rem',
//                   fontWeight: 'bold',
//                   color: '#333',
//                   marginBottom: 1,
//                 }}
//               >
//                 {selectedRider.userName}'s Ride Details
//               </Typography>
//               <Divider sx={{ marginBottom: 2 }} />
//               <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'gray', mb: 1 }}>
//                 From: <strong>{selectedRider.from}</strong>
//               </Typography>
//               <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'gray', mb: 1 }}>
//                 To: <strong>{selectedRider.to}</strong>
//               </Typography>
//               <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
//                 Amount: <strong>₹{selectedRider.amount}</strong>
//               </Typography>
//               <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
//                 Time of Joining: <strong>{selectedRider.timeOfJoining}</strong>
//               </Typography>
//               <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black', mb: 1 }}>
//                 Contact: <strong>{selectedRider.contact}</strong>
//               </Typography>

//               {/* Go back button */}
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={handleGoBack}
//                 sx={{
//                   mt: 2,
//                   alignSelf: 'center',
//                   padding: '8px 16px',
//                   borderRadius: '8px',
//                   backgroundColor: '#1976d2',
//                   color: '#fff',
//                   textTransform: 'uppercase',
//                   fontWeight: 'bold',
//                   fontSize: '12px',
//                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                   transition: 'background-color 0.3s, transform 0.2s',
//                   '&:hover': {
//                       backgroundColor: '#1565c0',
//                       transform: 'scale(1.05)'
//                   },
//                   '&:active': {
//                       backgroundColor: '#0d47a1',
//                       transform: 'scale(1.02)'
//                   }
//               }}
//               >
//                 Go Back
//               </Button>
//             </>
//           ) : (
//             <List>
//               {bookings.length === 0 ? (
//                 <Typography
//                   sx={{
//                     fontSize: '1.5rem',
//                     color: '#888',
//                     textAlign: 'center',
//                   }}
//                 >
//                   No one has booked this ride yet.
//                 </Typography>
//               ) : (
//                 bookings.map((booking, index) => (
//                   <ListItemButton
//                     key={index}
//                     onClick={() => handleRiderClick(booking)}
//                     sx={{
//                       '&:hover': {
//                         backgroundColor: '#e0e0e0',
//                       },
//                       fontSize: '2.5rem',
//                     }}
//                   >
//                     <ListItemText
//                       primary={
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             fontWeight: 'semi-bold',
//                             fontSize: '1.5rem',
//                             fontFamily: 'Poppins',
//                           }}
//                         >
//                           {booking.userName}
//                         </Typography>
//                       }
//                       secondary={
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: 'gray',
//                             fontSize: '1.2rem',
//                             fontFamily: 'Lato',
//                           }}
//                         >
//                           From: {booking.from} → To: {booking.to}
//                         </Typography>
//                       }
//                       sx={{
//                         borderBottom: '1px solid silver',
//                         padding: 2,
//                       }}
//                     />
//                   </ListItemButton>
//                 ))
//               )}
//             </List>
//           )}
//         </Box>

//         {showShareButton ? (
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               marginTop: '1.5rem',
//               padding: '0.8rem 2rem',
//               fontSize: '1rem',
//               fontFamily: 'Lato',
//             }}
//           >
//             Share GPS
//           </Button>
//         ) : (
//           <Box sx={{display:'flex',alignItems: 'center', flexDirection:'column'}}>
//           <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => Navigate(`/search-ride/`)}
//                                 sx={{
//                                   mt: 4,
//                                   alignSelf: 'center',
//                                   padding: '12px 24px',
//                                   borderRadius: '8px',
//                                   backgroundColor: '#DDDDDD',
//                                   color: '#1E201E',
//                                   textTransform: 'uppercase',
//                                   fontWeight: 'bold',
//                                   fontSize: '16px',
//                                   boxShadow: '0 2px  4px rgba(0, 0, 0, 0.2)',
//                                   transition: 'background-color 0.3s, transform 0.2s',
//                                   '&:hover': {
//                                       backgroundColor: '#1E201E',
//                                       transform: 'scale(1.05)',
//                                       color: '#fff'
//                                   },
//                                   '&:active': {
//                                       backgroundColor: '#1E201E',
//                                       transform: 'scale(1.02)',
//                                   }
//                               }}
//                             >
//                                 Cancel the ride
//                             </Button>
//           <Typography
//             sx={{
//               fontSize: '0.9rem',
//               color: '#888',
//               marginTop: '1.5rem',
//               textAlign: 'center',
//             }}
//           >
//             GPS sharing will be available 30 minutes before the ride starts.
//           </Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default PostRideDetails;


import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';

// Google Maps configuration
const mapContainerStyle = {
  height: "90vh",
  width: "99%",
  margin: "15px",
  marginLeft: "7.5px",
  borderRadius: '15px', 
};

const center = {
  lat: 13.0827, // Centering at Chennai
  lng: 80.2707,
};

// Hardcoded driver route
const driverRide = {
  userName: 'Driver Name',
  from: 'MMTC Colony, Nanganallur, Chennai, Tamil Nadu 600061, India',
  to: 'Vandalur Zoo, Tamil Nadu 600048, India',
  amount: 200, // Sample fare
  date: '2024-10-08',
  time: '18:30:00',
  driverRoute: {
    origin: { lat: 12.9699248, lng: 80.18425479999999 }, // Driver's origin
    destination: { lat: 12.8812767, lng: 80.09256839999999 }, // Driver's destination
  },
};

const PostRideDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'directions'],
  });

  useEffect(() => {
    const fetchBookings = () => {
      setBookings([
        {
          userName: 'Rider Name',
          from: 'MMTC Colony, Nanganallur, Chennai',
          to: 'Vandalur Zoo, Tamil Nadu',
          amount: 150, // Sample fare for the rider
          timeOfJoining: '3:00 PM', // Example time
          contact: 'rider@example.com', // Sample contact
          riderRoute: {
            origin: { lat: 12.9699248, lng: 80.18425479999999 }, // Same as driver's origin
            destination: { lat: 12.8812767, lng: 80.09256839999999 }, // Same as driver's destination
          },
        },
      ]);
    };
    fetchBookings();

    if (isLoaded) {
      fetchDriverRoute();
    }
  }, [isLoaded]);

  // Fetching driver route directions
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

  // Handling rider selection and fetching rider's route
  const handleRiderClick = (rider) => {
    setSelectedRider(rider);
    setDirectionsResponse(null); // Clear existing directions before rendering new ones

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
        } else {
          console.error(`Error fetching rider's route: ${result}`);
        }
      }
    );
  };

  // Handling "Go Back" button to switch to driver's route
  const handleGoBack = () => {
    setSelectedRider(null);
    setDirectionsResponse(null); // Clear the rider's route first
    fetchDriverRoute(); // Fetch driver’s route again
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
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                      fontSize: '2.5rem',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: '#333',
                          }}
                        >
                          {booking.userName}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '1.2rem', color: '#666' }}
                        >
                          From: {booking.from} | To: {booking.to} | ₹{booking.amount}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))
              )}
            </List>
          )}
        </Box>
      </Box>

      {/* Right Side: Google Map */}
      <Box sx={{ flex: 1 , height: '1000px'}}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

          {/* Markers for driver's route */}
          {!selectedRider && (
            <>
              <Marker position={driverRide.driverRoute.origin} />
              <Marker position={driverRide.driverRoute.destination} />
            {/* <DirectionsRenderer directions={directionsResponse} /> */}

            </>
          )}

          {/* Markers for rider's route */}
          {selectedRider && (
            <>
              <Marker position={selectedRider.riderRoute.origin} />
              <Marker position={selectedRider.riderRoute.destination} />
            {/* <DirectionsRenderer directions={directionsResponse} /> */}

            </>
          )}
        </GoogleMap>
      </Box>
    </Box>
  );
};

export default PostRideDetails;