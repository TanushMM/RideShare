import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Grid, Card, CardContent, Typography, Divider } from '@mui/material';

const UserDashboard = () => {
  const data = [
    { name: 'Sep', Joined: 30, Posted: 15 },
    { name: 'Oct', Joined: 45, Posted: 20 },
    { name: 'Nov', Joined: 40, Posted: 25 },
    { name: 'Dec', Joined: 35, Posted: 18 },
    { name: 'Jan', Joined: 50, Posted: 22 },
    { name: 'Feb', Joined: 55, Posted: 26 },
    { name: 'Mar', Joined: 60, Posted: 30 },
  ];

  const rideHistoryData = [
    { date: '2024-09-01', rideType: 'Join', vehicleType: 'Sedan', fare: '₹250' },
    { date: '2024-09-05', rideType: 'Post', vehicleType: 'SUV', fare: '₹400' },
    { date: '2024-09-10', rideType: 'Join', vehicleType: 'Hatchback', fare: '₹200' },
    { date: '2024-09-15', rideType: 'Post', vehicleType: 'Sedan', fare: '₹300' },
    { date: '2024-09-20', rideType: 'Join', vehicleType: 'Luxury', fare: '₹800' },
    { date: '2024-09-25', rideType: 'Post', vehicleType: 'Van', fare: '₹500' },
    { date: '2024-09-30', rideType: 'Join', vehicleType: 'Auto', fare: '₹150' },
    { date: '2024-10-01', rideType: 'Join', vehicleType: 'SUV', fare: '₹350' },
    { date: '2024-10-03', rideType: 'Post', vehicleType: 'Sedan', fare: '₹600' },
    { date: '2024-10-04', rideType: 'Join', vehicleType: 'Hatchback', fare: '₹220' },
  ];

  const typographyStyles = {
    Primary: {
      color: '#FFFFFF',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    Secondary: {
      color: '#CCCCCC',
      fontSize: '1.25rem',
    },
    bodyText: {
      color: '#FFFFFF',
      fontSize: '1rem',
    },
  };

  const overallRatings = {
    ridesJoined: { rating: 4.5, count: 20 },
    ridesPosted: { rating: 4.8, count: 15 },
  };

  // Animations
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 800 } });
  const slideIn = useSpring({ transform: 'translateY(0)', from: { transform: 'translateY(50px)' }, config: { tension: 120, friction: 14 } });
  const cardHoverEffect = { boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.4)', transition: 'all 0.3s ease-in-out' };

  return (
    <Box sx={{ backgroundColor: 'transparent', minHeight: '100vh', padding: 3, color: '#FFF', mb: 0 }}>
      {/* Welcome Message */}
      <animated.div style={fadeIn}>
        <Typography variant="h2" sx={{ marginBottom: 4, fontFamily: 'Poppins', fontWeight: 'semi-bold' , color:"#243642"}}>
          Welcome back, <span style={{ color: '#888' }}>Siras</span>
        </Typography>
      </animated.div>

      {/* Main Grid Layout */}
      <Grid container spacing={2}>
        {/* Left side: Rides Joined, Rides Posted, and Ride History */}
        <Grid item xs={12} md={6}>
          {/* Rides Joined and Rides Posted */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <animated.div style={slideIn}>
                <Card sx={{ backgroundColor: '#243642', borderRadius: 2, '&:hover': cardHoverEffect }}>
                  <CardContent>
                    <Typography sx={typographyStyles.Primary}>Rides Joined</Typography>
                    <Typography sx={typographyStyles.Secondary}>315</Typography>
                  </CardContent>
                </Card>
              </animated.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <animated.div style={slideIn}>
                <Card sx={{ backgroundColor: '#243642', borderRadius: 2, '&:hover': cardHoverEffect }}>
                  <CardContent>
                    <Typography sx={typographyStyles.Primary}>Rides Posted</Typography>
                    <Typography sx={typographyStyles.Secondary}>156</Typography>
                  </CardContent>
                </Card>
              </animated.div>
            </Grid>
          </Grid>

          {/* Ride History */}
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <animated.div style={fadeIn}>
              <Card sx={{ backgroundColor: '#243642', borderRadius: 2, '&:hover': cardHoverEffect }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={typographyStyles.Primary}>
                    Ride History
                  </Typography>
                  <Divider sx={{ background: 'white', mb: 2, mt: 0 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 1,
                      borderBottom: '1px solid #444',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C' }}>Date</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C', ml: 10 }}>Method</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C' }}>Vehicle Type</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C' }}>Fare</Typography>
                  </Box>
                  <Box sx={{ maxHeight: 310, overflowY: 'auto', pb: 0 }}>
                    {rideHistoryData.map((ride, index) => (
                      <animated.div key={index} style={slideIn}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 1,
                            borderBottom: '1px solid #444',
                          }}
                        >
                          <Typography variant="body1" sx={typographyStyles.Secondary}>
                            {ride.date}
                          </Typography>
                          <Typography variant="body1" sx={typographyStyles.Secondary}>
                            {ride.rideType}
                          </Typography>
                          <Typography variant="body1" sx={typographyStyles.Secondary}>
                            {ride.vehicleType}
                          </Typography>
                          <Typography variant="body1" sx={typographyStyles.Secondary}>
                            {ride.fare}
                          </Typography>
                        </Box>
                      </animated.div>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </animated.div>
          </Grid>
        </Grid>

        {/* Right side: Rides Joined & Posted Analytics */}
        <Grid item xs={12} md={6}>
          <animated.div style={slideIn}>
            <Card sx={{ backgroundColor: '#243642', borderRadius: 2, boxShadow: 3, '&:hover': cardHoverEffect }}>
              <CardContent sx={{ padding: '1.5rem' }}>
                <Typography sx={typographyStyles.Primary}>Rides Joined & Posted</Typography>
                <Box sx={{ height: 300, marginTop: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                      <Legend wrapperStyle={{ color: '#fff' }} />
                      <Bar dataKey="Joined" fill="rgba(130, 202, 157, 0.8)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Posted" fill="rgba(136, 132, 216, 0.8)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </animated.div>

          {/* Overall Ratings Card */}
          <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
            <animated.div style={fadeIn}>
              <Card sx={{ backgroundColor: '#243642', borderRadius: 2 , '&:hover': cardHoverEffect}}>
                <CardContent>
                  <Typography variant="h6" sx={typographyStyles.Primary} marginBottom={1}>
                    Your Ratings
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    {/* Rides Joined Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <Typography variant="body1" sx={typographyStyles.Secondary}>
                        Rides Joined
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#82ca9d', marginRight: 0.5 }}>
                          {overallRatings.ridesJoined.rating.toFixed(1)}
                        </Typography>
                        <span style={{ color: '#82ca9d' }}>⭐</span>
                      </Box>
                      <Typography variant="body2" sx={typographyStyles.bodyText}>
                        {overallRatings.ridesJoined.count} rides
                      </Typography>
                    </Box>

                    <Divider orientation="vertical" sx={{ height: 60, bgcolor: '#444', mx: 2 }} />

                    {/* Rides Posted Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <Typography variant="body1" sx={typographyStyles.Secondary}>
                        Rides Posted
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#82ca9d', marginRight: 0.5 }}>
                          {overallRatings.ridesPosted.rating.toFixed(1)}
                        </Typography>
                        <span style={{ color: '#82ca9d' }}>⭐</span>
                      </Box>
                      <Typography variant="body2" sx={typographyStyles.bodyText}>
                        {overallRatings.ridesPosted.count} rides
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </animated.div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
