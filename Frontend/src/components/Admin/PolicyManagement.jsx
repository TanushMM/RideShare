import { useState } from "react";
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
  Divider
} from "@mui/material";
import { Edit, Menu } from "@mui/icons-material";
import axios from 'axios'; 
import Sidebar from './Sidebar';

const PolicyManagement = () => {
  const [policies, setPolicies] = useState([
    { id: 1, name: "Privacy Policy", text: "This is our privacy policy." },
    { id: 2, name: "Terms of Service", text: "These are our terms of service." },
    { id: 3, name: "Refund Policy", text: "This is our refund policy." },
  ]);

  const [policyText, setPolicyText] = useState("");
  const [editPolicy, setEditPolicy] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditPolicy = (policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    setEditPolicy(policyId);
    setPolicyText(policy.text);
  };

  const handleSavePolicy = async () => {
    const policyData = {
      id: editPolicy,
      text: policyText,
    };

    try {
      await axios.post('/api/policies', policyData);
      alert("Policy saved successfully!"); // Windows alert for success
    } catch (error) {
      alert("Failed to save policy"); // Windows alert for error
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} />

      <Box
        sx={{
          flexGrow: 1,
          p: 4, // Increased padding
          marginLeft: sidebarOpen ? '240px' : '0',
          transition: 'margin-left 0.3s',
          marginTop: '80px',
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1100, fontSize: '2rem' }} // Larger icon
        >
          <Menu />
        </IconButton>

        <Container>
          <Typography variant="h3" gutterBottom sx={{ mb: 4, fontFamily: "Poppins" }}> {/* Larger header */}
            Policy Management
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List sx={{ mb: 4 }}>
            {policies.map((policy) => (
              <ListItem key={policy.id} sx={{ mb: 3 }}>
                <ListItemText
                  primary={policy.name}
                  secondary={policy.text}
                  primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.7rem', fontFamily: "Poppins" }} // Larger primary text
                  secondaryTypographyProps={{ fontSize: '1.3rem', fontFamily: "Lato" }} // Larger secondary text
                />
                <ListItemSecondaryAction>
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleEditPolicy(policy.id)}
                    variant="contained" // Changed to contained for better visibility
                    color="primary"
                    sx={{ fontSize: '1rem', px: 3, py: 1.5 }} // Larger button
                  >
                    Edit
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {editPolicy && (
            <Box>
              <Typography variant="h5" gutterBottom> {/* Larger sub-header */}
                Edit Policy
              </Typography>
              <TextField
                label="Policy Text"
                multiline
                rows={6} // Increased rows for larger input area
                variant="outlined"
                fullWidth
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                sx={{ mb: 4, '& .MuiOutlinedInput-input': { fontSize: '1.25rem' } }} // Larger input text
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSavePolicy}
                  sx={{ mr: 3, fontSize: '1.1rem', px: 4, py: 2 }} // Larger button
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditPolicy(null);
                    setPolicyText("");
                  }}
                  sx={{ fontSize: '1.1rem', px: 4, py: 2 }} // Larger button
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default PolicyManagement;
