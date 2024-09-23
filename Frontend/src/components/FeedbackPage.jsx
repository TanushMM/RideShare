import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Rating, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        const submit = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                  }
            };
            const post_data = JSON.parse(sessionStorage.getItem('bookedRide')); // this is the information about the poster
            try {
                const response = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/feedback/searcher/post`, {
                    'poster': post_data.email,
                    'rating': rating,
                    'comments': comments
                }, config);
                console.log(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }

            try {
                const response = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/confirmed-ride/delete`, {}, config);
                console.log(response.data);

                sessionStorage.removeItem('bookedRide');
                sessionStorage.removeItem('amount');
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        submit();
        navigate('/');
    };

    const handleSkip = () => {
        console.log('Feedback skipped');
        const submit = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                  }
            };
            try {
                const response = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/confirmed-ride/delete`, {}, config);
                console.log(response.data);

                sessionStorage.removeItem('bookedRide');
                sessionStorage.removeItem('amount');
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        submit();
        navigate('/');
    };

    return (
        <Box 
            sx={{
                mt: 10, 
                padding: 3,
                background: "#ffffff",
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0.3px 1.5px 1.5px',
                borderRadius: 3,
                width: '40%',
                height: '500px',
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
            <Typography className='Heading' textAlign={'center'}>
                Feedback
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', gap: 3 }}>
                <Typography className='Primary'>
                    Rate your ride:
                </Typography>
                <Rating
                    name="ride-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
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

            <Box sx={{ mt: 3 }}>
                <Typography className='Primary'>
                    Comments:
                </Typography>
                <TextField
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    label="Your Comments"
                    variant="outlined"
                />
            </Box>

            <Box sx={{ mt: 4,ml:3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
                            transform: 'scale(1.05)'
                        },
                        '&:active': {
                            backgroundColor: '#0d47a1',
                            transform: 'scale(1.02)'
                        }
                    }}
                >
                    Submit Feedback
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        textDecoration: 'underline',
                        color: '#1976d2',
                        fontSize: "17px",
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#0d47a1',
                        }
                    }}
                    onClick={handleSkip}
                >
                    Skip
                </Typography>
            </Box>
        </Box>
    );
};

export default FeedbackPage;