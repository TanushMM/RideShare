import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let data;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("jwt"); 
        const response = await axios.get("http://3.110.16.132:5050/user/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.contents); 
        console.log(response.data.contents); 
        data = response.data.contents;
      } catch (error) {
        setError(error.message); 
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete = (userId) => {
    // Logic to delete a user
    console.log("Deleting user with ID:", userId);
  };

  const handleEdit = (userId) => {
    // Logic to edit a user
    console.log("Editing user with ID:", userId);
  };

  // const filteredUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <h1>User Management</h1>
      <h2>Data:</h2>
      <h2><pre>{JSON.stringify(users, null, 2)}</pre></h2> {/* Display the raw data */}
    </div>
    // <Container>
    //   <Box sx={{ mt: 4 }}>
    //     <Typography variant="h4" gutterBottom>
    //       User Management
    //     </Typography>
    //     <TextField
    //       label="Search Users"
    //       variant="outlined"
    //       fullWidth
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       sx={{ mb: 3 }}
    //     />
    //     {/* <List>
    //       {filteredUsers.map((user) => (
    //         <ListItem key={user.id}>
    //           <ListItemText primary={user.name} secondary={user.email} />
    //           <ListItemSecondaryAction>
    //             <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user.id)}>
    //               <Edit />
    //             </IconButton>
    //             <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
    //               <Delete />
    //             </IconButton>
    //           </ListItemSecondaryAction>
    //         </ListItem>
    //       ))}
    //     </List> */}
    //     <Button variant="contained" color="primary" sx={{ mt: 3 }}>
    //       Add New User
    //     </Button>
    //   </Box>
    // </Container>
  );
};

export default UserManagement;
