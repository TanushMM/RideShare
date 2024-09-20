import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Grid, Paper, TextField, MenuItem, Select, FormControl, InputLabel, TablePagination } from "@mui/material";
import axios from "axios";
import Sidebar from "./Siras/Sidebar";

const RideMonitoringDashboard = () => {
  const [activeRides, setActiveRides] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchActiveRides = async () => {
      try {
        const response = await axios.get(""); // Replace with your API endpoint
        // Assuming response.data is an array. If not, adjust accordingly.
        if (Array.isArray(response.data)) {
          setActiveRides(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching active rides", error);
      }
    };
    fetchActiveRides();
  }, []);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Ensure activeRides is an array before applying array methods
  const filteredRides = Array.isArray(activeRides) ? activeRides
    .filter(ride => !statusFilter || ride.status === statusFilter)
    .filter(ride => ride.user.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  const sortedAndFilteredRides = filteredRides.sort((a, b) =>
    sortOrder === 'asc' ? a.user.localeCompare(b.user) : b.user.localeCompare(a.user)
  );

  const paginatedRides = sortedAndFilteredRides.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} /> 
        <Typography variant="h4" gutterBottom>
          Ride Monitoring Dashboard
        </Typography>
        <TextField
          label="Search Rides"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchTermChange}
          sx={{ mb: 4 }}
        />
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sort Order</InputLabel>
              <Select value={sortOrder} onChange={handleSortOrderChange}>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select value={statusFilter} onChange={handleStatusFilterChange}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {paginatedRides.map((ride) => (
            <Grid item xs={12} md={6} lg={4} key={ride.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{ride.user}</Typography>
                <Typography variant="body1">Status: {ride.status}</Typography>
                <Typography variant="body2">Start: {ride.startLocation}</Typography>
                <Typography variant="body2">End: {ride.endLocation}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRides.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ mt: 4 }}
        />
      </Box>
    </Container>
  );
};

export default RideMonitoringDashboard;
