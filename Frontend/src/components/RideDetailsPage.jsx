import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import axios from 'axios';
import gsap from 'gsap';


const RideDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchRide, selectedRide, amount } = location.state || {};

    // Refs for GSAP animations
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const detailsRef = useRef(null);
    const buttonRef = useRef(null);
    const animationRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // GSAP animation for page load
        gsap.set(containerRef.current, { opacity: 0, y: 50 });
        gsap.set(headingRef.current, { opacity: 0, x: -100 });
        gsap.set(buttonRef.current, { opacity: 0, scale: 0 });
        gsap.set(animationRef.current, { opacity: 0, x: 100 });
        gsap.set(textRef.current, { opacity: 0, x: 100 });

        const tl = gsap.timeline();

        tl.to(containerRef.current, {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: 'power3.out',
        })
        .to(headingRef.current, {
            duration: 0.7,
            opacity: 1,
            x: 0,
            ease: 'power3.out',
        }, "-=0.5")
        .to(animationRef.current, {
            duration: 0.5,
            opacity: 1,
            x: 0,
            ease: 'power3.out',
        }, "-=1")
        .to(textRef.current, {
            duration: 1,
            opacity: 1,
            x: 0,
            ease: 'power3.out',
        }, "-=0.8")

        .to(detailsRef.current.children, {
            duration: 0.3,
            opacity: 1,
            stagger: 0.2,
            y: 20,
            ease: 'power3.out',
        }, "-=0.3")
        .to(buttonRef.current, {
            duration: 0.3,
            opacity: 1,
            scale: 1,
            ease: 'back.out(1.7)',
        }, "-=0.5")

    }, []);

    const handleBookClick = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                }
            };
            const response = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}:8000/ride/confirmed-ride/post`, {
                searcher: sessionStorage.getItem('email'),
                searchRide: searchRide,
                poster: selectedRide,
                amount: amount
            }, config);

            sessionStorage.setItem('searchRide', JSON.stringify(searchRide));
            sessionStorage.setItem('bookedRide', JSON.stringify(selectedRide));
            sessionStorage.setItem('amount', JSON.stringify(amount));

            console.log(response.data);
            gsap.to(containerRef.current, {
                duration: 0.5,
                opacity: 0,
                y: 50,
                ease: 'power3.in',
                onComplete: () => navigate('/trip-details/')
            });
        } catch (error) {
            console.error('Error booking the ride:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                padding: { xs: 2, sm: 4 },
            }}
        >
            {/* Left Side - Details Box */}
            <Paper
                ref={containerRef}
                elevation={4}
                sx={{
                    padding: { xs: 3, sm: 5 },
                    background: "#ffffff",
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    boxShadow: 0,
                    maxWidth: 600,
                    width: '100%',
                    marginRight: { md: 6 },
                    marginBottom: { xs: 4, md: 0 },
                    '& .Heading': {
                        marginBottom: 1.5,
                        fontSize: { xs: '1.6rem', sm: '2rem' },
                        color: 'black',
                        fontWeight: 600,
                        fontFamily: 'Poppins, sans-serif',
                    },
                    '& .Primary': {
                        marginBottom: 1.5,
                        fontSize: { xs: '1.1rem', sm: '1.4rem' },
                        color: 'black',
                        fontFamily: 'Lato, sans-serif',
                    },
                }}
            >
                <Typography ref={headingRef} className='Heading'>
                    Ride Details
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Box ref={detailsRef}>
                    <Typography variant="body1" className='Primary'>
                        <strong>Driver Name:</strong> {selectedRide?.email || 'N/A'}
                    </Typography>
                    <Typography variant="body1" className='Primary'>
                        <strong>Seats Available:</strong> {selectedRide?.seats || 'N/A'}
                    </Typography>
                    <Typography variant="body1" className='Primary'>
                        <strong>Pickup Location:</strong> {selectedRide?.from?.location || 'N/A'}
                    </Typography>
                    <Typography variant="body1" className='Primary'>
                        <strong>Dropoff Location:</strong> {selectedRide?.to?.location || 'N/A'}
                    </Typography>
                    <Typography variant="body1" className='Primary'>
                        <strong>Driving Style:</strong> {selectedRide?.drivingStyle || 'N/A'}
                    </Typography>
                    <Typography variant="body1" className='Primary'>
                        <strong>Date:</strong> {selectedRide?.date || 'N/A'}
                    </Typography>
                    <Typography variant="body1" className='Primary'>
                        <strong>Time:</strong> {selectedRide?.time || 'N/A'}
                    </Typography>

                    {amount && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mt: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Amount to pay:</Typography>
                            <Typography
                                variant="body2"
                                sx={{ mt: 0.1, fontSize: '18px', fontFamily: 'Lato, sans-serif' }}
                            >
                                ${amount}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                    <Button
                        ref={buttonRef}
                        variant="contained"
                        color="primary"
                        onClick={handleBookClick}
                        sx={{
                            mt: 2,
                            alignSelf: 'center',
                            padding: { xs: '10px 20px', sm: '12px 24px' },
                            borderRadius: '8px',
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: { xs: '14px', sm: '16px' },
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'background-color 0.3s, transform 0.2s',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                                transform: 'scale(1.05)',
                            },
                            '&:active': {
                                backgroundColor: '#0d47a1',
                                transform: 'scale(1.02)',
                            }
                        }}
                    >
                        Book
                    </Button>
                </Box>
            </Paper>

            <Divider
      orientation="vertical"
      flexItem
      sx={{
        display: { xs: 'none', md: 'block' }, 
        height:"20rem",
        mt:20,
        marginX: 2, 
        backgroundColor: '#ccc', 
        width: '1px',
      }}
    />

            {/* Right Side - Animation and Text */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    maxWidth: 600,
                    width: '100%',
                }}
            >
                <Box
                ref={animationRef}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px', 
                }}
                >
                <iframe
                    src="https://lottie.host/embed/964e7fb7-1fda-4d5b-9cb6-c6d54a7c8b6d/nc8HE1HbvH.json"
                    style={{
                    width: '100%',
                    height: '400px',
                    border: 'none', 
                    }}
                    title="Ride Animation"
                ></iframe>
                </Box>

           
                <Typography
                    ref={textRef}
                    variant="h4"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        color: '#37476c',
                        mt: 2,
                        px: 2,
                    }}
                >
                    "Your Journey Awaits!"
                </Typography>
            </Box>
        </Box>
    );
};

export default RideDetailsPage;
