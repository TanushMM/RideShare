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
    const [travelTime, setTravelTime] = useState(null);

    const [rideExists, setRideExists] = useState(false); 
    const [rideId, setRideId] = useState(null); 

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkRide = async () => {
            const token = sessionStorage.getItem('jwt');

            if (!token) {
                alert("Not Logged in");
                navigate("/");
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                };
                const response = await axios.get('http://127.0.0.1:8000/ride/confirmed-ride/find', config);

                if (response.data && response.data._id) {
                    setRideExists(true); 
                    setRideId(response.data._id); 
                } else {
                    setRideExists(false); 
                }
            } catch (error) {
                console.error('Error checking ride:', error);
                navigate('/'); 
            }
        };

        checkRide();
    }, [navigate]);

    const cancelRide = async () => {
        try {
            const token = sessionStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            await axios.post('http://127.0.0.1:8000/ride/confirmed-ride/delete', {}, config);
            alert('Search ride has been canceled.');
            setRideExists(false);
        } catch (error) {
            console.error('Error canceling the ride:', error);
        }
    };

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
    };

    const getDistance = async () => {
        if (fromCoords && toCoords) {
            const service = new window.google.maps.DistanceMatrixService();
            const now = new Date(); 

            const response = await service.getDistanceMatrix({
                origins: [{ lat: fromCoords.lat, lng: fromCoords.lng }],
                destinations: [{ lat: toCoords.lat, lng: toCoords.lng }],
                travelMode: window.google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: now,
                    trafficModel: 'bestguess', 
                },
                unitSystem: window.google.maps.UnitSystem.METRIC,
            });

            if (response && response.rows[0].elements[0].status === "OK") {
                const distanceValue = response.rows[0].elements[0].distance.value;
                const travelTimeValue = response.rows[0].elements[0].duration_in_traffic.value;
                setDistance(distanceValue);
                setTravelTime(travelTimeValue);
            } else {
                console.error('Distance calculation failed:', response);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!from || !to || !date || !time || !fromCoords || !toCoords || !distance || !travelTime) {
            alert("Please fill all the fields and ensure the distance and travel time are calculated.");
            return;
        }

        const formattedDate = date ? date.toISOString().split('T')[0] : null; 
        const formattedTime = time ? time.toISOString().split('T')[1].split('.')[0] : null;

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
            distance: distance,
            travelTime: travelTime,
        };

        const token = sessionStorage.getItem('jwt');

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post("http://127.0.0.1:8000/ride/search-ride/post", data, config);
            if (response.status === 200) {
                navigate('/ride-results');
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
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

    if (rideExists) {
        const tripPage = () => {
            navigate('/trip-details');
        }
        return (
            <Box sx={{ position: 'relative', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h6">There is an existing ride search. Please cancel it to continue.</Typography>
                <Button variant="contained" color="primary" onClick={cancelRide} sx={{ mt: 2 }}>
                    Cancel Existing Search
                </Button>
                <Button variant="contained" color="primary" onClick={tripPage} sx={{ mt: 2 }}>
                    Existing ride details
                </Button>
            </Box>
        );
    }

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
        
            <Box sx={{ position: 'absolute', top: '55%', left: '80%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', zIndex: 10, width: { xs: '100%', sm: '24rem' }, border: '1px solid', borderColor: 'grey.300' }}>
                <Typography variant="h6" sx={{fontSize:30 , fontFamily:'Poppins', fontWeight: 500}} gutterBottom>
                    SEEK A RIDE
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        inputRef={fromInputRef}
                        label="From"
                        variant="outlined"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <TextField
                        inputRef={toInputRef}
                        label="To"
                        variant="outlined"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Time"
                            value={time}
                            onChange={(newValue) => setTime(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default SearchRidePage;
