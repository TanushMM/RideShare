// import React from 'react';
// import { useSpring, animated } from '@react-spring/web';
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { Box, Grid, Card, CardContent, Typography, Divider } from '@mui/material';

// const UserDashboard = () => {
//   const data = [
//     { name: 'Sep', Joined: 30, Posted: 15 },
//     { name: 'Oct', Joined: 45, Posted: 20 },
//     { name: 'Nov', Joined: 40, Posted: 25 },
//     { name: 'Dec', Joined: 35, Posted: 18 },
//     { name: 'Jan', Joined: 50, Posted: 22 },
//     { name: 'Feb', Joined: 55, Posted: 26 },
//     { name: 'Mar', Joined: 60, Posted: 30 },
//   ];

//   const rideHistoryData = [
//     { date: '2024-09-01', rideType: 'Join', vehicleType: 'Sedan', fare: '₹250' },
//     { date: '2024-09-05', rideType: 'Post', vehicleType: 'SUV', fare: '₹400' },
//     { date: '2024-09-10', rideType: 'Join', vehicleType: 'Hatchback', fare: '₹200' },
//     { date: '2024-09-15', rideType: 'Post', vehicleType: 'Sedan', fare: '₹300' },
//     { date: '2024-09-20', rideType: 'Join', vehicleType: 'Luxury', fare: '₹800' },
//     { date: '2024-09-25', rideType: 'Post', vehicleType: 'Van', fare: '₹500' },
//     { date: '2024-09-30', rideType: 'Join', vehicleType: 'Auto', fare: '₹150' },
//     { date: '2024-10-01', rideType: 'Join', vehicleType: 'SUV', fare: '₹350' },
//     { date: '2024-10-03', rideType: 'Post', vehicleType: 'Sedan', fare: '₹600' },
//     { date: '2024-10-04', rideType: 'Join', vehicleType: 'Hatchback', fare: '₹220' },
//   ];

//   const typographyStyles = {
//     Primary: {
//       color: '#FFFFFF',
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//     },
//     Secondary: {
//       color: '#CCCCCC',
//       fontSize: '1.25rem',
//     },
//     bodyText: {
//       color: '#FFFFFF',
//       fontSize: '1rem',
//     },
//   };

//   const overallRatings = {
//     ridesJoined: { rating: 4.5, count: 20 },
//     ridesPosted: { rating: 4.8, count: 15 },
//   };

//   // Animations
//   const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 800 } });
//   const slideIn = useSpring({ transform: 'translateY(0)', from: { transform: 'translateY(50px)' }, config: { tension: 120, friction: 14 } });
//   const cardHoverEffect = { boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.4)', transition: 'all 0.3s ease-in-out' };

//   return (
//     <Box sx={{ backgroundColor: 'transparent', minHeight: '100vh', padding: 3, color: '#FFF', mb: 0 }}>
//       {/* Welcome Message */}
//       <animated.div style={fadeIn}>
//         <Typography variant="h2" sx={{ marginBottom: 4, fontFamily: 'Poppins', fontWeight: 'semi-bold' , color:"#243642"}}>
//           Welcome back, <span style={{ color: '#888' }}>Tanush</span>
//         </Typography>
//       </animated.div>

//       {/* Main Grid Layout */}
//       <Grid container spacing={2}>
//         {/* Left side: Rides Joined, Rides Posted, and Ride History */}
//         <Grid item xs={12} md={6}>
//           {/* Rides Joined and Rides Posted */}
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <animated.div style={slideIn}>
//                 <Card sx={{ backgroundColor: '#243642', borderRadius: 2, '&:hover': cardHoverEffect }}>
//                   <CardContent>
//                     <Typography sx={typographyStyles.Primary}>Rides Joined</Typography>
//                     <Typography sx={typographyStyles.Secondary}>315</Typography>
//                   </CardContent>
//                 </Card>
//               </animated.div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <animated.div style={slideIn}>
//                 <Card sx={{ backgroundColor: '#243642', borderRadius: 2, '&:hover': cardHoverEffect }}>
//                   <CardContent>
//                     <Typography sx={typographyStyles.Primary}>Rides Posted</Typography>
//                     <Typography sx={typographyStyles.Secondary}>156</Typography>
//                   </CardContent>
//                 </Card>
//               </animated.div>
//             </Grid>
//           </Grid>

