import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Fade, Grow } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '12px 35px',
  backgroundColor: '#1976d2',
  fontWeight: 'bold',
  color: '#fff',
  textTransform: 'none',
  boxShadow: '0px 4px 15px rgba(25, 118, 210, 0.3)',
  '&:hover': {
    backgroundColor: '#1565c0',
    boxShadow: '0px 4px 20px rgba(21, 101, 192, 0.4)',
  },
}));

const PaymentSummaryPage = ({ payment }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setLoading(false);
      navigate('/feedback');
    }, 2000);
  };

  return (
    <div style={{backgroundColor:"#ffffff", height:"100vh", padding:"4rem"}}>
      <Container maxWidth="sm" >
        <Grow in timeout={700}>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}
              >
                Payment Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="h6"
                component="p"
                sx={{ mt: 2, color: '#333', textAlign: 'center' }}
              >
                <strong>Total Amount:</strong> ₹{sessionStorage.getItem('amount') || '0.00'}
              </Typography>

              <Typography
                variant="body1"
                component="p"
                sx={{ mt: 1, color: '#555', textAlign: 'center' }}
              >
                <strong>Payment Method:</strong> {payment?.method || 'Credit Card'}
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Fade in timeout={500}>
                      <TextField
                        fullWidth
                        label="Cardholder Name"
                        name="cardholderName"
                        value={cardDetails.cardholderName}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                      />
                    </Fade>
                  </Grid>
                  <Grid item xs={12}>
                    <Fade in timeout={600}>
                      <TextField
                        fullWidth
                        label="Card Number"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                        inputProps={{ maxLength: 16 }}
                      />
                    </Fade>
                  </Grid>
                  <Grid item xs={6}>
                    <Fade in timeout={700}>
                      <TextField
                        fullWidth
                        label="Expiry Date (MM/YY)"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                        placeholder="MM/YY"
                      />
                    </Fade>
                  </Grid>
                  <Grid item xs={6}>
                    <Fade in timeout={800}>
                      <TextField
                        fullWidth
                        label="CVV"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                        inputProps={{ maxLength: 3 }}
                      />
                    </Fade>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <ConfirmButton
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Payment'}
                </ConfirmButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Grow>
      </Container>
    </div>
  );
};

export default PaymentSummaryPage;
