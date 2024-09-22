import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box, TextField, Grid, Divider } from '@mui/material';
import Header from './Layout/Header';
import { useNavigate } from 'react-router-dom';

const PaymentSummaryPage = ({ payment }) => {
    const navigate = useNavigate();

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // console.log('Submitted card details:', cardDetails);
        navigate('/feedback');
    };

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card sx={{ boxShadow: 6, borderRadius: 3, p: 3, backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: 'black' }}
                        >
                            Payment Summary
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" component="p" sx={{ mt: 2, color: '#333' }}>
                            <strong>Total Amount:</strong> ₹{sessionStorage.getItem('amount') || 'NULL'}
                        </Typography>

                        <Typography variant="body1" component="p" sx={{ mt: 2, color: '#555' }}>
                            <strong>Payment Method:</strong> {payment?.method || 'Credit Card'}
                        </Typography>

                        {/* <Typography variant="body1" component="p" sx={{ mt: 2, color: '#555' }}>
                            <strong>Transaction ID:</strong> {payment?.transactionId || 'XYZ123'}
                        </Typography> */}

                        {/* Input fields for card details */}
                        <Box sx={{ mt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Cardholder Name"
                                        name="cardholderName"
                                        value={cardDetails.cardholderName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        required
                                        sx={{ backgroundColor: 'white' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Card Number"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        required
                                        inputProps={{ maxLength: 16 }}
                                        sx={{ backgroundColor: 'white' }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Expiry Date (MM/YY)"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        required
                                        placeholder="MM/YY"
                                        sx={{ backgroundColor: 'white' }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="CVV"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        required
                                        inputProps={{ maxLength: 3 }}
                                        sx={{ backgroundColor: 'white' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
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
                                Confirm Payment
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default PaymentSummaryPage;