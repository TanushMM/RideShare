import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const IssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch issues from the backend
    const fetchIssues = async () => {
      const response = await axios.get("http://yourapi.com/issues");
      setIssues(response.data);
    };
    fetchIssues();
  }, []);

  const handleResolveIssue = (issueId) => {
    // Logic to resolve issue
    console.log("Resolving issue with ID:", issueId);
  };

  const filteredIssues = issues.filter((issue) =>
    issue.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Issue Management
        </Typography>
        <TextField
          label="Search Issues"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />
        <List>
          {filteredIssues.map((issue) => (
            <ListItem key={issue.id}>
              <ListItemText primary={issue.description} secondary={issue.status} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleResolveIssue(issue.id)}
                >
                  Resolve
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default IssueManagement;
