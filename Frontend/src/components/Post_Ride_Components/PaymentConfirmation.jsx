import React from 'react';
import { Container, Typography, Card, CardContent, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const ridesPaid = JSON.parse(sessionStorage.getItem('riders')).length;
    
    const navigate = useNavigate();

    return (
        <div>
            <Container maxWidth="sm" sx={{ mt: '12%' }}>
                <Card sx={{ boxShadow: 6, borderRadius: 3, p: 3, backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: 'black' }}
                        >
                            Payment Confirmation
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" component="p" sx={{ mt: 2, color: '#333' }}>
                            <strong>Number of Riders:</strong> {ridesPaid} <br></br>
                            <strong>Number of Riders Paid:</strong> 0
                        </Typography>



                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                onClick={() => {navigate('/post-driver-feedback')}}
                                size="large"
                                sx={{
                                    borderRadius: '50px',
                                    padding: '12px 35px',
                                    backgroundColor: '#F5F5F5',
                                    fontWeight: 'bold',
                                    borderColor: 'black',
                                    border: 0.2,
                                    color: 'black',
                                    textTransform: 'none',
                                    boxShadow: '0px 4px 15px rgba(42, 133, 215, 0.3)',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        color: 'white',
                                        boxShadow: '0px 4px 20px rgba(30, 109, 187, 0.4)',
                                    },
                                }}
                            >
                                Confirm Receipt
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default ConfirmationPage;
