import  { useState, useEffect } from "react";
import Sidebar from "./Siras/Sidebar";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";

// import axios from 'axios'; // No need to import axios anymore

const IssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Use hardcoded issues instead of fetching from API
  useEffect(() => {
    const hardcodedIssues = [
      { id: 1, description: "Login page not responsive on mobile devices", status: "Open" },
      { id: 2, description: "Error in payment gateway during checkout", status: "Resolved" },
      { id: 3, description: "Profile picture upload fails for new users", status: "Open" },
      { id: 4, description: "Incorrect vehicle capacity displayed on ride details page", status: "Resolved" },
      { id: 5, description: "Push notifications not working on Android", status: "Open" },
      { id: 6, description: "Ride creation page crashes for long route inputs", status: "Resolved" },
      { id: 7, description: "Database query taking too long for user reports", status: "Open" },
      { id: 8, description: "Forgot password email not sent to users", status: "Resolved" },
      { id: 9, description: "User cannot cancel a ride after driver approval", status: "Open" },
      { id: 10, description: "Issue with date format in ride history for some users", status: "Resolved" },
      { id: 11, description: "Map not loading in certain geographical areas", status: "Open" },
      { id: 12, description: "Ride monitoring dashboard taking too long to load", status: "Resolved" },
      { id: 13, description: "App crashing when switching between multiple languages", status: "Open" },
    ];
    setIssues(hardcodedIssues);
  }, []);

  // Calculate issue counts
  useEffect(() => {
    const resolvedIssues = issues.filter(issue => issue.status === "Resolved").length;
    const openIssues = issues.filter(issue => issue.status === "Open").length;
    
    // Counting animation for resolved and pending issues
    let resolvedInterval = setInterval(() => {
      setResolvedCount((prev) => (prev < resolvedIssues ? prev + 1 : prev));
    }, 50);

    let pendingInterval = setInterval(() => {
      setPendingCount((prev) => (prev < openIssues ? prev + 1 : prev));
    }, 50);

    // Clear intervals when animation finishes
    return () => {
      clearInterval(resolvedInterval);
      clearInterval(pendingInterval);
    };
  }, [issues]);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: '#E0E0E0' }}>
      {/* Sidebar Toggle Button */}
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} onOpen={toggleSidebar} />

      {/* Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1, p: 3, mt: 10 }}>
        {/* Issue List Section */}
        <Box sx={{ width: '50%', bgcolor: "#fff", p: 2, borderRadius: 1, boxShadow: 2, maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
            Issue Management
          </Typography>
          <List>
            {Array.isArray(issues) && issues.length > 0 ? (
              issues.map((issue) => (
                <ListItem key={issue.id} sx={{ mb: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {issue.description}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        {issue.status}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="contained"
                      color={issue.status === "Open" ? "primary" : "secondary"}
                      sx={{ fontWeight: "bold" }}
                    >
                      {issue.status === "Resolved" ? "Reopen" : "Resolve"}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography>No issues available</Typography>
            )}
          </List>
        </Box>

        {/* Resolved & Pending Issues Counters */}
        <Box sx={{ width: '50%', display: "flex", flexDirection: "column", gap: 2, pl: 2, }}>
          <Box sx={{ bgcolor: "#E8F5E9", p: 3, borderRadius: 1, boxShadow: 3, textAlign: "center", flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Poppins", fontSize: 40, p: 2, pt: 7 }}>Resolved Issues</Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold", color: "#388E3C", fontFamily: "Lato", fontSize: 40 }}>
              {resolvedCount}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: "#FFEBEE", p: 3, borderRadius: 1, boxShadow: 3, textAlign: "center", flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Poppins", fontSize: 40, p: 2, pt: 7 }}>Pending Issues</Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold", color: "#388E3C", fontFamily: "Lato", fontSize: 40 }}>
              {pendingCount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IssueManagement;