//           {/* Ride History */}
//           <Grid item xs={12} sx={{ marginTop: 2 }}>
//             <animated.div style={fadeIn}>
//               <Card sx={{ backgroundColor: '#243642', borderRadius: 2, '&:hover': cardHoverEffect }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom sx={typographyStyles.Primary}>
//                     Ride History
//                   </Typography>
//                   <Divider sx={{ background: 'white', mb: 2, mt: 0 }} />
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       padding: 1,
//                       borderBottom: '1px solid #444',
//                     }}
//                   >
//                     <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C' }}>Date</Typography>
//                     <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C', ml: 10 }}>Method</Typography>
//                     <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C' }}>Vehicle Type</Typography>
//                     <Typography variant="body1" sx={{ fontSize: '1.5rem', fontFamily: 'Poppins', color: '#3A6D8C' }}>Fare</Typography>
//                   </Box>
//                   <Box sx={{ maxHeight: 310, overflowY: 'auto', pb: 0 }}>
//                     {rideHistoryData.map((ride, index) => (
//                       <animated.div key={index} style={slideIn}>
//                         <Box
//                           sx={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             padding: 1,
//                             borderBottom: '1px solid #444',
//                           }}
//                         >
//                           <Typography variant="body1" sx={typographyStyles.Secondary}>
//                             {ride.date}
//                           </Typography>
//                           <Typography variant="body1" sx={typographyStyles.Secondary}>
//                             {ride.rideType}
//                           </Typography>
//                           <Typography variant="body1" sx={typographyStyles.Secondary}>
//                             {ride.vehicleType}
//                           </Typography>
//                           <Typography variant="body1" sx={typographyStyles.Secondary}>
//                             {ride.fare}
//                           </Typography>
//                         </Box>
//                       </animated.div>
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </animated.div>
//           </Grid>
//         </Grid>

//         {/* Right side: Rides Joined & Posted Analytics */}
//         <Grid item xs={12} md={6}>
//           <animated.div style={slideIn}>
//             <Card sx={{ backgroundColor: '#243642', borderRadius: 2, boxShadow: 3, '&:hover': cardHoverEffect }}>
//               <CardContent sx={{ padding: '1.5rem' }}>
//                 <Typography sx={typographyStyles.Primary}>Rides Joined & Posted</Typography>
//                 <Box sx={{ height: 300, marginTop: 2 }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                       <XAxis dataKey="name" stroke="#fff" />
//                       <YAxis stroke="#fff" />
//                       <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
//                       <Legend wrapperStyle={{ color: '#fff' }} />
//                       <Bar dataKey="Joined" fill="rgba(130, 202, 157, 0.8)" radius={[4, 4, 0, 0]} />
//                       <Bar dataKey="Posted" fill="rgba(136, 132, 216, 0.8)" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </CardContent>
//             </Card>
//           </animated.div>

//           {/* Overall Ratings Card */}
//           <Grid item xs={12} md={12} sx={{ marginTop: 2 }}>
//             <animated.div style={fadeIn}>
//               <Card sx={{ backgroundColor: '#243642', borderRadius: 2 , '&:hover': cardHoverEffect}}>
//                 <CardContent>
//                   <Typography variant="h6" sx={typographyStyles.Primary} marginBottom={1}>
//                     Your Ratings
//                   </Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//                     {/* Rides Joined Section */}
//                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
//                       <Typography variant="body1" sx={typographyStyles.Secondary}>
//                         Rides Joined
//                       </Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography variant="h5" sx={{ color: '#82ca9d', marginRight: 0.5 }}>
//                           {overallRatings.ridesJoined.rating.toFixed(1)}
//                         </Typography>
//                         <span style={{ color: '#82ca9d' }}>⭐</span>
//                       </Box>
//                       <Typography variant="body2" sx={typographyStyles.bodyText}>
//                         {overallRatings.ridesJoined.count} rides
//                       </Typography>
//                     </Box>

//                     <Divider orientation="vertical" sx={{ height: 60, bgcolor: '#444', mx: 2 }} />

//                     {/* Rides Posted Section */}
//                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
//                       <Typography variant="body1" sx={typographyStyles.Secondary}>
//                         Rides Posted
//                       </Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Typography variant="h5" sx={{ color: '#82ca9d', marginRight: 0.5 }}>
//                           {overallRatings.ridesPosted.rating.toFixed(1)}
//                         </Typography>
//                         <span style={{ color: '#82ca9d' }}>⭐</span>
//                       </Box>
//                       <Typography variant="body2" sx={typographyStyles.bodyText}>
//                         {overallRatings.ridesPosted.count} rides
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </animated.div>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UserDashboard;

