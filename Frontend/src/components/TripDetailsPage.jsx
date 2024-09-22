// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, Grid, Paper } from '@mui/material';
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const TripDetails = () => {
//     const [directions, setDirections] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [timeLeft, setTimeLeft] = useState(null);

//     const location = useLocation();
//     const navigate = useNavigate();
//     const { selectedRide, amount } = location.state || {}; 

//     if (!selectedRide) {
//         return <Typography>No ride selected</Typography>;
//     }

//     const fromCoords = selectedRide.from.coordinates;
//     const toCoords = selectedRide.to.coordinates;

//     useEffect(() => {
//         const calculateTimeLeft = () => {
//             const now = new Date();
//             const rideStartTime = new Date(`${selectedRide.date}T${selectedRide.time}`);
//             const difference = rideStartTime - now;
//             const minutesLeft = Math.floor(difference / 60000);
//             setTimeLeft(minutesLeft);
//         };

//         calculateTimeLeft();
//         const intervalId = setInterval(calculateTimeLeft, 60000); // Update every minute

//         return () => clearInterval(intervalId);
//     }, [selectedRide.date, selectedRide.time]);

//     useEffect(() => {
//         if (fromCoords && toCoords && window.google) {
//             const directionsService = new window.google.maps.DirectionsService();
//             directionsService.route({
//                 origin: fromCoords,
//                 destination: toCoords,
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//             }, (result, status) => {
//                 if (status === 'OK') {
//                     setDirections(result);
//                 }
//             });
//         }
//     }, [fromCoords, toCoords]);

//     const handleCancelRide = async () => {
//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
//             }
//         };
//         const response = await axios.post("http://3.110.16.132:5100/confirmed-ride/delete", {}, config);
//         console.log(response);

//         navigate("/home");
//     };

//     const handlePay = async () => {
//         navigate('/payment-summary');
//     }

//     const renderMapContent = () => {
//         if (directions) {
//             return <DirectionsRenderer directions={directions} />;
//         }
//         return null;
//     };

//     return (
//         <Grid container spacing={3} sx={{ height: '90vh', p: 3, marginTop: '75px' }}>
//             {/* Left Column - Trip Information */}
//             <Grid item xs={12} md={4}>
//                 <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
//                     <Typography variant="h5" gutterBottom>Trip Details</Typography>
//                     <Typography variant="subtitle1"><strong>From:</strong> {selectedRide.from.location}</Typography>
//                     <Typography variant="subtitle1"><strong>To:</strong> {selectedRide.to.location}</Typography>
//                     <Typography variant="subtitle1"><strong>Date:</strong> {selectedRide.date}</Typography>
//                     <Typography variant="subtitle1"><strong>Time:</strong> {selectedRide.time}</Typography>
//                     <Typography variant="subtitle1"><strong>Driving Style:</strong> {selectedRide.drivingStyle}</Typography>
//                     <Typography variant="subtitle1"><strong>Seats Available:</strong> {selectedRide.seats}</Typography>
//                     <Typography variant="subtitle1"><strong>Contact:</strong> {selectedRide.email}</Typography>
//                     <Typography variant="h6" gutterBottom><strong>Amount to Pay:</strong> ₹{amount}</Typography>

//                     <Box mt={2}>
//                         {timeLeft > 30 ? (
//                             <Button variant="contained" color="secondary" onClick={handleCancelRide}>
//                                 Cancel Ride
//                             </Button>
//                         ) : (
//                             <Typography color="red">Ride cannot be canceled within 30 minutes of start time.</Typography>
//                         )}
//                     </Box>
//                     <Box mt={2}>
//                         <Button variant="contained" color="secondary" onClick={handlePay}>
//                             Pay
//                         </Button>
//                     </Box>
//                 </Paper>
//             </Grid>

//             {/* Right Column - Map */}
//             <Grid item xs={12} md={8}>
//                 <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
//                     <LoadScript
//                         googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
//                         libraries={['places', 'geometry']}
//                         onLoad={() => setLoading(false)}
//                     >
//                         {loading ? (
//                             <Typography>Loading Map...</Typography>
//                         ) : (
//                             <GoogleMap
//                                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                                 center={fromCoords}
//                                 zoom={12}
//                             >
//                                 <Marker position={fromCoords} label="From" />
//                                 <Marker position={toCoords} label="To" />
//                                 {renderMapContent()}
//                             </GoogleMap>
//                         )}
//                     </LoadScript>
//                 </Paper>
//             </Grid>
//         </Grid>
//     );
// };

// export default TripDetails;


import  { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, CircularProgress, Divider } from '@mui/material';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TripDetails = () => {
    const [mapState, setMapState] = useState(1); // 1 for routing, 2 for real-time tracking
    const [fromCoords, setFromCoords] = useState({ lat: 12.9556074, lng: 80.1868681 }); // Default coordinates
    const [toCoords, setToCoords] = useState({ lat: 12.8438835, lng: 80.0597364 }); // Default coordinates
    const [directions, setDirections] = useState(null); // Route details
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);
    const [bookedRide, setBookedRide] = useState(null); 
    const [amount, setAmount] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            if (sessionStorage.getItem('bookedRide') === null) {
                try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                      }
                };
                const response = await axios.get(`http://3.110.16.132:5100/confirmed-ride/find`, config);
                console.log(response.data);

                sessionStorage.setItem('bookedRide', JSON.stringify(response.data.poster));
                sessionStorage.setItem('amount', JSON.stringify(response.data.amount));
            } catch (error) {
                console.error("Error:", error);
            }

            }
        }
        getData();
    }, []);
    useEffect(() => {
        const rideData = JSON.parse(sessionStorage.getItem('bookedRide'));
        setBookedRide(rideData);
        
        const amountFromStorage = JSON.parse(sessionStorage.getItem('amount')); 
        if (rideData) {
            setFromCoords(rideData.from.coordinates);
            setToCoords(rideData.to.coordinates);
            
            if (rideData.date && rideData.time) {
                const rideStartTime = new Date(`${rideData.date}T${rideData.time}`);
                const now = new Date();
                const difference = rideStartTime - now;
                const minutesLeft = Math.floor(difference / 60000);
                setTimeLeft(minutesLeft);
            }
        }
        if (amountFromStorage) {
            setAmount(amountFromStorage); // Set the amount state
        }
    }, []);
    
    

    useEffect(() => {
        if (mapState === 1 && fromCoords && toCoords && window.google) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route({
                origin: fromCoords,
                destination: toCoords,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === 'OK') {
                    setDirections(result);
                }
            });
        }
    }, [mapState, fromCoords, toCoords]);

    const handleCancelRide = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            }
        };
        const response = await axios.post("http://3.110.16.132:5100/confirmed-ride/delete", {}, config);
        console.log(response.data);

        navigate("/home");
    };

    const handlePay = () => {
        navigate('/payment-summary');
    }

    const renderMapContent = () => {
        if (mapState === 1 && directions) {
            return <DirectionsRenderer directions={directions} />;
        }
        return null;
    };

    return (
        <Box display="flex" height="100vh" bgcolor="#f5f5f5">
            <Grid container>
                {/* <BookingConfirmationPopup open={open} onClose={handlePopupClose} /> */}

                <Grid item xs={12} md={5} p={3} bgcolor="white" sx={{
                    textAlign: 'left',
                    p: 6,
                    boxShadow: 3,
                    '& .Heading': {
                        marginBottom: 1.5,
                        fontSize: '2rem',
                        color: 'black',
                        fontWeight: '550',
                        fontFamily: 'Poppins',
                    },
                    '& .Primary': {
                        marginBottom: 1.5,
                        fontSize: '1.4rem',
                        color: 'black',
                        fontFamily: 'Lato',
                    },
                }}>
                    <Typography className='Heading'>Trip Details</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography className='Primary'><strong>From: </strong>{bookedRide?.from?.location}</Typography>
                    <Typography className='Primary'><strong>To: </strong>{bookedRide?.to?.location}</Typography>
                    <Typography className='Primary'><strong>Date: </strong> {bookedRide?.date}</Typography>
                    <Typography className='Primary'><strong>Time: </strong>{bookedRide?.time}</Typography>
                    <Typography className='Primary'><strong>Driving Style: </strong> {bookedRide?.drivingStyle}</Typography>
                    <Typography className='Primary'><strong>Seats Available: </strong> {bookedRide?.seats}</Typography>
                    <Typography className='Primary'><strong>Contact: </strong> {bookedRide?.email}</Typography>
                    <Typography variant="h6" mt={2}><strong>Amount to Pay: </strong> ₹{amount}</Typography>

                    <Box mt={2} flexDirection = {'column'} display={'flex'}>
                        {timeLeft > 30 ? ( <>
                            <Button onClick={handleCancelRide}
                                sx={{
                                    mt: 2,
                                    alignSelf: 'center',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    backgroundColor: '#DDDDDD',
                                    color: '#1E201E',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'background-color 0.3s, transform 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#1E201E',
                                        transform: 'scale(1.05)',
                                        color: '#fff'
                                    },
                                    '&:active': {
                                        backgroundColor: '#0d47a1',
                                        transform: 'scale(1.02)',
                                    }
                                }}
                            >
                                Cancel Ride
                            </Button>
                            <Button onClick={handlePay}
                            sx={{
                                mt: 2,
                                alignSelf: 'center',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                backgroundColor: '#DDDDDD',
                                color: '#1E201E',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'background-color 0.3s, transform 0.2s',
                                '&:hover': {
                                    backgroundColor: '#1E201E',
                                    transform: 'scale(1.05)',
                                    color: '#fff'
                                },
                                '&:active': {
                                    backgroundColor: '#0d47a1',
                                    transform: 'scale(1.02)',
                                }
                            }}
                        >
                            Pay
                        </Button>
                        </> ) : (
                            <Typography color="red">Ride cannot be canceled within 30 minutes of start time.</Typography>
                        )}
                    </Box>
                </Grid>

                {/* Right Section: Map */}
                <Grid item xs={12} md={7} p={3}>
                    <LoadScript
                        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                        libraries={['places', 'geometry']}
                        onLoad={() => setLoading(false)}
                    >
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box sx={{ height: '80%', mt: 2, borderRadius: '8px', boxShadow: 2 }}>
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                    center={fromCoords}
                                    zoom={12}
                                >
                                    {renderMapContent()}
                                    <Marker position={fromCoords} label="From" />
                                    <Marker position={toCoords} label="To" />
                                </GoogleMap>
                            </Box>
                        )}
                    </LoadScript>

                    {/* Box for Real-Time Tracking Message */}
                    <Box mt={2} p={2} bgcolor="#EFECEC" borderRadius="8px">
                        <Typography variant="subtitle1" align="center">
                            Real-time tracking will be available 30 minutes prior to the ride.
                        </Typography>
                    </Box> 
                </Grid>
            </Grid>
        </Box>
    );
};

export default TripDetails;