import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchRidePage = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const [fromCoords, setFromCoords] = useState(null); 
    const [toCoords, setToCoords] = useState(null);     
    const [distance, setDistance] = useState(null); 
    const [travelTime, setTravelTime] = useState(null); // Store travel time based on traffic

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);

    const navigate = useNavigate();

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
    };

    const getDistance = async () => {
        if (fromCoords && toCoords) {
            const service = new window.google.maps.DistanceMatrixService();
            const now = new Date(); // Use the current time for traffic data

            const response = await service.getDistanceMatrix({
                origins: [{ lat: fromCoords.lat, lng: fromCoords.lng }],
                destinations: [{ lat: toCoords.lat, lng: toCoords.lng }],
                travelMode: window.google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: now,  // Use current time or user-defined time for traffic data
                    trafficModel: 'bestguess', // Traffic models: 'optimistic', 'pessimistic', 'bestguess'
                },
                unitSystem: window.google.maps.UnitSystem.METRIC, // Get distance in meters
            });

            if (response && response.rows[0].elements[0].status === "OK") {
                const distanceValue = response.rows[0].elements[0].distance.value; 
                const distanceText = response.rows[0].elements[0].distance.text;   
                const travelTimeValue = response.rows[0].elements[0].duration_in_traffic.value; // Travel time based on traffic
                const travelTimeText = response.rows[0].elements[0].duration_in_traffic.text;   // Human-readable travel time
                setDistance(distanceValue);
                setTravelTime(travelTimeValue);
                console.log('Distance:', distanceText, 'Travel Time:', travelTimeText);
            } else {
                console.error('Distance calculation failed:', response);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!from || !to || !date || !time || !fromCoords || !toCoords || !distance || !travelTime) {
            alert("Please fill all the fields and ensure the distance and travel time are calculated.");
            return;
        }

        // Format date and time separately
        const formattedDate = date ? date.toISOString().split('T')[0] : null; // YYYY-MM-DD
        const formattedTime = time ? time.toISOString().split('T')[1].split('.')[0] : null; // HH:MM:SS

        // Construct the data object to be sent to the backend
        const data = {
            from: {
                location: from,
                coordinates: fromCoords,
            },
            to: {
                location: to,
                coordinates: toCoords,
            },
            date: formattedDate,   // Send formatted date
            time: formattedTime,   // Send formatted time
            distance: distance,    // Send the distance in meters
            travelTime: travelTime, // Send the travel time in seconds (based on traffic)
        };

        // Fetch the JWT token from session storage
        const token = sessionStorage.getItem('jwt');

        try {
            // Configuring the request headers with the JWT token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            // Making the POST request to the backend service
            const response = await axios.post("http://3.110.16.132:5100/search-ride/post", data, config);
            console.log("Response:", response.data);

            // If the response is successful, navigate to the ride results page
            if (response.status === 200) {
                navigate('/ride-results');
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            alert("Not Logged in");
            navigate("/");
        }

        const loadAutocomplete = () => {
            if (fromInputRef.current && window.google) {
                const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current, { types: ['geocode'] });
                fromAutocomplete.addListener('place_changed', () => {
                    const place = fromAutocomplete.getPlace();
                    if (place.geometry) {
                        setFrom(place.formatted_address);
                        setFromCoords({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        });
                    }
                });
            }

            if (toInputRef.current && window.google) {
                const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current, { types: ['geocode'] });
                toAutocomplete.addListener('place_changed', () => {
                    const place = toAutocomplete.getPlace();
                    if (place.geometry) {
                        setTo(place.formatted_address);
                        setToCoords({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        });
                    }
                });
            }
        };

        if (window.google) {
            loadAutocomplete();
        }
    }, []);

    useEffect(() => {
        if (fromCoords && toCoords) {
            getDistance();
        }
    }, [fromCoords, toCoords]);

    useEffect(() => {
        if (!from) setFromCoords(null);
        if (!to) setToCoords(null);
    }, [from, to]);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            {/* Map Section */}
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={fromCoords || { lat: 12.979154, lng: 80.199172 }} 
                    zoom={10}
                >
                    {fromCoords && <Marker position={fromCoords} />}
                    {toCoords && <Marker position={toCoords} />}
                </GoogleMap>
            </LoadScript>
        
            {/* Floating Form Section */}
            <Box sx={{ position: 'absolute', top: '55%', left: '80%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 10, width: { xs: '100%', sm: '24rem' }, border: '1px solid', borderColor: 'grey.300' }}>
                <Typography variant="h6" sx={{fontSize:30 , fontFamily:'Poppins', fontWeight: 500}} gutterBottom>
                    SEEK A RIDE
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        inputRef={fromInputRef}
                        label="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Enter starting location"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        inputRef={toInputRef}
                        label="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter destination"
                        variant="outlined"
                        fullWidth
                    />
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box
                            component="form"
                            noValidate
                            sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                        >
                            <DatePicker
                                label="Select Date"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                minDate={new Date()}
                            />
                            <TimePicker
                                label="Select Time"
                                value={time}
                                onChange={(newTime) => setTime(newTime)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Box>
                    </LocalizationProvider>

                    <Button onClick={handleSubmit} variant="contained" color="primary" sx={{fontFamily: 'Lato', fontWeight: 540}} fullWidth>
                        Search
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default SearchRidePage;
