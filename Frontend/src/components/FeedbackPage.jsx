import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Rating,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import FeedbackIcon from '@mui/icons-material/Feedback';

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledCard = styled(motion.div)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '20px',
  padding: theme.spacing(5),
  maxWidth: '800px',
  width: '90%',
  boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
  textAlign: 'center',
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  color: '#333',
  fontWeight: 700,
  fontFamily: `'Poppins', sans-serif`,
  textAlign: 'center',
}));

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: '#555',
  fontFamily: `'Open Sans', sans-serif`,
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '30px',
  backgroundColor: '#00C853',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'background 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: '#00B341',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 20px rgba(0, 179, 65, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 6px 15px rgba(0, 179, 65, 0.2)',
  },
}));

const DriverFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve riders from sessionStorage
    const ridersData = sessionStorage.getItem('riders');
    if (ridersData) {
      try {
        const riders = JSON.parse(ridersData);
        setFeedbacks(
          riders.map((rider) => ({
            email: rider.email,
            rating: 0,
            comments: '',
          }))
        );
      } catch (error) {
        console.error('Error parsing riders data:', error);
        setFeedbacks([]);
      }
    } else {
      console.warn('No riders data found in sessionStorage.');
      // Optionally redirect or inform the user
      setFeedbacks([]);
    }
  }, []);

  const handleRatingChange = (index, newRating) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index].rating = newRating;
    setFeedbacks(updatedFeedbacks);
  };

  const handleCommentsChange = (index, newComments) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index].comments = newComments;
    setFeedbacks(updatedFeedbacks);
  };

  const handleSubmit = () => {
    // Check if at least one feedback has been provided
    const hasFeedback = feedbacks.some((fb) => fb.rating > 0 || fb.comments.trim() !== '');
    if (!hasFeedback) {
      alert('Please provide feedback before submitting.');
      return;
    }
    setLoading(true);
    const submitFeedback = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      };
      try {
        // Send feedback for each rider
        for (const feedback of feedbacks) {
          if (feedback.rating > 0 || feedback.comments.trim() !== '') {
            await axios.post(
              `http://${import.meta.env.VITE_SERVER_IP}:8000/feedback/poster/post`,
              {
                searcher: feedback.email,
                rating: feedback.rating,
                comments: feedback.comments,
              },
              config
            );
          }
        }
        // Clear sessionStorage and redirect
        sessionStorage.removeItem('driver');
        sessionStorage.removeItem('riders');
        navigate('/');
      } catch (error) {
        console.error('Error submitting feedback:', error);
        setLoading(false);
      }
    };
    submitFeedback();
  };

  if (feedbacks.length === 0) {
    return (
      <GradientBackground>
        <StyledCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Heading variant="h4">
            No Riders Available for Feedback
          </Heading>
          <Divider sx={{ marginY: 3 }} />
          <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
            It seems there are no riders to provide feedback for at this time.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </StyledCard>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <StyledCard
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Heading variant="h4">
          Provide Feedback for Your Riders{' '}
          <FeedbackIcon sx={{ fontSize: '2.5rem', color: '#00C853' }} />
        </Heading>
        <Divider sx={{ marginY: 3 }} />
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {feedbacks.map((feedback, index) => (
            <Card
              key={index}
              sx={{
                mb: 3,
                p: 2,
                borderRadius: '15px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              }}
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {feedback.email}
                </Typography>
                <PrimaryText>Rate your experience with this rider:</PrimaryText>
                <Rating
                  name={`rider-rating-${index}`}
                  value={feedback.rating}
                  onChange={(event, newValue) => handleRatingChange(index, newValue)}
                  precision={0.5}
                  sx={{
                    fontSize: '2.5rem',
                    color: '#FFD700',
                    '& .MuiRating-iconEmpty': {
                      color: '#ffe5e7',
                    },
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  <PrimaryText>Comments or suggestions:</PrimaryText>
                  <TextField
                    value={feedback.comments}
                    onChange={(e) => handleCommentsChange(index, e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    placeholder="Share your thoughts..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: '#fff',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ mt: 4 }}>
          <SubmitButton
            onClick={handleSubmit}
            disabled={loading}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit Feedback'
            )}
          </SubmitButton>
        </Box>
      </StyledCard>
    </GradientBackground>
  );
};

export default DriverFeedback;
