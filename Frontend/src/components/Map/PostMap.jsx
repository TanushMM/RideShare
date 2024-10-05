import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const PostRidePage = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [seats, setSeats] = useState('2');
    const [drivingStyle, setDrivingStyle] = useState('fast');
    
    const [fromCoords, setFromCoords] = useState(null);
    const [toCoords, setToCoords] = useState(null);

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
    };

    const handleSubmit = async () => {
        if (!from || !to || !date || !time || !fromCoords || !toCoords) {
            alert("Please fill all the fields");
            return;
        }

        const formattedDate = date ? date.toLocaleDateString('en-CA') : null;
        const formattedTime = time ? time.toLocaleTimeString('en-GB', { hour12: false }) : null;

        const data = {
            from: {
                location: from,
                coordinates: fromCoords,
            },
            to: {
                location: to,
                coordinates: toCoords,
            },
            date: formattedDate,   
            time: formattedTime,   
            seats: seats,
            drivingStyle: drivingStyle,
        };

        const token = sessionStorage.getItem('jwt');

        try {
           
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/post-ride/post`, data, config);
            console.log("Response:", response.data);

            if (response.status === 200) {
                navigate('/post-ride-details');
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("jwt") === null) {
            alert("Not Logged in")
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

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={fromCoords || { lat: 12.979154, lng: 80.199172 }}
                    zoom={12}
                >
                    {fromCoords && <Marker position={fromCoords} />}
                    {toCoords && <Marker position={toCoords} />}
                </GoogleMap>
            </LoadScript>

            <Box sx={{ position: 'absolute', top: '55%', left: '80%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 10, width: { xs: '100%', sm: '24rem' }, border: '1px solid', borderColor: 'grey.300' }}>
                <Typography variant="h6" sx={{ fontSize: 30, fontFamily: 'Poppins', fontWeight: 500 }} gutterBottom>
                POST YOUR JOURNEY
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

                    {/* Seats selection */}
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel>Seats</InputLabel>
                            <Select
                                value={seats}
                                onChange={(e) => setSeats(e.target.value)}
                                label="Seats"
                                sx={{ 
                                    fontSize: '1.2rem',
                                    fontWeight: 'semi-bold',
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            fontSize: '1rem',
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="2">2 Seater</MenuItem>
                                <MenuItem value="3">3 Seater</MenuItem>
                                <MenuItem value="4">4 Seater</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Driving Style</InputLabel>
                            <Select
                                value={drivingStyle}
                                onChange={(e) => setDrivingStyle(e.target.value)}
                                label="Driving Style"
                                sx={{ 
                                    fontSize: '1.2rem',
                                    fontWeight: 'semi-bold',
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            fontSize: '1rem',
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="fast">Fast Paced</MenuItem>
                                <MenuItem value="slow">Slow Paced</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box
                            component="form"
                            noValidate
                            sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}
                        >
                            <DatePicker
                                label="Select Date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                minDate={new Date()}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Select Time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                                minTime={new Date()}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </LocalizationProvider>
                    </Box >

                    <Button onClick={handleSubmit} variant="contained" color="primary"  sx={{height: 40, fontFamily: 'Lato'}} fullWidth>
                        Post
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default PostRidePage;