// UserDashboard.jsx
import React, { useMemo } from "react"
import { useSpring, useTrail, animated } from "@react-spring/web"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { grey, teal, indigo, purple } from "@mui/material/colors"
import { styled } from "@mui/system"

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" color="#fff">
          {`${label}`}
        </Typography>
        {payload.map((entry, index) => (
          <Typography key={`item-${index}`} variant="body2" color={entry.color}>
            {`${entry.name}: ${entry.value}`}
          </Typography>
        ))}
      </Box>
    )
  }

  return null
}

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}))

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  color: theme.palette.text.primary,
}))

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  color: theme.palette.text.secondary,
}))

const BodyTextTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 300,
  color: theme.palette.text.primary,
}))

const UserDashboard = () => {
  // Define a custom theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: teal[500],
            dark: teal[700],
          },
          secondary: {
            main: indigo[500],
          },
          background: {
            default: grey[900],
            paper: grey[800],
          },
          text: {
            primary: "#FFFFFF",
            secondary: grey[400],
          },
        },
        typography: {
          fontFamily: "Poppins, sans-serif",
        },
      }),
    []
  )

  // Sample Data
  const data = useMemo(
    () => [
      { name: "Sep", Joined: 30, Posted: 15 },
      { name: "Oct", Joined: 45, Posted: 20 },
      { name: "Nov", Joined: 40, Posted: 25 },
      { name: "Dec", Joined: 35, Posted: 18 },
      { name: "Jan", Joined: 50, Posted: 22 },
      { name: "Feb", Joined: 55, Posted: 26 },
      { name: "Mar", Joined: 60, Posted: 30 },
    ],
    []
  )

  const rideHistoryData = useMemo(
    () => [
      {
        date: "2024-09-01",
        rideType: "Join",
        vehicleType: "Sedan",
        fare: "₹250",
      },
      {
        date: "2024-09-05",
        rideType: "Post",
        vehicleType: "SUV",
        fare: "₹400",
      },
      {
        date: "2024-09-10",
        rideType: "Join",
        vehicleType: "Hatchback",
        fare: "₹200",
      },
      {
        date: "2024-09-15",
        rideType: "Post",
        vehicleType: "Sedan",
        fare: "₹300",
      },
      {
        date: "2024-09-20",
        rideType: "Join",
        vehicleType: "Luxury",
        fare: "₹800",
      },
      {
        date: "2024-09-25",
        rideType: "Post",
        vehicleType: "Van",
        fare: "₹500",
      },
      {
        date: "2024-09-30",
        rideType: "Join",
        vehicleType: "Auto",
        fare: "₹150",
      },
      {
        date: "2024-10-01",
        rideType: "Join",
        vehicleType: "SUV",
        fare: "₹350",
      },
      {
        date: "2024-10-03",
        rideType: "Post",
        vehicleType: "Sedan",
        fare: "₹600",
      },
      {
        date: "2024-10-04",
        rideType: "Join",
        vehicleType: "Hatchback",
        fare: "₹220",
      },
    ],
    []
  )

  const overallRatings = useMemo(
    () => ({
      ridesJoined: { rating: 4.5, count: 20 },
      ridesPosted: { rating: 4.8, count: 15 },
    }),
    []
  )

  // Animations
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  })

  const slideInTrail = useTrail(6, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 300,
  })

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#0F172A   ",
          minHeight: "100vh",
          padding: { xs: 2, sm: 3, md: 4 },
          color: "text.primary",
        }}
      >
        {/* Welcome Message */}
        <animated.div style={fadeIn}>
          <HeaderTypography variant="h3" sx={{ marginBottom: 4 }}>
            Lets get started, <span style={{ color: indigo[300] }}>Tanush</span>
          </HeaderTypography>
        </animated.div>

        {/* Main Grid Layout */}
        <Grid container spacing={3}>
          {/* Left Side: Rides Joined, Rides Posted, and Ride History */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {/* Rides Joined */}
              <Grid item xs={12} sm={6}>
                <animated.div style={slideInTrail[0]}>
                  <StyledCard>
                    <CardContent>
                      <SubHeaderTypography variant="subtitle1">
                        Rides Joined
                      </SubHeaderTypography>
                      <HeaderTypography variant="h4">315</HeaderTypography>
                    </CardContent>
                  </StyledCard>
                </animated.div>
              </Grid>

              {/* Rides Posted */}
              <Grid item xs={12} sm={6}>
                <animated.div style={slideInTrail[1]}>
                  <StyledCard>
                    <CardContent>
                      <SubHeaderTypography variant="subtitle1">
                        Rides Posted
                      </SubHeaderTypography>
                      <HeaderTypography variant="h4">156</HeaderTypography>
                    </CardContent>
                  </StyledCard>
                </animated.div>
              </Grid>
            </Grid>

            {/* Ride History */}
            <animated.div style={slideInTrail[2]}>
              <Box sx={{ marginTop: 4 }}>
                <StyledCard>
                  <CardContent>
                    <HeaderTypography variant="h6" gutterBottom>
                      Ride History
                    </HeaderTypography>
                    <Divider sx={{ background: grey[700], mb: 2, mt: 0 }} />
                    {/* Table Header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingY: 1,
                        borderBottom: `1px solid ${grey[700]}`,
                      }}
                    >
                      <BodyTextTypography>Date</BodyTextTypography>
                      <BodyTextTypography>Method</BodyTextTypography>
                      <BodyTextTypography>Vehicle Type</BodyTextTypography>
                      <BodyTextTypography>Fare</BodyTextTypography>
                    </Box>
                    {/* Table Body */}
                    <Box sx={{ maxHeight: 310, overflowY: "auto" }}>
                      {rideHistoryData.map((ride, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingY: 1,
                            borderBottom: `1px solid ${grey[700]}`,
                            "&:hover": {
                              backgroundColor: grey[700],
                              cursor: "pointer",
                            },
                          }}
                        >
                          <BodyTextTypography>{ride.date}</BodyTextTypography>
                          <BodyTextTypography>
                            {ride.rideType}
                          </BodyTextTypography>
                          <BodyTextTypography>
                            {ride.vehicleType}
                          </BodyTextTypography>
                          <BodyTextTypography>{ride.fare}</BodyTextTypography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </StyledCard>
              </Box>
            </animated.div>
          </Grid>

          {/* Right Side: Rides Joined & Posted Analytics and Ratings */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {/* Rides Joined & Posted Analytics */}
              <Grid item xs={12}>
                <animated.div style={slideInTrail[3]}>
                  <StyledCard>
                    <CardContent>
                      <HeaderTypography variant="h6" gutterBottom>
                        Rides Joined & Posted
                      </HeaderTypography>
                      <Box sx={{ height: 300, marginTop: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke={grey[700]}
                            />
                            <XAxis dataKey="name" stroke={grey[300]} />
                            <YAxis stroke={grey[300]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ color: grey[300] }} />
                            <Bar
                              dataKey="Joined"
                              fill={teal[400]}
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                              animationDuration={800}
                            />
                            <Bar
                              dataKey="Posted"
                              fill={indigo[400]}
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                              animationDuration={800}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </animated.div>
              </Grid>

              {/* Overall Ratings */}
              <Grid item xs={12}>
                <animated.div style={slideInTrail[4]}>
                  <StyledCard>
                    <CardContent>
                      <HeaderTypography variant="h6" gutterBottom>
                        Your Ratings
                      </HeaderTypography>
                      <Divider sx={{ background: grey[700], mb: 2, mt: 0 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Rides Joined Rating */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: 2,
                          }}
                        >
                          <BodyTextTypography>Rides Joined</BodyTextTypography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginY: 1,
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ color: teal[300], marginRight: 0.5 }}
                            >
                              {overallRatings.ridesJoined.rating.toFixed(1)}
                            </Typography>
                            <Typography variant="h5" sx={{ color: teal[300] }}>
                              ⭐
                            </Typography>
                          </Box>
                          <BodyTextTypography>
                            {overallRatings.ridesJoined.count} rides
                          </BodyTextTypography>
                        </Box>

                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{
                            borderColor: grey[700],
                            height: "auto",
                            display: { xs: "none", sm: "block" },
                          }}
                        />

                        {/* Rides Posted Rating */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: 2,
                          }}
                        >
                          <BodyTextTypography>Rides Posted</BodyTextTypography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginY: 1,
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ color: indigo[300], marginRight: 0.5 }}
                            >
                              {overallRatings.ridesPosted.rating.toFixed(1)}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: indigo[300] }}
                            >
                              ⭐
                            </Typography>
                          </Box>
                          <BodyTextTypography>
                            {overallRatings.ridesPosted.count} rides
                          </BodyTextTypography>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </animated.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default UserDashboard
