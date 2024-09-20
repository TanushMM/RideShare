import  { useState, useEffect } from 'react';
import MinorCrashRoundedIcon from '@mui/icons-material/MinorCrashRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';  
import Sidebar from './Siras/Sidebar';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Sample data for now
const rideData = [
  { name: 'Jan', rides: 40 },
  { name: 'Feb', rides: 30 },
  { name: 'Mar', rides: 20 },
  { name: 'Apr', rides: 27 },
  { name: 'May', rides: 18 },
  { name: 'Jun', rides: 23 },
];

const issueData = [
  { date: '2024-01-12', issues: 15 },
  { date: '2024-02-05', issues: 22 },
  { date: '2024-03-18', issues: 18 },
  { date: '2024-04-10', issues: 30 },
  { date: '2024-05-03', issues: 12 },
  { date: '2024-06-27', issues: 25 },
  { date: '2024-07-09', issues: 16 },
  { date: '2024-08-21', issues: 19 },
  { date: '2024-09-11', issues: 28 },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeRides, setActiveRides] = useState(0);
  const [issuesResolved, setIssuesResolved] = useState(0);
  const [policiesEnforced, setPoliciesEnforced] = useState(0);

  // Fetching data functions (commented out for now)
  /*
  const fetchTotalUsers = async () => {
    try {
      const response = await fetch('/api/total-users');
      const data = await response.json();
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const fetchActiveRides = async () => {
    try {
      const response = await fetch('/api/active-rides');
      const data = await response.json();
      setActiveRides(data.activeRides);
    } catch (error) {
      console.error('Error fetching active rides:', error);
    }
  };

  const fetchIssuesResolved = async () => {
    try {
      const response = await fetch('/api/issues-resolved');
      const data = await response.json();
      setIssuesResolved(data.issuesResolved);
    } catch (error) {
      console.error('Error fetching issues resolved:', error);
    }
  };

  const fetchPoliciesEnforced = async () => {
    try {
      const response = await fetch('/api/policies-enforced');
      const data = await response.json();
      setPoliciesEnforced(data.policiesEnforced);
    } catch (error) {
      console.error('Error fetching policies enforced:', error);
    }
  };
  */

  const navigate = useNavigate();
  useEffect(() => {
    // Uncomment these lines when the API endpoints are ready
    // fetchTotalUsers();
    // fetchActiveRides();
    // fetchIssuesResolved();
    // fetchPoliciesEnforced();
    if (sessionStorage.getItem('privilage') !== "admin") {
      alert("You are not logged in (or) you are not an Admin");
      navigate("/");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar Toggle Button */}
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} />
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? '240px' : '0',
          marginTop: '80px',
          bgcolor: '#F5F5F5',
        }}
      >

        <Grid container spacing={3}>
          {/* Cards */}
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ background: '#80C4E9', color: '#16325B', boxShadow: 'none', borderRadius: 4 }}>
              <CardContent>
                <PersonRoundedIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.8rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >Total Users</Typography>
                <Typography variant="h4"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >{totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ background: '#BBE9FF', color: '#16325B', boxShadow: 'none', borderRadius: 4 }}>
              <CardContent>
                <MinorCrashRoundedIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.8rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >Active Rides</Typography>
                <Typography variant="h4"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >{activeRides}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ background: '#FFFAB7', color: '#16325B', boxShadow: 'none', borderRadius: 4 }}>
              <CardContent>
                <BugReportRoundedIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.8rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >Issues Resolved</Typography>
                <Typography variant="h4"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >{issuesResolved}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ background: '#ECCEAE', color: '#16325B', boxShadow: 'none', borderRadius: 4 }}>
              <CardContent>
                <PolicyRoundedIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.8rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >Policies Enforced</Typography>
                <Typography variant="h4"
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#16325B',
                  }}
                >{policiesEnforced}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom mb={5}
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#16325B',
                  textAlign: 'left'
                }}
              >Monthly Ride Activity</Typography>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rideData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> {/* Lighter grid lines */}
                  <XAxis dataKey="name" stroke="#333" /> {/* Darker X-Axis */}
                  <YAxis stroke="#333" /> {/* Darker Y-Axis */}
                  <Legend />
                  <Line type="monotone" dataKey="rides" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom mb={5}
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#16325B',
                  textAlign: 'left'
                }}
              >Issue Tracking Over Time</Typography>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={issueData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> {/* Lighter grid lines */}
                  <XAxis dataKey="date" stroke="#333" /> {/* Darker X-Axis */}
                  <YAxis stroke="#333" /> {/* Darker Y-Axis */}
                  <Legend />
                  <Line type="monotone" dataKey="issues" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
