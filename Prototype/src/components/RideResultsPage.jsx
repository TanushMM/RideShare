import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, List, ListItem, Button, Card, CardContent, Divider } from '@mui/material';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DirectionsIcon from '@mui/icons-material/Directions'; 
import axios from 'axios';

const RideResultsPage = () => {
    const [rides, setRides] = useState([]);
    const [data, setData] = useState([]);
    const [selectedRide, setSelectedRide] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://3.110.16.132:5100/match-ride/match'); 
                setRides(response.data.post_data); 
                setData(response.data.match_result);
                console.log(response.data.match_result);

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
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places', 'directions']}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={selectedRide ? selectedRide.from.coordinates : { lat: 13.0355, lng: 80.2315 }}
                >
                    {selectedRide && directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </LoadScript>

            <Box sx={{ 
                position: 'fixed',
                top: '120px',
                right: '100px',
                height: '80vh', 
                width: { xs: '100%', sm: '30%' }, 
                backgroundColor: '#F5F5F5', 
                paddingTop: '20px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                borderRadius: '16px', 
                overflowY: 'auto',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {selectedRide ? (
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Button
                                onClick={handleBackToMatches}
                                sx={{ mr: 2 }}
                            >
                                <KeyboardArrowLeftIcon fontSize='large' />
                            </Button>
                            <Typography variant="h6" sx={{ fontSize: 30, fontFamily: 'Poppins', fontWeight: 500 }}>
                                Ride Details
                            </Typography>
                        </Box>
                        <Box sx={{
                            padding: '16px',
                            height: '68vh',
                            borderRadius: '12px',
                            background: '#ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left', mt: 5, ml: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>From:</strong> {selectedRide.from.location}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>To:</strong> {selectedRide.to.location}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>Date:</strong> {selectedRide.date}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>Time:</strong> {selectedRide.time}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>Seats Available:</strong> {selectedRide.seats}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>Driving Style:</strong> {selectedRide.drivingStyle}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'Semi-bold', fontSize: '20px', fontFamily: 'Lato' }}>
                                    <strong>Price:</strong> {data.amount}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/ride-details/`, { state: { selectedRide, data } })}
                                sx={{
                                    mt: 2,
                                    alignSelf: 'center',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'background-color 0.3s, transform 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                        transform: 'scale(1.05)'
                                    },
                                    '&:active': {
                                        backgroundColor: '#0d47a1',
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            >
                                View Full Details
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h6" sx={{ fontSize: 30, fontFamily: 'Poppins', fontWeight: 500, mb: 2 }}>
                            Matches Found
                        </Typography>
                        <Box sx={{ flex: 1, overflowY: 'auto', background: '#ffffff', borderRadius: '12px' }}>
                            <List>
                                {memoizedRides.map((ride) => (
                                    <ListItem
                                        button
                                        key={ride.id}
                                        onClick={() => handleSelectRide(ride)}
                                        selected={selectedRide && selectedRide.id === ride.id}
                                        sx={{
                                            mb: 1,
                                            borderRadius: '8px',
                                            transition: 'background-color 0.3s, transform 0.2s',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                                transform: 'scale(1.02)'
                                            },
                                        }}
                                    >
                                        <Card sx={{ width: '100%', boxShadow: 'none' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'semi-bold' }}>
                                                    {ride.from.location} to {ride.to.location}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    <DirectionsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                                    Date: {ride.date}, Time: {ride.time}
                                                </Typography>
                                            </CardContent>
                                        <Divider component="li" />

                                        </Card>
                                        
                                        </ListItem>
                                        
                                ))}
                                
                            </List>
                        </Box>
                    </>
                )}
            </Box>
        </div>
    );
};

export default RideResultsPage;
