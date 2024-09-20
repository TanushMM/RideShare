// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const TripDetails = () => {
//     const [mapState, setMapState] = useState(1); 
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
//         if (mapState === 1 && fromCoords && toCoords && window.google) {
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
//     }, [mapState, fromCoords, toCoords]);

//     const handleCancelRide = async () => {
//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
//               }
//         };
//         const response = await axios.post("http://3.110.16.132:5100/confirmed-ride/delete", {}, config);
//         console.log(response);

//         navigate("/home");
//     };

//     const renderMapContent = () => {
//         if (mapState === 1 && directions) {
//             return <DirectionsRenderer directions={directions} />;
//         }
//         return null;
//     };

//     return (
//         <Box display="flex" height="100vh">
//             <Box flex={1} p={3} bgcolor="whitesmoke">
//                 <Typography variant="h5">Trip Details</Typography>
//                 <Typography variant="subtitle1">From: {selectedRide.from.location}</Typography>
//                 <Typography variant="subtitle1">To: {selectedRide.to.location}</Typography>
//                 <Typography variant="subtitle1">Date: {selectedRide.date}</Typography>
//                 <Typography variant="subtitle1">Time: {selectedRide.time}</Typography>
//                 <Typography variant="subtitle1">Driving Style: {selectedRide.drivingStyle}</Typography>
//                 <Typography variant="subtitle1">Seats Available: {selectedRide.seats}</Typography>
//                 <Typography variant="subtitle1">Contact: {selectedRide.email}</Typography>
//                 <Typography variant="h6">Amount to Pay: ₹{amount}</Typography>

//                 <Box mt={2}>
//                     {timeLeft > 30 ? (
//                         <Button variant="contained" color="secondary" onClick={handleCancelRide}>
//                             Cancel Ride
//                         </Button>
//                     ) : (
//                         <Typography color="red">Ride cannot be canceled within 30 minutes of start time.</Typography>
//                     )}
//                 </Box>
//             </Box>

//             <Box flex={2} p={3} position="relative">
//                 <LoadScript
//                     googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
//                     libraries={['places', 'geometry']}
//                     onLoad={() => setLoading(false)}
//                 >
//                     {loading ? (
//                         <Typography>Loading Map...</Typography>
//                     ) : (
//                         <GoogleMap
//                             mapContainerStyle={{ width: '100%', height: '100%' }}
//                             center={fromCoords}
//                             zoom={12}
//                         >
//                             {renderMapContent()}
//                             <Marker position={fromCoords} label="From" />
//                             <Marker position={toCoords} label="To" />
//                         </GoogleMap>
//                     )}
//                 </LoadScript>
//             </Box>
//         </Box>
//     );
// };

// export default TripDetails;


import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TripDetails = () => {
    const [directions, setDirections] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { selectedRide, amount } = location.state || {}; 

    if (!selectedRide) {
        return <Typography>No ride selected</Typography>;
    }

    const fromCoords = selectedRide.from.coordinates;
    const toCoords = selectedRide.to.coordinates;

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const rideStartTime = new Date(`${selectedRide.date}T${selectedRide.time}`);
            const difference = rideStartTime - now;
            const minutesLeft = Math.floor(difference / 60000);
            setTimeLeft(minutesLeft);
        };

        calculateTimeLeft();
        const intervalId = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, [selectedRide.date, selectedRide.time]);

    useEffect(() => {
        if (fromCoords && toCoords && window.google) {
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
    }, [fromCoords, toCoords]);

    const handleCancelRide = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            }
        };
        const response = await axios.post("http://3.110.16.132:5100/confirmed-ride/delete", {}, config);
        console.log(response);

        navigate("/home");
    };

    const handlePay = async () => {
        navigate('/payment-summary');
    }

    const renderMapContent = () => {
        if (directions) {
            return <DirectionsRenderer directions={directions} />;
        }
        return null;
    };

    return (
        <Grid container spacing={3} sx={{ height: '90vh', p: 3, marginTop: '75px' }}>
            {/* Left Column - Trip Information */}
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>Trip Details</Typography>
                    <Typography variant="subtitle1"><strong>From:</strong> {selectedRide.from.location}</Typography>
                    <Typography variant="subtitle1"><strong>To:</strong> {selectedRide.to.location}</Typography>
                    <Typography variant="subtitle1"><strong>Date:</strong> {selectedRide.date}</Typography>
                    <Typography variant="subtitle1"><strong>Time:</strong> {selectedRide.time}</Typography>
                    <Typography variant="subtitle1"><strong>Driving Style:</strong> {selectedRide.drivingStyle}</Typography>
                    <Typography variant="subtitle1"><strong>Seats Available:</strong> {selectedRide.seats}</Typography>
                    <Typography variant="subtitle1"><strong>Contact:</strong> {selectedRide.email}</Typography>
                    <Typography variant="h6" gutterBottom><strong>Amount to Pay:</strong> ₹{amount}</Typography>

                    <Box mt={2}>
                        {timeLeft > 30 ? (
                            <Button variant="contained" color="secondary" onClick={handleCancelRide}>
                                Cancel Ride
                            </Button>
                        ) : (
                            <Typography color="red">Ride cannot be canceled within 30 minutes of start time.</Typography>
                        )}
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="secondary" onClick={handlePay}>
                            Pay
                        </Button>
                    </Box>
                </Paper>
            </Grid>

            {/* Right Column - Map */}
            <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                    <LoadScript
                        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                        libraries={['places', 'geometry']}
                        onLoad={() => setLoading(false)}
                    >
                        {loading ? (
                            <Typography>Loading Map...</Typography>
                        ) : (
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                center={fromCoords}
                                zoom={12}
                            >
                                <Marker position={fromCoords} label="From" />
                                <Marker position={toCoords} label="To" />
                                {renderMapContent()}
                            </GoogleMap>
                        )}
                    </LoadScript>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TripDetails;
