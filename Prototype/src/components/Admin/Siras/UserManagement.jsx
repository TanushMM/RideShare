import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Menu } from "@mui/icons-material";
import axios from 'axios';
import Sidebar from './Sidebar';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", role: "Moderator" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setEditUser(userId);
    setUserRole(user.role);
  };

  const handleDeleteUser = (userId) => {
    // Uncomment the following lines when integrating with your backend
    /*
    axios.delete(`/api/users/${userId}`)
      .then(response => {
        console.log("User deleted successfully:", response.data);
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
    */
  };

  const handleSaveUser = () => {
    const updatedUserData = { role: userRole };

    if (editUser) {
      // Uncomment the following lines when integrating with your backend
      /*
      axios.put(`/api/users/${editUser}`, updatedUserData)
        .then(response => {
          console.log("User updated successfully:", response.data);
          setUsers(users.map(user => user.id === editUser ? { ...user, ...updatedUserData } : user));
        })
        .catch(error => {
          console.error("Error updating user:", error);
        });
      */
    } else {
      // Uncomment the following lines when integrating with your backend
      /*
      axios.post(`/api/users`, updatedUserData)
        .then(response => {
          console.log("User added successfully:", response.data);
          setUsers([...users, { id: response.data.id, ...updatedUserData }]);
        })
        .catch(error => {
          console.error("Error adding user:", error);
        });
      */
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setEditUser(null);
    setUserRole("");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} />

      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          marginLeft: sidebarOpen ? '240px' : '0',
          transition: 'margin-left 0.3s',
          marginTop: '80px',
          backgroundColor: '#f0f2f5',
          minHeight: '100vh',
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1100, fontSize: '2rem', color: '#1976d2' }}
        >
          <Menu />
        </IconButton>

        <Container sx={{ maxWidth: 'lg' }}>
          <Typography variant="h3" gutterBottom sx={{ mb: 4, fontFamily: "Poppins", fontWeight: 'bold', color: '#333' }}>
            User Management
          </Typography>
          
          <Card sx={{ mb: 4, p:2 , boxShadow: '1', borderRadius: '12px' }}>
            <CardContent>
              <TextField
                label="Search Users"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 4 }}
                InputProps={{
                  sx: {
                    borderRadius: '8px',
                  },
                }}
              />
              <List>
                {filteredUsers.map((user) => (
                  <ListItem key={user.id} sx={{ mb: 2, borderRadius: '8px', bgcolor: '#ffffff', boxShadow: 'none' }}>
                    <ListItemText
                      primary={user.name}
                      secondary={user.email}
                      primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem', fontFamily: "Poppins" }}
                      secondaryTypographyProps={{ fontSize: '0.9rem', fontFamily: "Lato", color: '#666' }}
                    />
                      <Typography variant="body2" sx={{ mx: 2,marginRight:8, fontSize: '1rem', fontFamily: "Poppins" }}>
                      Role : {user.role}
                        </Typography>
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit User">
                        <IconButton
                          onClick={() => handleEditUser(user.id)}
                          sx={{ color: '#1976d2', '&:hover': { bgcolor: '#e3f2fd' } }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton
                          onClick={() => handleDeleteUser(user.id)}
                          sx={{ color: '#d32f2f', '&:hover': { bgcolor: '#ffebee' }, ml: 1 }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Dialog open={!!editUser} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '1.25rem', fontWeight: 'bold' }}>
    {editUser ? "Edit User" : "Add User"}
  </DialogTitle>
  <DialogContent sx={{p:2}}>
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel shrink>Role</InputLabel>
      <Select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        label="Role"
        sx={{ borderRadius: '8px', bgcolor: '#f0f2f5' }}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Moderator">Moderator</MenuItem>
        <MenuItem value="User">User</MenuItem>
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions sx={{ p: 2 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleSaveUser}
      sx={{ fontSize: '0.9rem', px: 3, py: 1.5, borderRadius: '8px' }}
    >
      {editUser ? "Save" : "Add"}
    </Button>
    <Button
      variant="outlined"
      onClick={handleCloseDialog}
      sx={{ fontSize: '0.9rem', px: 3, py: 1.5, borderRadius: '8px' }}
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>

        </Container>
      </Box>
    </Box>
  );
};

export default UserManagement;
