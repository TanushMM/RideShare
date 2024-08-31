import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  DirectionsCar as DirectionsCarIcon,
  Report as ReportIcon,
  Error as ErrorIcon,
  Policy as PolicyIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const rideData = [
  { name: 'Jan', rides: 40 },
  { name: 'Feb', rides: 30 },
  { name: 'Mar', rides: 20 },
  { name: 'Apr', rides: 27 },
  { name: 'May', rides: 18 },
  { name: 'Jun', rides: 23 },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar Toggle Button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1300,
          bgcolor: '#ffffff',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: '#fafafa',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: 2,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>Admin Menu</Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <Link to="/admin/user-management" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
          </Link>
          <Link to="/admin/ride-monitoring" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Ride Monitoring" />
            </ListItem>
          </Link>
          <Link to="/admin/reports" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemIcon><ReportIcon /></ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </Link>
          <Link to="/admin/issue-management" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemIcon><ErrorIcon /></ListItemIcon>
              <ListItemText primary="Issue Management" />
            </ListItem>
          </Link>
          <Link to="/admin/policy-management" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemIcon><PolicyIcon /></ListItemIcon>
              <ListItemText primary="Policy Management" />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? '240px' : '0',
        }}
      >
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">1,200</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6">Active Rides</Typography>
                <Typography variant="h4">350</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6">Issues Resolved</Typography>
                <Typography variant="h4">1,050</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6">Policies Enforced</Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant="h6" gutterBottom>Monthly Ride Activity</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rides" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography variant="h6" gutterBottom>Issues Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rideData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rides" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
