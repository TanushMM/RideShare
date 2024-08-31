import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";

const PolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [editPolicy, setEditPolicy] = useState(null);
  const [policyText, setPolicyText] = useState("");

  useEffect(() => {
    // Fetch policies from the backend
    const fetchPolicies = async () => {
      const response = await axios.get("");
      setPolicies(response.data);
    };
    fetchPolicies();
  }, []);

  const handleEditPolicy = (policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    setEditPolicy(policyId);
    setPolicyText(policy.text);
  };

  const handleSavePolicy = () => {
    // Logic to save policy updates
    console.log("Saving policy with ID:", editPolicy);
    setEditPolicy(null);
    setPolicyText("");
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Policy Management
        </Typography>
        <List>
          {policies.map((policy) => (
            <ListItem key={policy.id}>
              <ListItemText primary={policy.name} secondary={policy.text} />
              <ListItemSecondaryAction>
                <Button
                  startIcon={<Edit />}
                  onClick={() => handleEditPolicy(policy.id)}
                >
                  Edit
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {editPolicy && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Edit Policy</Typography>
            <TextField
              label="Policy Text"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePolicy}
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setEditPolicy(null);
                setPolicyText("");
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PolicyManagement;

