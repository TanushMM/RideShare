import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import {
  People as PeopleIcon,
  DirectionsCar as DirectionsCarIcon,
  Report as ReportIcon,
  Error as ErrorIcon,
  Policy as PolicyIcon,
  SpaceDashboardRounded as SpaceDashboardRoundedIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose, onOpen }) => {
  const location = useLocation();

  const getLinkStyle = (path) => ({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      bgcolor: '#6C9DC2', // Lighter blue for hover
      color: '#fff',
      transition: 'background-color 0.3s ease',
    },
    ...(location.pathname === path && {
      bgcolor: '#0056b3', // Darker blue for active link
      color: '#295F98',
    }),
  });

  return (
    <>
      <IconButton
        onClick={onOpen}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300,
          bgcolor: '#003366',
          color: '#fff',
          boxShadow: 3,
          '&:hover': {
            bgcolor: '#002244',
          },
          transition: 'background-color 0.3s ease',
        }}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: 200, sm: 240 }, // Responsive width
            bgcolor: '#ffffff', // Sidebar background
            boxShadow: 3,
            padding: 2,
            borderRight: '1px solid #ddd', // Subtle border
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#003366' }}>
          Admin Menu
        </Typography>
        <Divider sx={{ mb: 2, bgcolor: '#ddd' }} />
        <List>
          <Link to="/admin/" style={getLinkStyle('/admin/')}>
            <ListItem button>
              <ListItemIcon><SpaceDashboardRoundedIcon sx={{ color: 'inherit' }} /></ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          </Link>
          <Link to="/admin/user-management" style={getLinkStyle('/admin/user-management')}>
            <ListItem button>
              <ListItemIcon><PeopleIcon sx={{ color: 'inherit' }} /></ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
          </Link>
          <Link to="/admin/ride-monitoring" style={getLinkStyle('/admin/ride-monitoring')}>
            <ListItem button>
              <ListItemIcon><DirectionsCarIcon sx={{ color: 'inherit' }} /></ListItemIcon>
              <ListItemText primary="Ride Monitoring" />
            </ListItem>
          </Link>
          <Link to="/admin/reports" style={getLinkStyle('/admin/reports')}>
            <ListItem button>
              <ListItemIcon><ReportIcon sx={{ color: 'inherit' }} /></ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </Link>
          <Link to="/admin/issue-management" style={getLinkStyle('/admin/issue-management')}>
            <ListItem button>
              <ListItemIcon><ErrorIcon sx={{ color: 'inherit' }} /></ListItemIcon>
              <ListItemText primary="Issue Management" />
            </ListItem>
          </Link>
          <Link to="/admin/policy-management" style={getLinkStyle('/admin/policy-management')}>
            <ListItem button>
              <ListItemIcon><PolicyIcon sx={{ color: 'inherit' }} /></ListItemIcon>
              <ListItemText primary="Policy Management" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
