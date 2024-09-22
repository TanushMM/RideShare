import  { useState, useEffect } from 'react';
import { Grid, Card, Typography, Box, Button } from '@mui/material';
import Sidebar from './Siras/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie } from 'recharts';


const Reports = () => {
  const [rideData, setRideData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [joinedData, setJoinedData] = useState([]);
  const [postedData, setPostedData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [visitsData, setVisitsData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Generate random data for testing
  useEffect(() => {
    const generateRandomData = () => {
      const rideData = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        rides: Math.floor(Math.random() * 100),
      }));

      const userData = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        newUsers: Math.floor(Math.random() * 50),
      }));

      const joinedData = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        joined: Math.floor(Math.random() * 50),
      }));

      const postedData = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        posted: Math.floor(Math.random() * 50),
      }));

      const revenueData = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        revenue: Math.floor(Math.random() * 1000),
      }));

      const visitsData = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        visits: Math.floor(Math.random() * 5000),
      }));

      setRideData(rideData);
      setUserData(userData);
      setJoinedData(joinedData);
      setPostedData(postedData);
      setRevenueData(revenueData);
      setVisitsData(visitsData);
    };

    generateRandomData();
  }, []);

  // Calculate metrics
  const totalRides = rideData.reduce((acc, curr) => acc + curr.rides, 0);
  const totalUsers = userData.reduce((acc, curr) => acc + curr.newUsers, 0);
  const totalJoined = joinedData.reduce((acc, curr) => acc + curr.joined, 0);
  const totalPosted = postedData.reduce((acc, curr) => acc + curr.posted, 0);
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <Box sx={{ mt: 12 }}>

      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} /> 
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: sidebarOpen ? '240px' : '0', transition: 'margin-left 0.3s' }}>       
         <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2, boxShadow: '6', height: '140px', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 600 }}>Total Rides</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'semi-bold', fontSize: 30, fontFamily: 'Lato' }}>{totalRides}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2, boxShadow: '6', height: '140px', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 600 }}>Total Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'semi-bold', fontSize: 30, fontFamily: 'Lato' }}>{totalUsers}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2, boxShadow: '6', height: '140px', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 600 }}>Total Rides Joined</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'semi-bold', fontSize: 30, fontFamily: 'Lato' }}>{totalJoined}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2, boxShadow: '6', height: '140px', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 600 }}>Total Rides Posted</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'semi-bold', fontSize: 30, fontFamily: 'Lato' }}>{totalPosted}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2, boxShadow: '6', height: '140px', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontSize: 25, fontWeight: 600 }}>Total Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'semi-bold', fontSize: 30, fontFamily: 'Lato' }}>${totalRevenue}</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Charts Section */}
      <Box sx={{ p: 2 }}>
  <Grid container spacing={2}>
    {/* User Growth Chart */}
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 600 }}>User Growth</Typography>
        <LineChart
          width={400}
          height={250}
          data={userData}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
        </LineChart>
      </Card>
    </Grid>

    {/* Ride Activity Chart */}
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 600 }}>Ride Activity</Typography>
        <BarChart
          width={400}
          height={250}
          data={rideData}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Bar dataKey="rides" fill="#82ca9d" />
        </BarChart>
      </Card>
    </Grid>

    {/* Rides Joined Chart */}
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 600 }}>Rides Joined</Typography>
        <LineChart
          width={400}
          height={250}
          data={joinedData}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="joined" stroke="#8884d8" />
        </LineChart>
      </Card>
    </Grid>

    {/* Rides Posted Chart */}
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 600 }}>Rides Posted</Typography>
        <LineChart
          width={400}
          height={250}
          data={postedData}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="posted" stroke="#8884d8" />
        </LineChart>
      </Card>
    </Grid>

    {/* Revenue Chart */}
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 600 }}>Revenue</Typography>
        <BarChart
          width={400}
          height={250}
          data={revenueData}
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </Card>
    </Grid>

    {/* Website Visits Chart */}
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: 600 }}>Website Visits</Typography>
        <PieChart width={400} height={250}>
          <Pie
            data={visitsData}
            dataKey="visits"
            nameKey="month"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
      </Card>
    </Grid>
  </Grid>
</Box>
                {/* Generate Report Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 6 }}>
          <Button variant="contained" fontsize='50px' color="primary" sx={{ borderRadius: 2 }}>
            Generate Report
          </Button>
        </Box>
    </Box>
  );
};

export default Reports;
