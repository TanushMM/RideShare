// import React from 'react';
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Grid,
//   Avatar,
//   Divider,
// } from '@mui/material';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
// import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import HomeIcon from '@mui/icons-material/Home';

// const AnimatedCounter = ({ value }) => {
//   const [count, setCount] = React.useState(0);

//   React.useEffect(() => {
//     let start = 0;
//     const end = value > 100 ? 100 : value;
//     if (start === end) return;

//     let totalDuration = 500;
//     let incrementTime = (totalDuration / end) * 1.5;

//     const timer = setInterval(() => {
//       start += 1;
//       setCount(start);
//       if (start === end) clearInterval(timer);
//     }, incrementTime);
//   }, [value]);

//   return (
//     <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#000' }}>
//       {count}
//     </Typography>
//   );
// };

// const Profile = () => {
//   const user = {
//     name: 'Tanush M M',
//     email: 'tanushmmofficial@gmail.com',
//     phone: '+91 1234567890',
//     address: '123 Main St, Springfield, USA',
//     rides: 23,
//     drives: 15,
//   };

//   return (
//     <Box
//     sx={{
//       background: '#528ec1',
//       padding : 12
//     }}
//     >
//     <Container maxWidth="lg" >
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6} padding='2px'>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 4,
//               height: '100%',
//               backgroundColor: '#fafafa', 
//               color: '#000', 
//               boxShadow: 5,
//             }}
//           >
//             <Box display="flex" alignItems="center" mb={2}>
//               <Avatar
//                 sx={{
//                   width: 80,
//                   height: 80,
//                   mr: 3,
//                   bgcolor: '#e3f2fd', 
//                   color: '#021526', 
//                 }}
//               >
//                 {user.name[0]}
//               </Avatar>
//               <Typography
//                 variant="h4"
//                 component="div"
//                 fontWeight="bold"
//                 sx={{ color: '#021526',  }} 
//               >
//                 {user.name}
//               </Typography>
//             </Box>
//             <Divider sx={{ my: 2, bgcolor: '#cfd8dc' }} /> 
//             <Box display="flex" alignItems="center" mb={1}>
//               <EmailIcon sx={{ mr: 2, color: '#000' }} />
//               <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
//                 {user.email}
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" mb={1}>
//               <PhoneIcon sx={{ mr: 2, color: '#000' }} />
//               <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
//                 {user.phone}
//               </Typography>
//             </Box>
//             <Box display="flex" alignItems="center" mb={1}>
//               <HomeIcon sx={{ mr: 2, color: '#000' }} />
//               <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
//                 {user.address}
//               </Typography>
//             </Box>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Grid container spacing={4}>
//             <Grid item xs={12}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 4,
//                   backgroundColor: '#F6F5F5', 
//                   color: '#021526',
//                 }}
//               >
//                 <DirectionsCarIcon sx={{ fontSize: 60, color: '#021526' }} />
//                 <Typography variant="h6" component="div" mt={2} sx={{ color: '#021526' }}>
//                   Total Drives
//                 </Typography>
//                 <AnimatedCounter value={user.drives} />
//                 <LocalTaxiIcon sx={{ fontSize: 60, color: '#021526' }} />
//                 <Typography variant="h6" component="div" mt={2} sx={{ color: '#021526' }}>
//                   Total Rides
//                 </Typography>
//                 <AnimatedCounter value={user.rides} />
//               </Paper>
//             </Grid>
//             <Grid item xs={12}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 4,
//                   textAlign: 'center',
//                   backgroundColor: '#F6F5F5', 
//                   color: '#021526', 
//                 }}
//               >
                
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//     </Box>
//   );
// };

// export default Profile;

import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value > 100 ? 100 : value;
    if (start === end) return;

    let totalDuration = 500;
    let incrementTime = (totalDuration / end) * 1.5;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [value]);

  return (
    <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#000' }}>
      {count}
    </Typography>
  );
};

const Profile = () => {
  const user = {
    name: 'Tanush M M',
    email: 'tanushmmofficial@gmail.com',
    phone: '+91 938439998',
    address: '34, Gandhi Road, Nehru colony, Egmore, Chennai',
    rides: 23,
    drives: 15,
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
            <Grid container>

                <Grid item xs={12} md={5} p={3} bgcolor="white" sx={{
                    textAlign: 'left',
                    p: 6,
                    boxShadow: 3,}}>
            <Box
              sx={{
                height: '90%',
                width: '100%',
                padding: 4,
                backgroundColor: 'transparent', // No visible background
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    bgcolor: '#e3f2fd', // Light blue background for avatar
                    color: '#021526', // Black text color for contrast
                  }}
                >
                  {user.name[0]}
                </Avatar>
                <Typography
                  variant="h4"
                  component="div"
                  fontWeight="bold"
                  sx={{ color: '#021526' }} // Black for the name
                >
                  {user.name}
                </Typography>
              </Box>
              <Divider sx={{ my: 2, bgcolor: '#cfd8dc' }} /> {/* Light grey divider */}
              <Box display="flex" alignItems="center" mb={1}>
                <EmailIcon sx={{ mr: 2, color: '#000' }} />
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
                  {user.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <PhoneIcon sx={{ mr: 2, color: '#000' }} />
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
                  {user.phone}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <HomeIcon sx={{ mr: 2, color: '#000' }} />
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#021526' }}>
                  {user.address}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side: Rides and Drives Counters */}
          <Grid item xs={12} md={6}>
  <Grid container >
    {/* Total Drives & Rides */}
    <Grid item xs={12}>
      <Paper
        elevation={4} // Slightly stronger shadow
        sx={{
          p: 4,
          backgroundColor: '#E0F7FA', // Light blue for modern look
          color: '#021526',
          height:'250px',
          width: '56rem',
          borderRadius: 0,

        }}
      >
        <Box display="flex" justifyContent="space-around" sx={{m:1}} alignItems="center">
          {/* Total Drives */}
          <Box textAlign="center">
            <DirectionsCarIcon sx={{ fontSize: 60, color: '#0288D1' }} /> {/* Blue color for contrast */}
            <Typography variant="h6" component="div" mt={2} sx={{ color: '#021526' }}>
              Total Drives
            </Typography>
            <AnimatedCounter value={user.drives} />
          </Box>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: '#0288D1', width: '2px', mx: 2 }} /> {/* Vertical divider */}

          {/* Total Rides */}
          <Box textAlign="center">
            <LocalTaxiIcon sx={{ fontSize: 60, color: '#0288D1' }} /> {/* Same icon color */}
            <Typography variant="h6" component="div" mt={2} sx={{ color: '#021526' }}>
              Total Rides
            </Typography>
            <AnimatedCounter value={user.rides} />
          </Box>
        </Box>
      </Paper>
    </Grid>

    {/* Ride History */}
    <Grid item xs={12}>
      <Paper
        elevation={3}
        sx={{
          
          p: 4,
          textAlign: 'center',
          backgroundColor: 'white', // Light yellow to make it stand out
          color: '#021526',
          height: '400px', // Scrollable content
          width: '56rem',
          overflowY: 'auto',
          borderRadius: 0,
        }}
      >
        <Typography variant="h6" component="div" mb={2} sx={{ color: '#021526', fontFamily: 'Poppins', fontSize: '30px',fontWeight: '550' }}>
          Ride History
        </Typography>
        {/* Add ride history content */}
        <Typography variant="body2" sx={{ color: '#455A64', fontSize: '17 px' }}>
          No recent rides found.
        </Typography>
      </Paper>
    </Grid>
  </Grid>
</Grid>
        </Grid>
    </Box>
  );
};

export default Profile;
