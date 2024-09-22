import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardContent,
  Tooltip,
  Divider
} from "@mui/material";
import { Delete, Menu } from "@mui/icons-material";
import Sidebar from "./Sidebar";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", role: "User" },
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com", role: "Admin" },
    { id: 5, name: "Sarah Lee", email: "sarah.lee@example.com", role: "User" },
    { id: 6, name: "David Wilson", email: "david.wilson@example.com", role: "Admin" },
    { id: 7, name: "Linda Taylor", email: "linda.taylor@example.com", role: "User" },
    { id: 8, name: "Robert Miller", email: "robert.miller@example.com", role: "Admin" },
    { id: 9, name: "Patricia Anderson", email: "patricia.anderson@example.com", role: "User" },
    { id: 10, name: "Charles Moore", email: "charles.moore@example.com", role: "Admin" },
    { id: 11, name: "Barbara Clark", email: "barbara.clark@example.com", role: "User" },
    { id: 12, name: "James Lewis", email: "james.lewis@example.com", role: "Admin" },
    { id: 13, name: "Jessica Harris", email: "jessica.harris@example.com", role: "User" },
    { id: 14, name: "William Walker", email: "william.walker@example.com", role: "Admin" },
    { id: 15, name: "Karen Hall", email: "karen.hall@example.com", role: "User" },
    { id: 16, name: "Christopher Allen", email: "christopher.allen@example.com", role: "Admin" },
    { id: 17, name: "Nancy Young", email: "nancy.young@example.com", role: "User" },
    { id: 18, name: "Andrew King", email: "andrew.king@example.com", role: "Admin" },
    { id: 19, name: "Sandra Wright", email: "sandra.wright@example.com", role: "User" },
    { id: 20, name: "Matthew Hill", email: "matthew.hill@example.com", role: "Admin" },
    { id: 21, name: "Steven Green", email: "steven.green@example.com", role: "User" },
    { id: 22, name: "Betty Adams", email: "betty.adams@example.com", role: "Admin" },
    { id: 23, name: "Daniel Baker", email: "daniel.baker@example.com", role: "User" },
    { id: 24, name: "Helen Nelson", email: "helen.nelson@example.com", role: "Admin" },
  ]);
  
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    setUsers(users.filter((user) => user.id !== userId)); // Temporary local delete
  };

  // Filter users by role
  const admins = users.filter((user) => user.role === "Admin");
  const normalUsers = users.filter((user) => user.role === "User");

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} />

      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          marginLeft: sidebarOpen ? "240px" : "0",
          transition: "margin-left 0.3s",
          marginTop: "20px",
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1100,
            fontSize: "2rem",
            color: "#1976d2",
          }}
        >
          <Menu />
        </IconButton>

        <Container sx={{ maxWidth: "lg" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 4, fontFamily: "Poppins", fontWeight: "bold", color: "#333" }}
          >
            User Management
          </Typography>
          
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Admins List */}
            <Card sx={{ flex: 1, p: 2, boxShadow: 1, borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ mb: 2, fontFamily: "Poppins", fontWeight: "semi-bold", color: "#333" }}
                >
                  Admins
                </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <CardContent>
            <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
                <List>
                  {admins.map((admin) => (
                    <ListItem
                      key={admin.id}
                      sx={{
                        mb: 2,
                        borderRadius: "8px",
                        bgcolor: "#ffffff",
                        boxShadow: "none",
                      }}
                    >
                      <ListItemText
                        primary={admin.name}
                        secondary={admin.email}
                        primaryTypographyProps={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          fontFamily: "Poppins",
                        }}
                        secondaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontFamily: "Lato",
                          color: "#666",
                        }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Delete Admin">
                          <IconButton
                            onClick={() => handleDeleteUser(admin.id)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": { bgcolor: "#ffebee" },
                              ml: 1,
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                </Box>
                </CardContent>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card sx={{ flex: 1, p: 2, boxShadow: 1, borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ mb: 2, fontFamily: "Poppins", fontWeight: "semi-bold", color: "#333" }}
                >
                  Users
                </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <CardContent>
            <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
                <List>
                  {normalUsers.map((user) => (
                    <ListItem
                      key={user.id}
                      sx={{
                        mb: 2,
                        borderRadius: "8px",
                        bgcolor: "#ffffff",
                        boxShadow: "none",
                      }}
                    >
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                        primaryTypographyProps={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          fontFamily: "Poppins",
                        }}
                        secondaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontFamily: "Lato",
                          color: "#666",
                        }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Delete User">
                          <IconButton
                            onClick={() => handleDeleteUser(user.id)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": { bgcolor: "#ffebee" },
                              ml: 1,
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
              </CardContent>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UserManagement;