import React, { useState } from 'react';
import { Box, Button, Typography, Rating, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DriverFeedback = () => {
    const [ratings, setRatings] = useState({});
    const navigate = useNavigate();

    const riders = JSON.parse(sessionStorage.getItem('riders'));

    console.log(riders);

    const handleRatingChange = (riderId, newRating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [riderId]: newRating,
        }));
    };

    const handleSubmit = () => {
        const submitFeedback = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                },
            };
            try {
                for (const rider of riders) {
                    const rating = ratings[rider._id] || 0; 
                    const response = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/feedback/poster/post`, {
                        rider: rider.email, 
                        rating: rating,
                    }, config);
                    
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        submitFeedback();

        sessionStorage.removeItem("driver");
        sessionStorage.removeItem("riders");

        navigate('/');
    };

    const handleSkip = () => {
        sessionStorage.removeItem("driver");
        sessionStorage.removeItem("riders");
        navigate('/');
    };

    return (
        <Box
            sx={{
                mt: 10,
                padding: 3,
                background: '#ffffff',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0.3px 1.5px 1.5px',
                borderRadius: 3,
                width: '40%',
                height: 'auto',
                ml: '32%',
                '& .Heading': {
                    marginBottom: 1.5,
                    fontSize: '2.3rem',
                    color: 'black',
                    fontWeight: '550',
                    fontFamily: 'Poppins',
                },
                '& .Primary': {
                    marginBottom: 1.5,
                    fontSize: '1.9rem',
                    color: 'black',
                    fontFamily: 'Lato',
                },
            }}
        >
            <Typography className="Heading" textAlign={'center'}>
                Rate Each Rider
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {riders.map((rider) => (
                <Box key={rider._id} sx={{ mt: 3, display: 'flex', flexDirection: 'row', gap: 3 }}>
                    <Typography className="Primary">{rider.email}:</Typography>
                    <Rating
                        name={`rating-${rider._id}`}
                        value={ratings[rider._id] || 0}
                        onChange={(event, newValue) => handleRatingChange(rider._id, newValue)}
                        precision={0.5}
                        sx={{
                            '& .MuiRating-icon': {
                                fontSize: '3rem',
                                color: '#FFD700',
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#d3d3d3',
                            },
                            '& .MuiRating-icon:hover': {
                                color: '#ffcc00',
                            },
                        }}
                    />
                </Box>
            ))}

            <Box sx={{ mt: 4, ml: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{
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
                            transform: 'scale(1.05)',
                        },
                        '&:active': {
                            backgroundColor: '#0d47a1',
                            transform: 'scale(1.02)',
                        },
                    }}
                >
                    Submit Feedback
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        textDecoration: 'underline',
                        color: '#1976d2',
                        fontSize: '17px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#0d47a1',
                        },
                    }}
                    onClick={handleSkip}
                >
                    Skip
                </Typography>
            </Box>
        </Box>
    );
};

export default DriverFeedback;